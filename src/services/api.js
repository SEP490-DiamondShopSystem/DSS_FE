import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_DEV = import.meta.env.VITE_API_DEV;

console.log('API_URL', API_DEV);

// Khởi tạo axios instance
export const api = axios.create({
	baseURL: API_DEV,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Thêm interceptor để tự động thêm token vào mỗi request
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Axios response interceptor để xử lý token expired và refresh
api.interceptors.response.use(
	(response) => {
		// Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx sẽ kích hoạt chức năng này
		return response.data ? response.data : {statusCode: response.status};
	},
	async (error) => {
		// Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx sẽ kích hoạt chức năng này
		let res = {};

		if (error.response) {
			// Yêu cầu đã được gửi và server đã phản hồi
			res.data = error.response.data;
			res.status = error.response.status;

			// Nếu mã trạng thái là 401 và chưa retry (token hết hạn)
			if (res.status === 401 && !error.config._retry) {
				error.config._retry = true;

				try {
					// Gửi request làm mới token
					const refreshToken = localStorage.getItem('refreshToken');
					const refreshResponse = await api.put(
						`/Account/RefreshToken?refreshToken=${refreshToken}`
					);

					// Lưu Access Token mới
					const newAccessToken = refreshResponse.accessToken;
					console.log('newAccessToken', newAccessToken);

					localStorage.setItem('accessToken', newAccessToken);

					// Gán Access Token mới vào header và thực hiện lại request ban đầu
					error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return api(error.config);
				} catch (refreshError) {
					console.error('Token refresh failed', refreshError);
					// Điều hướng người dùng đến trang đăng nhập
					window.location.href = '/';
					return Promise.reject(refreshError);
				}
			}
		} else if (error.request) {
			// Yêu cầu đã được gửi nhưng không có phản hồi nào
			console.log(error.request);
		} else {
			// Một điều gì đó đã xảy ra khi thiết lập yêu cầu
			console.log('Error', error.message);
		}
		return Promise.reject(res);
	}
);
