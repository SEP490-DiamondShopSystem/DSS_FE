import React from 'react';

import {Button, Form, Input, message} from 'antd';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import NavbarProfile from '../../components/NavbarProfile';
import {
	ErrorPasswordSelector,
	GetUserDetailSelector,
	LoadingUserDetailSelector,
} from '../../redux/selectors';
import {handleChangePassword} from '../../redux/slices/userSlice';

const ChangePassword = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const userDetail = useSelector(GetUserDetailSelector);
	const loading = useSelector(LoadingUserDetailSelector);
	const error = useSelector(ErrorPasswordSelector);

	const handleSubmit = (values) => {
		console.log('Password changed:', values);
		dispatch(
			handleChangePassword({
				identityId: userDetail?.IdentityId,
				oldPassword: values?.oldPassword,
				newPassword: values?.newPassword,
			})
		);
		if (!loading) {
			if (error === null || error === undefined) {
				message.success('Thay đổi mật khẩu thành công!');
			} else {
				message.error(error?.detail);
			}
		}

		form.resetFields();
	};

	console.log('error', error);

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
