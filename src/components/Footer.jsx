import React from 'react';
import {Row, Col} from 'antd'; // Import Row and Col from Ant Design
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faMapMarkerAlt, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Logo from '../assets/logo-short-ex.png';
import {Link} from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 px-10 w-full bg-white">
			<div className="container mx-auto">
				<Row gutter={[16, 24]}>
					{/* Logo và Phần Địa Chỉ */}
					<Col xs={24} sm={12} md={6}>
						<div>
							<img src={Logo} alt="logo" className="md:cursor-pointer max-h-24" />
						</div>
						<p className="mt-4 text-gray-700">
							Nơi Mỗi Viên Kim Cương Kể Câu Chuyện – Thắp Sáng Thế Giới Của Bạn Với Sự
							Tinh Tế Vĩnh Cửu Từ Cửa Hàng Kim Cương
						</p>
						<div className="mt-4">
							<p className="text-gray-600 mt-2 flex items-center">
								<div>
									<FontAwesomeIcon icon={faEnvelope} className="mr-2" />
								</div>
								<div>diamondshopsystem@gmail.com</div>
							</p>
							<p className="text-gray-600 mt-2 flex">
								<div>
									<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
								</div>
								<div>89 Đ. Võ Văn Ngân, Bình Thọ, Thủ Đức, Hồ Chí Minh</div>
							</p>
							<p className="text-gray-600 mt-2 flex items-center">
								<div>
									<FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
								</div>
								<div>0764750393</div>
							</p>
						</div>
					</Col>

					{/* Phần Giới Thiệu Về Cửa Hàng */}
					<Col xs={24} sm={12} md={6}>
						<h2 className="font-bold text-xl">Giới Thiệu Về Cửa Hàng</h2>
						<ul className="mt-4 text-gray-700">
							<li className="m-2">Giao Hàng An Toàn</li>
							<li className="m-2">Hộp Và Thiệp Miễn Phí</li>
							<li className="m-2">Bảo Hành Trang Sức</li>
							<li className="m-2">Bảo Hành Kim Cương</li>
						</ul>
					</Col>

					{/* Phần Chính Sách Liên Quan */}
					<Col xs={24} sm={12} md={6}>
						<h2 className="font-bold text-xl">Chính Sách Liên Quan</h2>
						<ul className="mt-4 text-gray-700">
							<li className="m-2">
								<Link to={'/shipping-policy'}>Chính Sách Giao Hàng</Link>
							</li>
							<li className="m-2">Chính Sách Bảo Hành</li>
							<li className="m-2">Điều Khoản Sử Dụng</li>
							<li className="m-2">Cam Kết Về Vỏ Trang Sức</li>
							<li className="m-2">Cam Kết Về Kim Cương</li>
						</ul>
					</Col>

					{/* Phần Liên Hệ Với Chúng Tôi */}
					<Col xs={24} sm={12} md={6}>
						<h2 className="font-bold text-xl">Liên Hệ Với Chúng Tôi</h2>
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
					</Col>
				</Row>
			</div>
		</footer>
	);
};
