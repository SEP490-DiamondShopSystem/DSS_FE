import {Tag} from 'antd';
import React from 'react';

const InformationUser = ({order, transaction}) => {
	if (!order || !order.Account) {
		return <div>Không có thông tin khách hàng</div>;
	}

	const {
		Account: {FirstName, LastName, Email, TotalPoint, PhoneNumber},
		ExpectedDate,
		CancelledDate,
		CancelledReason,
		PaymentMethod,
		Status,
		PaymentStatus,
		PaymentType,
	} = order;

	const paymentStatusMap = {
		1: {label: 'Chờ xử lý', color: 'geekblue'},
		2: {label: 'Đã đặt cọc', color: 'blue'},
		3: {label: 'Đã trả hết', color: 'green'},
		4: {label: 'Chờ hoàn tiền', color: 'volcano'},
		5: {label: 'Đã hoàn tiền', color: 'magenta'},
		6: {label: 'Không hoàn tiền', color: 'red'},
	};
	const status = paymentStatusMap[PaymentStatus] || {};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md w-full  mt-7">
			<div className="mb-2">
				<strong>Họ và Tên:</strong> {FirstName} {LastName}
			</div>
			<div className="mb-2">
				<strong>Email:</strong> {Email}
			</div>
			<div className="mb-2">
				<strong>Số Điện Thoại:</strong> {PhoneNumber}
			</div>
			<div className="mb-2">
				<strong>Ngày Giao Hàng Dự Kiến:</strong> {ExpectedDate}
			</div>
			<div className="mb-2">
				<strong>Hình thức thanh toán:</strong>{' '}
				{PaymentType === 1 ? 'Trả hết' : 'Thanh toán khi nhận hàng (COD)'}
			</div>
			<div className="mb-2">
				<strong>Phương thức thanh toán:</strong>{' '}
				{PaymentMethod?.MappedName || 'Không có thông tin'}
			</div>
			<div className="mb-2">
				<strong>Trạng thái đơn hàng:</strong>{' '}
				<Tag color={status.color}>{status?.label?.toUpperCase() || 'Không xác định'}</Tag>
			</div>

			{Status === 3 && (
				<>
					<div className="mb-2">
						<strong>Ngày hủy:</strong> {CancelledDate}
					</div>
					<div className="mb-2">
						<strong>Lý do hủy:</strong> {CancelledReason}
					</div>
				</>
			)}
			{Status === 4 && (
				<>
					<div className="mb-2">
						<strong>Ngày hủy:</strong> {CancelledDate}
					</div>
					<div className="mb-2">
						<strong>Lý do hủy:</strong> {CancelledReason}
					</div>
				</>
			)}
		</div>
	);
};

export default InformationUser;
