import {UserOutlined} from '@ant-design/icons';
import React from 'react';
import {Link} from 'react-router-dom';

const ActionLinks = () => {
	const links = [
		{
			icon: <UserOutlined />,
			ref: 'diamond',
			submenu: true,
			sublinks: [
				{
					sublink: [
						{name: 'Profile', link: '/profile'},
						{name: 'Information', link: '/info'},
						{name: 'My Orders', link: '/my-orders'},
						{name: 'Login'},
					],
				},
			],
		},
	];
	return (
		<>
			{links.map((link) => (
				<div>
					<div className="px-3 text-left md:cursor-pointer group">
						<div className="py-7 no-underline text-black">{link.icon}</div>
						{link.submenu && (
							<div>
								<div className="absolute z-50 top-20 hidden group-hover:block hover:block">
									<div className="py-2">
										<div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
									</div>
									<div className="bg-white p-3.5 flex items-end">
										{link.sublinks?.map((mySubLink) => (
											<div>
												{mySubLink.sublink?.map((sl) => (
													<li className="text-base text-gray-600 my-2.5 whitespace-nowrap ">
														<Link
															to={sl.link}
															className="hover:text-primary font-normal normal-case"
														>
															{sl.name}
														</Link>
													</li>
												))}
											</div>
										))}
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

export default ActionLinks;
