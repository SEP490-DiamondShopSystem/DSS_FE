import React from 'react';

import {Modal, Button, Input, Form} from 'antd';

const SignUpModal = ({isOpen, onClose}) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Received values:', values);
		form.resetFields();
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

				<Form.Item
					label="Mật khẩu"
					name="password"
					rules={[{required: true, message: 'Vui lòng nhập mật khẩu của bạn!'}]}
				>
					<Input.Password placeholder="Mật khẩu" />
				</Form.Item>

				<Form.Item
					label="Xác nhận mật khẩu"
					name="confirmPassword"
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
				<Form.Item>
					<div className="flex justify-between">
						<Button
							htmlType="submit"
							type="text"
							className="bg-primary text-black hover:bg-primary font-semibold w-full"
							// loading={loading}
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
