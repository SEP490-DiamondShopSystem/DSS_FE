import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/diamond-jewelry.png';

export const BannerJewelry = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 630}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-start text-black ">
				<div className="ml-52" style={{maxWidth: 550}}>
					<h2 className="text-xl font-bold mb-4 uppercase">
						FOR LIFE'S MOST JOYFUL OCCASIONS
					</h2>
					<h2 className="text-4xl font-bold mb-4 uppercase">JEWELRY</h2>
					<p className="mb-4">
						Mark the moments with classic styles made to be cherished forever.
					</p>
					<div className="flex items-center justify-end">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded uppercase font-semibold hover:bg-second w-full h-12"
							onClick={() => navigate('/jewelry/search')}
						>
							Shop All Jewelry
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
