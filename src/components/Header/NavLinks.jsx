import React, {useState, useEffect} from 'react';
import {DownOutlined, RightOutlined} from '@ant-design/icons';
import {Popover, Image} from 'antd';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo-short-ex.png';
import {getUserId} from '../GetUserId';

const NavLinks = () => {
	const [openMenus, setOpenMenus] = useState({});
	const [isMobile, setIsMobile] = useState(false);
	// Detect viewport size and update `isMobile`
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768); // Mobile if width < 768px
		};

		handleResize(); // Initial check
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
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
						{name: 'Round', link: '/diamond/search', value: '1'},
						{name: 'Princess', link: '/diamond/search', value: '2'},
						{name: 'Cushion', link: '/diamond/search', value: '3'},
						{name: 'Oval', link: '/diamond/search', value: '5'},
						{name: 'Emerald', link: '/diamond/search', value: '4'},
						{name: 'Pear', link: '/diamond/search', value: '10'},
						{name: 'Asscher', link: '/diamond/search', value: '7'},
						{name: 'Heart', link: '/diamond/search', value: '9'},
						{name: 'Radiant', link: '/diamond/search', value: '6'},
						{name: 'Marquise', link: '/diamond/search', value: '8'},
					],
				},
				{
					Head: 'Sản Phẩm',
					sublink: [
						{name: 'Trang Sức', link: '/jewelry-model/search'},
						{name: 'Kim Cương', link: '/diamond/search'},
					],
				},
			],
		},
		{
			name: 'Bảng Giá',
			ref: 'price-list',
			col: 2,
			submenu: true,
			mess: 'Xem Giá Kim Cương',
			link: '/price-list',
			sublinks: [
				{
					Head: 'Bảng Giá Kim Cương Chính',
					sublink: [{name: 'Kim Cương Chính', link: '/price-list/main', value: '1'}],
				},
				{
					Head: 'Bảng Giá Kim Cương Tấm',
					sublink: [{name: 'Kim Cương Tấm', link: '/price-list/side'}],
				},
			],
		},
	];

	const handleClick = (shape, type, diamond, jewelry) => {
		const userId = getUserId();

		if (shape) {
			localStorage.setItem('selected', JSON.stringify(shape));
			localStorage.removeItem('jewelryType');
			localStorage.setItem('diamondChoice', 'Kim Cương');
			localStorage.removeItem('jewelryChoice');
		}
		if (type) {
			localStorage.setItem('jewelryType', type);
			localStorage.removeItem('selected');
			localStorage.removeItem('diamondChoice');
			localStorage.removeItem('jewelryChoice');
		}
		if (jewelry) {
			localStorage.setItem('jewelryChoice', jewelry);
			localStorage.removeItem('diamondChoice');
		}
		if (diamond) {
			localStorage.setItem('diamondChoice', diamond);
			localStorage.removeItem('jewelryChoice');
			localStorage.removeItem('jewelryType');
			localStorage.removeItem('selected');
			localStorage.removeItem(`jewelryModel_${userId}`);
		}
	};

	const renderMobileSublinks = (link, linkIndex) => (
		<div className="bg-white">
			{link.sublinks.map((sublink, j) => (
				<div key={j} className="border-b">
					<div
						className="flex justify-between items-center p-3 cursor-pointer"
						onClick={() => {
							// Use a unique key for this submenu
							toggleMenu(`submenu_${linkIndex}_${j}`);
						}}
					>
						<h2 className="font-semibold">{sublink.Head}</h2>
						{sublink.sublink.length > 1 && (
							<RightOutlined
								className={`transition-transform duration-300 ${
									openMenus[`submenu_${linkIndex}_${j}`] ? 'rotate-90' : ''
								}`}
							/>
						)}
					</div>
					{/* Render sublinks if the submenu is open */}
					{openMenus[`submenu_${linkIndex}_${j}`] && (
						<ul className="pl-4 pb-2">
							{sublink.sublink.map((sl, k) => (
								<li
									key={k}
									className="text-sm text-gray-600 my-2.5 md:cursor-pointer"
								>
									<Link
										to={sl.link}
										className="hover:text-primary font-normal normal-case"
										onClick={() => {
											// Handle clicks for navigation or additional state changes
											if (sublink.Head === 'Mua Kim Cương Theo Hình Dạng') {
												handleClick(sl.value, null, null, null);
											} else if (sl.name === 'Trang Sức') {
												handleClick(null, null, null, sl.name);
											} else if (sl.name === 'Kim Cương') {
												handleClick(null, null, sl.name, null);
											}
										}}
									>
										{sl.name}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);

	const toggleMenu = (key) => {
		setOpenMenus((prev) => ({
			...prev,
			[key]: !prev[key], // Toggle only the specified menu
		}));
	};

	const renderPopoverContent = (sublinks) => (
		<div className="z-50 rounded-lg shadow-xl flex p-3.5">
			<div className={`grid ${sublinks.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-10`}>
				{sublinks.map((mySubLink, j) => (
					<div key={j}>
						<h1 className="text-lg font-semibold">{mySubLink.Head}</h1>
						<ul>
							{mySubLink.sublink.map((sl, k) => (
								<li
									key={k}
									className="text-sm text-gray-600 my-2.5 md:cursor-pointer"
								>
									<Link
										to={sl.link}
										className="hover:text-primary font-normal normal-case"
										onClick={() => {
											if (mySubLink.Head === 'Mua Kim Cương Theo Hình Dạng') {
												handleClick(sl.value, null, null, null);
											} else if (sl.name === 'Trang Sức') {
												handleClick(null, null, null, sl.name);
											} else if (sl.name === 'Kim Cương') {
												handleClick(null, null, sl.name, null);
											}
										}}
									>
										{sl.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<>
			{links.map((link, i) => (
				<div key={i} className="relative">
					{!isMobile ? (
						<Popover
							content={renderPopoverContent(link.sublinks)}
							title={link.name}
							trigger="hover"
							placement="bottom"
							className="group"
						>
							{/* Desktop View */}
							<h1 className="py-7 no-underline text-black cursor-pointer">
								{link.name} <DownOutlined />
							</h1>
						</Popover>
					) : (
						<div className="md:hidden">
							{/* Mobile View */}
							<div
								className="flex justify-between items-center py-3 cursor-pointer"
								onClick={() => toggleMenu(i)}
							>
								<h1 className="text-black">{link.name}</h1>
								<DownOutlined
									className={`transition-transform duration-300 ${
										openMenus[i] ? 'rotate-180' : ''
									}`}
								/>
							</div>
							{openMenus[i] && renderMobileSublinks(link, i)}
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default NavLinks;
