import React from 'react';
import {Route, Routes} from 'react-router-dom';

import CouponPage from '../pages/CouponPage/CouponPage';
import DiamondSearch from '../pages/DiamondSearchPage/DiamondSearchPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomePage from '../pages/Home/HomePage';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import MyOrderPage from '../pages/ProfilePage/MyOrderPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import StepProgressBar from '../components/StepProgressBar/StepProgressBar';

export const AppRouters = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/jewelry" element={<HomeJewelryPage />} />
			<Route path="/coupons" element={<CouponPage />} />
			<Route path="/promotion" element={<PromotionPage />} />
			<Route
				path="/profile"
				element={
					<>
						<StepProgressBar />
						<ProfilePage />
					</>
				}
			/>
			<Route
				path="/my-orders"
				element={
					<>
						<StepProgressBar />
						<MyOrderPage />
					</>
				}
			/>
			<Route
				path="/my-info"
				element={
					<>
						<StepProgressBar />
						<MyInfoPage />
					</>
				}
			/>
			<Route path="/diamond-lab/search" element={<DiamondSearch />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
