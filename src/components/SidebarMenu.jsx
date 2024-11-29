import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SidebarMenu = () => {
	const [activeMenu, setActiveMenu] = useState(null);
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
			title: 'Thanh Toán',
			items: [
				{name: 'Ví DiamondPay', path: '/diamondpay'},
				{name: 'DPayLater', path: '/dpaylater'},
				{name: 'Diamond Xu', path: '/diamond-xu'},
				{name: 'Số dư TK Diamond', path: '/diamond-balance'},
				{name: 'Thuế & Hóa đơn', path: '/tax-invoice'},
				{name: 'Phương thức thanh toán khác', path: '/other-payment-methods'},
				{name: 'Ứng dụng DiamondPay', path: '/diamondpay-app'},
			],
		},
		{
			title: 'Đơn Hàng & Vận Chuyển',
			items: [
				{name: 'Đơn hàng', path: '/orders'},
				{name: 'Đánh giá & Bình luận', path: '/reviews'},
				{name: 'Thông tin vận chuyển khác', path: '/shipping-info'},
				{name: 'Phương thức vận chuyển', path: '/shipping-methods'},
			],
		},
		{
			title: 'Trả Hàng & Hoàn Tiền',
			items: [
				{name: 'Gửi yêu cầu', path: '/refund-request'},
				{name: 'Xử lý yêu cầu', path: '/refund-process'},
				{name: 'Khiếu nại', path: '/complaints'},
			],
		},
		{
			title: 'Thông Tin Chung',
			items: [
				{name: 'Chính sách Diamond Shop', path: '/policy'},
				{name: 'Tài khoản Diamond Shop', path: '/diamond-account'},
				{name: 'Mua sắm an toàn', path: '/safe-shopping'},
				{name: 'Thư viện thông tin', path: '/info-library'},
				{name: 'Khác', path: '/others'},
				{name: 'Hướng dẫn chung', path: '/general-guidance'},
			],
		},
	];

	const toggleMenu = (index) => {
		setActiveMenu(activeMenu === index ? null : index);
	};

	const handleNavigate = (path) => {
		navigate(path);
	};

	return (
		<div className="w-72 p-4 bg-white shadow-md rounded-lg">
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
	);
};

export default SidebarMenu;
