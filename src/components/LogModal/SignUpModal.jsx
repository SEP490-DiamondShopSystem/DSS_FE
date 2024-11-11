import React from 'react';

import {Modal, Button, Input, Form, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {handleLogin, handleRegister, setUser} from '../../redux/slices/userLoginSlice';
import {LoadingUserSelector} from '../../redux/selectors';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const SignUpModal = ({isOpen, onClose}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(LoadingUserSelector);
	const [form] = Form.useForm();

	const onFinish = (values) => {
		const fullName = {
			firstName: values.firstName,
			lastName: values.lastName,
		};

		const registerData = {
			...values,
			fullName,
			isExternalRegister: true,
		};

		const loginData = {
			email: values.email,
			password: values.password,
			isExternalLogin: true,
			isStaffLogin: false,
		};

		dispatch(handleRegister(registerData)).then((res) => {
			if (res.payload) {
				message.success('Đăng ký thành công!');
				form.resetFields();

				dispatch(handleLogin(loginData))
					.then((response) => {
						if (response.payload) {
							const decodedData = jwtDecode(response.payload.accessToken);
							localStorage.setItem('user', JSON.stringify(decodedData));
							localStorage.setItem('userId', decodedData.UserId);
							dispatch(setUser(decodedData));

							onClose();
							navigate('/');
						} else {
							console.error('Login failed:');
							message.error('Đăng nhập không thành công. Vui lòng thử lại!');
						}
					})
					.catch((error) => {
						console.error('Login failed:', error);
						message.error('Đăng nhập không thành công. Vui lòng thử lại!');
					});
			} else {
				message.error(
					'Đăng ký không thành công. Vui lòng kiểm tra thông tin đăng ký của bạn!'
				);
			}
		});
	};

	return (
		<Modal
			title="Đăng ký"
			className="text-center font-semibold"
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				{/* First Name */}
				<Form.Item
					label="Họ"
					name="lastName"
					rules={[{required: true, message: 'Vui lòng nhập họ của bạn!'}]}
				>
					<Input placeholder="Họ" />
				</Form.Item>

				{/* Last Name */}
				<Form.Item
					label="Tên"
					name="firstName"
					rules={[{required: true, message: 'Vui lòng nhập tên của bạn!'}]}
				>
					<Input placeholder="Tên" />
				</Form.Item>

				{/* Email */}
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{required: true, message: 'Vui lòng nhập email của bạn!'},
						{type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!'},
					]}
				>
					<Input placeholder="Email" />
				</Form.Item>

				{/* Password */}
				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[{required: true, message: 'Vui lòng nhập mật khẩu của bạn!'}]}
				>
					<Input.Password placeholder="Mật khẩu" />
				</Form.Item>

				{/* Confirm Password */}
				<Form.Item
					label="Xác nhận mật khẩu"
					name="confirmPassword"
					dependencies={['password']}
					rules={[
						{required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!'},
						({getFieldValue}) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Hai mật khẩu không khớp nhau!'));
							},
						}),
					]}
				>
					<Input.Password placeholder="Xác nhận mật khẩu của bạn" />
				</Form.Item>

				{/* Submit Button */}
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full"
							loading={loading}
						>
							Đăng ký
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default SignUpModal;
