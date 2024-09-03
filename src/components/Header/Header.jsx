import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Search from 'antd/es/input/Search';
import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';

export const Header = () => {
	return (
		<nav className="bg-white">
			<div className="flex items-center font-semibold justify-around">
				<div>
					<img src={Logo} alt="logo" className="md:cursor-pointer max-h-12" />
				</div>
				<ul className="flex uppercase items-center gap-8">
					<li>
						<Link
							to="/"
							className={`py-7 px-3 inline-block no-underline text-black`}
							onClick={() => handleLinkClick('Home')}
						>
							Home
						</Link>
					</li>
					<NavLinks />
					<li>
						<Link
							to="/promotion"
							className={`py-7 px-3 inline-block no-underline text-black`}
							onClick={() => handleLinkClick('Promotion')}
						>
							Promotion
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className={`py-7 px-3 inline-block no-underline text-black
							`}
							onClick={() => handleLinkClick('Contact')}
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
							<FontAwesomeIcon icon={faShoppingBag} />
						</Link>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
