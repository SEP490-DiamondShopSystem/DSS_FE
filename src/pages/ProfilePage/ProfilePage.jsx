import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Badge, Button, Divider, Space} from 'antd';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';
import LogoutModal from '../../components/LogModal/LogoutModal';
import NavbarProfile from '../../components/NavbarProfile';
import {removeLocalStorage} from '../../utils/localstorage';

const detailGroups = {
	total_price: 20138000,
	groups: [
		{
			jewelry_price: 10069000,
			status: 'Completed',
			items: [
				{
					id: 86,
					name: 'Round Diamond 3.5 Carat IF',
					unitPrice: 3357000,
					orderTime: '26/09/2024',
				},
				{
					id: 87,
					name: 'Round Diamond 3.5 Carat VVS1',
					unitPrice: 4467000,
					orderTime: '26/09/2024',
				},
				{
					id: 88,
					name: 'Petite Solitaire Engagement Ring In 14k White Gold',
					unitPrice: 2245000,
					orderTime: '26/09/2024',
				},
			],
		},
		{
			jewelry_price: 10069000,
			status: 'Waiting for manufacture',
			items: [
				{
					id: 89,
					name: 'Round Diamond 3.5 Carat IF',
					unitPrice: 3357000,
					orderTime: '26/09/2024',
				},
				{
					id: 90,
					name: 'Round Diamond 3.5 Carat VVS1',
					unitPrice: 4467000,
					orderTime: '26/09/2024',
				},
				{
					id: 91,
					name: 'Petite Solitaire Engagement Ring In 14k White Gold',
					unitPrice: 2245000,
					orderTime: '26/09/2024',
				},
			],
		},
	],
};

const ProfilePage = () => {
	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [status, setStatus] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);
	const [visibleGroups, setVisibleGroups] = useState([]);
	const [filteredData, setFilteredData] = useState(detailGroups.groups); // Added filteredData state
	const navigate = useNavigate();
	const observer = useRef();

	const orderStatus = [
		{icon: '', name: 'Tổng đơn hàng', status: 'All', order: 1},
		{icon: '', name: 'Đơn hàng đang chờ xử lý', status: 'Waiting for manufacture', order: 3},
		{icon: '', name: 'Đơn hàng đang xử lý', status: 'Processing', order: 4},
		{icon: '', name: 'Hoàn tất đơn hàng', status: 'Completed', order: 10},
	];

	const showLogoutModal = () => setIsLogoutModalVisible(true);
	const hideLogoutModal = () => setIsLogoutModalVisible(false);

	const handleLogout = () => {
		removeLocalStorage('user');
		hideLogoutModal();
		navigate('/');
	};

	// Handle status change
	const handleStatusClick = (newStatus) => {
		setStatus(newStatus);
		setCurrentPage(1);
	};

	// Filter data when status or itemsPerPage change
	useEffect(() => {
		const newFilteredData =
			status === 'All'
				? detailGroups.groups
				: detailGroups.groups.filter((order) => order.status === status);
		setFilteredData(newFilteredData);
		setVisibleGroups(newFilteredData.slice(0, itemsPerPage)); // Reset visibleGroups when filter changes
	}, [status, itemsPerPage]);

	// Handle infinite scrolling
	const lastElementRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && currentPage * itemsPerPage < filteredData.length) {
					setCurrentPage((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[currentPage, filteredData.length, itemsPerPage]
	);

	// Update visible groups based on current page and filtered data
	useEffect(() => {
		if (status !== 'All') {
			setVisibleGroups(filteredData.slice(0, currentPage * itemsPerPage));
		}
	}, [currentPage, filteredData, status, itemsPerPage]);

	return (
		<div>
			<Helmet>
				<title>Hồ Sơ Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>

				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl">Chào mừng Khách hàng</h1>
						<Button danger onClick={showLogoutModal}>
							Đăng xuất
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
								<p
									style={{width: '20%'}}
									className="flex justify-center text-center"
								>
									Thời gian đặt hàng
								</p>
								<p style={{width: '40%'}} className="flex justify-center">
									Sản phẩm
								</p>
								<p style={{width: '10%'}} className="flex justify-center">
									Giá
								</p>
								<p style={{width: '20%'}} className="flex justify-center">
									Trạng thái
								</p>
							</div>
						</div>
						<div className="w-full">
							{visibleGroups.length === 0 ? (
								<div className="text-center text-lg font-semibold mt-10">
									Không có hàng
								</div>
							) : (
								visibleGroups.map((gr, i) => (
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
														style={{width: '20%'}}
														className="flex justify-center"
													>
														{item.orderTime}
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
										<div className="flex items-center justify-end">
											<p className="font-semibold">Giá trang sức</p>
											<p className="text-2xl font-semibold text-red-600 ml-5">
												{gr.jewelry_price.toLocaleString()} ₫
											</p>
										</div>
									</div>
								))
							)}
							{visibleGroups.length < filteredData.length && (
								<div ref={lastElementRef} className="text-center mt-5">
									<p>Đang tải thêm dữ liệu...</p>
								</div>
							)}
						</div>
						{status === 'All' && (
							<div className="text-end bg-primary p-5 rounded-lg">
								<p className="text-2xl font-semibold text-red-600">
									Tổng giá: {detailGroups.total_price.toLocaleString()} ₫
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<LogoutModal
				isVisible={isLogoutModalVisible}
				onCancel={hideLogoutModal}
				onLogout={handleLogout}
			/>
		</div>
	);
};

export default ProfilePage;
