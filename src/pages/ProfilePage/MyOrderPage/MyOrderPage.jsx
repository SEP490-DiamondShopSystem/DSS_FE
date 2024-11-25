import {EyeFilled, TransactionOutlined} from '@ant-design/icons';
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

const MyOrderPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const orderList = useSelector(GetAllOrderSelector);
	const loading = useSelector(LoadingOrderSelector);

	const [dataSource, setDataSource] = useState([]);
	const [openDetail, setOpenDetail] = useState(false);
	const [openInvoice, setOpenInvoice] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

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
					{record.status === 'Pending' && record.paymentMethodId === '2' && (
						<Tooltip title={'Thanh Toán'}>
							<Button
								type="text"
								className="p-2 bg-primary border rounded-lg  transition-colors duration-300"
								onClick={() => toggleTransactionModal(record.orderId)}
							>
								<TransactionOutlined />
							</Button>
						</Tooltip>
					)}
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

	const toggleTransactionModal = (id) => {
		dispatch(getUserOrderTransaction(id))
			.unwrap()
			.then((res) => {
				window.open(res?.PaymentUrl, '_blank');
			})
			.catch((error) => {
				message.error(error?.data?.title || error?.title);
			});
	};

	useEffect(() => {
		dispatch(
			getUserOrder({
				pageSize: pageSize,
				start: currentPage,
			})
		);
	}, [pageSize, currentPage]);

	useEffect(() => {
		if (orderList && orderList?.Values) {
			const formattedOrders = orderList?.Values?.map((order) => ({
				orderId: order?.Id,
				orderCode: order?.OrderCode,
				paymentMethodId: order?.PaymentMethod?.Id,
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

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>

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
