import React from 'react';
import {Route, Routes} from 'react-router-dom';

import CartPage from '../pages/CartPage/CartPage';
import CheckOutPage from '../pages/CheckOutPage/CheckOutPage';
import CouponPage from '../pages/CouponPage/CouponPage';
import ChooseJewelrySetting from '../pages/Customize/ChooseJewelrySetting';
import JewelryCustomDetail from '../pages/Customize/JewelryDetailPage';
import DiamondDetailPage from '../pages/DiamonDetailPage';
import DiamondSearchPage from '../pages/DiamondSearchPage';
import FinishProductPage from '../pages/FinishProductPage';
import HomeEarringPage from '../pages/Home/HomeEarringPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomeNecklacePage from '../pages/Home/HomeNecklacePage';
import HomePage from '../pages/Home/HomePage';
import HomeRingPage from '../pages/Home/HomeRingPage';
import JewelryDetailPage from '../pages/JewelryDetailPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductPage from '../pages/ProductPage';
import EarringSearchPage from '../pages/ProductPage/EarringSearchPage';
import NecklaceSearchPage from '../pages/ProductPage/NecklaceSearchPage';
import RingSearchPage from '../pages/ProductPage/RingSearchPage';
import ChangePassword from '../pages/ProfilePage/ChangePassword';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import MyOrderPage from '../pages/ProfilePage/MyOrderPage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';

export const AppRouters = () => {
	return (
		<Routes>
			//HOME
			<Route path="/" element={<HomePage />} />
			<Route path="/jewelry" element={<HomeJewelryPage />} />
			<Route path="/jewelry/design-your-own-earrings" element={<HomeEarringPage />} />
			<Route path="/jewelry/design-your-own-necklaces" element={<HomeNecklacePage />} />
			<Route path="/jewelry/design-your-own-rings" element={<HomeRingPage />} />
			//PROFILE
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/my-orders" element={<MyOrderPage />} />
			<Route path="/my-info" element={<MyInfoPage />} />
			<Route path="/change-password" element={<ChangePassword />} />
			//DESIGN
			<Route path="/jewelry/design-your-own-rings/setting/all" element={<RingSearchPage />} />
			<Route
				path="/jewelry/design-your-own-necklaces/setting/all"
				element={<NecklaceSearchPage />}
			/>
			<Route
				path="/jewelry/design-your-own-earrings/setting/all"
				element={<EarringSearchPage />}
			/>
			//DETAIL
			<Route
				path="/jewelry/design-your-own-rings/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route
				path="/jewelry/design-your-own-necklaces/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route
				path="/jewelry/design-your-own-earrings/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route path="/jewelry/diamond-jewelry/:id" element={<JewelryDetailPage />} />
			<Route path="/diamond-detail/:id" element={<DiamondDetailPage />} />
			<Route path="/completed-jewelry/:id" element={<FinishProductPage />} />
			//Customize
			<Route path="/customize/choose-jewelry" element={<ChooseJewelrySetting />} />
			<Route path="/customize/choose-jewelry/:id" element={<JewelryCustomDetail />} />
			<Route path="/customize/choose-diamond" element={<ChooseJewelrySetting />} />
			<Route path="/customize/choose-diamond/:id" element={<ChooseJewelrySetting />} />
			//
			<Route path="/cart" element={<CartPage />} />
			<Route path="/jewelry/all-jewelry" element={<ProductPage />} />
			<Route path="/diamond/search" element={<DiamondSearchPage />} />
			<Route path="/checkout" element={<CheckOutPage />} />
			<Route path="/coupons" element={<CouponPage />} />
			<Route path="/promotion" element={<PromotionPage />} />
			//NOT FOUND
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
