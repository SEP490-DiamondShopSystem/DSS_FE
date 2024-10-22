import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Badge, Button, Divider, message, Space, Table, Tag} from 'antd';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';
import LogoutModal from '../../components/LogModal/LogoutModal';
import NavbarProfile from '../../components/NavbarProfile';
import {removeLocalStorage} from '../../utils/localstorage';
import {useDispatch, useSelector} from 'react-redux';
import {handleRefreshToken, logout} from '../../redux/slices/userLoginSlice';
import * as jwtDecode from 'jwt-decode';
import {GetAllOrderSelector} from '../../redux/selectors';
import {getUserOrder} from '../../redux/slices/orderSlice';
import {convertToVietnamDate, formatPrice} from '../../utils';

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
	const navigate = useNavigate();
	const observer = useRef();
	const dispatch = useDispatch();

	const orderList = useSelector(GetAllOrderSelector);
	// const refreshToken = localStorage.getItem('refreshToken');

	console.log('orderList', orderList);

	// const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [status, setStatus] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);
	const [visibleGroups, setVisibleGroups] = useState([]);
	const [orders, setOrders] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [filteredData, setFilteredData] = useState(detailGroups.groups);
	const orderStatus = [
		{icon: '', name: 'Tổng đơn hàng', status: 'All', order: 1},
		{icon: '', name: 'Đơn hàng đang chờ xử lý', status: 'Waiting for manufacture', order: 3},
		{icon: '', name: 'Đơn hàng đang xử lý', status: 'Processing', order: 4},
		{icon: '', name: 'Hoàn tất đơn hàng', status: 'Completed', order: 10},
	];

	// const showLogoutModal = () => setIsLogoutModalVisible(true);
	// const hideLogoutModal = () => setIsLogoutModalVisible(false);

	// const refreshTokenClick = () => {
	// 	dispatch(handleRefreshToken(refreshToken)).then((res) => {
	// 		if (res.payload) {
	// 			localStorage.setItem('accessToken', res.payload.accessToken);
	// 			message.success('Làm mới thành công!');
	// 		}
	// 	});

	// 	navigate('/');
	// };

	const columns = [
		{
			title: 'ID',
			dataIndex: 'orderId',
			align: 'center',
		},
		{
			title: 'Thời gian đặt hàng',
			dataIndex: 'orderTime',
			align: 'center',
		},
		// {
		// 	title: () => <div className="text-center">Sản phẩm</div>,
		// 	dataIndex: 'product',
		// },
		{
			title: 'Tổng Giá',
			dataIndex: 'price',
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status) => {
				// Sửa '=' thành ':'
				let color = 'red';
				switch (status) {
					case 'Success':
						color = 'green';
						break;
					case 'Pending':
						color = 'orange';
						break;
					case 'Processing':
						color = 'blue';
						break;
					case 'Delivering':
						color = 'cyan';
						break;
					case 'Prepared':
						color = 'purple';
						break;
					case 'Cancelled':
					case 'Rejected':
					case 'Refused':
						color = 'red';
						break;
					case 'Delivery Failed':
						color = 'volcano';
						break;
					default:
						color = 'gray';
						break;
				}
				return (
					<div className="text-center">
						<Tag className="text-center" color={color}>
							{status.toUpperCase()}
						</Tag>
					</div>
				);
			},
			align: 'center',
		},
	];

	// Cột cho bảng mở rộng (sub-table)
	const expandedColumns = [
		{
			title: 'ID',
			dataIndex: 'productId',
			key: 'productId',
			align: 'center',
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			align: 'center',
		},
		{
			title: 'Giá',
			dataIndex: 'productPrice',
			key: 'productPrice',
			align: 'center',
		},
	];

	// Hàm render bảng mở rộng cho từng đơn hàng
	const expandedRowRender = (record) => {
		return (
			<Table
				columns={expandedColumns}
				dataSource={record.products}
				pagination={false}
				rowKey="productId"
			/>
		);
	};

	const getOrderStatus = (status) => {
		switch (status) {
			case 1:
				return 'Pending';
			case 2:
				return 'Processing';
			case 3:
				return 'Rejected';
			case 4:
				return 'Cancelled';
			case 5:
				return 'Prepared';
			case 6:
				return 'Delivering';
			case 7:
				return 'Delivery_Failed';
			case 8:
				return 'Success';
			case 9:
				return 'Refused';
			default:
				return 'Unknown';
		}
	};

	useEffect(() => {
		if (orderList) {
			const formattedOrders = orderList.map((order) => ({
				orderId: order.Id,
				orderTime: convertToVietnamDate(order.CreatedDate),
				price: formatPrice(order.TotalPrice),
				status: getOrderStatus(order.Status),
				products: order.Items.map((item) => ({
					productId: item.Id,
					productName: item.Name,
					productPrice: item.Price,
				})), // Mỗi sản phẩm trong đơn hàng
			}));
			setDataSource(formattedOrders); // Cập nhật dataSource cho bảng
		}
	}, [orderList]);

	useEffect(() => {
		dispatch(getUserOrder());
	}, []);

	useEffect(() => {
		if (orderList) {
			setOrders(orderList);
		}
	}, [orderList]);

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

	// Handle status change
	const handleStatusClick = (newStatus) => {
		setStatus(newStatus);
		setCurrentPage(1);
	};

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
						{/* <Button danger onClick={refreshTokenClick}>
							Xác thực lại
						</Button> */}
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
					<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg">
						<Table
							dataSource={dataSource} // Sử dụng dữ liệu thực từ API
							columns={columns}
							pagination={{pageSize: 5}}
							className="custom-table-header"
							rowKey="orderId"
							expandedRowRender={expandedRowRender} // Hiển thị sub-rows (bảng mở rộng)
						/>
					</div>
				</div>
			</div>
			{/* <LogoutModal
				isVisible={isLogoutModalVisible}
				onCancel={hideLogoutModal}
				onLogout={handleLogout}
			/> */}
		</div>
	);
};

export default ProfilePage;
