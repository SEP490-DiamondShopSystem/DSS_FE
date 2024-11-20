import {EyeFilled, TransactionOutlined} from '@ant-design/icons';
import {Button, Table, Tag, Tooltip} from 'antd';
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
	const [pageSize, setPageSize] = useState(100);

	console.log('orderList', orderList);
	// console.log('dataSource', dataSource);

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
			// align: 'center',
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
		dispatch(getUserOrderTransaction(id)).then((res) => {
			if (res.payload !== undefined) {
				window.open(res.payload?.PaymentUrl, '_blank');
			}
		});
	};

	useEffect(() => {
		dispatch(
			getUserOrder({
				pageSize: pageSize,
				start: currentPage,
				// Status: status,
			})
		);
		// dispatch(getAllOrder());
	}, [pageSize, currentPage]);

	useEffect(() => {
		if (orderList && orderList?.Values) {
			const formattedOrders = orderList?.Values?.map((order) => ({
				orderId: order.Id,
				orderCode: order.OrderCode,
				paymentMethodId: order.PaymentMethod?.Id,
				orderTime: order.CreatedDate,
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

	const isPriceGreaterThan50Mil = (price) => {
		// Loại bỏ ký tự không phải số và dấu thập phân
		const numericPrice = parseFloat(price.replace(/\D/g, ''));

		// So sánh giá trị đã chuyển đổi với 50,000,000
		return numericPrice > 50000000;
	};

	console.log('dataSource', dataSource);

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>

			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{pageSize: 5}}
				className="custom-table-header"
				rowKey="orderId"
				// expandedRowRender={expandedRowRender}
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
