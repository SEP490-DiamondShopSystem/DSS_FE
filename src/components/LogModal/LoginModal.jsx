import React from 'react';

import {Button, Form, Input, message, Modal} from 'antd';
import {jwtDecode} from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LoadingUserSelector} from '../../redux/selectors';
import {GoogleRegister, handleLogin, setUser} from '../../redux/slices/userLoginSlice';
import {GoogleLoginButton} from '../LoginGoogleButton';
import {setLocalStorage} from '../../utils/localstorage';
import {GoogleOutlined} from '@ant-design/icons';

const LoginModal = ({isOpen, onClose}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(LoadingUserSelector);

	const [form] = Form.useForm();

	const onFinish = (values) => {
		const {email, password} = values;

		const data = {
			email,
			password,
			isExternalLogin: true,
			isStaffLogin: false,
		};
		dispatch(handleLogin(data))
			.then((res) => {
				if (res.payload) {
					const decodedData = jwtDecode(res.payload.accessToken);
					console.log(decodedData);
					setLocalStorage('user', JSON.stringify(decodedData));
					setLocalStorage('userId', decodedData.UserId);
					dispatch(setUser(decodedData));
					message.success('Đăng nhập thành công!');
					form.resetFields();
					onClose();

					navigate('/');
				} else {
					message.error(
						'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn!'
					);
				}
			})
			.catch((error) => {
				console.error('Login failed:', error);
				message.error(
					'Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn!'
				);
			});
	};

	const handleGoogleLogin = (response) => {
		console.log('Google login response:', response);
		// const data = {
		// 	email: '',
		// 	password: '',
		// };
		dispatch(GoogleRegister({externalProviderName: 'Google'}));
		const decode = jwtDecode(response.credential);
		console.log(decode);

		message.success('Đăng nhập Google thành công!');
		onClose();
	};

	const handleGoogleLoginFailure = (error) => {
		message.error('Lỗi đăng nhập Google!');
		console.error('Google login error:', error);
	};

	return (
		<Modal
			title="Login"
			className="text-center font-semibold"
			open={isOpen}
			onCancel={onClose}
			footer={null}
			destroyOnClose
		>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Form.Item
					name="email"
					label="Email"
					rules={[{required: true, message: 'Hãy nhập email của bạn!', type: 'email'}]}
				>
					<Input placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Mật khẩu"
					rules={[{required: true, message: 'Hãy nhập mật khẩu!'}]}
				>
					<Input.Password placeholder="Mật khẩu" />
				</Form.Item>
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full mt-5"
							// loading={loading}
						>
							Đăng nhập
						</Button>
					</div>
				</Form.Item>
				<div className="text-center">
					<p className="my-5">hoặc đăng nhập bằng</p>
					{/* <div className="w-full flex justify-center items-center">
						<GoogleLoginButton
							onSuccess={handleGoogleLogin}
							onError={handleGoogleLoginFailure}
						/>
					</div> */}
					<a
						href="https://diamondshop-fqgcbagydmgxa4cx.eastasia-01.azurewebsites.net/Account/Register/External"
						className=""
						// onClick={handleGoogleLogin}
					>
						<GoogleOutlined />
					</a>
				</div>
			</Form>
		</Modal>
	);
};

export default LoginModal;
