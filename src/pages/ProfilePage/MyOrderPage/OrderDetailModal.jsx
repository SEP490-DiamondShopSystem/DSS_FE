import React, {useEffect, useState} from 'react';

import {DeleteOutlined, FileTextOutlined, StarOutlined} from '@ant-design/icons';
import {
	Button,
	Form,
	Image,
	Input,
	message,
	Modal,
	Rate,
	Table,
	Tooltip,
	Typography,
	Upload,
} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/logo-short-ex.png';
import Loading from '../../../components/Loading';
import {
	GetAllOrderDetailSelector,
	GetOrderInvoiceSelector,
	GetOrderLogsSelector,
	GetStatusOrderSelector,
	LoadingOrderSelector,
	ReviewSelector,
} from '../../../redux/selectors';
import {
	getOrderFiles,
	getOrderLog,
	getUserOrderDetail,
	handleOrderCancel,
} from '../../../redux/slices/orderSlice';
import {deleteReviewAction, handleReviewOrder} from '../../../redux/slices/reviewSlice';
import {formatPrice, getOrderItemStatusTag} from '../../../utils';
import {OrderStatus} from './OrderStatus';
import {TransactionDetails} from './TransactionList';
import {OrderLog} from './OrderLog';
import {OrderPayment} from './OrderPayment';

