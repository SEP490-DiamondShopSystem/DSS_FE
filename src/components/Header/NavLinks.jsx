import React from 'react';

import {DownOutlined} from '@ant-design/icons';
import {Image} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../../assets/logo-short-ex.png';

const NavLinks = () => {
	const navigate = useNavigate();

	const links = [
		{
			name: 'Sản Phẩm',
			ref: 'diamond',
			col: 2,
			submenu: true,
			mess: 'Xem Sản Phẩm',
			link: '/jewelry',
			sublinks: [
				{
					Head: 'Mua Kim Cương Theo Hình Dạng',
					sublink: [
						{name: 'Round', link: '/diamond/search'},
						{name: 'Princess', link: '/diamond/search'},
						{name: 'Cushion', link: '/diamond/search'},
						{name: 'Oval', link: '/diamond/search'},
						{name: 'Emerald', link: '/diamond/search'},
						{name: 'Pear', link: '/diamond/search'},
						{name: 'Asscher', link: '/diamond/search'},
						{name: 'Heart', link: '/diamond/search'},
						{name: 'Radiant', link: '/diamond/search'},
						{name: 'Marquise', link: '/diamond/search'},
					],
				},
				{
					Head: 'Thiết Kế Trang Sức Của Bạn',
					sublink: [
						{name: 'Nhẫn', link: '/'},
						{name: 'Bông Tai', link: '/jewelry/design-your-own-earrings'},
						{name: 'Mặt Dây Chuyền', link: '/'},
					],
				},
			],
		},
		// {
		// 	name: 'Trang Sức',
		// 	ref: 'jewelry',
		// 	col: 3,
		// 	submenu: true,
		// 	link: '/jewelry/all-jewelry',
		// 	mess: 'Xem Tất Cả Trang Sức',
		// 	sublinks: [
		// 		{
		// 			Head: 'Bông Tai',
		// 			sublink: [
		// 				{
		// 					name: 'Tự Thiết Kế Bông Tai',
		// 					link: '/jewelry/design-your-own-earrings',
		// 				},
		// 				{name: 'Bông Tai Kim Cương', link: '/'},
		// 				{name: 'Bông Tai Đinh', link: '/'},
		// 			],
		// 		},
		// 		{
		// 			Head: 'Nhẫn',
		// 			sublink: [
		// 				{name: 'Nhẫn Kim Cương', link: '/'},
		// 				{name: 'Nhẫn Cưới', link: '/'},
		// 				{name: 'Nhẫn Đính Hôn', link: '/'},
		// 			],
		// 		},
		// 		{
		// 			Head: 'Trang Sức Thiết Kế',
		// 			sublink: [
		// 				{name: 'Monica Rich Kosann', link: '/'},
		// 				{name: 'Zac Zac Posen', link: '/'},
		// 				{name: 'Bella Vaughan', link: '/'},
		// 				{name: 'Blue Nile Studio', link: '/'},
		// 				{name: 'The Gallery Collection™', link: '/'},
		// 			],
		// 		},
		// 		{
		// 			Head: 'Dây Chuyền',
		// 			sublink: [
		// 				{name: 'Tự Thiết Kế Mặt Dây Chuyền', link: '/'},
		// 				{name: 'Dây Chuyền Kim Cương', link: '/'},
		// 			],
		// 		},
		// 	],
		// },
	];

	const handleClick = (shape) => {
		localStorage.setItem('selected', shape);
	};

	return (
		<>
			{links.map((link, i) => (
				<div key={i}>
					<div className="px-3 text-left group">
						<h1 className="py-7 no-underline text-black">
							{link.name} <DownOutlined />
						</h1>
						{link.submenu && (
							<div>
								<div className="absolute z-50 top-20 hidden group-hover:block hover:block">
									<div className="py-2">
										<div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45 shadow-xl"></div>
									</div>

									<div className="bg-white z-50 rounded-lg shadow-xl flex">
										<div
											className={`p-3.5 ${
												link.col === 3
													? 'grid grid-cols-3 gap-10'
													: 'grid grid-cols-2 gap-10'
											}`}
										>
											{link.sublinks.map((mySubLink, j) => (
												<div key={j}>
													<h1 className="text-lg font-semibold">
														{mySubLink.Head}
													</h1>
													<ul>
														{mySubLink.sublink.map((sl, k) => (
															<li
																className="text-sm text-gray-600 my-2.5 md:cursor-pointer"
																key={k}
															>
																<a
																	href={sl.link} // link with shape filter
																	className="hover:text-primary font-normal normal-case"
																	onClick={() =>
																		handleClick(sl.name)
																	}
																>
																	{sl.name}
																</a>
															</li>
														))}
													</ul>
												</div>
											))}
										</div>
										<div className="flex justify-center items-center p-4 flex-col mx-20">
											<Image
												src={Logo}
												alt="Logo"
												className="max-h-40 max-w-40"
												preview={false}
											/>
											<a
												href={link.link}
												className="normal-case md:cursor-pointer hover:text-primary"
											>
												{link.mess}
											</a>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
};

export default NavLinks;
