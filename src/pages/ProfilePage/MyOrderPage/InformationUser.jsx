import React from 'react';

const InformationUser = ({order}) => {
	if (!order || !order.Account) {
		return <div>Không có thông tin khách hàng</div>;
	}

	const {
		Account: {FirstName, LastName, Email, TotalPoint},
		ExpectedDate,
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
		</div>
	);
};

export default InformationUser;
