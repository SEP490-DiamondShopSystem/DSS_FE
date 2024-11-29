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
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status) => {
				console.log('status', status);

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
					{/* {record.status === 'Chờ Xử Lý' && record.paymentMethodId === '2' && (
						<Tooltip title={'Thanh Toán'}>
							<Button
								type="text"
								className="p-2 bg-primary border rounded-lg  transition-colors duration-300"
								onClick={() => toggleTransactionModal(record.orderId)}
							>
								<TransactionOutlined />
							</Button>
						</Tooltip>
					)} */}
				</>
			),
		},
	];

	const toggleDetailModal = (order) => {
		setSelectedOrder(order);
		setOpenDetail(!openDetail);
	};

	const toggleInvoiceModal = () => {
		setOpenInvoice(!openInvoice);
	};

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

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
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
