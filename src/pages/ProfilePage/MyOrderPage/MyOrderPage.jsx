import React, {useEffect, useState} from 'react';
import {Button, Table, Tag, Tooltip} from 'antd';
import {Helmet} from 'react-helmet';
import NavbarProfile from '../../../components/NavbarProfile';
import {OrderDetailModal} from './OrderDetailModal';
import {OrderInvoiceModal} from './OrderInvoiceModal';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllOrderSelector} from '../../../redux/selectors';
import {getUserOrder, getUserOrderTransaction} from '../../../redux/slices/orderSlice';
import {convertToVietnamDate, formatPrice} from '../../../utils/index';
import {ContainerOutlined, EyeFilled, TransactionOutlined} from '@ant-design/icons';

const MyOrderPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const orderList = useSelector(GetAllOrderSelector);

	const [dataSource, setDataSource] = useState([]);
	const [openDetail, setOpenDetail] = useState(false);
	const [openInvoice, setOpenInvoice] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	console.log(orderList);
	console.log('dataSource', dataSource);

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
					{record?.paymentStatus === 5 ? (
						<Tooltip title={'Thanh Toán'}>
							<Button
								type="text"
								className="p-2 bg-primary border rounded-lg  transition-colors duration-300"
								onClick={() => toggleTransactionModal(record.orderId)}
							>
								<TransactionOutlined />
							</Button>
						</Tooltip>
					) : (
						<Tooltip title={'Hóa Đơn'}>
							<Button
								type="text"
								className="p-2 bg-primary border rounded-lg  transition-colors duration-300"
								onClick={toggleInvoiceModal}
							>
								<ContainerOutlined />
							</Button>
						</Tooltip>
					)}
				</>
			),
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

	// Hàm mở/đóng modal chi tiết đơn hàng
	const toggleDetailModal = (order) => {
		console.log(order);

		setSelectedOrder(order);
		setOpenDetail(!openDetail);
	};

	// Hàm mở/đóng modal hoá đơn đơn hàng
	const toggleInvoiceModal = () => {
		setOpenInvoice(!openInvoice);
	};

	const toggleTransactionModal = (id) => {
		dispatch(getUserOrderTransaction(id)).then((res) => {
			if (res.payload) {
				window.open(res.payload?.PaymentUrl, '_blank');
			}
		});
	};

	useEffect(() => {
		dispatch(getUserOrder());
	}, [dispatch]);

	useEffect(() => {
		if (orderList) {
			const formattedOrders = orderList?.Values?.map((order) => ({
				orderId: order.Id,
				orderTime: convertToVietnamDate(order.CreatedDate),
				price: formatPrice(order.TotalPrice),
				status: getOrderStatus(order.Status),
				paymentStatus: order.PaymentStatus,
				products: order.Items.map((item) => ({
					productId: item.Id,
					productName: item.Name,
					productPrice: item.Price,
				})), // Mỗi sản phẩm trong đơn hàng
			}));
			setDataSource(formattedOrders); // Cập nhật dataSource cho bảng
		}
	}, [orderList]);

	// Hàm chuyển đổi status sang chuỗi dễ đọc
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

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				<div className="mr-20">
					<NavbarProfile />
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
