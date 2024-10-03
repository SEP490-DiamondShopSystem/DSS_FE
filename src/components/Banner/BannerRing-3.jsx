import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Diamond_rings.png';

export const BannerRing3 = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 630}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-center text-black ">
				<div className="text-center" style={{maxWidth: 600}}>
					{/* <h2 className="text-xl font-bold mb-4 uppercase">Design Your Own Jewelry</h2> */}
					<h2 className="text-4xl mb-4">Tự Thiết Kế Trang Sức Của Bạn</h2>
					<p className="mb-4">
						Mang khoảnh khắc của bạn trở nên sống động với thiết kế thủ công. Các nghệ
						nhân chuyên nghiệp của chúng tôi sẽ đổ đầy đam mê vào từng chi tiết của món
						đồ tùy chỉnh đẹp đẽ của bạn. Tìm phong cách của bạn bên dưới.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/jewelry/search')}
						>
							Mua Vỏ Nhẫn
						</button>
						<button className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12">
							Mua Thiết Kế Tùy Chỉnh
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
