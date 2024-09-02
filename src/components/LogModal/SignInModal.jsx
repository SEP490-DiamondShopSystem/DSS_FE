import React from 'react';

import {Modal, Button, Input, Form} from 'antd';

const SignInModal = ({isOpen, onClose}) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Received values:', values);
		form.resetFields();
	};

	return (
		<Modal
			title="Sign In"
			className="text-center font-semibold"
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{required: true, message: 'Please enter your email!'},
						{type: 'email', message: 'Please enter a valid email address!'},
					]}
				>
					<Input placeholder="Enter your email" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{required: true, message: 'Please enter your password!'}]}
				>
					<Input.Password placeholder="Enter your password" />
				</Form.Item>

				<Form.Item
					label="Confirm Password"
					name="confirmPassword"
					rules={[
						{required: true, message: 'Please confirm your password!'},
						({getFieldValue}) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords do not match!'));
							},
						}),
					]}
				>
					<Input.Password placeholder="Confirm your password" />
				</Form.Item>
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full"
							// loading={loading}
						>
							Sign In
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default SignInModal;
