import {Button, Form, Image, Input, message, Modal, Steps} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';
import {GetAllOrderDetailSelector} from '../../../redux/selectors';
import {getUserOrderDetail, handleOrderCancel} from '../../../redux/slices/orderSlice';
import {convertToVietnamDate, formatPrice} from '../../../utils';

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetAllOrderDetailSelector);
	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [order, setOrder] = useState(null);

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

	const orderStatus = order?.Status;

	useEffect(() => {
		const getOrderStatus = (status) => {
			switch (status) {
				case 1:
					return 'Chờ Shop Xác Nhận';
				case 2:
					return 'Shop Chấp Nhận';
				case 3:
					return 'Từ Chối';
				case 4:
					return 'Hủy Bỏ';
				case 5:
					return 'Chuẩn Bị Hàng';
				case 6:
					return 'Vận Chuyển';
				case 7:
					return 'Giao Hàng Thất Bại';
				case 8:
					return 'Nhận Hàng';
				case 9:
					return 'Hoàn Trả';
				default:
					return 'Unknown';
			}
		};

		const statusToStep = {
			'Chờ Shop Xác Nhận': 0,
			'Shop Chấp Nhận': 1,
			'Chuẩn Bị Hàng': 2,
			'Vận Chuyển': 3,
			'Nhận Hàng': 4,
			'Từ Chối': 5,
			'Hủy Hàng': 6,
			'Giao Hàng Thất Bại': 7,
			'Hoàn Trả': 8,
		};

		const statusName = getOrderStatus(orderStatus);
		setCurrentStep(statusToStep[statusName] ?? 0);
	}, [orderStatus]);

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

	const steps = [
		// Step 0: Chờ Shop Xác Nhận
		{
			title: orderStatus === 3 ? 'Đã Hủy' : 'Chờ Shop Xác Nhận',
			description:
				orderStatus === 3
					? 'Đơn hàng đã bị từ chối.'
					: 'Đơn hàng đang chờ xác nhận từ shop.',
			status:
				orderStatus === 3 || orderStatus === 4
					? 'error'
					: orderStatus >= 1
					? 'process'
					: 'wait',
		},
		// Step 1: Chuẩn Bị Hàng
		{
			title: 'Chuẩn Bị Hàng',
			description: 'Shop đang chuẩn bị hàng cho đơn hàng.',
			status:
				(orderStatus === 4 && orderStatus < 1) || orderStatus === 3 // Người dùng hủy hoặc bị từ chối
					? 'error'
					: orderStatus >= 2
					? 'process'
					: 'wait',
		},
		// Step 2: Đang Vận Chuyển
		{
			title: 'Đang Vận Chuyển',
			description: 'Đơn hàng đang được vận chuyển.',
			status:
				orderStatus === 3 || orderStatus === 4 // Nếu bị từ chối hoặc hủy bỏ
					? 'error'
					: orderStatus >= 3
					? 'process'
					: 'wait',
		},
		// Step 3: Giao Hàng
		{
			title: 'Giao Hàng',
			description: 'Đơn hàng đang được giao.',
			status:
				orderStatus === 3 || orderStatus === 4 // Nếu bị từ chối hoặc hủy bỏ
					? 'error'
					: orderStatus >= 4
					? 'process'
					: 'wait',
		},
		// Step 4: Giao Hàng Thất Bại hoặc Hoàn Thành
		{
			title: orderStatus === 7 ? 'Giao Hàng Thất Bại' : 'Hoàn Thành',
			description:
				orderStatus === 7
					? 'Đơn hàng không được vận chuyển thành công.'
					: 'Đơn hàng đã hoàn thành.',
			status:
				orderStatus === 7 // Trạng thái giao hàng thất bại
					? 'error'
					: orderStatus === 3 || orderStatus === 4 // Nếu bị từ chối hoặc hủy bỏ
					? 'error'
					: orderStatus === 5
					? 'finish'
					: 'process',
		},
	];

	// Cập nhật trạng thái cho các bước trước khi có trạng thái process
	for (let i = 0; i < steps.length; i++) {
		if (steps[i].status === 'process') {
			// Đặt tất cả các bước trước đó thành 'finish'
			for (let j = 0; j < i; j++) {
				steps[j].status = 'finish';
			}
			break; // Thoát vòng lặp khi đã cập nhật
		}
	}

	// Kiểm tra để dừng lại nếu có lỗi
	steps.forEach((step, index) => {
		if (
			(orderStatus === 3 && index > 0) || // Bị từ chối thì dừng lại
			(orderStatus === 4 && index > (orderStatus < 1 ? 0 : 1)) || // Hủy bỏ
			(orderStatus === 7 && index > 4)
		) {
			// Giao hàng thất bại
			step.status = 'wait';
		}
	});

	// Đảm bảo rằng nếu trạng thái Success thì chỉ có 'finish' và 'process'
	steps.forEach((step, index) => {
		if (orderStatus === 5) {
			// Giả định rằng orderStatus 5 là Success
			if (step.status === 'wait') {
				step.status = 'finish'; // Đặt thành finish cho Success
			}
		}
	});

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
						<div className="flex justify-center items-center space-x-4 my-10">
							<Steps labelPlacement="vertical" current={currentStep} items={steps} />
						</div>
					</div>

					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
						{orderStatus === 8 ? (
							<Button
								type="text"
								className="bg-red text-white"
								onClick={handleReturnRequest}
							>
								Yêu cầu trả lại
							</Button>
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
