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
	const [changeTable, setChangeTable] = useState(false);

	const handleChange = (value) => {
		setChangeTable(value);
	};

	console.log(changeTable);

	return (
		<div>
			<Helmet>
				<title>Đơn Hàng Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 bg-white rounded-lg">
					<Select className="w-40 mb-10" onChange={handleChange} value={changeTable}>
						<Option value={false}>Đơn Thường</Option>
						<Option value={true}>Đơn Thiết Kế</Option>
					</Select>
					{changeTable ? <RequestCustomize /> : <MyOrderPage />}
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
