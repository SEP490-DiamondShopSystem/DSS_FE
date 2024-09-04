import React from 'react';

import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Diamond_rings.png';

export const BannerJewelry3 = () => {
	const navigate = useNavigate();
	return (
		<div className="relative bg-gray-800 text-white" style={{height: 630}}>
			<img className="w-full h-full object-cover" src={Logo} alt="Banner" />
			<div className="absolute inset-0 flex items-center justify-center text-black ">
				<div className="text-center" style={{maxWidth: 600}}>
					{/* <h2 className="text-xl font-bold mb-4 uppercase">Design Your Own Jewelry</h2> */}
					<h2 className="text-4xl mb-4">Design Your Own Jewelry</h2>
					<p className="mb-4">
						Bring your moment to life with a handcrafted design. Our expert artisans
						will pour their passion into every detail of your beautiful custom piece.
						Find your style below.
					</p>
					<div className="flex items-center justify-center">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-96 h-12"
							onClick={() => navigate('/diamond/search')}
						>
							Shop Setting
						</button>
						<button className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-96 h-12">
							Shop Custom Design
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
