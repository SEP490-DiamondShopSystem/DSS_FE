import React, {useState} from 'react';
import NavbarProfile from '../../../components/NavbarProfile';
import {LoadingOrderSelector} from '../../../redux/selectors';
import {Helmet} from 'react-helmet';
import {useSelector} from 'react-redux';
import {Select} from 'antd';
import MyOrderPage from './MyOrderPage';
import RequestCustomize from '../../RequestCustomize';

const {Option} = Select;

const OrderPage = () => {
	const loading = useSelector(LoadingOrderSelector);

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg shadow-lg">
					<MyOrderPage />
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
