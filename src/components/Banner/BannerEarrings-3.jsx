import React from 'react';

import {json, useNavigate} from 'react-router-dom';
import Logo from '../../assets/Build_Your_Own_Earrings.png';

export const BannerEarrings3 = () => {
	const navigate = useNavigate();

	const handleEarringShopClick = () => {
		localStorage.setItem('jewelry', 'Bông tai');
		navigate('/jewelry/all-jewelry');
	};

	return (
		<div
			className="relative bg-gray-800 text-white"
			style={{height: 630, background: '#f7f7f7'}}
		>
			<img className="ml-32 h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-end text-black ">
				<div className="text-end mr-40">
					<h2 className="text-4xl mb-4 uppercase font-semibold">
						Tự làm bông tai của bạn
					</h2>
					<p className="mb-4">
						Từ đầu đến cuối, chúng tôi sẽ giúp bạn phát huy nhà thiết kế bên trong mình
						để sáng tạo của bạn trở nên rực rỡ.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleEarringShopClick}
						>
							mua sắm ngay
						</button>
						<button className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12">
							thiết kế ngay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
