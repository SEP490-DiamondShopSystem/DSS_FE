import {
	CheckCircleOutlined,
	DeliveredProcedureOutlined,
	HourglassOutlined,
	OrderedListOutlined,
} from '@ant-design/icons';
import {Table, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import NavbarProfile from '../../components/NavbarProfile';
import {GetAllOrderSelector, LoadingOrderSelector, UserInfoSelector} from '../../redux/selectors';
import {getUserOrder} from '../../redux/slices/orderSlice';
import {
	convertToVietnamDate,
	formatPrice,
	getOrderPaymentStatus,
	getOrderStatus,
} from '../../utils';

const ProfilePage = () => {
	const navigate = useNavigate();
	const observer = useRef();
	const dispatch = useDispatch();

	const orderList = useSelector(GetAllOrderSelector);
	const userDetail = useSelector(UserInfoSelector);
	const loading = useSelector(LoadingOrderSelector);
	// const refreshToken = localStorage.getItem('refreshToken');

	console.log('orderList', orderList);

	// const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [status, setStatus] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(100);
	const [orders, setOrders] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const orderStatus = [
		{icon: <OrderedListOutlined />, name: 'Tổng đơn hàng', status: '', order: 1},
		{icon: <HourglassOutlined />, name: 'Đang xử lí', status: '1', order: 3},
		{icon: <DeliveredProcedureOutlined />, name: 'Đang vận chuyển', status: '6', order: 4},
		{icon: <CheckCircleOutlined />, name: 'Đã giao', status: '8', order: 10},
	];

	console.log(userDetail);

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
			title: 'PT Thanh Toán',
			dataIndex: 'paymentStatus',
			render: (status) => {
				// Sửa '=' thành ':'
				let color = 'red';
				switch (status) {
					case 'Pending':
						color = 'orange';
						break;
					case 'Deposited':
						color = 'blue';
						break;
					case 'Paid All':
						color = 'cyan';
						break;

					case 'Refunding':
					case 'Refunded':
						color = 'red';
						break;

					default:
						color = 'grey';
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

	useEffect(() => {
		if (orderList && orderList?.Values) {
			const formattedOrders = orderList?.Values?.map((order) => ({
				orderId: order.Id,
				orderTime: convertToVietnamDate(order.CreatedDate),
				price: formatPrice(order.TotalPrice),
				status: getOrderStatus(order.Status),
				paymentStatus: getOrderPaymentStatus(order.PaymentStatus),
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
		dispatch(
			getUserOrder({
				pageSize: pageSize,
				start: currentPage,
				Status: status,
			})
		);
		// dispatch(getAllOrder());
	}, [pageSize, currentPage, status]);

	useEffect(() => {
		if (orderList) {
			setOrders(orderList);
		}
	}, [orderList]);

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

				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg shadow-lg">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl">Chào mừng {userDetail?.Name}</h1>
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
								<div className="p-3 w-20">{statusItem.icon}</div>
								<div className="ml-5">{statusItem.name}</div>
							</div>
						))}
					</div>
					<div className="font-semibold w-full py-10 bg-white rounded-lg">
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={{pageSize: 5}}
							className="custom-table-header"
							rowKey="orderId"
							// expandedRowRender={expandedRowRender}
							loading={loading}
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
