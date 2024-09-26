import React from 'react';

import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faMapMarkerAlt, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Logo from '../assets/logo-short-ex.png';

export const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 px-10 w-full bg-white ">
			<div className="container mx-auto grid grid-cols-4 gap-8">
				{/* Logo và Phần Địa Chỉ */}
				<div>
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

				{/* Phần Giới Thiệu Về Cửa Hàng */}
				<div>
					<h2 className="font-bold text-xl">Giới Thiệu Về Cửa Hàng</h2>
					<ul className="mt-4 text-gray-700">
						<li className="m-2">Trả Hàng Miễn Phí</li>
						<li className="m-2">Bảo Hành Trọn Đời Miễn Phí</li>
						<li className="m-2">Giao Hàng An Toàn Miễn Phí</li>
						<li className="m-2">Hộp Và Thiệp Miễn Phí</li>
						<li className="m-2">Bảo Hiểm Trang Sức</li>
					</ul>
				</div>

				{/* Phần Chính Sách Liên Quan */}
				<div>
					<h2 className="font-bold text-xl">Chính Sách Liên Quan</h2>
					<ul className="mt-4 text-gray-700">
						<li className="m-2">Đổi Sản Phẩm</li>
						<li className="m-2">Chính Sách Giao Hàng</li>
						<li className="m-2">Chính Sách Bảo Hành</li>
						<li className="m-2">Mua Trả Góp</li>
						<li className="m-2">Điều Khoản Sử Dụng</li>
						<li className="m-2">Chính Sách Bảo Mật</li>
						<li className="m-2">Cam Kết Về Vỏ Trang Sức</li>
						<li className="m-2">Cam Kết Về Kim Cương</li>
					</ul>
				</div>

				{/* Phần Liên Hệ Với Chúng Tôi */}
				<div>
					<h2 className="font-bold text-xl">Liên Hệ Với Chúng Tôi</h2>
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
