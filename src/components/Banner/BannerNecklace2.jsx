import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Preset_Diamond_Stud_Earrings.png';

export const BannerNecklace2 = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white my-10">
			<div className="flex justify-end mr-32">
				<img className=" object-cover" src={Logo} alt="Banner" />
			</div>
			<div className="absolute inset-0 flex items-center justify-start text-black ">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-3xl font-bold mb-4 uppercase">
						Dây chuyền kim cương đính sẵn
					</h2>

					<p className="mb-4">
						Dây chuyền kim cương lấp lánh của chúng tôi là món quà hoàn hảo dành cho một
						người đặc biệt—hoặc cho chính bạn. Từ những mẫu dây chuyền với mặt kim cương
						thanh lịch đến các thiết kế tinh xảo và sang trọng, bộ sưu tập dây chuyền
						kim cương đính sẵn của chúng tôi sẽ làm tỏa sáng vẻ đẹp và phong cách của
						bạn.
					</p>
				</div>
			</div>
		</div>
	);
};
