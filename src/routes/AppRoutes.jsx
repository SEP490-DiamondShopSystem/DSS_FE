import React from 'react';
import {Route, Routes} from 'react-router-dom';

import CartPage from '../pages/CartPage/CartPage';
import CouponPage from '../pages/CouponPage/CouponPage';
import CustomizePage from '../pages/Customize';
import DiamondDetailPage from '../pages/DiamonDetailPage';
import DiamondSearchPage from '../pages/DiamondSearchPage';
import FinishProductPage from '../pages/FinishProductPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomePage from '../pages/Home/HomePage';
import JewelrySearchPage from '../pages/JewelrySearchPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import MyOrderPage from '../pages/ProfilePage/MyOrderPage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';

export const AppRouters = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/jewelry" element={<HomeJewelryPage />} />
			<Route path="/coupons" element={<CouponPage />} />
			<Route path="/promotion" element={<PromotionPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/my-orders" element={<MyOrderPage />} />
			<Route path="/my-info" element={<MyInfoPage />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/jewelry/search" element={<JewelrySearchPage />} />
			<Route path="/diamond/search" element={<DiamondSearchPage />} />
			<Route path="/jewelry/design-your-own-ring/:id" element={<ProductDetailPage />} />
			<Route path="/diamond-detail/:id" element={<DiamondDetailPage />} />
			<Route path="/completed-jewelry/:id" element={<FinishProductPage />} />
			//Customize
			<Route path="/customize" element={<CustomizePage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
