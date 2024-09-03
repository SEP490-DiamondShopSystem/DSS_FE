import {DownOutlined} from '@ant-design/icons';
import {Image} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo-short-ex.png';

const NavLinks = () => {
	const links = [
		{
			name: 'Diamond',
			ref: 'diamond',
			col: 2,
			submenu: true,
			mess: 'View All Diamond',
			sublinks: [
				{
					Head: 'Shop Diamond by Shape',
					sublink: [
						{name: 'Round', link: '/'},
						{name: 'Princess', link: '/'},
						{name: 'Cushion', link: '/'},
						{name: 'Oval', link: '/'},
						{name: 'Emerald', link: '/'},
						{name: 'Pear', link: '/'},
						{name: 'Asscher', link: '/'},
						{name: 'Heart', link: '/'},
						{name: 'Radiant', link: '/'},
						{name: 'Marquise', link: '/'},
					],
				},
				{
					Head: 'Build Your Own Jewelry',
					sublink: [
						{name: 'Ring', link: '/'},
						{name: 'Earrings', link: '/'},
						{name: 'Pendant', link: '/'},
					],
				},
			],
		},
		{
			name: 'Jewelry',
			ref: 'jewelry',
			col: 3,
			submenu: true,
			mess: 'View All Jewelry',
			sublinks: [
				{
					Head: 'Earrings',
					sublink: [
						{name: 'Design Your Own Earrings', link: '/'},
						{name: 'Diamond Earrings', link: '/'},
						{name: 'Stud Earrings', link: '/'},
					],
				},
				{
					Head: 'Rings',
					sublink: [
						{name: 'Diamond Rings', link: '/'},
						{name: 'Wedding Rings', link: '/'},
						{name: 'Engagement Rings', link: '/'},
					],
				},
				{
					Head: 'Designers Jewelry',
					sublink: [
						{name: 'Monica Rich Kosann', link: '/'},
						{name: 'Zac Zac Posen', link: '/'},
						{name: 'Bella Vaughan', link: '/'},
						{name: 'Blue Nile Studio', link: '/'},
						{name: 'The Gallery Collection™', link: '/'},
					],
				},
				{
					Head: 'Necklaces',
					sublink: [
						{name: 'Design Your Own Pendant', link: '/'},
						{name: 'Diamond Necklaces', link: '/'},
					],
				},
				{
					Head: 'Jewelry',
					sublink: [
						{name: 'Lab Grown Diamond Jewelry', link: '/'},
						{name: 'Birthstone Jewelry', link: '/'},
						{name: 'Designer Jewelry', link: '/'},
						{name: 'New Arrivals', link: '/'},
					],
				},
			],
		},
	];

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
								<div className="absolute z-50 top-16 hidden group-hover:block hover:block">
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
																<Link
																	to={sl.link}
																	className="hover:text-primary font-normal normal-case"
																>
																	{sl.name}
																</Link>
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
											/>
											<div className="normal-case md:cursor-pointer hover:text-primary">
												{link.mess}
											</div>
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
