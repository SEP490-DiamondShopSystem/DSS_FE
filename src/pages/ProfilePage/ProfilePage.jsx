import React, {useState} from 'react';

import {Button, Table, Tag} from 'antd';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';
import LogoutModal from '../../components/LogModal/LogoutModal';
import NavbarProfile from '../../components/NavbarProfile';
import '../../css/Profile.css';
import {initialData} from '../../utils/constant';
import {removeLocalStorage} from '../../utils/localstorage';

const ProfilePage = () => {
	const columns = [
		{
			title: () => <div className="text-center">Order Id</div>,
			dataIndex: 'orderId',
		},
		{
			title: () => <div className="text-center">Order Time</div>,
			dataIndex: 'orderTime',
		},
		{
			title: () => <div className="text-center">Product</div>,
			dataIndex: 'product',
		},
		{
			title: () => <div className="text-center">Price</div>,
			dataIndex: 'price',
		},
		{
			title: () => <div className="text-center">Status</div>,
			dataIndex: 'status',
			render: (status) => {
				let color = 'red';
				if (status === 'Completed') {
					color = 'green';
				} else if (status === 'Pending') {
					color = 'warning';
				} else if (status === 'Processing') {
					color = 'processing';
				}
				return (
					<div className="text-center">
						<Tag className="text-center" color={color}>
							{status.toUpperCase()}
						</Tag>
					</div>
				);
			},
		},
	];
	const navigate = useNavigate();

	const orderStatus = [
		{icon: '', name: 'Total Order', status: 'All', order: 1},
		{icon: '', name: 'Pending Order', status: 'Pending', order: 3},
		{icon: '', name: 'Processing Order', status: 'Processing', order: 4},
		{icon: '', name: 'Complete Order', status: 'Completed', order: 10},
	];
	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [dataSource, setDataSource] = useState(initialData);
	const [status, setStatus] = useState('All');
	const showLogoutModal = () => setIsLogoutModalVisible(true);
	const hideLogoutModal = () => setIsLogoutModalVisible(false);

	const handleLogout = () => {
		removeLocalStorage('user');
		hideLogoutModal();

		navigate('/');
	};

	// const handleDelete = (id) => {
	// 	const newData = dataSource?.filter((item) => item.id !== id);
	// 	setDataSource(newData);
	// };

	const filteredData =
		status === 'All' ? dataSource : dataSource.filter((order) => order.status === status);

	const handleStatusClick = (newStatus) => {
		setStatus(newStatus);
	};

	return (
		<div>
			<Helmet>
				<title>My Profile</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>

				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl ">Welcome Mr.Customer</h1>
						<Button type="text" className="bg-primary" onClick={showLogoutModal}>
							Logout
						</Button>
					</div>
					<div className="flex items-center font-medium justify-around mt-10">
						{orderStatus.map((statusItem) => (
							<div
								className={`flex items-center justify-around shadow-xl py-3 px-12 ${
									status === statusItem.status ? 'bg-primary' : 'bg-white'
								} rounded-lg cursor-pointer border ${
									status === statusItem.status ? 'border-black' : 'border-white'
								} hover:border-black`}
								onClick={() => handleStatusClick(statusItem.status)}
							>
								<div className="relative p-3">
									<img src={statusItem.icon} alt="" className="w-14 h-14" />
									<p className="absolute top-0 right-1 px-2 py-1 rounded-full text-primary bg-gray">
										{statusItem.order}
									</p>
								</div>
								<div className="ml-5">{statusItem.name}</div>
							</div>
						))}
					</div>
					<div className="mt-10">
						<Table
							dataSource={filteredData}
							columns={columns}
							pagination={{pageSize: 5}}
							className="custom-table-header"
							rowKey="id"
						/>
					</div>
				</div>
			</div>
			<LogoutModal
				visible={isLogoutModalVisible}
				onConfirm={handleLogout}
				onCancel={hideLogoutModal}
			/>
		</div>
	);
};

export default ProfilePage;
