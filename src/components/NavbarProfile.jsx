import {
	faKey,
	faListCheck,
	faLock,
	faReceipt,
	faShoppingBag,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Image, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {GetUserDetailSelector, UserInfoSelector} from '../redux/selectors';
import avatar from '../assets/default-avatar-icon.jpg';
import {getAccountRank} from '../redux/slices/userSlice';
import TierProgressBar from './TierProgressBar';

const roleMapping = {
	1: {text: 'Thành Viên', color: 'default'},
	2: {text: 'Thành Viên Đồng', color: 'orange'},
	3: {text: 'Thành Viên Bạc', color: 'silver'},
	4: {text: 'Thành Viên Vàng', color: 'gold'},
};

const NavbarProfile = () => {
	const dispatch = useDispatch();
	const userDetail = useSelector(GetUserDetailSelector);

	const [rank, setRank] = useState();

	const [active, setActive] = useState(localStorage.getItem('lastVisitedPage') || 'Profile');

	useEffect(() => {
		dispatch(getAccountRank())
			.unwrap()
			.then((res) => {
				setRank(res);
			});
	}, []);

	const handleLinkClick = (name) => {
		setActive(name);
		localStorage.setItem('lastVisitedPage', name);
	};

	const links = [
		{
			name: 'Thông tin',
			link: '/my-info',
			icon: <FontAwesomeIcon icon={faReceipt} color="black" />,
		},
		{
			name: 'Đơn hàng của tôi',
			link: '/my-orders',
			icon: <FontAwesomeIcon icon={faShoppingBag} color="black" />,
		},
		{
			name: 'Đơn thiết kế',
			link: '/request-customize',
			icon: <FontAwesomeIcon icon={faListCheck} color="black" />,
		},
		{
			name: 'Sản Phẩm Đã Khóa',
			link: '/lock-product',
			icon: <FontAwesomeIcon icon={faLock} color="black" />,
		},
		{
			name: 'Thay đổi mật khẩu',
			link: '/change-password',
			icon: <FontAwesomeIcon icon={faKey} color="black" />,
		},
	];

	const highestRank =
		Array.isArray(userDetail?.Roles) && userDetail?.Roles.length > 0
			? userDetail.Roles.reduce((max, role) =>
					parseInt(role.Id) > parseInt(max.Id) ? role : max
			  ).Id
			: null;

	return (
		<div>
			<div className="flex items-center justify-center">
				<Image
					src={avatar}
					height={50}
					width={50}
					className="rounded-full"
					preview={false}
				/>
			</div>
			<div className="font-semibold w-full flex justify-center items-center my-5 ">
				<div className="">
					<h1 className="text-2xl text-center">
						{userDetail?.FirstName} {userDetail?.LastName}
					</h1>
					<div className="text-2xl text-center mb-5">
						{highestRank && (
							<Tag color={roleMapping[highestRank]?.color}>
								{roleMapping[highestRank]?.text}
							</Tag>
						)}
					</div>
					<TierProgressBar
						currentPoints={userDetail?.TotalPoint}
						bronzePoints={rank?.TotalPointToBronze}
						silverPoints={rank?.TotalPointToSilver}
						goldPoints={rank?.TotalPointToGold}
					/>
				</div>
			</div>{' '}
			<nav className="divide-x w-64 bg-white min-h-96 rounded-lg">
				<ul className="">
					{links.map((link, index) => (
						<li
							key={index}
							className={`text-left md:cursor-pointer px-10 py-5 flex ${
								active === link.name ? 'text-primary' : 'text-black'
							} `}
						>
							<div className="mr-5">{link.icon}</div>
							<div>
								<Link
									to={link.link}
									onClick={() => handleLinkClick(link.name)} // Lưu trạng thái khi nhấn
									className={`no-underline ${
										active === link.name ? 'text-primary' : 'text-black'
									} m-auto hover:text-primary`}
								>
									{link.name}
								</Link>
							</div>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default NavbarProfile;
