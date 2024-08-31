import {faKey, faReceipt, faShoppingBag, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const NavbarProfile = () => {
	const [active, setActive] = useState(localStorage.getItem('lastVisitedPage') || 'Profile');

	// Hàm để xử lý khi nhấn vào một liên kết
	const handleLinkClick = (name) => {
		setActive(name);
		localStorage.setItem('lastVisitedPage', name);
	};

	const links = [
		{name: 'Profile', link: '/profile', icon: <FontAwesomeIcon icon={faUser} color="black" />},
		{
			name: 'Information',
			link: '/my-info',
			icon: <FontAwesomeIcon icon={faReceipt} color="black" />,
		},
		{
			name: 'My Orders',
			link: '/my-orders',
			icon: <FontAwesomeIcon icon={faShoppingBag} color="black" />,
		},
		{name: 'Change Password', icon: <FontAwesomeIcon icon={faKey} color="black" />},
	];

	return (
		<nav className="divide-x w-64 bg-white min-h-96 rounded-lg">
			<ul className="">
				{links.map((link, index) => (
					<li
						key={index}
						className={`text-left md:cursor-pointer px-10 py-5 flex ${
							active === link.name ? 'text-primary' : 'text-black'
						} ${active === link.name ? 'text-lg' : ''}`}
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
	);
};

export default NavbarProfile;
