import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';

export const OrderStatus = ({orderStatus, orderDetail}) => {
	const [currentStep, setCurrentStep] = useState(0);

	const stage = orderDetail?.Stage;
	const order = orderDetail?.Order;

	// useEffect(() => {
	// 	// Kiểm tra nếu dữ liệu chưa sẵn sàng
	// 	if (!orderDetail || !orderStatus) return;

	// 	// Lấy danh sách diamond từ orderDetail
	// 	const haveDiamond = orderDetail.DiamondRequests?.map((diamond) => ({
	// 		diamondId: diamond.DiamondId,
	// 	}));

	// }, [orderStatus, orderDetail]);

	console.log('currentStep', currentStep);

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
					return 'Khách Hủy Hàng';

				default:
					return 'Unknown';
			}
		};

		const statusToStep = {
			'Chờ Shop Xác Nhận': 0,
			'Đã Có Giá': 1,
			'Khách Đang Gửi Yêu Cầu': 2,
			'Shop Đã Đồng Ý': 3,
			'Shop Từ Chối': 4,
			'Khách Từ Chối': 5,
			'Khách Hủy Hàng': 6,
		};

		const statusName = getOrderStatus(orderStatus);

		setCurrentStep(statusToStep[statusName] ?? 0);
	}, [orderStatus]);

	const steps = [
		// Step 0: Pending
		{
			title:
				currentStep === 0 && orderStatus === 1
					? 'Chờ Xác Nhận'
					: stage === 2
					? 'Đã Bị Từ Chối'
					: stage === 1
					? 'Đã Hủy'
					: 'Đã Xác Nhận',
			description:
				currentStep === 0 && orderStatus === 1
					? 'Yêu cầu thiết kế đang chờ xác nhận từ shop.'
					: stage === 2
					? `Yêu cầu thiết kế đã bị từ chối. `
					: stage === 1
					? `Yêu cầu thiết kế đã bị hủy.`
					: 'Yêu cầu thiết kế đã xác nhận.',
		},
		// Step 1: Priced
		{
			title: [2, 3, 4].includes(currentStep)
				? 'Đã Có Giá'
				: stage === 4
				? 'Đã Hủy'
				: stage === 5
				? 'Đã Từ Chối'
				: 'Đã Có Giá',
			description: [2, 3, 4].includes(currentStep)
				? 'Yêu cầu thiết kế đã có giá trang sức.'
				: stage === 4
				? 'Đơn thiết kế đã bị hủy.'
				: stage === 5
				? `Yêu cầu thiết kế đã bị từ chối.`
				: 'Yêu cầu thiết kế đã có giá trang sức.',
		},
		// Step 2:Requesting
		{
			title: [2, 3, 4].includes(currentStep)
				? 'Đang Gửi Yêu Cầu'
				: stage === 9
				? 'Đã Từ Chối'
				: stage === 8
				? 'Đã Hủy'
				: 'Xác Nhận Yêu Cầu',
			description: [2, 3, 4].includes(currentStep)
				? 'Khách hàng đang gửi yêu cầu xác nhận thiết kế.'
				: stage === 8
				? 'Khách hàng đã hủy yêu cầu thiết kế'
				: stage === 9
				? `Yêu cầu thiết kế đã bị từ chối.`
				: 'Cửa hàng đã chấp nhận yêu cầu thiết kế.',
		},
		// Step 4: Accepted
		{
			title:
				stage === 11 ? 'Đã Hủy' : order !== null ? 'Đã Tạo Đơn Hàng' : 'Tạo Đơn Đặt Hàng',
			description:
				stage === 11
					? 'Đơn thiết kế đã bị hủy.'
					: order !== null
					? 'Đơn thiết kế đã được đặt hàng.'
					: 'Yêu cầu thiết kế đã được cửa hàng chấp nhận. Tiến hành tạo đơn!',
		},
	];

	// Cập nhật trạng thái dựa trên currentStep
	if (currentStep === 0) {
		steps[0].status = 'process';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 1) {
		steps[0].status = 'finish';
		steps[1].status = 'process';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 2) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'process';
		steps[3].status = 'wait';
	} else if (currentStep === 3 && order === null) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'process';
	} else if (currentStep === 3) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'finish';
	} else if (currentStep === 4) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'process';
		steps[3].status = 'wait';
	} else if (currentStep === 5 && stage === 2) {
		steps[0].status = 'error';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 5 && stage === 5) {
		steps[0].status = 'finish';
		steps[1].status = 'error';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 5 && stage === 4) {
		steps[0].status = 'finish';
		steps[1].status = 'error';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 5 && stage === 9) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'error';
		steps[3].status = 'wait';
	} else if (currentStep === 6 && stage === 1) {
		steps[0].status = 'error';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 6 && stage === 8) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'error';
		steps[3].status = 'wait';
	} else if (currentStep === 6 && stage === 11) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
	}

	return (
		<div>
			<div className="flex justify-center items-center space-x-4 my-10">
				<Steps labelPlacement="vertical" current={currentStep} items={steps} />
			</div>
		</div>
	);
};
