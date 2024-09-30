import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Design_Your_Own_Earrings.png';

export const BannerEarrings = () => {
	const navigate = useNavigate();

	const handleEarringDesignClick = () => {
		localStorage.setItem('jewelryType', 'Bông tai');
		navigate('/jewelry/search');
	};
	return (
		<div className="relative bg-gray-800 text-white">
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-end text-end text-black mr-32">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-3xl font-bold mb-4 uppercase">
						THIẾT KẾ HOA TAI CỦA RIÊNG BẠN
					</h2>

					<p className="mb-4">
						Biến mọi khoảnh khắc trở nên đặc biệt với đôi hoa tai do chính bạn thiết kế.
						Chọn mặt sau, chọn kim cương hoặc đá quý, và để phong cách của bạn tỏa sáng
						cùng Diamond Shop.
					</p>
					<div className="flex items-center justify-end">
						<button
							className="ml-10 px-6 py-2 bg-primary rounded uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleEarringDesignClick}
						>
							bắt đầu thiết kế của bạn
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
