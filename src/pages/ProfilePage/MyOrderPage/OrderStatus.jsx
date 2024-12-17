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
					? 'Chờ Xác Nhận'
					: orderStatus === 3 && indexRejected === 1
					? 'Đã Bị Từ Chối'
					: orderStatus === 4 && indexCancelled === 1
					? 'Đã Hủy'
					: 'Đã Xác Nhận',
			description:
				currentStep === 0
					? 'Đơn hàng đang chờ xác nhận từ cửa hàng.'
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
					? 'Đang Xử Lí Đơn Hàng'
					: orderStatus === 3 && indexRejected === 2
					? 'Đã Bị Từ Chối'
					: orderStatus === 4 && indexCancelled === 2
					? 'Đã Hủy'
					: 'Đã Xử Lí Đơn Hàng',
			description:
				currentStep === 1
					? 'Cửa hàng đang xử lí đơn hàng thành công.'
					: orderStatus === 3 && indexRejected === 2
					? `Đơn hàng đã bị từ chối. Lý Do: ${order?.CancelledReason}`
					: orderStatus === 4 && indexCancelled === 2
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: 'Cửa hàng đã xử lí đơn hàng thành công.',
		},
		// Step 2: Đã Chuẩn Bị
		{
			title:
				currentStep === 2 && orderStatus === 5
					? 'Đã Chuẩn Bị'
					: orderStatus === 4 && indexCancelled === 3
					? 'Đã Hủy'
					: indexRejected === 8 || indexRejected === 7
					? 'Đã Bị Từ Chối'
					: 'Đã Chuẩn Bị',
			description:
				currentStep === 2 && orderStatus === 5
					? 'Đơn hàng đã được chuẩn bị, đang chờ nhân viên giao hàng vận chuyển.'
					: orderStatus === 4 && indexCancelled === 3
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: indexRejected === 8 || indexRejected === 7
					? `Đơn hàng đã bị từ chối. Lý Do: ${order?.CancelledReason}`
					: 'Đơn hàng đã được chuẩn bị',
		},
		// Step 3: Giao Hàng
		{
			title:
				currentStep === 6 && orderStatus === 7
					? 'Giao hàng Thất Bại'
					: currentStep === 5
					? 'Đang Vận Chuyển'
					: indexCancelled === 13 || indexCancelled === 5
					? 'Đã Hủy'
					: indexRejected === 20 || indexRejected === 5 || indexRejected === 3
					? 'Đã Từ Chối'
					: 'Đã Nhận Hàng',
			description:
				currentStep === 6 && orderStatus === 7
					? 'Giao đơn hàng thất bại.'
					: currentStep === 5
					? 'Đơn hàng đang vận chuyển.'
					: indexCancelled === 13 || indexCancelled === 5
					? `Đơn hàng đã bị hủy. Lý Do: ${order?.CancelledReason}`
					: indexRejected === 20 || indexRejected === 5 || indexRejected === 3
					? `Đơn hàng đã bị từ chối. Lý Do: ${order?.CancelledReason}`
					: 'Đơn hàng đã hoàn thành.',
		},
		// Step 4: Hoàn Thành
		// {
		// 	title: 'Hoàn Thành',
		// 	description: 'Đơn hàng đã hoàn thành.',
		// },
	];

	if (currentStep === 0) {
		steps[0].status = 'process';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 1) {
		steps[0].status = 'finish';
		steps[1].status = 'process';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 1) {
		steps[0].status = 'error';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 2) {
		steps[0].status = 'finish';
		steps[1].status = 'error';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 2) {
		steps[0].status = 'finish';
		steps[1].status = 'error';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 3) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 8) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'error';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 2 && orderStatus === 3 && indexRejected === 7) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'error';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 1) {
		steps[0].status = 'error';
		steps[1].status = 'wait';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 2) {
		steps[0].status = 'finish';
		steps[1].status = 'error';
		steps[2].status = 'wait';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 3) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'error';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 5) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && orderStatus === 4 && indexCancelled === 13) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && indexRejected === 20) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 3 && indexRejected === 5) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 4) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'process';
		steps[3].status = 'wait';
		// steps[4].status = 'wait';
	} else if (currentStep === 5) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'process';
		// steps[4].status = 'wait';
	} else if (currentStep === 6 && orderStatus === 7) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'error';
		// steps[4].status = 'wait';
	} else if (currentStep === 7) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'finish';
		// steps[4].status = 'finish';
	} else if (currentStep === 8) {
		steps[0].status = 'finish';
		steps[1].status = 'finish';
		steps[2].status = 'finish';
		steps[3].status = 'finish';
		// steps[4].status = 'finish';
	}

	return (
		<div>
			<div className="flex justify-center items-center space-x-4 my-10">
				<Steps labelPlacement="vertical" current={currentStep} items={steps} />
			</div>
		</div>
	);
};
