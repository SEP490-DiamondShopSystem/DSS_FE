import React, {useEffect, useState} from 'react';
import {Button, Divider, Image, Steps} from 'antd';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserOrderDetail} from '../../../redux/slices/orderSlice';
import {GetAllOrderDetailSelector} from '../../../redux/selectors';
import {convertToVietnamDate, formatPrice} from '../../../utils';

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetAllOrderDetailSelector);

	const [showMore, setShowMore] = useState(false);
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

	console.log('orderStatus', orderStatus);
	console.log('order', order);
	console.log('currentStep', currentStep);

	useEffect(() => {
		const getOrderStatus = (status) => {
			switch (status) {
				case 1:
					return 'Chờ Shop Xác Nhận';
				case 2:
					return 'Shop Chấp Nhận';
				case 3:
					return 'Rejected';
				case 4:
					return 'Cancelled';
				case 5:
					return 'Chuẩn Bị Hàng';
				case 6:
					return 'Vận Chuyển';
				case 7:
					return 'Delivery_Failed';
				case 8:
					return 'Nhận Hàng';
				case 9:
					return 'Refused';
				default:
					return 'Unknown';
			}
		};

		// Map trạng thái đến bước tương ứng
		const statusToStep = {
			'Chờ Shop Xác Nhận': 0,
			'Shop Chấp Nhận': 1,
			'Chuẩn Bị Hàng': 2,
			'Vận Chuyển': 3,
			'Nhận Hàng': 4,
			Rejected: 5,
			Cancelled: 6,
			Delivery_Failed: 7,
			Refused: 8,
		};

		// Lấy tên trạng thái từ orderStatus và map đến currentStep
		const statusName = getOrderStatus(orderStatus);
		setCurrentStep(statusToStep[statusName] ?? 0);
	}, [orderStatus]);

	const steps = [
		{title: 'Chờ Shop Xác Nhận', description: 'Đơn hàng đang chờ xác nhận từ shop.'},
		{title: 'Chuẩn Bị Hàng', description: 'Shop đang chuẩn bị hàng cho đơn hàng.'},
		{title: 'Đang Vận Chuyển', description: 'Đơn hàng đang được vận chuyển.'},
		{title: 'Nhận Hàng', description: 'Đơn hàng đang chờ nhận hàng.'},
		{title: 'Hoàn Thành', description: 'Đơn hàng đã hoàn thành.'},
	];

	const handleShowMore = () => setShowMore(!showMore);

	const getFilteredSteps = () => {
		const reversedSteps = [...steps].reverse(); // Đảo ngược thứ tự bước để hiển thị từ mới nhất
		const filteredSteps = reversedSteps.filter(
			(step) => step.status === 'finish' || step.status === 'process'
		);

		if (showMore) {
			return filteredSteps;
		}

		// Nếu `showMore` là `false`, lọc và lấy 2 bước `finish` gần `process` nhất và 1 bước `process`
		const processStepIndex = filteredSteps.findIndex((step) => step.status === 'process');
		if (processStepIndex !== -1) {
			const startIndex = Math.max(processStepIndex - 2, 0); // Bắt đầu từ 2 bước `finish` trước `process`
			return filteredSteps.slice(startIndex, processStepIndex + 1);
		}

		// Nếu không có `process`, lấy 3 bước `finish` đầu tiên
		return filteredSteps.slice(0, 3);
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
						<p>0912345678</p>

						<div className="flex justify-center items-center space-x-4 my-10">
							<Steps labelPlacement="vertical" current={currentStep} items={steps} />
						</div>

						{/* <div className="mt-8">
							<Steps
								progressDot
								direction="vertical"
								current={currentStep}
								items={getFilteredSteps()}
							/>
							<button
								className="mt-4 text-primary underline cursor-pointer"
								onClick={handleShowMore}
							>
								{showMore ? 'Show Less' : 'Show More'}
							</button>
						</div> */}
					</div>

					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
						<Button type="text" className="bg-red text-white">
							Yêu cầu trả lại
						</Button>
					</div>

					<div className="mt-10">
						<div className="w-full bg-primary p-5 border rounded">
							<div className="w-full flex items-center font-semibold text-lg">
								<p
									style={{width: '20%'}}
									className="flex justify-center text-center"
								>
									Thời gian đặt hàng
								</p>
								<p style={{width: '40%'}} className="flex justify-center">
									Sản phẩm
								</p>
								<p style={{width: '10%'}} className="flex justify-center">
									Giá
								</p>
							</div>
						</div>
						<div className="w-full border">
							{order?.Items?.map((item, i) => (
								<div key={i} className="p-5 rounded">
									<div className="w-full flex items-center text-lg">
										<p style={{width: '20%'}} className="flex justify-center">
											{convertToVietnamDate(order?.CreatedDate)}
										</p>
										<p style={{width: '40%'}} className="flex justify-center">
											{item?.Jewelry?.Model?.name || 'Unknown Jewelry'}
										</p>
										<p style={{width: '10%'}} className="flex justify-center">
											{formatPrice(item?.PurchasedPrice)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="justify-end items-center flex mt-10">
						<p className="font-semibold text-lg mr-10">Tổng cộng:</p>
						<p className="text-2xl font-semibold text-red-600">
							{formatPrice(order?.TotalPrice)}
						</p>
					</div>
				</div>
			)}
		</>
	);
};
