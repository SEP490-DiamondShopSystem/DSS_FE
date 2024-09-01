import React from 'react';
import {useNavigate} from 'react-router-dom';

const Banner = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white">
			<img
				className="w-full h-96 object-cover"
				src="https://via.placeholder.com/1500x500"
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
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second"
							onClick={() => navigate('/diamond/search')}
						>
							Shop Diamond
						</button>
						<button className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second">
							Shop Jewelry
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
