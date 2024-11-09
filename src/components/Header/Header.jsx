import React, {useEffect, useState} from 'react';

import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
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
		const local = JSON.parse(localStorage.getItem(`cart_${userId}`));
		const transformedData = local?.map((productId, index) => ({
			id: Math.floor(1000000 + Math.random() * 9000000).toString(),
			jewelryId: productId.JewelryId || null,
			diamondId: productId.DiamondId || null,
			jewelryModelId: productId.ModelId || null,
			sizeId: productId?.SizeId || null,
			metalId: productId?.MetalId,
			sideDiamondChoices: [],
			engravedText: productId?.engravedText || null,
			engravedFont: productId?.engravedFont || null,
			warrantyCode:
				productId?.warrantyJewelry?.warrantyCode ||
				productId?.warrantyDiamond?.warrantyCode,
			warrantyType:
				productId?.warrantyJewelry?.warrantyType ||
				productId?.warrantyDiamond?.warrantyType,
		}));

		dispatch(handleCartValidate({promotionId: null, transformedData}));

		navigate('/cart');
	};

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
							Thiết Kế Trang Sức
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
						{/* <Badge
							count={cartTotal}
							color="#dec986"
							className="my-7 mx-3 py-2 px-2 inline-block no-underline text-black"
						> */}
						<button onClick={handleValidate}>
							<FontAwesomeIcon icon={faShoppingBag} />
						</button>
						{/* </Badge> */}
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
