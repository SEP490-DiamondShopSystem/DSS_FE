import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Preset_Diamond_Stud_Earrings.png';

export const BannerEarrings2 = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white my-10">
			<div className="flex justify-end mr-32">
				<img className=" object-cover" src={Logo} alt="Banner" />
			</div>
			<div className="absolute inset-0 flex items-center justify-start text-black ">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-3xl font-bold mb-4 uppercase">Hoa tai kim cương cài sẵn</h2>

					<p className="mb-4">
						Hoa tai kim cương lấp lánh của chúng tôi là món quà tuyệt vời cho một người
						đặc biệt—kể cả bạn. Từ bộ kim cương hình giọt nước và đinh tán thanh lịch
						đến những chiếc khuyên tai tròn được tô điểm tinh xảo, hoa tai kim cương
						lộng lẫy của chúng tôi sẽ làm sáng bừng bộ sưu tập của bạn.
					</p>
				</div>
			</div>
		</div>
	);
};
