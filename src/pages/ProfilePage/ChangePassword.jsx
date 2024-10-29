import React, {useState} from 'react';

import NavbarProfile from '../../components/NavbarProfile';
import {Helmet} from 'react-helmet';
import {Button, Form, Input} from 'antd';

const ChangePassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleSubmit = (values) => {
		console.log('Password changed:', values);
		form.resetFields();
	};
	return (
		<div>
			<Helmet>
				<title>Đổi Mật Khẩu</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg shadow-lg">
					<h2 className="text-2xl mb-6 text-center">Đổi Mật Khẩu</h2>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleSubmit}
						className="max-w-md mx-auto"
					>
						<Form.Item
							label="Mật khẩu cũ"
							name="oldPassword"
							rules={[
								{required: true, message: 'Vui lòng nhập mật khẩu cũ của bạn!'},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							label="Mật khẩu mới"
							name="newPassword"
							rules={[
								{required: true, message: 'Vui lòng nhập mật khẩu mới của bạn!'},
								{min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự!'},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							label="Xác nhận mật khẩu mới"
							name="confirmNewPassword"
							dependencies={['newPassword']}
							rules={[
								{
									required: true,
									message: 'Vui lòng xác nhận mật khẩu mới của bạn!',
								},
								({getFieldValue}) => ({
									validator(_, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('Mật khẩu không khớp nhau!')
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item>
							<Button
								htmlType="submit"
								type="text"
								loading={loading}
								block
								className="bg-primary"
							>
								Change Password
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
