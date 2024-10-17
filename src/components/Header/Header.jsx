import React from 'react';

import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Badge} from 'antd';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {GetCartFinishSelector} from '../../redux/selectors';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';

export const Header = () => {
	function getUserId() {
		return localStorage.getItem('userId') || null;
	}
	const userId = getUserId();
	const localCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

	const cartFromRedux = useSelector((state) => {
		const cartByUserId = state.cartSlice?.cartByUserId || {};
		return cartByUserId[userId] || [];
	});
	const localCartFinish = JSON.parse(localStorage.getItem(`cartFinish_${userId}`)) || [];

	const cartFinishFromRedux = useSelector((state) => {
		const cartFinishByUserId = state.cartSlice?.cartFinishByUserId || {};
		return cartFinishByUserId[userId] || [];
	});

	const cart = localCart.length > 0 ? localCart : cartFromRedux;
	const cartFinish = localCart.length > 0 ? localCartFinish : cartFinishFromRedux;
	// const cart1 = JSON.parse(getLocalStorage(`cart_${getUserId()}`));

	const cartTotal = (cart?.length || 0) + (cartFinish?.length || 0);

	console.log(userId);

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
							href="/price-list"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Bảng giá
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
							<Link to="/cart">
								<FontAwesomeIcon icon={faShoppingBag} />
							</Link>
						</Badge>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
