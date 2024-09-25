import React, {useState} from 'react';
import {Badge, Button, Divider, Space} from 'antd';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';
import LogoutModal from '../../components/LogModal/LogoutModal';
import NavbarProfile from '../../components/NavbarProfile';
import {initialData} from '../../utils/constant';
import {removeLocalStorage} from '../../utils/localstorage';

const detailGroups = {
	total_price: 20138000,
	groups: [
		{
			jewelry_price: 10069000,
			status: 'Completed',
			items: [
				{id: 86, name: 'Round Diamond 3.5 Carat IF', unitPrice: 3357000},
				{id: 87, name: 'Round Diamond 3.5 Carat VVS1', unitPrice: 4467000},
				{
					id: 88,
					name: 'Petite Solitaire Engagement Ring In 14k White Gold',
					unitPrice: 2245000,
				},
			],
		},
		{
			jewelry_price: 10069000,
			status: 'Waiting for manufacture',
			items: [
				{id: 89, name: 'Round Diamond 3.5 Carat IF', unitPrice: 3357000},
				{id: 90, name: 'Round Diamond 3.5 Carat VVS1', unitPrice: 4467000},
				{
					id: 91,
					name: 'Petite Solitaire Engagement Ring In 14k White Gold',
					unitPrice: 2245000,
				},
			],
		},
	],
};

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
		{icon: '', name: 'Pending Order', status: 'Waiting for manufacture', order: 3},
		{icon: '', name: 'Processing Order', status: 'Processing', order: 4},
		{icon: '', name: 'Complete Order', status: 'Completed', order: 10},
	];

	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [status, setStatus] = useState('All');
	const showLogoutModal = () => setIsLogoutModalVisible(true);
	const hideLogoutModal = () => setIsLogoutModalVisible(false);

	const handleLogout = () => {
		removeLocalStorage('user');
		hideLogoutModal();
		navigate('/');
	};

	// Filtering logic based on selected status
	const filteredData =
		status === 'All'
			? detailGroups.groups
			: detailGroups.groups.filter((order) => order.status === status);

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
						<h1 className="text-2xl">Welcome Mr.Customer</h1>
						<Button type="text" className="bg-primary" onClick={showLogoutModal}>
							Logout
						</Button>
					</div>
					<div className="flex items-center font-medium justify-between mt-10">
						{orderStatus.map((statusItem) => (
							<div
								key={statusItem.status}
								className={`flex items-center justify-around shadow-xl py-3 px-12 ${
									status === statusItem.status ? 'bg-primary' : 'bg-white'
								} rounded-lg cursor-pointer border ${
									status === statusItem.status ? 'border-black' : 'border-white'
								} hover:border-black`}
								onClick={() => handleStatusClick(statusItem.status)}
							>
								<div className="p-3">
									<Badge
										count={statusItem.order}
										color={status === statusItem.status ? 'green' : '#dec986'}
									>
										<img src={statusItem.icon} alt="" className="w-14 h-14" />
									</Badge>
								</div>
								<div className="ml-5">{statusItem.name}</div>
							</div>
						))}
					</div>
					<div className="mt-10">
						<div className="w-full bg-primary p-5 border rounded">
							<div className="w-full flex items-center font-semibold text-lg">
								<p style={{width: '10%'}} className="flex justify-center">
									Id
								</p>
								<p style={{width: '10%'}} className="flex justify-center">
									Order Time
								</p>
								<p style={{width: '40%'}} className="flex justify-center">
									Product
								</p>
								<p style={{width: '10%'}} className="flex justify-center">
									Price
								</p>
								<p style={{width: '20%'}} className="flex justify-center">
									Status
								</p>
							</div>
						</div>
						<div className="w-full">
							{filteredData.map((gr, i) => (
								<div key={i} className="border mb-5 p-5 rounded">
									{gr.items.map((item, j) => (
										<div key={j}>
											<div className="w-full flex items-center text-lg">
												<p
													style={{width: '10%'}}
													className="flex justify-center"
												>
													{item.id}
												</p>
												<p
													style={{width: '10%'}}
													className="flex justify-center"
												>
													{item.id}
												</p>
												<p style={{width: '40%'}} className="flex my-2">
													{item.name}
												</p>
												<p
													style={{width: '10%'}}
													className="flex justify-center my-2"
												>
													{item.unitPrice.toLocaleString()} ₫
												</p>
												<p
													style={{width: '20%'}}
													className="flex justify-center"
												>
													{gr.status}
												</p>
											</div>
											<Divider />
										</div>
									))}
									<Space
										wrap
										className="flex justify-end items-center text-lg font-semibold"
									>
										{gr.status === 'Completed' ? (
											<>
												<Button danger>Yêu Cầu Trả Hàng</Button>
											</>
										) : (
											<>
												<Button danger>Hủy Đơn</Button>
												<Button>Liên Hệ Shop</Button>
												<Button disabled>Đã Nhận Hàng</Button>
											</>
										)}

										<div className="flex items-center">
											<p>Tổng giá:</p>
											<p className="ml-3">
												{detailGroups.total_price.toLocaleString()} ₫
											</p>
										</div>
									</Space>
								</div>
							))}
						</div>
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
