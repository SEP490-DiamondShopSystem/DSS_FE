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
						UP TO 40% OFF JEWELRY, 25% OFF RING SETTINGS
					</h2>
					<h2 className="text-3xl font-bold mb-4">Congrats on your shop opening!</h2>
					<p className="mb-4">
						Discover amazing features and content tailored just for you.
					</p>
					<div className="flex items-center justify-end">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/diamond/search')}
						>
							Shop Diamond
						</button>
						<button
							className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/jewelry')}
						>
							Shop Jewelry
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
