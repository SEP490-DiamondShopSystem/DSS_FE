import React, {useState} from 'react';

import {UserOutlined} from '@ant-design/icons';
import {message, Popover} from 'antd';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
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
			sublinks: token
				? [
						{name: 'Thông tin', link: '/my-info'},
						{name: 'Đơn hàng của tôi', link: '/my-orders'},
						{name: 'Đơn thiết kế', link: '/request-customize'},
						{name: 'Thay đổi mật khẩu', link: '/change-password'},
						{name: 'Đăng xuất', action: showLogoutModal},
				  ]
				: [
						{name: 'Đăng nhập', action: showLoginModal},
						{name: 'Đăng ký', action: showSignInModal},
				  ],
		},
	];

	// Popover content rendering
	const content = (sublinks) => (
		<div>
			{sublinks.map((sl, subIndex) => (
				<li key={subIndex} className="text-base text-gray-600 my-2.5 whitespace-nowrap">
					{sl.link ? (
						<Link
							to={sl.link}
							onClick={() => handleLinkClick(sl.name)}
							className="hover:text-primary font-normal normal-case"
						>
							{sl.name}
						</Link>
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
	);

	return (
		<>
			{links.map((link) => (
				<div key={link.ref} className="relative">
					<Popover content={content(link.sublinks)} trigger="hover" placement="bottom">
						<div className="px-3 text-left md:cursor-pointer group">
							<div className="py-7 text-black">{link.icon}</div>
						</div>
					</Popover>
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
