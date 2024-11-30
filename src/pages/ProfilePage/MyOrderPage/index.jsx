import React, {useEffect, useState} from 'react';
import NavbarProfile from '../../../components/NavbarProfile';
import {LoadingOrderSelector} from '../../../redux/selectors';
import {Helmet} from 'react-helmet';
import {useSelector} from 'react-redux';
import {Select} from 'antd';
import MyOrderPage from './MyOrderPage';
import RequestCustomize from '../../RequestCustomize';

const {Option} = Select;

const OrderPage = () => {
	const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsLgScreen(window.innerWidth >= 1024);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				{isLgScreen && (
					<div className="lg:mr-20 mb-10 lg:mb-0">
						<NavbarProfile />
					</div>
				)}
				<div className="font-semibold w-full px-5 md:px-10 lg:px-20 py-10 bg-white rounded-lg lg:shadow-lg">
					<MyOrderPage />
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
