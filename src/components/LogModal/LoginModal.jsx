import React from 'react';

import {Button, Form, Input, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LoadingUserSelector} from '../../redux/selectors';
import {handleLogin} from '../../redux/slices/userLoginSlice';
import {notifyError, notifySuccess} from '../../utils/toast';
import {GoogleLoginButton} from '../LoginGoogleButton';

const LoginModal = ({isOpen, onClose}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(LoadingUserSelector);
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Received values:', values);
		dispatch(handleLogin(values))
			.then((res) => {
				if (res.payload) {
					notifySuccess('Login successful!');
					form.resetFields();
					onClose();
					navigate('/');
				} else {
					notifyError('Login failed. Please check your credentials!');
				}
			})
			.catch((error) => {
				console.error('Login failed:', error);
				notifyError('Login failed. Please check your credentials!');
			});
	};

	const handleGoogleLogin = (response) => {
		console.log('Google login response:', response);
		// Add logic to handle Google response and call API if necessary.
		notifySuccess('Google login successful!');
		onClose();
	};

	const handleGoogleLoginFailure = (error) => {
		notifyError('Google login error!');
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
					rules={[{required: true, message: 'Please enter your email!', type: 'email'}]}
				>
					<Input placeholder="Enter your email" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[{required: true, message: 'Please enter your password!'}]}
				>
					<Input.Password placeholder="Enter your password" />
				</Form.Item>
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full mt-5"
							loading={loading}
						>
							Login
						</Button>
					</div>
				</Form.Item>
				<div className="text-center">
					<p className="my-5">or sign in with</p>
					<div>
						<GoogleLoginButton
							onSuccess={handleGoogleLogin}
							onError={handleGoogleLoginFailure}
						/>
					</div>
				</div>
			</Form>
		</Modal>
	);
};

export default LoginModal;
