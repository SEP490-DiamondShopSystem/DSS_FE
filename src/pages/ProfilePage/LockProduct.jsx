import {Card} from 'antd';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {GetLockProductSelector, GetUserDetailSelector} from '../../redux/selectors';
import {getProductLock} from '../../redux/slices/diamondSlice';

const LockProduct = () => {
	const dispatch = useDispatch();
	const lockProductList = useSelector(GetLockProductSelector);
	const userDetail = useSelector(GetUserDetailSelector);

	console.log('lockProductList', lockProductList);

	useEffect(() => {
		dispatch(getProductLock(userDetail?.Id));
	}, [userDetail?.Id]);

	return (
		<div>
			<Helmet>
				<title>Sản Phẩm Đã Khóa</title>
			</Helmet>
			<Card
				hoverable
				style={{width: 300}}
				cover={<img alt="example" src="https://via.placeholder.com/300" />}
			>
				<Card.Meta title="Card Title" description="This is a description of the card" />
			</Card>
		</div>
	);
};

export default LockProduct;
