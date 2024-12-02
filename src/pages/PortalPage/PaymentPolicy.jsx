import React from 'react';
import SidebarMenu from '../../components/SidebarMenu';

const PaymentPolicy = () => {
	return (
		<div className="flex min-h-screen">
			{/* Nội dung chính */}
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold mb-4">Chính Sách Thanh Toán</h1>
				<p>
					Chào mừng bạn đến với trang Chính Sách Thanh Toán của Diamond Shop. Đây là nơi
					bạn có thể tìm hiểu về các phương thức thanh toán, quy trình hoàn tiền và các
					điều khoản liên quan.
				</p>
				<p className="mt-4">
					Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với đội ngũ chăm sóc khách hàng của
					chúng tôi qua hotline hoặc email.
				</p>
			</div>
		</div>
	);
};

export default PaymentPolicy;
