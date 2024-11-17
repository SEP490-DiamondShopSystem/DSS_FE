import React, {useState} from 'react';

import {UserOutlined} from '@ant-design/icons';
import {message} from 'antd';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../redux/slices/userLoginSlice';
import {setLocalStorage} from '../../utils/localstorage';
import LoginModal from '../LogModal/LoginModal';
import LogoutModal from '../LogModal/LogoutModal';
import SignUpModal from '../LogModal/SignUpModal';

const ActionLinks = () => {
	const token = localStorage.getItem('accessToken');

	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		dispatch(logout());
		message.success('Đăng xuất thành công!');
		hideLogoutModal();
		navigate('/');
		window.location.reload();
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
								{name: 'Hồ sơ', link: '/profile'},
								{name: 'Thông tin', link: '/my-info'},
								{name: 'Đơn hàng của tôi', link: '/my-orders'},
								{name: 'Đơn thiết kế', link: '/request-customize'},
								{name: 'Đăng xuất', action: showLogoutModal},
						  ]
						: [
								{name: 'Đăng nhập', action: showLoginModal},
								{name: 'Đăng ký', action: showSignInModal},
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
								<div className="absolute z-50 top-20 hidden group-hover:block hover:block">
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
			<SignUpModal isOpen={isSignInModalVisible} onClose={hideSignInModal} />
		</>
	);
};

export default ActionLinks;
