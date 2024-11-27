import React, {useEffect, useState} from 'react';

import {HeartOutlined, OrderedListOutlined} from '@ant-design/icons';
import {faListAlt, faPencilRuler, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {handleCartValidate} from '../../redux/slices/cartSlice';
import {getUserId} from '../GetUserId';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';

export const Header = () => {
	const userId = getUserId();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleValidate = () => {
		navigate('/cart');
	};

	return (
		<nav className="bg-white">
			<div className="flex items-center font-semibold justify-around">
				<Link to={'/'}>
					<img src={Logo} alt="logo" className="md:cursor-pointer max-h-12" />
				</Link>
				<ul className="flex uppercase items-center gap-8">
					<li>
						<Link to="/" className={`py-7 px-3 inline-block no-underline text-black`}>
							Trang chủ
						</Link>
					</li>
					<NavLinks />
					<li>
						<Link
							to="/customize/diamond-jewelry"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Thiết Kế Trang Sức
						</Link>
					</li>
					<li>
						<Link
							to="/promotion"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Khuyến mãi
						</Link>
					</li>
				</ul>

				<ul className="flex uppercase items-center gap-8">
					{/* <li>
						<button
							className="my-7 mx-3 inline-block no-underline text-black"
							onClick={() => navigate('/request-customize')}
						>
							<OrderedListOutlined />
						</button>
					</li> */}
					<li>
						<button onClick={handleValidate}>
							<FontAwesomeIcon icon={faShoppingBag} />
						</button>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
