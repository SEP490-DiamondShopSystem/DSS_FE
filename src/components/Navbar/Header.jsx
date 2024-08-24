import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import NavLinks from './NavLinks';
import Logo from './../../assets/logo-example.png';
import ActionLinks from './ActionLinks';
import Search from 'antd/es/input/Search';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';

export const Header = () => {
	// const [darkMode, setDarkMode] = useState(false);

	// const toggleDarkMode = () => {
	// 	setDarkMode(!darkMode);
	// };

	return (
		// <header className={`${styles.header} ${darkMode ? styles['dark-mode'] : ''}`}>
		// 	<div className={styles.container}>
		// 		{/* Logo */}
		// 		<div className={styles.leftHeader}>
		// 			<div className={styles.logo}>
		// 				<Link to="/">Logo</Link>
		// 			</div>

		// 			{/* Menu */}
		// 			<MenuHeader />
		// 		</div>

		// 		{/* Icons */}
		// 		<div className={styles.icons}>
		// 			<div className={styles.icon}>
		// 				<Search
		// 					placeholder="Search for product..."
		// 					onSearch={(value) => console.log(value)}
		// 					style={{width: 400}}
		// 				/>
		// 			</div>
		// 			<div className={styles.icon}>
		// 				<HeartOutlined />
		// 			</div>
		// 			<div className={styles.icon}>
		// 				<ShoppingCartOutlined />
		// 			</div>
		// 			<div className={styles.icon}>
		// 				<UserOutlined />
		// 			</div>
		// 		</div>

		// 		{/* Dark Mode Toggle */}
		// 		{/* <button
		// 			onClick={toggleDarkMode}
		// 			className={`${styles['dark-mode-toggle']} ${
		// 				darkMode ? styles['dark-mode'] : ''
		// 			}`}
		// 		>
		// 			{darkMode ? 'Light Mode' : 'Dark Mode'}
		// 		</button> */}
		// 	</div>
		// </header>
		<nav className="bg-white">
			<div className="flex items-center font-medium justify-around">
				<div>
					<img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
				</div>
				<ul className="flex uppercase items-center gap-8 font-[Open sans]">
					<li>
						<Link to="/" className="py-7 px-3 inline-block no-underline text-black">
							Home
						</Link>
					</li>
					<NavLinks />
					<li>
						<Link
							to="/promotion"
							className="py-7 px-3 inline-block no-underline text-black"
						>
							Promotion
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className="py-7 px-3 inline-block no-underline text-black"
						>
							Contact
						</Link>
					</li>
				</ul>
				<div>
					<Search
						placeholder="Search for product..."
						onSearch={(value) => console.log(value)}
						style={{width: 400}}
					/>
				</div>
				<ul className="flex uppercase items-center gap-8 font-[Open sans]">
					<li>
						<Link
							to="/favorite"
							className="py-7 px-3 inline-block no-underline text-black"
						>
							<HeartOutlined />
						</Link>
					</li>
					<li>
						<Link to="/cart" className="py-7 px-3 inline-block no-underline text-black">
							<ShoppingCartOutlined />
						</Link>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
