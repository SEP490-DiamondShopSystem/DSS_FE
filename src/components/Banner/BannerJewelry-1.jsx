import React from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/diamond-jewelry.png';

export const BannerJewelry = () => {
	const navigate = useNavigate();

	const handleNavigateJewelry = () => {
		navigate('/customize/diamond-jewelry');
	};

	return (
		<div className="relative bg-gray-800 text-white" style={{height: '630px'}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 md:px-20">
				<div className="text-center md:text-left max-w-lg md:ml-20">
					<h2 className="text-lg md:text-xl font-bold mb-2 uppercase">
						CHO NHỮNG DỊP VUI NHẤT TRONG ĐỜI
					</h2>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">TRANG SỨC</h2>
					<p className="text-sm md:text-base mb-4">
						Đánh dấu khoảnh khắc với những phong cách cổ điển để mãi được trân trọng.
					</p>
					<div className="flex justify-center md:justify-start">
						<button
							className="px-6 py-2 bg-primary rounded uppercase font-semibold hover:bg-second w-auto md:w-full h-12"
							onClick={handleNavigateJewelry}
						>
							Thiết Kế Trang Sức Của Bạn
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
