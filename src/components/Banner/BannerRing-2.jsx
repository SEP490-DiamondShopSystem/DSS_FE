import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Lab_grown_diamonds1.png';

export const BannerRing2 = () => {
	const navigate = useNavigate();

	const handleNavigateDiamond = () => {
		navigate('/diamond/search');
		localStorage.setItem('diamondChoice', 'diamond choice');
	};
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 630}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-start text-black ">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-xl font-bold mb-4 uppercase">
						KỂ CÂU CHUYỆN TÌNH YÊU CỦA BẠN
					</h2>
					<h2 className="text-4xl font-bold mb-4 uppercase">Nhẫn cá nhân</h2>
					<h2 className="text-xl font-bold mb-4">Phong Cách Dễ Dàng</h2>
					<p className="mb-4">
						Nhẫn cưới và nhẫn đính hôn theo yêu cầu của chúng tôi có thể được hoàn thiện
						bằng chính loại đá quý, kim cương tự nhiên hoặc kim cương nhân tạo theo lựa
						chọn của bạn.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleNavigateDiamond}
						>
							Xem Tất Cả Kim Cương
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
