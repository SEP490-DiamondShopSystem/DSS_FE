import React, {useEffect, useState} from 'react';

import {StarOutlined} from '@ant-design/icons';
import {Button, Form, Image, Input, message, Modal, Rate, Table, Upload} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';
import {GetAllOrderDetailSelector} from '../../../redux/selectors';
import {getUserOrderDetail, handleOrderCancel} from '../../../redux/slices/orderSlice';
import {handleReviewOrder} from '../../../redux/slices/reviewSlice';
import {convertToVietnamDate, formatPrice} from '../../../utils';
import {OrderStatus} from './OrderStatus';

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetAllOrderDetailSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
	const [order, setOrder] = useState(null);
	const [rating, setRating] = useState(0);
	const [fileList, setFileList] = useState([]);
	const [jewelryId, setJewelryId] = useState(null);
	const orderStatus = order?.Status;

	const columns = [
		{
			title: 'Ngày Đặt Hàng',
			dataIndex: 'orderDate',
			key: 'orderDate',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		{
			title: 'Tên Sản Phẩm',
			dataIndex: 'productName',
			key: 'productName',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (text) => <div className="flex justify-center">{text}</div>,
		},
		...(orderStatus === 8
			? [
					{
						title: 'Đánh Giá',
						dataIndex: 'jewelryId',
						key: 'jewelryId',
						render: (_, record) => {
							if (record.jewelryId) {
								return (
									<div className="flex justify-center">
										<Button
											type="primary"
											icon={<StarOutlined />}
											onClick={() => handleReviewRequest(record.jewelryId)}
										>
											Đánh Giá
										</Button>
									</div>
								);
							}

							return null;
						},
					},
			  ]
			: []),
	];

	useEffect(() => {
		if (selectedOrder?.orderId) {
			dispatch(getUserOrderDetail(selectedOrder.orderId));
		}
	}, [selectedOrder, dispatch]);

	useEffect(() => {
		if (orderDetail) {
			setOrder(orderDetail);
		}
	}, [orderDetail]);

	const handleCancelOrder = () => {
		setIsCancelModalVisible(true);
	};

	const handleReviewRequest = (id) => {
		setJewelryId(id);
		setIsReviewModalVisible(true);
	};

	const data = order?.Items?.map((item, i) => ({
		key: i,
		orderDate: convertToVietnamDate(order?.CreatedDate),
		productName: item?.Diamond?.Title || item?.Jewelry?.SerialCode || 'Unknown Jewelry',
		price: formatPrice(item?.PurchasedPrice),
		jewelryId: item?.JewelryId,
	}));

	const submitCancelOrder = async (values) => {
		const res = await dispatch(handleOrderCancel({orderId: order.Id, reason: values.reason}));
		if (res.payload !== undefined) {
			message.success('Hủy đơn thành công!');
		} else {
			message.error('Lỗi hệ thống!');
		}
		setIsCancelModalVisible(false);
	};

	const submitReviewRequest = (values) => {
		console.log('values', values);
		const {Content, StarRating} = values;

		dispatch(
			handleReviewOrder({
				Content,
				Files: fileList[0].originFileObj,
				StarRating,
				JewelryId: jewelryId,
			})
		).then((res) => {
			if (res.payload !== undefined) {
				message.success('Đánh giá thành công!');
				setIsReviewModalVisible(false);
			} else {
				message.error('Bạn đã đánh giá!');
			}
		});
	};

	const handleFileChange = ({fileList}) => {
		setFileList(fileList);
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};

	console.log('orderDetail', order);
	console.log('orderStatus', orderStatus);

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
					style={{width: 1200, maxHeight: '80vh', overflowY: 'auto'}}
				>
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
							<p>Hóa đơn: #{order?.OrderCode}</p>
							<p>Ngày: {convertToVietnamDate(order?.CreatedDate)}</p>
						</div>
					</div>

					<div className="mt-5">
						<h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
						<p>{order?.ShippingAddress}</p>
					</div>
					<OrderStatus orderStatus={orderStatus} orderDetail={orderDetail} />
					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
						{orderStatus === 1 ||
							orderStatus === 2 ||
							(orderStatus === 5 && (
								<Button
									type="text"
									className="bg-red text-white"
									onClick={handleCancelOrder}
								>
									Hủy Đơn
								</Button>
							))}
					</div>
					<div className="mt-10">
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							bordered
							size="middle"
						/>
					</div>
					<div className="justify-end items-center flex mt-10">
						<p className="font-semibold text-lg mr-10">Tổng cộng:</p>
						<p className="text-2xl font-semibold text-red-600">
							{formatPrice(order?.TotalPrice)}
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
								rules={[{required: true, message: 'Vui lòng nhập lý do hủy đơn'}]}
							>
								<Input.TextArea />
							</Form.Item>
							<div className="flex items-center justify-center">
								<Button type="text" className="bg-primary" htmlType="submit">
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
								rules={[{required: true, message: 'Vui lòng đánh giá sản phẩm'}]}
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
								rules={[{required: true, message: 'Vui lòng nhập ý kiến đánh giá'}]}
							>
								<Input.TextArea />
							</Form.Item>
							<div className="flex items-center justify-center">
								<Button type="text" className="bg-primary" htmlType="submit">
									Gửi đánh giá
								</Button>
							</div>
						</Form>
					</Modal>
				</div>
			)}
		</>
	);
};
