import React, {useEffect, useState} from 'react';

import {FileTextOutlined, StarOutlined} from '@ant-design/icons';
import {Button, Form, Image, Input, message, Modal, Rate, Table, Typography, Upload} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/logo-short-ex.png';
import Loading from '../../../components/Loading';
import {
	GetAllOrderDetailSelector,
	GetOrderInvoiceSelector,
	GetOrderLogsSelector,
	GetStatusOrderSelector,
	LoadingOrderSelector,
} from '../../../redux/selectors';
import {
	getOrderFiles,
	getOrderLog,
	getUserOrderDetail,
	handleOrderCancel,
} from '../../../redux/slices/orderSlice';
import {handleReviewOrder} from '../../../redux/slices/reviewSlice';
import {formatPrice} from '../../../utils';
import {OrderStatus} from './OrderStatus';
import {TransactionDetails} from './TransactionList';

const {Text, Title} = Typography;

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetAllOrderDetailSelector);
	const loading = useSelector(LoadingOrderSelector);
	const orderLogList = useSelector(GetOrderLogsSelector);
	const statusOrder = useSelector(GetStatusOrderSelector);
	const orderInvoice = useSelector(GetOrderInvoiceSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
	const [order, setOrder] = useState(null);
	const [rating, setRating] = useState(0);
	const [fileList, setFileList] = useState([]);
	const [jewelryId, setJewelryId] = useState(null);
	const [transaction, setTransaction] = useState();

	const data = order?.Items?.map((item, i) => ({
		key: i,
		orderDate: order?.CreatedDate || 'N/A',
		productName: item?.Diamond?.Title || item?.Jewelry?.SerialCode,
		price: formatPrice(item?.PurchasedPrice || 0),
		jewelryId: item?.JewelryId || null,
		diamondId: item?.DiamondId || null,
		orderId: order?.Id || null,
		orderCode: order?.OrderCode,
		paymentMethod: order?.PaymentMethod?.MappedName,
		shippingAddress: order?.ShippingAddress,
		status: order?.Status,
		shippingFee: formatPrice(order?.ShippingFee || 0),
		totalPrice: formatPrice(order?.TotalPrice || 0),
		totalRefund: formatPrice(order?.TotalRefund || 0),
		cancelledReason: order?.CancelledReason || null,
		cancelledDate: order?.CancelledDate || null,
		logs: order?.Logs || [],
		delivererId: order?.DelivererId || null,
		expectedDate: order?.ExpectedDate || null,
		UserRankAmountSaved: order?.UserRankAmountSaved,
	}));

	const columns = [
		{
			title: 'Ngày Đặt Hàng',
			dataIndex: 'orderDate',
			key: 'orderDate',
			align: 'center',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		{
			title: 'Tên Sản Phẩm',
			dataIndex: 'productName',
			key: 'productName',
			align: 'center',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		{
			title: 'Phí phát sinh',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			render: (_, record) => (
				<div className="flex flex-col items-center">
					<div>{record.price}</div>
					{/* <div>Phí giao hàng: {record.shippingFee}</div>
					{record?.UserRankAmountSaved !== 0 && (
						<div>Khách hàng thân thiết: -{formatPrice(record.UserRankAmountSaved)}</div>
					)} */}
				</div>
			),
		},

		...(statusOrder === 8 &&
		data?.some((record) =>
			data?.some(
				(record) => record?.Items && record?.Items?.every((item) => !item?.IsPreview)
			)
		)
			? [
					{
						title: 'Đánh Giá',
						dataIndex: 'jewelryId',
						key: 'jewelryId',
						align: 'center',
						render: (_, record) => (
							<div className="flex justify-center">
								<Button
									type="primary"
									icon={<StarOutlined />}
									onClick={() => handleReviewRequest(record.jewelryId)}
								>
									Đánh Giá
								</Button>
							</div>
						),
					},
			  ]
			: []),
		...(orderInvoice
			? [
					{
						title: 'Hóa Đơn',
						dataIndex: 'jewelryId',
						key: 'jewelryId',
						align: 'center',
						render: (_, record) => (
							<div className="flex justify-center">
								<Button
									type="text"
									icon={<FileTextOutlined />}
									onClick={handleInvoice}
								>
									Hóa Đơn
								</Button>
							</div>
						),
					},
			  ]
			: []),
	];

	useEffect(() => {
		if (selectedOrder?.orderId) {
			dispatch(getOrderLog(selectedOrder.orderId));
			dispatch(getOrderFiles(selectedOrder.orderId));
			dispatch(getUserOrderDetail(selectedOrder.orderId));
		}
	}, [selectedOrder, dispatch, statusOrder]);

	useEffect(() => {
		if (orderDetail) {
			setOrder(orderDetail);
			setTransaction(orderDetail?.Transactions);
		}
	}, [orderDetail]);

	const handleCancelOrder = () => {
		setIsCancelModalVisible(true);
	};

	const handleReviewRequest = (id) => {
		setJewelryId(id);
		setIsReviewModalVisible(true);
	};

	const submitCancelOrder = (values) => {
		dispatch(handleOrderCancel({orderId: order.Id, reason: values.reason}))
			.unwrap()
			.then(() => {
				message.success('Hủy đơn thành công!');
			})
			.catch((error) => {
				message.error(error?.data?.title || error?.detail);
			});
		setIsCancelModalVisible(false);
	};

	const submitReviewRequest = (values) => {
		console.log('values', values);
		const {Content, StarRating} = values;

		dispatch(
			handleReviewOrder({
				Content,
				Files: fileList[0]?.originFileObj,
				StarRating,
				JewelryId: jewelryId,
			})
		)
			.unwrap()
			.then(() => {
				message.success('Đánh giá thành công!');
				setIsReviewModalVisible(false);
			})
			.catch((error) => {
				message.error(
					error?.data?.errors?.Files[0] || error?.data?.title || 'Có lỗi xảy ra!'
				);
			});
	};

	const handleFileChange = ({fileList}) => {
		setFileList(fileList);
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};

	const handleInvoice = () => {
		if (orderInvoice) {
			window.open(`${orderInvoice?.MediaPath}`, '_blank');
		}
	};

	return (
		<>
			{openDetail && (
				<div
					onClick={toggleDetailModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openDetail && (
				<div
					className="fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out z-50 translate-x-1/2 -translate-y-1/2 p-10"
					style={{width: '95%', maxHeight: '80vh', overflowY: 'auto'}}
				>
					{loading ? (
						<Loading />
					) : (
						<>
							<div className="flex justify-between items-center">
								<div>
									<Image
										src={logo}
										alt="Logo"
										preview={false}
										className="max-h-10 max-w-10 mb-2"
									/>
									<p>Thủ Đức, TP.Hồ Chí Minh, VietNam</p>
								</div>
								<div className="text-end">
									<h2 className="uppercase text-2xl font-semibold">
										Trạng thái đơn hàng
									</h2>
									<p>Mã đơn hàng: #{order?.OrderCode}</p>
									<p>Ngày: {order?.CreatedDate}</p>
								</div>
							</div>
							<div className="mt-5">
								<h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
								<p>{order?.ShippingAddress}</p>
							</div>
							<OrderStatus orderStatus={statusOrder} orderDetail={order} />
							<TransactionDetails transactions={transaction} />
							<div className="flex justify-between">
								<Title level={3} className="text-xl font-semibold">
									Chi tiết đơn hàng
								</Title>
								{statusOrder === 1 && (
									<Button
										type="text"
										className="bg-red text-white"
										onClick={handleCancelOrder}
									>
										Hủy Đơn
									</Button>
								)}
								{statusOrder === 2 && (
									<Button
										type="text"
										className="bg-red text-white"
										onClick={handleCancelOrder}
									>
										Hủy Đơn
									</Button>
								)}
								{statusOrder === 5 && (
									<Button
										type="text"
										className="bg-red text-white"
										onClick={handleCancelOrder}
									>
										Hủy Đơn
									</Button>
								)}
							</div>
							<div className="mt-10">
								<Table
									columns={columns}
									dataSource={data}
									pagination={false}
									size="large"
									bordered
								/>
							</div>
							<div className="justify-end items-end flex flex-col mt-10">
								<div>Phí giao hàng: {formatPrice(order?.ShippingFee)}</div>
								{order?.UserRankAmountSaved !== 0 && (
									<div>
										Khách hàng thân thiết: -
										{formatPrice(order?.UserRankAmountSaved)}
									</div>
								)}
								<p className="font-semibold text-lg mt-2">
									Tổng cộng: {formatPrice(order?.TotalPrice)}
								</p>
							</div>
							{/* Cancel Order Modal */}
							<Modal
								title="Hủy Đơn"
								visible={isCancelModalVisible}
								onCancel={() => setIsCancelModalVisible(false)}
								footer={null}
							>
								<Form onFinish={submitCancelOrder}>
									<Form.Item
										label="Lý do hủy"
										name="reason"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập lý do hủy đơn',
											},
										]}
									>
										<Input.TextArea />
									</Form.Item>
									<div className="flex items-center justify-center">
										<Button
											type="text"
											className="bg-primary"
											htmlType="submit"
										>
											Xác nhận hủy
										</Button>
									</div>
								</Form>
							</Modal>
							{/* Review Modal */}
							<Modal
								title="Đánh giá"
								visible={isReviewModalVisible}
								onCancel={() => setIsReviewModalVisible(false)}
								footer={null}
							>
								<Form onFinish={submitReviewRequest}>
									<Form.Item
										label="Đánh giá sản phẩm"
										name="StarRating"
										rules={[
											{required: true, message: 'Vui lòng đánh giá sản phẩm'},
										]}
									>
										<Rate
											value={rating}
											onChange={handleRatingChange}
											style={{color: 'yellow'}}
										/>
									</Form.Item>
									<Form.Item label="Tải ảnh lên" name="Files">
										<Upload
											listType="picture"
											fileList={fileList}
											onChange={handleFileChange}
											beforeUpload={() => false}
											maxCount={1}
										>
											<Button>Chọn ảnh</Button>
										</Upload>
									</Form.Item>
									<Form.Item
										label="Ý kiến của bạn"
										name="Content"
										rules={[
											{
												required: true,
												message: 'Vui lòng nhập ý kiến đánh giá',
											},
										]}
									>
										<Input.TextArea />
									</Form.Item>
									<div className="flex items-center justify-center">
										<Button
											type="text"
											className="bg-primary"
											htmlType="submit"
										>
											Gửi đánh giá
										</Button>
									</div>
								</Form>
							</Modal>
						</>
					)}
				</div>
			)}
		</>
	);
};
