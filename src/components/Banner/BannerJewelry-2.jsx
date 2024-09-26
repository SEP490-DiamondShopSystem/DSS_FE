import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Lab_Grown_Diamonds.png';

export const BannerJewelry2 = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 630}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-start text-black ">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-xl font-bold mb-4 uppercase">KIM CƯƠNG NHÂN TẠO</h2>
					<h2 className="text-4xl font-bold mb-4">Phong Cách Dễ Dàng</h2>
					<p className="mb-4">
						Kim cương nhân tạo mang đến sự lấp lánh với giá cả phải chăng — giúp phong
						cách của bạn trở nên dễ dàng và rực rỡ hơn.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/diamond-lab/search')}
						>
							Mua Kim Cương Nhân Tạo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
