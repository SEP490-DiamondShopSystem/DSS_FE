import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';

import CartPage from '../pages/CartPage/CartPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import Invoice from '../pages/CheckoutPage/Invoice';
import CouponPage from '../pages/CouponPage/CouponPage';
import ChooseJewelrySetting from '../pages/Customize/ChooseJewelrySetting';
import JewelryCustomDetail from '../pages/Customize/JewelryDetailPage';
import DiamondDetailPage from '../pages/DiamonDetailPage';
import DiamondJewelryPage from '../pages/DiamondJewelryPage';
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
			<Route path="/" element={<HomePage />} />
			<Route path="/jewelry" element={<HomeJewelryPage />} />
			<Route path="/jewelry/design-your-own-earrings" element={<HomeEarringPage />} />
			<Route path="/jewelry/design-your-own-necklaces" element={<HomeNecklacePage />} />
			<Route path="/jewelry/design-your-own-rings" element={<HomeRingPage />} />
			<Route path="/jewelry/design-your-own-rings/setting/all" element={<RingSearchPage />} />
			<Route
				path="/jewelry/design-your-own-necklaces/setting/all"
				element={<NecklaceSearchPage />}
			/>
			<Route
				path="/jewelry/design-your-own-earrings/setting/all"
				element={<EarringSearchPage />}
			/>
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
			<Route path="/jewelry/diamond-jewelry" element={<DiamondJewelryPage />} />
			<Route path="/jewelry/diamond-jewelry/:id" element={<JewelryDetailPage />} />
			<Route path="/diamond-detail/:id" element={<DiamondDetailPage />} />
			<Route path="/completed-jewelry/:id" element={<FinishProductPage />} />
			<Route path="/customize/diamond-jewelry" element={<ChooseJewelrySetting />} />
			<Route path="/customize/diamond-jewelry/:id" element={<JewelryCustomDetail />} />

			<Route path="/jewelry/setting/all" element={<ProductPage />} />
			<Route path="/diamond/search" element={<DiamondSearchPage />} />

			{/* Private routes */}
			<Route
				path="/cart"
				element={
					<PrivateRoute roles={'customer'}>
						<CartPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/checkout"
				element={
					<PrivateRoute roles={'customer'}>
						<CheckoutPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/invoice"
				element={
					<PrivateRoute roles={'customer'}>
						<Invoice />
					</PrivateRoute>
				}
			/>
			<Route
				path="/coupons"
				element={
					<PrivateRoute roles={'customer'}>
						<CouponPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/promotion"
				element={
					<PrivateRoute roles={'customer'}>
						<PromotionPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoute roles={'customer'}>
						<ProfilePage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/my-orders"
				element={
					<PrivateRoute roles={'customer'}>
						<MyOrderPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/my-info"
				element={
					<PrivateRoute roles={'customer'}>
						<MyInfoPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/change-password"
				element={
					<PrivateRoute roles={'customer'}>
						<ChangePassword />
					</PrivateRoute>
				}
			/>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