const {Text, Title} = Typography;

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const loading = useSelector(LoadingOrderSelector);
	const reviewDetail = useSelector(ReviewSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [order, setOrder] = useState(null);
	const [rating, setRating] = useState(0);
	const [fileList, setFileList] = useState([]);
	const [jewelryId, setJewelryId] = useState(null);
	const [transaction, setTransaction] = useState();
	const [orderLog, setOrderLog] = useState();
	const [reviewContent, setReviewContent] = useState(null);
	const [imageFiles, setImageFiles] = useState([]);
	const [orderInvoice, setOrderInvoice] = useState();
	const [statusOrder, setStatusOrder] = useState();

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
		Review: item?.Jewelry?.Review,
		itemStatus: item?.Status,
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
			title: 'Sản Phẩm',
			dataIndex: 'productName',
			key: 'productName',
			align: 'center',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		{
			title: 'Giá Sản Phẩm',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			render: (_, record) => (
				<div className="flex flex-col items-center">
					<div>{record.price}</div>
				</div>
			),
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'itemStatus',
			key: 'itemStatus',
			align: 'center',
			render: (_, record) => (
				<div className="flex flex-col items-center">
					<div>{getOrderItemStatusTag(record.itemStatus)}</div>
				</div>
			),
		},

		...(order?.Status === 8 &&
		order.Items?.some((item) => item.Jewelry && item.Jewelry.Review === null)
			? [
					{
						title: 'Đánh Giá',
						dataIndex: 'jewelryId',
						key: 'jewelryId',
						align: 'center',
						render: (_, record) => {
							const jewelryId = record?.jewelryId;

							// Kiểm tra xem jewelry có tồn tại và có dữ liệu không

							return (
								<div className="flex justify-center">
									<Tooltip title="Đánh giá">
										<Button
											type="primary"
											icon={<StarOutlined />}
											onClick={() => handleReviewRequest(jewelryId)} // Gọi hàm review request
										></Button>
									</Tooltip>
								</div>
							);
						},
					},
			  ]
			: order?.Status === 8 && order?.Items?.some((item) => item.Jewelry !== null) // Nếu Jewelry tồn tại
			? [
					{
						title: 'Đánh Giá',
						dataIndex: 'jewelryId',
						key: 'jewelryId',
						align: 'center',
						render: (_, record) => {
							const review = record?.Review;
							console.log('record', record);

							return (
								<div className="flex justify-center">
									<Tooltip title="Xem lại đánh giá">
										<Button
											type="primary"
											icon={<StarOutlined />}
											onClick={() => showModal(review)} // Mở modal với review
										></Button>
									</Tooltip>
								</div>
							);
						},
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

			if (order?.Status === 8) {
				dispatch(getOrderFiles(selectedOrder.orderId))
					.unwrap()
					.then((res) => {
						setOrderInvoice(res);
					})
					.catch((error) => {
						// message.error(error.title || error.data.title);
					});
			}

			dispatch(getUserOrderDetail(selectedOrder.orderId))
				.unwrap()
				.then((res) => {
					setOrder(res);
					setTransaction(res?.Transactions);
					setOrderLog(res?.Logs);
					setStatusOrder(res?.Status);
				})
				.catch((error) => {
					message.error(error.title || error.data.title);
				});
		}
	}, [selectedOrder, dispatch, statusOrder, reviewDetail]);

	const showModal = (review) => {
		setReviewContent(review);
		setIsModalVisible(true);
		setRating(review ? review.rating : 0);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleDeleteReview = () => {
		console.log('reviewContent', reviewContent);

		if (reviewContent) {
			dispatch(deleteReviewAction(reviewContent.Id))
				.unwrap()
				.then((res) => {
					setReviewContent(null);
					setRating(0);
					message.success('Đánh giá đã được xóa');
					setIsModalVisible(false);
				})
				.catch((error) => {
					message.error(error?.title || error?.data?.title);
				});
		}
	};

	const handleCancelOrder = () => {
		setIsCancelModalVisible(true);
	};

	const handleReviewRequest = (id) => {
		console.log('jewelryId', id);

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
				Files: imageFiles,
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

	console.log('reviewContent', reviewContent);

	return (
		<>
			{openDetail && (
				<div
					onClick={toggleDetailModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openDetail && (
				<div className="fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out z-50 translate-x-1/2 -translate-y-1/2 p-10 w-[95%] max-h-[80vh] overflow-y-auto">
					{loading ? (
						<Loading />
					) : (
						<>
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
								<div className="text-center sm:text-left">
									<Image
										src={logo}
										alt="Logo"
										preview={false}
										className="max-h-10 max-w-10 mb-2 mx-auto sm:mx-0"
									/>
									<p className="text-sm">Thủ Đức, TP.Hồ Chí Minh, VietNam</p>
								</div>
								<div className="text-center sm:text-right">
									<h2 className="uppercase text-xl sm:text-2xl font-semibold">
										Trạng thái đơn hàng
									</h2>
									<p className="text-sm sm:text-base">
										Mã đơn hàng: #{order?.OrderCode}
									</p>
									<p className="text-sm sm:text-base">
										Ngày: {order?.CreatedDate}
									</p>
								</div>
							</div>

							<div className="mt-5">
								<h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
								<p>{order?.ShippingAddress}</p>
							</div>
							<OrderStatus orderStatus={statusOrder} order={order} />
							<div className="w-full flex flex-col sm:flex-row gap-4">
								<div className="w-full sm:w-2/3">
									{order?.Status === 1 ? (
										<OrderPayment order={order} />
									) : (
										<TransactionDetails transactions={transaction} />
									)}
								</div>
								<div className="w-full sm:w-1/3">
									<OrderLog orderLogs={orderLog} />
								</div>
							</div>

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
											multiple
											listType="picture"
											fileList={fileList}
											onChange={handleFileChange}
											beforeUpload={(file) => {
												setImageFiles((fileList) => [...fileList, file]);
												return false;
											}}
											maxCount={3}
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
			<Modal
				title="Thông tin Đánh Giá"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button
						key="delete"
						type="danger"
						icon={<DeleteOutlined />}
						onClick={handleDeleteReview}
					>
						Xóa Đánh Giá
					</Button>,
					<Button key="cancel" onClick={handleCancel}>
						Đóng
					</Button>,
				]}
			>
				<div>
					{reviewContent ? (
						<div className="flex flex-col">
							<p>{reviewContent.Content}</p> {/* Hiển thị nội dung review nếu có */}
							<Rate value={reviewContent?.StarRating} disabled />
							{reviewContent?.Medias?.map((item) => (
								<Image src={item.MediaPath} width={200} />
							))}
						</div>
					) : (
						<p>Không có đánh giá nào</p>
					)}
				</div>
			</Modal>
		</>
	);
};
