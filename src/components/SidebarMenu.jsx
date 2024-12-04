import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SidebarMenu = ({children}) => {
	const [activeMenu, setActiveMenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	const menuData = [
		{
			title: 'Mua Sắm Cùng Diamond Shop',
			items: [
				{name: 'Người dùng mới', path: '/new-user'},
				{name: 'Tạo tác', path: '/create-action'},
				{name: 'Tính năng của Diamond Shop', path: '/features'},
				{name: 'Khám phá', path: '/explore'},
				{name: 'Thanh toán đơn hàng', path: '/payment'},
				{name: 'Diamond Mall', path: '/diamond-mall'},
				{name: 'Diamond Mart', path: '/diamond-mart'},
				{name: 'Vay Tiêu Dùng', path: '/loan'},
			],
		},
		{
			title: 'Khuyến Mãi & Ưu Đãi',
			items: [
				{name: 'Chương trình khuyến mãi', path: '/promotions'},
				{name: 'Chương trình cho Người dùng', path: '/user-programs'},
			],
		},
		{
			title: 'Chính Sách',
			items: [
				{name: 'Chính Sách Thanh Toán', path: '/payment-policy'},
				{name: 'Chính Sách Giao Hàng', path: '/shipping-policy'},
				{name: 'Chính Sách Bảo Hành', path: '/warranty'},

				// {name: 'DPayLater', path: '/dpaylater'},
				// {name: 'Diamond Xu', path: '/diamond-xu'},
				// {name: 'Số dư TK Diamond', path: '/diamond-balance'},
				// {name: 'Thuế & Hóa đơn', path: '/tax-invoice'},
				// {name: 'Phương thức thanh toán khác', path: '/other-payment-methods'},
				// {name: 'Ứng dụng DiamondPay', path: '/diamondpay-app'},
			],
		},
	];

	const toggleMenu = (index) => {
		setActiveMenu(activeMenu === index ? null : index);
	};

	const handleNavigate = (path) => {
		navigate(path);
		setIsMobileMenuOpen(false); // Đóng menu sau khi chọn
	};

	return (
		<div className="flex">
			{/* Sidebar */}
			<nav
				className={`flex flex-col bg-white w-72 h-screen shadow-md transform transition-transform duration-300 ease-in-out ${
					isMobileMenuOpen ? 'block' : 'hidden'
				} md:block`}
			>
				<div className="p-4">
					{menuData.map((menu, index) => (
						<div key={index} className="mb-4">
							<button
								className="w-full text-left font-semibold text-gray-700 hover:text-orange-500 focus:outline-none"
								onClick={() => toggleMenu(index)}
							>
								{menu.title}
							</button>
							{activeMenu === index && (
								<ul className="mt-2 space-y-2">
									{menu.items.map((item, idx) => (
										<li
											key={idx}
											className="cursor-pointer text-gray-600 hover:text-orange-500"
											onClick={() => handleNavigate(item.path)}
										>
											{item.name}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</nav>

			{/* Main Content */}
			<main className="flex-1 p-4">
				<button
					className="p-2 text-white bg-orange-500 rounded-md md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? 'Đóng Menu' : 'Mở Menu'}
				</button>
				<div>{children}</div>
			</main>
		</div>
	);
};

export default SidebarMenu;
