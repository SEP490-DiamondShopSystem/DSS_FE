import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import ScrollToTop from '../components/ScrollToTop';
import BlogDetail from '../pages/BlogPage/BlogDetail';
import CartPage from '../pages/CartPage/CartPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import Invoice from '../pages/CheckoutPage/Invoice';
import CouponPage from '../pages/CouponPage/CouponPage';
import ChooseJewelrySetting from '../pages/Customize/ChooseJewelrySetting';
import JewelryCustomDetail from '../pages/Customize/JewelryDetailPage';
import DiamondDetailPage from '../pages/DiamonDetailPage';
import DiamondJewelryPage from '../pages/DiamondJewelryPage';
import DiamondSearchPage from '../pages/DiamondSearchPage';
import DiamondChoosePage from '../pages/DiamondSearchPage/DiamondChoose';
import FinishProductPage from '../pages/FinishProductPage';
import HomeEarringPage from '../pages/Home/HomeEarringPage';
import HomeJewelryPage from '../pages/Home/HomeJewelryPage';
import HomeNecklacePage from '../pages/Home/HomeNecklacePage';
import HomePage from '../pages/Home/HomePage';
import HomeRingPage from '../pages/Home/HomeRingPage';
import JewelryDetailPage from '../pages/JewelryDetailPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderErrorPage from '../pages/OrderInfo/OrderErrorPage';
import OrderSuccessPage from '../pages/OrderInfo/OrderSuccess';
import PaymentPage from '../pages/PaymentPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductPage from '../pages/ProductPage';
import EarringSearchPage from '../pages/ProductPage/EarringSearchPage';
import NecklaceSearchPage from '../pages/ProductPage/NecklaceSearchPage';
import RingSearchPage from '../pages/ProductPage/RingSearchPage';
import ChangePassword from '../pages/ProfilePage/ChangePassword';
import LockProduct from '../pages/ProfilePage/LockProduct';
import MyInfoPage from '../pages/ProfilePage/MyInfoPage';
import OrderPage from '../pages/ProfilePage/MyOrderPage';
import VerifyFailPage from '../pages/ProfilePage/VerifyPage/VerifyFailPage';
import VerifyPage from '../pages/ProfilePage/VerifyPage/VerifyPage';
import PromotionPage from '../pages/PromotionPage/PromotionPage';
import RequestCustomize from '../pages/RequestCustomize';
import MainDiamondPricePage from '../pages/DiamondPricePage/MainDiamondPricePage';
import SideDiamondPricePage from '../pages/DiamondPricePage/SideDiamondPricePage';

export const AppRouters = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/jewelry" element={<HomeJewelryPage />} />
				<Route path="/jewelry/design-your-own-earrings" element={<HomeEarringPage />} />
				<Route path="/jewelry/design-your-own-necklaces" element={<HomeNecklacePage />} />
				<Route path="/jewelry/design-your-own-rings" element={<HomeRingPage />} />
				<Route
					path="/jewelry/design-your-own-rings/setting/all"
					element={<RingSearchPage />}
				/>
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
				<Route
					path="/price-list/main"
					element={<MainDiamondPricePage />}
				/>
				<Route
					path="/price-list/side"
					element={<SideDiamondPricePage/>}
				/>
				<Route path="/jewelry/setting/:id" element={<ProductDetailPage />} />
				<Route path="/jewelry-model/search" element={<DiamondJewelryPage />} />
				<Route path="/jewelry-model/search/:id" element={<JewelryDetailPage />} />
				<Route path="/diamond-detail/:id" element={<DiamondDetailPage />} />
				<Route path="/completed-jewelry/:id" element={<FinishProductPage />} />
				<Route path="/jewelry/setting/all" element={<ProductPage />} />
				<Route path="/diamond/search" element={<DiamondSearchPage />} />
				<Route path="/diamond-choose/search" element={<DiamondChoosePage />} />
				<Route path="/jewelry-choose/search" element={<DiamondChoosePage />} />
				<Route path="/blog/:id" element={<BlogDetail />} />

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
					path="/customize/diamond-jewelry"
					element={
						<PrivateRoute roles={'customer'}>
							<ChooseJewelrySetting />
						</PrivateRoute>
					}
				/>
				<Route
					path="/customize/diamond-jewelry/:id"
					element={
						<PrivateRoute roles={'customer'}>
							<JewelryCustomDetail />
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
					path="/payment"
					element={
						<PrivateRoute roles={'customer'}>
							<PaymentPage />
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
				<Route path="/promotion" element={<PromotionPage />} />

				<Route
					path="/my-orders"
					element={
						<PrivateRoute roles={'customer'}>
							<OrderPage />
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
				<Route
					path="/request-customize"
					element={
						<PrivateRoute roles={'customer'}>
							<RequestCustomize />
						</PrivateRoute>
					}
				/>
				<Route
					path="/lock-product"
					element={
						<PrivateRoute roles={'customer'}>
							<LockProduct />
						</PrivateRoute>
					}
				/>

				<Route path="/verified" element={<VerifyPage />} />
				<Route path="/verify-failed" element={<VerifyFailPage />} />
				<Route path="/payment-success" element={<OrderSuccessPage />} />
				<Route path="/payment-error" element={<OrderErrorPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};
