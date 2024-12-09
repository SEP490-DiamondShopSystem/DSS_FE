import React, {useEffect, useState} from 'react';

import {Card, Col, Layout, Row, Space, Typography} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {useDispatch, useSelector} from 'react-redux';
import {GetPromotionSelector} from '../../redux/selectors';
import {getAllPromo} from '../../redux/slices/promotionSlice';

const {Title} = Typography;

const PromotionPage = () => {
	const dispatch = useDispatch();
	const promotionList = useSelector(GetPromotionSelector);

	const [promo, setPromo] = useState();

	useEffect(() => {
		dispatch(getAllPromo());
	}, []);

	useEffect(() => {
		if (promotionList) {
			setPromo(promotionList);
		}
	}, [promotionList]);

	return (
		<div>
			<Title level={2} className="text-center my-10">
				Danh sách khuyến mãi hiện có trong cửa hàng
			</Title>
			<Layout className="mx-20">
				{Array.isArray(promo) &&
					promo?.map((item) => (
						<Card className="m-5 shadow-xl" bordered={false}>
							<Row justify="center" align="middle" className="promotion-banner-row">
								<Col span={24} className="promotion-banner-image">
									<img
										src="https://via.placeholder.com/800x250"
										alt="Promotion"
										className="promotion-image"
									/>
								</Col>
							</Row>
							<div className="mt-5">
								<div className="promotion-footer">{item?.Name}</div>
								<div className="italic">
									Diễn ra từ {item?.StartDate} đến {item?.EndDate}
								</div>
								<div className="promotion-description">{item?.Description}</div>
							</div>
						</Card>
					))}
			</Layout>
		</div>
	);
};

export default PromotionPage;
