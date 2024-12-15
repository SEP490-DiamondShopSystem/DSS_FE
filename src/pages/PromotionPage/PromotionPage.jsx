import React, {useEffect, useState} from 'react';
import {Card, Col, Layout, Row, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {GetPromotionSelector} from '../../redux/selectors';
import {getAllPromo} from '../../redux/slices/promotionSlice';

const {Title, Text} = Typography;

const PromotionPage = () => {
	const dispatch = useDispatch();
	const promotionList = useSelector(GetPromotionSelector);
	const [promo, setPromo] = useState([]);

	useEffect(() => {
		dispatch(getAllPromo());
	}, [dispatch]);

	useEffect(() => {
		if (promotionList) {
			setPromo(promotionList);
		}
	}, [promotionList]);

	return (
		<div className=" min-h-screen my-5">
			<Title level={2} className="text-center text-2xl font-bold text-gray-800 mb-10">
				Danh sách khuyến mãi hiện có trong cửa hàng
			</Title>
			<Layout className="container mx-auto px-4 py-5">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.isArray(promo) &&
						promo?.map((item, index) => (
							<Card
								key={item?.Id || index}
								className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
								cover={
									<div className="h-48 overflow-hidden">
										<img
											src={item?.Thumbnail?.MediaPath}
											alt={item?.Thumbnail?.MediaName}
											className="w-full h-full object-cover"
										/>
									</div>
								}
							>
								<div className="space-y-2">
									<div className="text-lg font-semibold text-gray-900">
										{item?.Name}
									</div>
									<Text type="secondary" className="block italic text-sm">
										Diễn ra từ {item?.StartDate} đến {item?.EndDate}
									</Text>
									<div className="text-gray-700 mt-2">{item?.Description}</div>
								</div>
							</Card>
						))}
				</div>
			</Layout>
		</div>
	);
};

export default PromotionPage;
