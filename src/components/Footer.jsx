import React from 'react';

import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faMapMarkerAlt, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Logo from '../assets/logo-short-ex.png';

export const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 px-10 w-full bg-white ">
			<div className="container mx-auto grid grid-cols-4 gap-8">
				{/* Logo and Address Section */}
				<div>
					<div>
						<img src={Logo} alt="logo" className="md:cursor-pointer max-h-24" />
					</div>
					<p className="mt-4 text-gray-700">
						Where Every Diamond Tells a Story – Illuminate Your World with Timeless
						Elegance from Kim Cuong Shop
					</p>
					<div className="mt-4">
						<p className="text-gray-600 mt-2 flex items-center">
							<div>
								<FontAwesomeIcon icon={faEnvelope} className="mr-2" />
							</div>
							<div>shopdiamond@gmail.com</div>
						</p>
						<p className="text-gray-600 mt-2 flex ">
							<div>
								<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
							</div>
							<div>89 Đ. Võ Văn Ngân, Bình Thọ, Thủ Đức, Hồ Chí Minh</div>
						</p>
						<p className="text-gray-600 mt-2 flex items-center">
							<div>
								<FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
							</div>
							<div>0912 3456 78</div>
						</p>
					</div>
				</div>

				{/* About Shop Section */}
				<div>
					<h2 className="font-bold text-xl">About Shop</h2>
					<ul className="mt-4 text-gray-700">
						<li className="m-2">Return Are Free</li>
						<li className="m-2">Free Lifetime Warranty</li>
						<li className="m-2">Free Secure Shipping</li>
						<li className="m-2">Free Boxes & Gift Cards</li>
						<li className="m-2">Jewelry Insurance</li>
					</ul>
				</div>

				{/* Related Policy Section */}
				<div>
					<h2 className="font-bold text-xl">Related Policy</h2>
					<ul className="mt-4 text-gray-700">
						<li className="m-2">Product exchange</li>
						<li className="m-2">Delivery policy</li>
						<li className="m-2">Warranty policy</li>
						<li className="m-2">Buy in installments</li>
						<li className="m-2">Terms of use</li>
						<li className="m-2">Privacy policy</li>
						<li className="m-2">Commitment to jewelry cases</li>
						<li className="m-2">Commitment to diamonds</li>
					</ul>
				</div>

				{/* Contact To Us Section */}
				<div>
					<h2 className="font-bold text-xl">Contact To Us</h2>
					<div className="flex space-x-4 mt-4">
						<a href="#" className="text-gray-600 ">
							<FontAwesomeIcon icon={faFacebook} size="2x" />
						</a>
						<a href="#" className="text-gray-600 ">
							<FontAwesomeIcon icon={faInstagram} size="2x" />
						</a>
						<a href="#" className="text-gray-600">
							<div className="bg-yellow-400 w-6 h-6"></div>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
