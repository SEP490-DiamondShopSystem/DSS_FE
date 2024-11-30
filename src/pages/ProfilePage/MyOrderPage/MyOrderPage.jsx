import {
	CheckCircleOutlined,
	DeliveredProcedureOutlined,
	EyeFilled,
	HourglassOutlined,
	OrderedListOutlined,
	TransactionOutlined,
} from '@ant-design/icons';
import {Button, message, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {GetAllOrderSelector, LoadingOrderSelector} from '../../../redux/selectors';
import {getUserOrder, getUserOrderTransaction} from '../../../redux/slices/orderSlice';
import {
	convertToVietnamDate,
	formatPrice,
	getOrderPaymentStatus,
	getOrderStatus,
} from '../../../utils/index';
import {OrderDetailModal} from './OrderDetailModal';
import {OrderInvoiceModal} from './OrderInvoiceModal';

const orderStatus = [
	{icon: <OrderedListOutlined />, name: 'Tổng đơn hàng', status: '', order: 1},
	{icon: <HourglassOutlined />, name: 'Chờ xử lí', status: '1', order: 3},
	{icon: <DeliveredProcedureOutlined />, name: 'Đang vận chuyển', status: '6', order: 4},
	{icon: <CheckCircleOutlined />, name: 'Đã giao', status: '8', order: 10},
];

const MyOrderPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loading = useSelector(LoadingOrderSelector);

	const [isLgScreen, setIsLgScreen] = useState(window.innerWidth < 768);
	const [dataSource, setDataSource] = useState([]);
	const [openDetail, setOpenDetail] = useState(false);
	const [openInvoice, setOpenInvoice] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [status, setStatus] = useState('');
	const [orderList, setOrderList] = useState();

	const columns = [
		{
			title: 'Mã đặt hàng',
			dataIndex: 'orderCode',
			align: 'center',
			responsive: ['md'],
		},
		{
			title: 'Thời gian đặt hàng',
			dataIndex: 'orderTime',
			align: 'center',
		},
		{
			title: 'Tổng Giá',
			dataIndex: 'price',
			align: 'center',
		},
		{
			title: 'PT Thanh Toán',
			dataIndex: 'paymentMethodName',
			align: 'center',
			responsive: ['md'],
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status) => {
				let color = 'red';
				switch (status) {
					case 'Thành Công':
						color = 'green';
						break;
					case 'Chờ Xử Lý':
						color = 'orange';
						break;
					case 'Đang Xử Lý':
						color = 'blue';
						break;
					case 'Đang Giao Hàng':
						color = 'cyan';
						break;
					case 'Đã Chuẩn Bị':
						color = 'purple';
						break;
					case 'Hủy Đơn':
					case 'Từ Chối':
					case 'Refused':
						color = 'red';
						break;
					case 'Giao Hàng Thất Bại':
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
		{
			dataIndex: 'action',
			render: (_, record) => (
				<>
					<Tooltip title={'Chi Tiết'}>
						<Button
							type="text"
							className="p-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 mr-2"
							onClick={() => toggleDetailModal(record)}
						>
							<EyeFilled />
						</Button>
					</Tooltip>
				</>
			),
		},
	];

	useEffect(() => {
		const handleResize = () => {
			// Debounce logic để giảm tần suất cập nhật trạng thái
			clearTimeout(window.resizeTimeout);
			window.resizeTimeout = setTimeout(() => {
				setIsLgScreen(window.innerWidth < 768);
			}, 200);
		};

		// Lắng nghe sự kiện thay đổi kích thước màn hình
		window.addEventListener('resize', handleResize);
		return () => {
			// Xóa sự kiện khi component bị unmount
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		dispatch(
			getUserOrder({
				pageSize: pageSize,
				start: currentPage,
				Status: status,
			})
		)
			.unwrap()
			.then((res) => {
				setOrderList(res);
				console.log('res', res);
			});
	}, [pageSize, currentPage, status]);

	useEffect(() => {
		if (orderList && orderList?.Values) {
			const formattedOrders = orderList?.Values?.map((order) => ({
				orderId: order?.Id,
				orderCode: order?.OrderCode,
				paymentMethodId: order?.PaymentMethodId,
				paymentMethodName: order?.PaymentMethod?.MappedName,
				orderTime: order.CreatedDate,
				price: formatPrice(order.TotalPrice),
				status: getOrderStatus(order.Status),
				paymentStatus: getOrderPaymentStatus(order.PaymentStatus),
				products: order.Items.map((item) => ({
					productId: item.Id,
					productName: item.Name,
					productPrice: item.Price,
				})),
			}));
			setDataSource(formattedOrders);
		}
	}, [orderList]);

	const handleStatusClick = (newStatus) => {
		setStatus(newStatus);
		setCurrentPage(1);
	};
	const toggleDetailModal = (order) => {
		setSelectedOrder(order);
		setOpenDetail(!openDetail);
	};

	const toggleInvoiceModal = () => {
		setOpenInvoice(!openInvoice);
	};

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
			{isLgScreen && <div>Đơn hàng của tôi</div>}
			<div className="flex flex-wrap items-center font-medium justify-center sm:justify-between mt-10 gap-5">
				{orderStatus.map((statusItem) => (
					<div
						key={statusItem.status}
						className={`flex flex-col sm:flex-row items-center justify-center sm:justify-around shadow-xl py-2 sm:py-3 px-4 sm:px-12 border-gray-300 hover:border-black w-full sm:w-auto ${
							status === statusItem.status ? 'bg-primary' : 'bg-white'
						} rounded-lg cursor-pointer border ${
							status === statusItem.status ? 'border-black' : 'border-white'
						} hover:border-black`}
						onClick={() => handleStatusClick(statusItem.status)}
					>
						<div className="p-3 w-16 sm:w-20 text-center">{statusItem.icon}</div>
						<div className="mt-2 sm:mt-0 sm:ml-5 text-sm sm:text-base text-center">
							{statusItem.name}
						</div>
					</div>
				))}
			</div>

			<div className="font-semibold w-full py-10 bg-white rounded-lg">
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={{
						current: currentPage,
						total: orderList?.TotalPage * pageSize,
						pageSize: pageSize,
						onChange: (page) => setCurrentPage(page),
						// showSizeChanger: true,
						onShowSizeChange: (current, size) => setPageSize(size),
					}}
					className="custom-table-header"
					rowKey="orderId"
					loading={loading}
				/>
			</div>

			<OrderDetailModal
				toggleDetailModal={toggleDetailModal}
				openDetail={openDetail}
				selectedOrder={selectedOrder}
			/>

			<OrderInvoiceModal toggleInvoiceModal={toggleInvoiceModal} openInvoice={openInvoice} />
		</div>
	);
};

export default MyOrderPage;
