import React, {useEffect, useState} from 'react';

import {Button, Form, Image, Input, message, Modal, Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';
import {GetAllOrderDetailSelector} from '../../../redux/selectors';
import {getUserOrderDetail, handleOrderCancel} from '../../../redux/slices/orderSlice';
import {convertToVietnamDate, formatPrice} from '../../../utils';
import {OrderStatus} from './OrderStatus';

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetAllOrderDetailSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
	const [order, setOrder] = useState(null);

	console.log('selectedOrder', selectedOrder);
	console.log('orderDetail', orderDetail);

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

	const handleReturnRequest = () => {
		setIsReturnModalVisible(true);
	};

	const submitCancelOrder = async (values) => {
		const res = await dispatch(handleOrderCancel({orderId: order.Id, reason: values.reason}));
		console.log(res);
		if (res.payload?.status === 200) {
			message.success('Hủy đơn thành công!');
		} else if (res.payload?.status === 400) {
			message.error('Hủy đơn thấy bại!');
		} else if (res.payload === undefined) {
			message.error('Lỗi hệ thống!');
		}
		setIsCancelModalVisible(false);
	};

	const submitReturnRequest = (values) => {
		// dispatch(handleReturnRequest({orderId: order.Id, reason: values.reason}));
		setIsReturnModalVisible(false);
	};

	const orderStatus = order?.Status;

	// Cập nhật trạng thái cho các bước trước khi có trạng thái process

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
							<p>Hóa đơn ID: #{order?.Id}</p>
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
						{orderStatus === 8 ? (
							<Button
								type="text"
								className="bg-red text-white"
								onClick={handleReturnRequest}
							>
								Yêu cầu đổi hàng
							</Button>
						) : orderStatus === 3 || orderStatus === 4 || orderStatus === 7 ? (
							// Không hiển thị nút nào khi orderStatus là 3 hoặc 4
							<></>
						) : (
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
						<div className="w-full bg-primary p-5 border rounded">
							<div className="w-full flex items-center font-semibold text-lg">
								<p style={{width: '33%'}} className="flex justify-center">
									Ngày Đặt Hàng
								</p>
								<p style={{width: '33%'}} className="flex justify-center">
									Tên Sản Phẩm
								</p>
								<p style={{width: '33%'}} className="flex justify-center">
									Giá
								</p>
							</div>
						</div>
					</div>
					<div className="w-full border rounded">
						{order?.Items?.map((item, i) => (
							<div key={i} className="p-5 ">
								<div className="w-full flex items-center text-lg">
									<p style={{width: '33%'}} className="flex justify-center">
										{convertToVietnamDate(order?.CreatedDate)}
									</p>
									<p style={{width: '33%'}} className="flex justify-center">
										{item?.Jewelry?.Model?.name || 'Unknown Jewelry'}
									</p>
									<p style={{width: '33%'}} className="flex justify-center">
										{formatPrice(item?.PurchasedPrice)}
									</p>
								</div>
							</div>
						))}
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

					{/* Return Request Modal */}
					<Modal
						title="Yêu cầu trả lại"
						visible={isReturnModalVisible}
						onCancel={() => setIsReturnModalVisible(false)}
						footer={null}
					>
						<Form onFinish={submitReturnRequest}>
							<Form.Item
								label="Lý do trả lại"
								name="reason"
								rules={[{required: true, message: 'Vui lòng nhập lý do trả lại'}]}
							>
								<Input.TextArea />
							</Form.Item>
							<Button type="primary" htmlType="submit">
								Xác nhận yêu cầu
							</Button>
						</Form>
					</Modal>
				</div>
			)}
		</>
	);
};
