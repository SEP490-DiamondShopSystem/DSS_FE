import React from 'react';

import {Button, Form, Input, message, Modal} from 'antd';
import {jwtDecode} from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LoadingUserSelector} from '../../redux/selectors';
import {handleGoogleLogin, handleLogin, setUser} from '../../redux/slices/userLoginSlice';
import {setLocalStorage} from '../../utils/localstorage';
import {GoogleLoginButton} from '../LoginGoogleButton';

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
			.unwrap()
			.then((res) => {
				const decodedData = jwtDecode(res.accessToken);
				setLocalStorage('user', JSON.stringify(decodedData));
				setLocalStorage('userId', decodedData.UserId);
				dispatch(setUser(decodedData));
				message.success('Đăng nhập thành công!');
				form.resetFields();
				onClose();
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
	};

	const handleGoogleLoginBtn = (response) => {
		dispatch(handleGoogleLogin(response?.credential))
			.unwrap()
			.then((res) => {
				const decodedData = jwtDecode(res.accessToken);
				setLocalStorage('user', JSON.stringify(decodedData));
				setLocalStorage('userId', decodedData.UserId);
				dispatch(setUser(decodedData));
				message.success('Đăng nhập Google thành công!');
				onClose();
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
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
					rules={[{required: true, message: 'Vui lòng nhập email!', type: 'email'}]}
				>
					<Input placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Mật khẩu"
					rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
				>
					<Input.Password placeholder="Mật khẩu" />
				</Form.Item>
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full mt-5"
							loading={loading}
						>
							Đăng nhập
						</Button>
					</div>
				</Form.Item>
				<div className="text-center">
					<p className="my-5">hoặc đăng nhập bằng</p>
					<div className="w-full flex justify-center items-center">
						<GoogleLoginButton
							onSuccess={handleGoogleLoginBtn}
							onError={handleGoogleLoginFailure}
						/>
					</div>
				</div>
			</Form>
		</Modal>
	);
};

export default LoginModal;
