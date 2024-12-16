import {Card, Typography} from 'antd';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {GetLockProductSelector, GetUserDetailSelector} from '../../redux/selectors';
import {getProductLock} from '../../redux/slices/diamondSlice';
import {formatPrice} from '../../utils';
import NavbarProfile from '../../components/NavbarProfile';

const {Title} = Typography;

const LockProduct = () => {
	const dispatch = useDispatch();
	const lockProductList = useSelector(GetLockProductSelector);
	const userDetail = useSelector(GetUserDetailSelector);

	useEffect(() => {
		dispatch(getProductLock(userDetail?.Id));
	}, [userDetail?.Id, dispatch]);

	return (
		<div>
			<Helmet>
				<title>Sản Phẩm Đã Khóa</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg shadow-lg">
					<Title level={2} className="text-center">
						Danh Sách Sản Phẩm Đã Khóa Của Bạn
					</Title>
					<div className="grid grid-cols-3 my-10 ">
						{Array.isArray(lockProductList) &&
							lockProductList.map((product) => (
								<Card
									key={product?.Id}
									hoverable
									style={{width: 300, marginBottom: '16px'}}
									className="mx-auto"
									cover={
										<img
											alt={product?.Title}
											src={`${
												product?.Thumbnail ||
												'https://via.placeholder.com/300'
											}`}
										/>
									}
								>
									<Card.Meta
										title={product.Title}
										description={`Mã sê-ri: ${
											product.DiamondShape.ShapeName
										} | Giá: ${formatPrice(product.SalePrice)} `} // You can modify this description
									/>
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LockProduct;
