import React, {useEffect, useState} from 'react';

import DiscountTable from './DiscountTable';
import {useDispatch} from 'react-redux';
import {getAllDiscount} from '../../redux/slices/promotionSlice';
import {Typography} from 'antd';

const {Title} = Typography;

const DiscountPage = () => {
	const dispatch = useDispatch();
	const [discounts, setDiscounts] = useState();

	console.log('discount', discounts);

	useEffect(() => {
		dispatch(getAllDiscount())
			.unwrap()
			.then((res) => {
				setDiscounts(res);
			})
			.catch((error) => {});
	}, []);

	return (
		<div className="mx-20">
			<Title level={2} className="text-center my-10">
				Danh sách giảm giá hiện có trong cửa hàng
			</Title>
			<DiscountTable discounts={discounts} />
		</div>
	);
};

export default DiscountPage;
