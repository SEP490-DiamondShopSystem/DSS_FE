import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import NavbarProfile from '../../components/NavbarProfile';
import {Form, Input, Button, message, Modal, List} from 'antd';
import {ExclamationCircleOutlined, PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {GetUserDetailSelector, UserInfoSelector} from '../../redux/selectors';
import {getUserDetail} from '../../redux/slices/userLoginSlice';

const {confirm} = Modal;

const MyInfoPage = () => {
	const dispatch = useDispatch();
	const userSelector = useSelector(UserInfoSelector);
	const userDetail = useSelector(GetUserDetailSelector);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);
	const [userInfo, setUserInfo] = useState({
		firstName: userDetail.FirstName,
		lastName: userDetail.LastName,
		email: userDetail.Email,
		phone: '',
		addresses: ['123 Diamond St, NY', '456 Gem Ave, LA'],
	});

	useEffect(() => {
		if (userSelector && userSelector.UserId) {
			dispatch(getUserDetail(userSelector.UserId)).finally(() => {
				setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, [dispatch, userSelector]);

	useEffect(() => {
		form.setFieldsValue(userInfo);
	}, [form, userInfo]);

	const handleEdit = () => {
		setEditing(true);
	};

	const handleCancelEdit = () => {
		setEditing(false);
		form.setFieldsValue(userInfo); // Reset lại userInfo ban đầu
	};

	const handleSubmit = (values) => {
		setUserInfo(values);
		setEditing(false);
		message.success('Cập nhật thông tin thành công');
	};

	const showDeleteConfirm = () => {
		confirm({
			title: 'Bạn có chắc chắn muốn xóa tài khoản không?',
			icon: <ExclamationCircleOutlined />,
			content: 'Hành động này không thể hoàn tác.',
			okText: 'Có, xóa',
			okType: 'danger',
			cancelText: 'Không',
			onOk() {
				message.success('Tài khoản đã được xóa thành công');
			},
			onCancel() {
				message.info('Hủy xóa tài khoản');
			},
		});
	};

	const handleAddAddress = () => {
		setUserInfo((prev) => ({
			...prev,
			addresses: [...prev.addresses, ''],
		}));
	};

	const handleAddPaymentMethod = () => {
		setUserInfo((prev) => ({
			...prev,
			paymentMethods: [...prev.paymentMethods, ''],
		}));
	};

	const handleRemoveAddress = (index) => {
		setUserInfo((prev) => ({
			...prev,
			addresses: prev.addresses.filter((_, i) => i !== index),
		}));
	};

	const handleRemovePaymentMethod = (index) => {
		setUserInfo((prev) => ({
			...prev,
			paymentMethods: prev.paymentMethods.filter((_, i) => i !== index),
		}));
	};

	const handleAddressChange = (value, index) => {
		const newAddresses = [...userInfo.addresses];
		newAddresses[index] = value;
		setUserInfo((prev) => ({...prev, addresses: newAddresses}));
	};

	const handlePaymentMethodChange = (value, index) => {
		const newPaymentMethods = [...userInfo.paymentMethods];
		newPaymentMethods[index] = value;
		setUserInfo((prev) => ({...prev, paymentMethods: newPaymentMethods}));
	};

	return (
		<div>
			<Helmet>
				<title>Hồ Sơ Của Tôi - Diamond Shop</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold mb-8 border-b p-2">Hồ Sơ Của Tôi</h2>
					<div className="w-full max-w-4xl mx-auto p-6">
						<Form
							form={form}
							layout="vertical"
							onFinish={handleSubmit}
							className="grid grid-cols-2 gap-8"
						>
							<Form.Item
								label="Tên"
								name="firstName"
								rules={[{required: true, message: 'Vui lòng nhập tên'}]}
								className="w-full"
							>
								<Input disabled={!editing} />
							</Form.Item>
							<Form.Item
								label="Họ"
								name="lastName"
								rules={[{required: true, message: 'Vui lòng nhập họ'}]}
								className="w-full"
							>
								<Input disabled={!editing} />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										type: 'email',
										message: 'Vui lòng nhập email hợp lệ',
									},
								]}
							>
								<Input disabled={!editing} />
							</Form.Item>
							<Form.Item
								label="Số Điện Thoại"
								name="phone"
								rules={[{required: true, message: 'Vui lòng nhập số điện thoại'}]}
							>
								<Input disabled={!editing} />
							</Form.Item>

							<div className="col-span-2">
								<h3 className="text-xl font-semibold mb-4">Địa Chỉ</h3>
								<List
									bordered
									dataSource={userInfo.addresses}
									renderItem={(item, index) => (
										<List.Item>
											{editing ? (
												<>
													<Input
														value={item}
														onChange={(e) =>
															handleAddressChange(
																e.target.value,
																index
															)
														}
													/>
													<MinusCircleOutlined
														onClick={() => handleRemoveAddress(index)}
														style={{color: 'red'}}
														className="ml-4"
													/>
												</>
											) : (
												item
											)}
										</List.Item>
									)}
								/>
								{editing && (
									<Button
										type="dashed"
										onClick={handleAddAddress}
										icon={<PlusOutlined />}
										className="mt-4"
									>
										Thêm Địa Chỉ
									</Button>
								)}
							</div>

							<div className="flex justify-center items-center">
								{editing ? (
									<>
										<Button
											type="default"
											onClick={handleCancelEdit}
											className="mr-5"
										>
											Hủy
										</Button>
										<Button type="primary" htmlType="submit" loading={loading}>
											Lưu
										</Button>
									</>
								) : (
									<>
										<Button type="primary" onClick={handleEdit}>
											Chỉnh Sửa
										</Button>
									</>
								)}
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyInfoPage;
