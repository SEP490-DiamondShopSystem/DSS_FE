import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo-ex.png';

function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 h-full py-20 m-auto">
			<img src={Logo} alt="Logo" className="w-40 h-40 mb-8" />
			<h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Không tìm thấy trang</h1>
			<p className="text-lg text-gray-600 mb-6">
				Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
			</p>
			<Link to="/" className="text-primary hover:text-second text-lg">
				Quay lại Trang Chủ
			</Link>
		</div>
	);
}

export default NotFoundPage;
