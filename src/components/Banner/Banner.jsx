import React from 'react';
import {useNavigate} from 'react-router-dom';

export const BannerDiamond = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 900}}>
			<img
				className="w-full h-full object-cover"
				src="https://via.placeholder.com/1500x900"
				alt="Banner"
			/>
			<div className="absolute inset-0 flex items-center justify-end text-black ">
				<div className="text-end mr-52" style={{maxWidth: 550}}>
					<h2 className="text-xl font-bold mb-4">
						GIẢM GIÁ ĐẾN 40% TRANG SỨC, 25% NHẪN CƯỚI
					</h2>
					<h2 className="text-3xl font-bold mb-4">Chúc mừng cửa hàng khai trương!</h2>
					<p className="mb-4">
						Khám phá những tính năng tuyệt vời và nội dung phù hợp dành riêng cho bạn.
					</p>
					<div className="flex items-center justify-end">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/diamond/search')}
						>
							Mua Kim Cương
						</button>
						<button
							className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/jewelry')}
						>
							Mua Trang Sức
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
