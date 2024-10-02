import React from 'react';
import {Route, Routes} from 'react-router-dom';

import CartPage from '../pages/CartPage/CartPage';
import CheckOutPage from '../pages/CheckOutPage/CheckOutPage';
import CouponPage from '../pages/CouponPage/CouponPage';
import CustomizePage from '../pages/Customize';
import DiamondDetailPage from '../pages/DiamonDetailPage';
import DiamondSearchPage from '../pages/DiamondSearchPage';
import FinishProductPage from '../pages/FinishProductPage';
import HomeEarringPage from '../pages/Home/HomeEarringPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomePage from '../pages/Home/HomePage';
import RingSearchPage from '../pages/ProductPage/RingSearchPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductPage from '../pages/ProductPage';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import MyOrderPage from '../pages/ProfilePage/MyOrderPage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import PendantSearchPage from '../pages/ProductPage/PendantSearchPage';
import EarringSearchPage from '../pages/ProductPage/EarringSearchPage';

export const AppRouters = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/jewelry" element={<HomeJewelryPage />} />
			<Route path="/jewelry/design-your-own-earrings" element={<HomeEarringPage />} />
			<Route path="/coupons" element={<CouponPage />} />
			<Route path="/promotion" element={<PromotionPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/checkout" element={<CheckOutPage />} />
			<Route path="/my-orders" element={<MyOrderPage />} />
			<Route path="/my-info" element={<MyInfoPage />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/jewelry/all-jewelry" element={<ProductPage />} />
			<Route path="/jewelry/design-your-own-rings/setting/all" element={<RingSearchPage />} />
			<Route
				path="/jewelry/design-your-own-pendants/setting/all"
				element={<PendantSearchPage />}
			/>
			<Route
				path="/jewelry/design-your-own-earrings/setting/all"
				element={<EarringSearchPage />}
			/>
			<Route path="/diamond/search" element={<DiamondSearchPage />} />
			<Route
				path="/jewelry/design-your-own-rings/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route
				path="/jewelry/design-your-own-pendants/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route
				path="/jewelry/design-your-own-earrings/setting/:id"
				element={<ProductDetailPage />}
			/>
			<Route path="/diamond-detail/:id" element={<DiamondDetailPage />} />
			<Route path="/completed-jewelry/:id" element={<FinishProductPage />} />
			//Customize
			<Route path="/customize" element={<CustomizePage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
