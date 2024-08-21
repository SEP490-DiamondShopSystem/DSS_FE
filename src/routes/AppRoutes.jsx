import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import CouponPage from '../pages/CouponPage/CouponPage';
import React from 'react';

export const AppRouters = () => {
	return (
		<Routes>
			{/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
			<Route path="/" element={<HomePage />} />
			<Route path="/coupons" element={<CouponPage />} />

			{/* <Route path="/permission-denied" element={<PermissionDeniedPage />} />
				<Route path="*" element={<NotFoundPage />} /> */}
		</Routes>
	);
};
