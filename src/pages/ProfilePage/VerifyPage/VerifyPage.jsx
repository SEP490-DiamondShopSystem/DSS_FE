import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../assets/logo-ex.png';
import {CheckCircleOutline} from '@mui/icons-material';

const VerifyPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 h-full py-20 m-auto">
			<CheckCircleOutline style={{color: 'green', fontSize: 100}} className="mb-5" />
			<h1 className="text-4xl font-bold text-gray-800 mb-4">Xin Chúc Mừng</h1>
			<p className="text-lg mb-6">Tài khoản của bạn đã xác thực thành công</p>
			<Link to="/" className="text-primary hover:text-second text-lg">
				Quay về trang chủ
			</Link>
		</div>
	);
};

export default VerifyPage;
