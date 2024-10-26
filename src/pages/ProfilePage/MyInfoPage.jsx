import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import NavbarProfile from '../../components/NavbarProfile';
import {Input, Button, message, Modal, Select, Table, Form} from 'antd';
import {ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
	GetAllDistrictSelector,
	GetAllWardSelector,
	GetUserDetailSelector,
	selectDistances,
	selectLoading,
	UserInfoSelector,
} from '../../redux/selectors';
import {getUserDetail, handleUpdateAccount} from '../../redux/slices/userLoginSlice';
import {fetchDistances, fetchDistrict, fetchWard} from '../../redux/slices/distanceSlice';

const {Option} = Select;

const MyInfoPage = () => {
	const dispatch = useDispatch();
	const userSelector = useSelector(UserInfoSelector);
	const userDetail = useSelector(GetUserDetailSelector);
	const districts = useSelector(GetAllDistrictSelector);
	const wards = useSelector(GetAllWardSelector);
	const provinces = useSelector(selectDistances);
	const loading = useSelector(selectLoading);

	const [editing, setEditing] = useState(false);
	const [province, setProvince] = useState('');
	const [district, setDistrict] = useState('');
	const [ward, setWard] = useState('');
	const [userInfo, setUserInfo] = useState({
		firstName: userDetail.FirstName || '',
		lastName: userDetail.LastName || '',
		email: userDetail.Email || '',
		phone: userDetail.Phone || '',
		addresses: userDetail.Addresses || [],
	});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newAddress, setNewAddress] = useState({
		Province: '',
		District: '',
		Ward: '',
		Street: '',
	});
	const [addAddress, setAddAddress] = useState([]);
	const [deletedAddressIds, setDeletedAddressIds] = useState([]);

	useEffect(() => {
		if (userSelector && userSelector.UserId) {
			dispatch(getUserDetail(userSelector.UserId));
		}
	}, [dispatch, userSelector]);

	useEffect(() => {
		dispatch(fetchDistances());
	}, [dispatch]);

	useEffect(() => {
		if (provinces) {
			setProvince(provinces);
		}
	}, [provinces]);

	useEffect(() => {
		dispatch(fetchDistrict(newAddress?.Province?.Id));
	}, [dispatch, newAddress]);

	useEffect(() => {
		if (districts) {
			setDistrict(districts);
		}
	}, [districts]);

	useEffect(() => {
		dispatch(fetchWard(newAddress?.District?.Id));
	}, [dispatch, newAddress]);

	useEffect(() => {
		if (wards) {
			setWard(wards);
		}
	}, [wards]);

	const handleEdit = () => setEditing(true);

	const handleCityChange = (value) => {
		const selected = province.find((distance) => distance.Id === value);
		setNewAddress((prev) => ({
			...prev,
			Province: selected,
			District: '',
			Ward: '',
		}));
		console.log(value);
	};

	const handleDistrictChange = (value) => {
		const selected = district.find((district) => district.Id === value);
		setNewAddress((prev) => ({
			...prev,
			District: selected,
			Ward: '',
		}));
		console.log(value);
	};

	const handleWardChange = (value) => {
		const selected = ward.find((district) => district.Id === value);
		setNewAddress((prev) => ({
			...prev,
			Ward: selected,
		}));
		console.log(value);
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setNewAddress((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCancelEdit = () => {
		setEditing(false);
		setUserInfo((prev) => ({
			...prev,
			firstName: userDetail.FirstName || '',
			lastName: userDetail.LastName || '',
			email: userDetail.Email || '',
			phone: userDetail.Phone || '',
		}));
	};

	const handleAddAddress = (e) => {
		e.preventDefault(); // Ngăn chặn hành động mặc định của form

		// Giả định newAddress là địa chỉ mới bạn đã thu thập được từ form
		const newAddresses = {
			// Thêm các thuộc tính cần thiết cho địa chỉ mới
			Street: newAddress?.Street, // thay thế bằng giá trị thực tế
			District: newAddress?.District?.Name, // giá trị từ Select cho quận/huyện
			Ward: newAddress?.Ward?.Name, // giá trị từ Select cho phường/xã
			Province: newAddress?.Province?.Name, // giá trị từ Select cho phường/xã
			// Bạn có thể thêm các thuộc tính khác nếu cần
		};

		// Cập nhật userInfo với địa chỉ mới
		setUserInfo((prevInfo) => ({
			...prevInfo,
			addresses: [...prevInfo.addresses, newAddresses], // Thêm địa chỉ mới vào mảng addresses
		}));

		setAddAddress((prevAddresses) => [...prevAddresses, newAddress]);

		setNewAddress({
			Province: '',
			District: '',
			Ward: '',
			Street: '',
		});
	};
	const handleDeleteAddress = (street, id) => {
		// Xóa địa chỉ dựa trên tên đường
		setUserInfo((prevInfo) => ({
			...prevInfo,
			addresses: prevInfo.addresses.filter((address) => address.Street !== street),
		}));

		setAddAddress((prevAddresses) =>
			prevAddresses.filter((address) => address.Street !== street)
		);

		// Check if the id is defined before adding to deletedAddressIds
		if (id) {
			setDeletedAddressIds((prevDeletedIds) => [...prevDeletedIds, id]);
		}

		message.success('Địa chỉ đã được xóa!');
	};

	const handleSubmit = () => {
		const addedAddress = addAddress?.map((address) => ({
			Province: address?.Province?.Name,
			Ward: address?.Ward?.Name,
			Street: address?.Street,
			District: address?.District?.Name,
		}));
		console.log(addedAddress);

		dispatch(
			handleUpdateAccount({
				id: userSelector.UserId,
				changedFullName: {
					firstName: userInfo.firstName,
					lastName: userInfo.lastName,
				},
				changedAddress: {
					removedAddressId: deletedAddressIds,
					updatedAddress: null,
					addedAddress: addedAddress,
				},
			})
		).then((res) => {
			if (res.payload) {
				message.success('Cập nhật thành công!');
				setIsModalVisible(false);
				setNewAddress({
					Province: '',
					District: '',
					Ward: '',
					Street: '',
				});
			} else {
				message.error('Vui lòng kiểm tra lại thông tin!');
			}
		});
		setEditing(false);
	};

	const showModal = () => {
		setIsModalVisible(true);
		dispatch(fetchDistrict());
	};

	const handleCancelModal = () => {
		setIsModalVisible(false);
		setNewAddress({
			Province: '',
			District: '',
			Ward: '',
			Street: '',
		});
	};

	const handleAddressChange = (field, value) => {
		setNewAddress((prev) => ({...prev, [field]: value}));
	};

	const addressColumns = [
		{
			title: 'Tỉnh/Thành phố',
			dataIndex: 'Province',
			key: 'Province',
		},
		{
			title: 'Quận/Huyện',
			dataIndex: 'District',
			key: 'District',
		},
		{
			title: 'Phường/Xã',
			dataIndex: 'Ward',
			key: 'Ward',
		},
		{
			title: 'Đường',
			dataIndex: 'Street',
			key: 'Street',
		},
		{
			...(editing && {
				title: 'Hành động',
				key: 'action',
				render: (text, record) => (
					<Button danger onClick={() => handleDeleteAddress(record.Street, record.Id)}>
						Xóa
					</Button>
				),
			}),
		},
	];

	console.log(province);
	console.log('newAddress', newAddress);
	console.log('addAddress', addAddress);
	console.log('deletedAddressIds', deletedAddressIds);

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
						<div className="grid grid-cols-2 gap-8">
							<div className="w-full">
								<label>Tên</label>
								<Input
									value={userInfo.firstName}
									onChange={(e) =>
										setUserInfo((prev) => ({
											...prev,
											firstName: e.target.value,
										}))
									}
									disabled={!editing}
								/>
							</div>
							<div className="w-full">
								<label>Họ</label>
								<Input
									value={userInfo.lastName}
									onChange={(e) =>
										setUserInfo((prev) => ({...prev, lastName: e.target.value}))
									}
									disabled={!editing}
								/>
							</div>
							<div className="w-full">
								<label>Email</label>
								<Input value={userInfo.email} disabled />
							</div>
							<div className="w-full">
								<label>Số Điện Thoại</label>
								<Input value={userInfo.phone} disabled />
							</div>
						</div>
					</div>
					<div className="w-full max-w-4xl mx-auto p-6 mt-8">
						<h3 className="text-2xl font-bold mb-4">Danh sách địa chỉ</h3>
						<div className="flex justify-between items-center mb-4">
							{/* Show Save and Cancel buttons when editing */}

							{/* Show Add Address button only in editing mode */}
							{editing && (
								<Button icon={<PlusOutlined />} onClick={showModal}>
									Thêm Địa Chỉ
								</Button>
							)}
						</div>
						<Table
							columns={addressColumns}
							dataSource={userInfo.addresses}
							rowKey="Street"
							pagination={false}
						/>
					</div>
					{editing ? (
						<div className="flex justify-end items-center">
							<Button type="text" className="bg-primary mr-5" onClick={handleSubmit}>
								Lưu
							</Button>
							<Button danger onClick={handleCancelEdit}>
								Hủy
							</Button>
						</div>
					) : (
						<div className="flex justify-end items-center">
							<Button type="text" className="bg-primary" onClick={handleEdit}>
								Chỉnh sửa
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Add Address Modal */}
			<Modal
				title="Thêm Địa Chỉ"
				visible={isModalVisible}
				onOk={handleAddAddress}
				onCancel={handleCancelModal}
			>
				<Select
					placeholder="Chọn Tỉnh/Thành phố"
					onChange={handleCityChange}
					style={{width: '100%', marginBottom: '1rem'}}
					disabled={loading}
					loading={loading}
				>
					{province && province.length > 0 ? (
						province.map((distance) => (
							<Select.Option key={distance.Id} value={distance.Id}>
								{distance.Name}
							</Select.Option>
						))
					) : (
						<Select.Option disabled>No data available</Select.Option>
					)}
				</Select>
				<Select
					placeholder="Chọn Quận/Huyện"
					onChange={handleDistrictChange}
					style={{width: '100%', marginBottom: '1rem'}}
					disabled={loading}
					loading={loading}
				>
					{district && district.length > 0 ? (
						district.map((district) => (
							<Option key={district.Id} value={district.Id}>
								{district.Name}
							</Option>
						))
					) : (
						<Option disabled>No data available</Option>
					)}
				</Select>

				<Select
					placeholder="Chọn Phường/Xã"
					onChange={handleWardChange}
					style={{width: '100%', marginBottom: '1rem'}}
					disabled={loading}
					loading={loading}
				>
					{ward && ward.length > 0 ? (
						ward.map((ward) => (
							<Option key={ward.Id} value={ward.Id}>
								{ward.Name}
							</Option>
						))
					) : (
						<Option disabled>No data available</Option>
					)}
				</Select>

				<Input name="Street" placeholder="Đường" onChange={handleChange} />
			</Modal>
		</div>
	);
};

export default MyInfoPage;
