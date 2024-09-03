import React, {useState} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom';
import LoginModal from '../LogModal/LoginModal';
import {getLocalStorage, removeLocalStorage, setLocalStorage} from '../../utils/localstorage';
import LogoutModal from '../LogModal/LogoutModal'; // Import LogoutModal
import {notifySuccess} from '../../utils/toast';
import SignInModal from '../LogModal/SignInModal';

const ActionLinks = () => {
	const token = localStorage.getItem('token');

	const navigate = useNavigate();

	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

	const showLoginModal = () => setIsLoginModalVisible(true);
	const hideLoginModal = () => setIsLoginModalVisible(false);

	const showSignInModal = () => setIsSignInModalVisible(true);
	const hideSignInModal = () => setIsSignInModalVisible(false);

	const showLogoutModal = () => setIsLogoutModalVisible(true);
	const hideLogoutModal = () => setIsLogoutModalVisible(false);

	const handleLogout = () => {
		removeLocalStorage('token');
		notifySuccess('Logout Successful!');
		hideLogoutModal();
		navigate('/');
	};

	const handleLinkClick = (page) => {
		localStorage.removeItem('header');
		setLocalStorage('lastVisitedPage', page);
	};

	const links = [
		{
			icon: <UserOutlined />,
			ref: 'diamond',
			submenu: true,
			sublinks: [
				{
					sublink: token
						? [
								{name: 'Profile', link: '/profile'},
								{name: 'Information', link: '/info'},
								{name: 'My Orders', link: '/my-orders'},
								{name: 'Logout', action: showLogoutModal},
						  ]
						: [
								{name: 'Login', action: showLoginModal},
								{name: 'SignIn', action: showSignInModal},
						  ],
				},
			],
		},
	];

	return (
		<>
			{links.map((link) => (
				<div key={link.ref} className="relative">
					<div className="px-3 text-left md:cursor-pointer group">
						<div className="py-7 text-black">{link.icon}</div>
						{link.submenu && (
							<div>
								<div className="absolute z-50 top-16 hidden group-hover:block hover:block">
									<div className="py-2">
										<div className="w-4 h-4 left-2 absolute mt-1 bg-white rotate-45 shadow-xl"></div>
									</div>
									<div className="bg-white p-3.5 flex flex-col items-start shadow-xl">
										{link.sublinks?.map((mySubLink, index) => (
											<div key={index}>
												{mySubLink.sublink?.map((sl, subIndex) => (
													<li
														key={subIndex}
														className="text-base text-gray-600 my-2.5 whitespace-nowrap"
													>
														{sl.link ? (
															<a
																href={sl.link}
																onClick={() =>
																	handleLinkClick(sl.name)
																}
																className="hover:text-primary font-normal normal-case"
															>
																{sl.name}
															</a>
														) : (
															<button
																onClick={sl.action}
																className="text-base text-gray-600 my-2.5 whitespace-nowrap bg-transparent border-0 md:cursor-pointer hover:text-primary font-normal normal-case"
															>
																{sl.name}
															</button>
														)}
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
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
			<LogoutModal
				visible={isLogoutModalVisible}
				onConfirm={handleLogout}
				onCancel={hideLogoutModal}
			/>
			<SignInModal isOpen={isSignInModalVisible} onClose={hideSignInModal} />
		</>
	);
};

export default ActionLinks;