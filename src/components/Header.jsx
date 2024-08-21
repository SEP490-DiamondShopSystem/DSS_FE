import {DownOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/Header.module.scss'; // Import file Sass
import {MenuHeader} from './Menu';

export const Header = () => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<header className={`${styles.header} ${darkMode ? styles['dark-mode'] : ''}`}>
			<div className={styles.container}>
				{/* Logo */}
				<div className={styles.leftHeader}>
					<div className={styles.logo}>
						<Link to="/">Logo</Link>
					</div>

					{/* Menu */}
					<MenuHeader />
				</div>

				{/* Icons */}
				<div className={styles.icons}>
					<div className={styles.icon}>
						<Search
							placeholder="Search for product..."
							onSearch={(value) => console.log(value)}
							style={{width: 400}}
						/>
					</div>
					<div className={styles.icon}>
						<HeartOutlined />
					</div>
					<div className={styles.icon}>
						<ShoppingCartOutlined />
					</div>
					<div className={styles.icon}>
						<UserOutlined />
					</div>
				</div>

				{/* Dark Mode Toggle */}
				{/* <button
					onClick={toggleDarkMode}
					className={`${styles['dark-mode-toggle']} ${
						darkMode ? styles['dark-mode'] : ''
					}`}
				>
					{darkMode ? 'Light Mode' : 'Dark Mode'}
				</button> */}
			</div>
		</header>
	);
};
