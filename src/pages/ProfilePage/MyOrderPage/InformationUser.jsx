import React from 'react';

const InformationUser = ({order}) => {
	if (!order || !order.Account) {
		return <div>Không có thông tin khách hàng</div>;
	}

	const {
		Account: {FirstName, LastName, Email, TotalPoint},
		ExpectedDate,
		CancelledDate,
		CancelledReason,
		PaymentMethod,
		Status,
	} = order;

	return (
		<div className="p-6 bg-white rounded-lg shadow-md w-full  mt-7">
			<div className="mb-2">
				<strong>Họ và Tên:</strong> {FirstName} {LastName}
			</div>
			<div className="mb-2">
				<strong>Email:</strong> {Email}
			</div>
			<div className="mb-2">
				<strong>Số Điện Thoại:</strong> {TotalPoint}
			</div>
			<div className="mb-2">
				<strong>Ngày Giao Hàng Dự Kiến:</strong> {ExpectedDate}
			</div>
			<div className="mb-2">
				<strong>Phương thức thanh toán:</strong>{' '}
				{PaymentMethod?.MappedName || 'Không có thông tin'}
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
