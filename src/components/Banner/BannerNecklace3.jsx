import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/solitaire_pendant_setting.png';

export const BannerNecklace3 = () => {
	const navigate = useNavigate();

	const handleNecklaceShopClick = () => {
		localStorage.setItem('jewelry', 'Dây chuyền');
		navigate('/jewelry/setting/all');
	};

	const handleNecklaceDesignClick = () => {
		localStorage.setItem('jewelryType', 'Dây Chuyền');
		localStorage.removeItem('diamondChoice');
		navigate('/jewelry/design-your-own-earrings/setting/all');
	};

	return (
		<div
			className="relative bg-gray-800 text-white"
			style={{height: 630, background: '#ffffff'}}
		>
			<img className="ml-32 h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-end text-black ">
				<div className="text-end mr-40">
					<h2 className="text-4xl mb-4 uppercase font-semibold">
						Tự làm dây chuyền của bạn
					</h2>
					<p className="mb-4">
						Diamond Shop giúp bạn dễ dàng tạo ra chiếc vòng cổ kim cương của riêng mình.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleNecklaceShopClick}
						>
							mua sắm ngay
						</button>
						<button
							className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleNecklaceDesignClick}
						>
							thiết kế ngay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
