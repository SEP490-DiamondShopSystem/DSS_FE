import React, {useEffect, useState} from 'react';
import {Card, Carousel, Col, Rate, Row, Typography} from 'antd';
import {StarFilled} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJewelryModel} from '../redux/slices/jewelrySlice';
import {GetAllJewelryModelSelector} from '../redux/selectors';
import logoJewelry from '../assets/ring_classic.png';
import {formatPrice, StarRating} from '../utils';
import {useNavigate} from 'react-router-dom';

const {Text, Title} = Typography;

const SliderTopSelling = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jewelryModelList = useSelector(GetAllJewelryModelSelector);

	const [isMobile, setIsMobile] = useState(false);
	const [jewelryModel, setJewelryModel] = useState();

	const handleResize = () => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	// Add event listener to detect window resize
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize(); // Check size on initial render
		return () => window.removeEventListener('resize', handleResize); // Cleanup listener
	}, []);

	useEffect(() => {
		dispatch(getAllJewelryModel({page: 2}));
	}, []);

	useEffect(() => {
		if (jewelryModelList) {
			setJewelryModel(jewelryModelList?.Values);
		}
	}, [jewelryModelList]);

	const jewelryItems = Array.isArray(jewelryModel) ? jewelryModel.slice(0, 6) : [];
	const onProductClick = (product) =>
		navigate(`/jewelry-model/search/${product?.JewelryModelId}`, {state: {jewelry: product}});
	return (
		<div className="p-5">
			<Title level={3} className="text-center mb-5">
				Mẫu Trang Sức Nổi Bật
			</Title>

			{isMobile ? (
				<Carousel autoplay dots draggable className="w-full">
					{jewelryItems.map((product, index) => (
						<div key={index} className="p-2">
							<Card
								hoverable
								className="w-full"
								cover={
									<img
										alt={product.Name}
										src={
											product?.Thumbnail?.MediaPath
												? product.Thumbnail.MediaPath
												: logoJewelry
										}
										className="h-48 object-cover"
									/>
								}
								title={product.Name}
								onClick={() => onProductClick(product)}
							>
								<div className="flex flex-col">
									<div className="mb-4">
										<Rate
											allowHalf
											defaultValue={product?.StarRating}
											disabled
										/>
									</div>
									<div>
										<Text strong>{formatPrice(product.MinPrice)}</Text> -{' '}
										<Text strong>{formatPrice(product.MaxPrice)}</Text>
									</div>
								</div>
							</Card>
						</div>
					))}
				</Carousel>
			) : (
				// Grid for larger screens
				<Row gutter={[16, 24]} className="bg-tintWhite p-5">
					{jewelryItems.map((product, index) => (
						<Col
							key={index}
							xs={24} // Mobile view
							sm={12} // Tablet view
							md={8} // Medium screens
							lg={6} // Large screens
							xl={4} // Extra large screens
						>
							<Card
								hoverable
								className="w-full"
								cover={
									<img
										alt={product.Name}
										src={
											product?.Thumbnail?.MediaPath
												? product.Thumbnail.MediaPath
												: logoJewelry
										}
										className="h-48 object-cover"
									/>
								}
								title={product.Name}
								onClick={() => onProductClick(product)}
							>
								<div className="flex flex-col">
									<div className="mb-4">
										<Rate
											allowHalf
											defaultValue={product?.StarRating}
											disabled
										/>
									</div>
									<div>
										<Text strong>{formatPrice(product.MinPrice)}</Text> -{' '}
										<Text strong>{formatPrice(product.MaxPrice)}</Text>
									</div>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

export default SliderTopSelling;
