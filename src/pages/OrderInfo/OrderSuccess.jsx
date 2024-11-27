import {CheckCircleOutline} from '@mui/icons-material';
import React from 'react';
import {Link} from 'react-router-dom';

const OrderSuccessPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 h-full py-20 m-auto">
			<CheckCircleOutline style={{color: 'green', fontSize: 100}} className="mb-5" />
			<h1 className="text-4xl font-bold text-gray-800 mb-4">Cảm Ơn Bạn Đã Đặt Hàng</h1>
			<p className="text-lg mb-6">
				Chúng tôi sẽ gửi cho bạn thông tin xác nhận giao hàng ngay khi đơn hàng của bạn được
				chuyển đi. Vui lòng kiểm tra trạng thái đơn hàng!
			</p>
			<Link to="/my-orders" className="text-primary hover:text-second text-lg">
				Kiểm Tra Đơn Hàng
			</Link>
		</div>
	);
};

export default OrderSuccessPage;
