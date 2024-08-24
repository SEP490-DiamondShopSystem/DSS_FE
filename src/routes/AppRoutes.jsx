import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import CouponPage from '../pages/CouponPage/CouponPage';
import React from 'react';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

export const AppRouters = () => {
	return (
		<Routes>
			{/* USER */}
			<Route path="/" element={<HomePage />} />
			<Route path="/coupons" element={<CouponPage />} />
			<Route path="/promotion" element={<PromotionPage />} />
			<Route path="/profile" element={<ProfilePage />} />

			{/* <Route path="/permission-denied" element={<PermissionDeniedPage />} />
				<Route path="*" element={<NotFoundPage />} /> */}
		</Routes>
	);
};
