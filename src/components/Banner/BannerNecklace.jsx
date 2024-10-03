import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/14k_white_gold_pendant.png';

export const BannerNecklace = () => {
	const navigate = useNavigate();

	const handleEarringDesignClick = () => {
		localStorage.setItem('jewelry', 'Dây chuyền');
		localStorage.removeItem('diamondChoice');
		navigate('/jewelry/all-jewelry');
	};
	return (
		<div className="relative bg-gray-800 text-white">
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-start text-start text-black ml-32">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-xl font-bold mb-4 uppercase">Trang sức</h2>
					<h2 className="text-3xl font-bold mb-4 uppercase">DÂY CHUYỀN</h2>
					<p className="text-xl mb-4">
						Vòng cổ là món đồ trang sức chủ lực cho trang phục hàng ngày và những dịp
						trang trọng. Khám phá nhiều loại vòng cổ dành cho cả nam và nữ của chúng
						tôi, bao gồm các thiết kế bằng bạc, bạch kim, vàng và đá quý. Những chiếc
						vòng cổ vượt thời gian, mặt dây chuyền nổi bật và phong cách vĩnh cửu của
						chúng tôi sẽ tạo nên nét hoàn thiện hoàn hảo cho bất kỳ trang phục nào.
						Duyệt qua nhiều loại vòng cổ tuyệt đẹp của chúng tôi để tìm một món đồ gia
						truyền chắc chắn sẽ được trân trọng.
					</p>
					<div className="flex items-center justify-start">
						<button
							className="px-20 py-2 bg-primary rounded uppercase font-semibold hover:bg-second h-12"
							onClick={handleEarringDesignClick}
						>
							Xem tất cả dây chuyền
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
