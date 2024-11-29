import React, {useEffect, useState} from 'react';
import {Steps} from 'antd';
import {GetOrderLogsSelector} from '../../../redux/selectors';
import {useSelector} from 'react-redux';

export const OrderStatus = ({orderStatus, order}) => {
	const orderLogList = useSelector(GetOrderLogsSelector);

	const [currentStep, setCurrentStep] = useState(0);
	const [orderLogs, setOrderLogs] = useState();
	const [indexCancelled, setIndexCancelled] = useState(0);
	const [indexRejected, setIndexRejected] = useState(0);

	console.log('indexCancelled', indexCancelled);
	console.log('indexRejected', indexRejected);
	console.log('orderLogs', orderLogs);
	console.log('currentStep', currentStep);

	useEffect(() => {
		if (orderLogList) {
			setOrderLogs(orderLogList);
		}
	}, [orderLogList]);

	useEffect(() => {
		if (orderLogs) {
			const index = orderLogs?.findIndex((log) => log?.Status === 4);
			const indexReject = orderLogs?.findIndex((log) => log?.Status === 3);
			// const indexFail = orderLogs?.findIndex((log) => log?.Status === 7);
			setIndexCancelled(index);
			setIndexRejected(indexReject);
		}
	}, [orderLogList, orderLogs, order]);

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
					: orderStatus === 3 && indexRejected === 1
					? 'Đã Bị Từ Chối'
					: orderStatus === 4 && indexCancelled === 1
					? 'Đã Hủy'
					: 'Đã Xác Nhận',
			description:
				currentStep === 0
					? 'Đơn hàng đang chờ xác nhận từ shop.'
					: orderStatus === 3 && indexRejected === 1
					? `Đơn hàng đã bị từ chối. Lý Do: ${order?.CancelledReason}`
					: orderStatus === 4 && indexCancelled === 1
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: 'Đơn hàng đã xác nhận.',
		},
		// Step 1: Chuẩn Bị Hàng
		{
			title:
				currentStep === 1
					? 'Đang Chuẩn Bị Đơn Hàng'
					: orderStatus === 3 && indexRejected === 1
					? 'Đã Bị Từ Chối'
					: orderStatus === 4 && indexCancelled === 2
					? 'Đã Hủy'
					: 'Đã Chuẩn Bị Đơn Hàng',
			description:
				currentStep === 1
					? 'Shop đang chuẩn bị hàng cho đơn hàng.'
					: orderStatus === 3 && indexRejected === 2
					? `Đơn hàng đã bị từ chối. Lý Do: ${order?.CancelledReason}`
					: orderStatus === 4 && indexCancelled === 2
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: 'Shop đã chuẩn bị hàng cho đơn hàng.',
		},
		// Step 2: Đang Vận Chuyển
		{
			title:
				currentStep === 2
					? 'Đang Vận Chuyển'
					: orderStatus === 4 && indexCancelled === 3
					? 'Đã Hủy'
					: 'Đã Vận Chuyển',
			description:
				currentStep === 2
					? 'Đơn hàng đang được vận chuyển.'
					: orderStatus === 4 && indexCancelled === 3
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: 'Đã Vận Chuyển',
		},
		// Step 3: Giao Hàng
		{
			title:
				currentStep === 6 && orderStatus === 7
					? 'Giao hàng Thất Bại'
					: currentStep === 7
					? 'Đang Giao Hàng'
					: orderStatus === 4 && indexCancelled === 14
					? 'Đã Hủy'
					: 'Đã Nhận Hàng',
			description:
				currentStep === 6 && orderStatus === 7
					? 'Giao đơn hàng thất bại.'
					: currentStep === 7
					? 'Đơn hàng đang được giao.'
					: orderStatus === 4 && indexCancelled === 14
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: 'Đơn hàng đã hoàn thành.',
		},
		// Step 4: Hoàn Thành
		{
			title: 'Hoàn Thành',
			description: 'Đơn hàng đã hoàn thành.',
		},
	];

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
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 1) {
		steps[0].status = 'error'; // Đã Xác Nhận
		steps[1].status = 'wait'; // Đã Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 2) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'error'; // Đã Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 2) {
		steps[0].status = 'finish'; // Đã Xác Nhận
		steps[1].status = 'error'; // Đã Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 1) {
		steps[0].status = 'error'; //Đã Hủy
		steps[1].status = 'wait'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 2) {
		steps[0].status = 'finish'; //Đã Hủy
		steps[1].status = 'error'; // Chờ Xử Lí
		steps[2].status = 'wait'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 3) {
		steps[0].status = 'finish'; //Đã Hủy
		steps[1].status = 'finish'; // Chờ Xử Lí
		steps[2].status = 'error'; // Đang Vận Chuyển
		steps[3].status = 'wait'; // Giao Hàng
		steps[4].status = 'wait'; // Hoàn Thành
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 14) {
		steps[0].status = 'finish'; //Đã Hủy
		steps[1].status = 'finish'; // Chờ Xử Lí
		steps[2].status = 'finish'; // Đang Vận Chuyển
		steps[3].status = 'error'; // Giao Hàng
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
	} else if (currentStep === 6 && orderStatus === 7) {
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
