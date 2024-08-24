import {Button, Form, Input, Modal} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import {GoogleLogin} from '@react-oauth/google';
import {notifyError, notifySuccess} from '../../utils/toast';
import {handleLogin} from '../../redux/slices/userLoginSlice';
import {useNavigate} from 'react-router-dom';

const LoginModal = ({visible, onClose}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
		console.error('Google login error:', error);
	};

	return (
		<Modal title="Login" visible={visible} onCancel={onClose} footer={null} destroyOnClose>
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
							className="bg-primary text-white hover:bg-primary"
						>
							Login
						</Button>
						<Button
							onClick={onClose}
							className="bg-gray-300 text-black hover:bg-gray-400"
						>
							Cancel
						</Button>
					</div>
				</Form.Item>
				<div className="text-center mt-4">
					<GoogleLogin
						onSuccess={handleGoogleLogin}
						onError={handleGoogleLoginFailure}
						className="w-full"
					/>
				</div>
			</Form>
		</Modal>
	);
};

export default LoginModal;
