import React, {useEffect, useState} from 'react';

import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Badge, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {handleCartValidate} from '../../redux/slices/cartSlice';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';
import {getUserId} from '../GetUserId';

export const Header = () => {
	const userId = getUserId();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [productId, setProductId] = useState([]);

	const [localCart, setLocalCart] = useState(() => {
		return JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
	});
	useEffect(() => {
		const handleStorageChange = () => {
			const updatedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
			setLocalCart(updatedCart);
		};

		// Lắng nghe sự kiện 'storage' trên window
		window.addEventListener('storage', handleStorageChange);

		// Dọn dẹp khi component unmount
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [userId]);

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

	const cartTotal = (localCart?.length || 0) + (cartFinish?.length || 0);

	const handleValidate = () => {
		const local = JSON.parse(localStorage.getItem(`cart_${userId}`));
		const transformedData = local?.map((productId, index) => ({
			id: Math.floor(1000000 + Math.random() * 9000000).toString(),
			jewelryId: productId.Id || null,
			diamondId: productId.DiamondId || null,
			jewelryModelId: null,
			sizeId: null,
			metalId: null,
			sideDiamondChoices: [],
			engravedText: null,
			engravedFont: null,
		}));

		dispatch(handleCartValidate({promotionId: null, transformedData}));

		navigate('/cart');
	};

	console.log('localCart', localCart);

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
							<button onClick={handleValidate}>
								<FontAwesomeIcon icon={faShoppingBag} />
							</button>
						</Badge>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
