import React, {useEffect, useState} from 'react';
import {Steps} from 'antd';

export const OrderStatus = ({orderStatus, orderDetail}) => {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const getOrderStatus = (status) => {
			switch (status) {
				case 1:
					return 'Chờ Shop Xác Nhận';
				case 2:
					return 'Đang Xử Lí';
				case 3:
					return 'Từ Chối';
				case 4:
					return 'Hủy Bỏ';
				case 5:
					return 'Chuẩn Bị Hàng';
				case 6:
					return 'Đang Vận Chuyển';
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
			'Đang Xử Lí': 1,
			'Từ Chối': 2,
			'Hủy Bỏ': 3,
			'Chuẩn Bị Hàng': 4,
			'Đang Vận Chuyển': 5,
			'Giao Hàng Thất Bại': 6,
			'Nhận Hàng': 7,
			'Hoàn Trả': 8,
		};

		const statusName = getOrderStatus(orderStatus);
		setCurrentStep(statusToStep[statusName] ?? 0);
	}, [orderStatus]);

	const steps = [
		// Step 0: Chờ Shop Xác Nhận
		{
			title:
				currentStep === 0
					? 'Chờ Shop Xác Nhận'
					: orderStatus === 3
					? 'Đã Bị Từ Chối'
					: orderStatus === 4
					? 'Đã Hủy'
					: 'Đã Xác Nhận',
			description:
				currentStep === 0
					? 'Đơn hàng đang chờ xác nhận từ shop.'
					: orderStatus === 3
					? `Đơn hàng đã bị từ chối. Lý Do: ${orderDetail?.CancelledReason}`
					: orderStatus === 4
					? `Đơn hàng đã bị hủy. Lý Do: ${orderDetail?.CancelledReason}`
					: 'Đơn hàng đã xác nhận.',
		},
		// Step 1: Chuẩn Bị Hàng
		{
			title: currentStep === 4 ? 'Đang Chuẩn Bị Đơn Hàng' : 'Đã Chuẩn Bị Đơn Hàng',
			description:
				currentStep === 4
					? 'Shop đang chuẩn bị hàng cho đơn hàng.'
					: 'Shop đã chuẩn bị hàng cho đơn hàng.',
		},
		// Step 2: Đang Vận Chuyển
		{
			title: currentStep === 5 ? 'Đang Vận Chuyển' : 'Đã Vận Chuyển',
			description: 'Đơn hàng đang được vận chuyển.',
		},
		// Step 3: Giao Hàng
		{
			title:
				currentStep === 6
					? 'Giao hàng Thất Bại'
					: currentStep === 7
					? 'Đang Giao Hàng'
					: 'Đã Nhận Hàng',
			description:
				currentStep === 6
					? 'Giao đơn hàng thất bại.'
					: currentStep === 7
					? 'Đơn hàng đang được giao.'
					: 'Đơn hàng đã hoàn thành.',
		},
		// Step 4: Hoàn Thành
		{
			title: 'Hoàn Thành',
			description: 'Đơn hàng đã hoàn thành.',
		},
	];
	console.log('orderStatus', orderStatus);
	console.log('currentStep', currentStep);

	// Cập nhật trạng thái dựa trên currentStep
	if (currentStep === 0) {
		steps[0].status = 'process'; // Chờ Shop Xác Nhận
		steps[1].status = 'wait'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 1) {
		steps[0].status = 'finish'; //Đã Từ Chối
		steps[1].status = 'process'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 2) {
		steps[0].status = 'error'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'process'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 3) {
		steps[0].status = 'error'; //Đã Hủy
		steps[1].status = 'wait'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 4) {
		steps[0].status = 'finish'; // Đã Hủy hoặc Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Hủy hoặc Đã Xử Lí
		steps[2].status = 'process'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 5) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'finish'; // Đang Vận Chuyển
		steps[3].status = 'process'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 6) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'finish'; // Đã Vận Chuyển
		steps[3].status = 'error'; // Giao Hàng Thất Bại
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 7) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'finish'; // Đã Vận Chuyển
		steps[3].status = 'finish'; // Giao Hàng
		steps[4].status = 'finish'; // Hoàn Thành
	} else if (currentStep === 8) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'finish'; // Đã Vận Chuyển
		steps[3].status = 'finish'; // Đã Nhận Hàng
		steps[4].status = 'finish'; // Hoàn Thành
	}

	return (
		<div>
			<div className="flex justify-center items-center space-x-4 my-10">
				<Steps labelPlacement="vertical" current={currentStep} items={steps} />
			</div>
		</div>
	);
};