import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';

export const OrderStatus = ({orderStatus, orderDetail}) => {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const haveDiamond = orderDetail?.DiamondRequests?.map((diamond) => ({
			diamondId: diamond.DiamondId,
		}));

		if (haveDiamond?.some((diamond) => diamond.diamondId === null)) {
			setCurrentStep(5); // Nếu có diamondId === null, chuyển currentStep thành 5
		} else if (haveDiamond?.every((diamond) => diamond.diamondId !== null)) {
			setCurrentStep(7); // Nếu tất cả diamondId !== null, chuyển currentStep thành 7
		}

		console.log('haveDiamond', haveDiamond);
	}, [orderDetail]);

	useEffect(() => {
		const getOrderStatus = (status) => {
			switch (status) {
				case 1:
					return 'Chờ Shop Xác Nhận';
				case 2:
					return 'Đã Có Giá';
				case 3:
					return 'Khách Đang Gửi Yêu Cầu';
				case 4:
					return 'Shop Đã Đồng Ý';
				case 5:
					return 'Shop Từ Chối';
				case 6:
					return 'Khách Từ Chối';
				case 7:
					return 'Shop Từ Chối';
				case 8:
					return 'Khách Từ Chối';

				default:
					return 'Unknown';
			}
		};

		const statusToStep = {
			'Chờ Shop Xác Nhận': 0,
			'Đã Có Giá': 1,
			'Khách Đang Gửi Yêu Cầu': 2,
			'Shop Đã Đồng Ý': 3,
			'Shop Đồng Ý': 4,
			'Shop Từ Chối': 5,
			'Khách Từ Chối': 6,
		};

		const statusName = getOrderStatus(orderStatus);

		setCurrentStep(statusToStep[statusName] ?? 0);
	}, [orderStatus]);

	const steps = [
		// Step 0: Chờ Shop Xác Nhận
		{
			title:
				currentStep === 0
					? 'Chờ Xác Nhận'
					: orderStatus === 5
					? 'Đã Bị Từ Chối'
					: orderStatus === 6
					? 'Đã Hủy'
					: 'Đã Xác Nhận',
			description:
				currentStep === 0 && orderStatus === 1
					? 'Yêu cầu thiết kế đang chờ xác nhận từ shop.'
					: orderStatus === 5
					? `Yêu cầu thiết kế đã bị từ chối. `
					: orderStatus === 6
					? `Yêu cầu thiết kế đã bị hủy.`
					: 'Yêu cầu thiết kế đã xác nhận.',
		},
		// Step 1: Chuẩn Bị Hàng
		{
			title: [2, 3, 4].includes(currentStep) ? 'Chưa Có Giá' : 'Đã Có Giá ',
			description: [2, 3, 4].includes(currentStep)
				? 'Yêu cầu thiết kế chưa được thiết lập giá.'
				: 'Yêu cầu thiết kế đã có thiết lập giá.',
		},
		// Step 2: Đang Vận Chuyển
		{
			title: [2, 3, 4].includes(currentStep) ? 'Đã Chấp Nhận Giá' : 'Chưa Xác Nhận',
			description: [2, 3, 4].includes(currentStep)
				? 'Khách hàng đã chấp nhận giá yêu cầu thiết kế.'
				: 'Đang chờ khách chấp nhận giá yêu cầu thiết kế.',
		},
		// Step 4: Hoàn Thành
		{
			title: 'Tạo Đơn Đặt Hàng',
			description: 'Yêu cầu thiết kế đã được shop chấp nhận. Tiến hàng tạo đơn!',
		},
	];
	console.log('orderStatus', orderStatus);
	console.log('currentStep', currentStep);
	console.log('orderDetail', orderDetail);

	// Cập nhật trạng thái dựa trên currentStep
	if (currentStep === 0) {
		steps[0].status = orderStatus === 5 ? 'error' : 'process';

		steps[1].status = 'wait'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
	} else if (currentStep === 1) {
		steps[0].status = 'finish'; //Đã Từ Chối
		steps[1].status = 'process'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
	} else if (currentStep === 2) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'process'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
	} else if (currentStep === 3) {
		steps[0].status = 'finish'; //Đã Hủy
		steps[1].status = 'finish'; // Chờ Xử Lí
		steps[2].status = 'finish'; // Đang Vận Chuyển
		steps[3].status = 'finish'; // Giao Hàng
	} else if (currentStep === 4) {
		steps[0].status = 'finish'; // Đã Hủy hoặc Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Hủy hoặc Đã Xử Lí
		steps[2].status = 'process'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
	} else if (currentStep === 5) {
		steps[0].status = 'error'; // Đã Xác Nhận
		steps[1].status = 'wait'; // Đã Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
	} else if (currentStep === 6) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'finish'; // Đã Vận Chuyển
		steps[3].status = 'error'; // Giao Hàng Thất Bại
	} else if (currentStep === 7) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'finish'; // Đã Xử Lí
		steps[2].status = 'error'; // Đã Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng Thất Bại
	}

	return (
		<div>
			<div className="flex justify-center items-center space-x-4 my-10">
				<Steps labelPlacement="vertical" current={currentStep} items={steps} />
			</div>
		</div>
	);
};
