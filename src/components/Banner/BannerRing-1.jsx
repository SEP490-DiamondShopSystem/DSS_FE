import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Design_your_own_engagement_ring.png';

export const BannerRings = () => {
	const navigate = useNavigate();

	const handleEarringDesignClick = () => {
		localStorage.setItem('jewelryType', 'Nhẫn');
		localStorage.removeItem('diamondChoice');
		navigate('/jewelry/design-your-own-rings/setting/all');
	};
	return (
		<div className="relative bg-gray-800 text-white">
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-end text-end text-black mr-32">
				<div className="ml-52" style={{maxWidth: 800}}>
					<h2 className="text-2xl font-bold mb-4 uppercase">THIẾT KẾ nhẫn</h2>

					<p className="text-4xl mb-4">THIẾT KẾ NHẪN CỦA RIÊNG BẠN</p>
					<div className="flex items-center justify-end">
						<button
							className="ml-10 px-6 py-2 bg-primary rounded uppercase font-semibold hover:bg-second h-12"
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
