import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 px-10 w-full bg-white ">
			<div className="container mx-auto grid grid-cols-4 gap-8">
				{/* Logo and Address Section */}
				<div>
					<h2 className="font-bold text-xl">Logo</h2>
					<p className="mt-4 text-gray-700">
						Where Every Diamond Tells a Story – Illuminate Your World with Timeless
						Elegance from Kim Cuong Shop
					</p>
					<div className="mt-4">
						<p className="text-gray-600">shopdiamond@gmail.com</p>
						<p className="text-gray-600 mt-2 flex items-center">
							<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> 89 Đ. Võ Văn
							Ngân, Bình Thọ, Thủ Đức, Hồ Chí Minh
						</p>
						<p className="text-gray-600 mt-2 flex items-center">
							<FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> 0912 3456 78
						</p>
					</div>
				</div>

				{/* About Shop Section */}
				<div>
					<h2 className="font-bold text-xl">About Shop</h2>
					<ul className="mt-4 text-gray-700">
						<li>Return Are Free</li>
						<li>Free Lifetime Warranty</li>
						<li>Free Secure Shipping</li>
						<li>Free Boxes & Gift Cards</li>
						<li>Jewelry Insurance</li>
					</ul>
				</div>

				{/* Related Policy Section */}
				<div>
					<h2 className="font-bold text-xl">Related Policy</h2>
					<ul className="mt-4 text-gray-700">
						<li>Product exchange</li>
						<li>Delivery policy</li>
						<li>Warranty policy</li>
						<li>Buy in installments</li>
						<li>Terms of use</li>
						<li>Privacy policy</li>
						<li>Commitment to jewelry cases</li>
						<li>Commitment to diamonds</li>
					</ul>
				</div>

				{/* Contact To Us Section */}
				<div>
					<h2 className="font-bold text-xl">Contact To Us</h2>
					<div className="flex space-x-4 mt-4">
						<a href="#" className="text-gray-600">
							<FontAwesomeIcon icon={faFacebook} size="2x" />
						</a>
						<a href="#" className="text-gray-600">
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
