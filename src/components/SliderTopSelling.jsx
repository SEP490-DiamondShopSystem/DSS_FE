import React, {useEffect, useState} from 'react';
import {Card, Carousel, Rate, Typography} from 'antd';
import {StarFilled} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJewelryModel} from '../redux/slices/jewelrySlice';
import {GetAllJewelryModelSelector} from '../redux/selectors';
import logoJewelry from '../assets/ring_classic.png';
import {formatPrice, StarRating} from '../utils';

const {Text, Title} = Typography;

const SliderTopSelling = () => {
	const dispatch = useDispatch();
	const jewelryModelList = useSelector(GetAllJewelryModelSelector);

	const [jewelryModel, setJewelryModel] = useState();

	console.log('jewelryModel', jewelryModel);

	useEffect(() => {
		dispatch(getAllJewelryModel({page: 2}));
	}, []);

	useEffect(() => {
		if (jewelryModelList) {
			setJewelryModel(jewelryModelList?.Values);
		}
	}, [jewelryModelList]);

	return (
		<div style={{padding: '20px'}} className="">
			<Title level={3} className="text-center">
				Trang Sức Nổi Bật
			</Title>
			<div className="grid grid-cols-5 gap-4 bg-tintWhite p-5">
				{Array.isArray(jewelryModel) &&
					jewelryModel?.slice(0, 5).map((product, index) => (
						<Card
							hoverable
							key={index}
							style={{width: '100%'}}
							cover={
								<img
									alt={product.Name}
									src={product.ThumbnailPath || logoJewelry}
								/>
							}
							title={product.Name}
						>
							<div className="flex flex-col">
								<div className="mb-5">
									<Rate allowHalf defaultValue={product?.StarRating} disabled />
								</div>
								<div>
									<Text strong>{formatPrice(product.MinPrice)}</Text> -{' '}
									<Text strong>{formatPrice(product.MaxPrice)}</Text>
								</div>
							</div>
							<div style={{marginTop: '10px'}}>
								{/* Uncomment nếu cần sử dụng */}
								{/* <Text>
									<StarRating rating={product?.StarRating} />
								</Text> */}
							</div>
						</Card>
					))}
			</div>
		</div>
	);
};

export default SliderTopSelling;
