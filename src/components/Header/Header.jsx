import React, {useEffect, useState} from 'react';

import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Badge} from 'antd';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {GetCartFinishSelector, GetCartSelector} from '../../redux/selectors';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';

export const Header = () => {
	const cart = useSelector(GetCartSelector);
	const cartFinish = useSelector(GetCartFinishSelector);

	// const [cartFinish, setCartFinish] = useState(() => {
	// 	// Lấy cartFinish từ localStorage
	// 	const storedCartFinish = localStorage.getItem('cartFinish');

	// 	// Parse dữ liệu nếu tồn tại, nếu không thì trả về mảng rỗng
	// 	try {
	// 		return storedCartFinish ? JSON.parse(storedCartFinish) : [];
	// 	} catch (error) {
	// 		console.error('Error parsing cartFinish from localStorage:', error);
	// 		return [];
	// 	}
	// });

	// const [cart, setCart] = useState(() => {
	// 	// Lấy cart từ localStorage
	// 	const storedCart = localStorage.getItem('cart');

	// 	// Parse dữ liệu nếu tồn tại, nếu không thì trả về mảng rỗng
	// 	try {
	// 		return storedCart ? JSON.parse(storedCart) : [];
	// 	} catch (error) {
	// 		console.error('Error parsing cart from localStorage:', error);
	// 		return [];
	// 	}
	// });
	const cartTotal = (cart?.length || 0) + (cartFinish?.length || 0);

	return (
		<nav className="bg-white">
			<div className="flex items-center font-semibold justify-around">
				<a href={'/'}>
					<img src={Logo} alt="logo" className="md:cursor-pointer max-h-12" />
				</a>
				<ul className="flex uppercase items-center gap-8">
					<li>
						<a href="/" className={`py-7 px-3 inline-block no-underline text-black`}>
							Trang chủ
						</a>
					</li>
					<NavLinks />
					<li>
						<a
							href="/customize/diamond-jewelry"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Đặt trang sức
						</a>
					</li>
					<li>
						<a
							href="/promotion"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Khuyến mãi
						</a>
					</li>
				</ul>
				{/* <div>
					<Search
						placeholder="Tìm kiếm sản phẩm..."
						onSearch={(value) => console.log(value)}
						style={{width: 400}}
					/>
				</div> */}
				<ul className="flex uppercase items-center gap-8">
					<li>
						<Link
							to="/favorite"
							className="my-7 mx-3 inline-block no-underline text-black"
						>
							<HeartOutlined />
						</Link>
					</li>
					<li>
						<Badge
							count={cartTotal}
							color="#dec986"
							className="my-7 mx-3 py-2 px-2 inline-block no-underline text-black"
						>
							<a href="/cart">
								<FontAwesomeIcon icon={faShoppingBag} />
							</a>
						</Badge>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
