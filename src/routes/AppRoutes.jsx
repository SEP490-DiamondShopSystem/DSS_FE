import React from 'react';
import {Route, Routes} from 'react-router-dom';

import StepProgressBar from '../components/StepProgressBar/StepProgressBar';
import CouponPage from '../pages/CouponPage/CouponPage';
import DiamondLabPage from '../pages/DiamondLabPage/DiamondLabPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomePage from '../pages/Home/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import MyOrderPage from '../pages/ProfilePage/MyOrderPage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import DiamondSearchPage from '../pages/DiamondSearchPage';
import JewelrySearchPage from '../pages/JewelrySearchPage';
import ProductDetailPage from '../pages/ProductDetailPage';

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
			<Route path="/diamond-lab/search" element={<DiamondLabPage />} />
			<Route path="/jewelry/search" element={<JewelrySearchPage />} />
			<Route
				path="/jewelry/design-your-own-ring/:id"
				element={
					<>
						<StepProgressBar />
						<ProductDetailPage />
					</>
				}
			/>
			<Route
				path="/diamond/search"
				element={
					<>
						<StepProgressBar />
						<DiamondSearchPage />
					</>
				}
			/>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
