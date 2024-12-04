import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Typography, Card, Table, message} from 'antd';
import 'antd/dist/reset.css';
import {fetchAccountRule} from '../../redux/slices/configSlice';
import {selectIsLoading, selectConfigError} from '../../redux/selectors';

const {Title, Text} = Typography;

const LoyalCustomerPolicyPage = () => {
	const dispatch = useDispatch();
	const [accountRule, setAccountRule] = useState(null);

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectConfigError);
	const formatNumber = (value) => {
		if (value !== undefined && value !== null) {
			return value.toLocaleString(); // This formats the number with commas
		}
		return value;
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const account = await dispatch(fetchAccountRule()).unwrap();
				setAccountRule(account);
			} catch (err) {
				message.error('Failed to fetch account configuration data.');
			}
		};
		fetchData();
	}, [dispatch]);

	const columns = [
		{
			title: 'Hạng Mức',
			dataIndex: 'rank',
			key: 'rank',
		},
		{
			title: 'Giảm Giá Đơn Hàng (%)',
			dataIndex: 'orderDiscount',
			key: 'orderDiscount',
		},
		{
			title: 'Giảm Tối Đa (VND)',
			dataIndex: 'maxDiscount',
			key: 'maxDiscount',
		},
		{
			title: 'Giảm Phí Vận Chuyển (%)',
			dataIndex: 'shippingDiscount',
			key: 'shippingDiscount',
		},
	];

	const rankData = [
		{
			rank: 'Hạng Đồng',
			orderDiscount: formatNumber(
				accountRule?.BronzeRankBenefit?.RankDiscountPercentOnOrder ?? 'N/A'
			),
			maxDiscount: formatNumber(
				accountRule?.BronzeRankBenefit?.MaxAmountDiscountOnOrder ?? 'N/A'
			),
			shippingDiscount: formatNumber(
				accountRule?.BronzeRankBenefit?.RankDiscountPercentOnShipping ?? 'N/A'
			),
		},
		{
			rank: 'Hạng Bạc',
			orderDiscount: formatNumber(
				accountRule?.SilverRankBenefit?.RankDiscountPercentOnOrder ?? 'N/A'
			),
			maxDiscount: formatNumber(
				accountRule?.SilverRankBenefit?.MaxAmountDiscountOnOrder ?? 'N/A'
			),
			shippingDiscount: formatNumber(
				accountRule?.SilverRankBenefit?.RankDiscountPercentOnShipping ?? 'N/A'
			),
		},
		{
			rank: 'Hạng Vàng',
			orderDiscount: formatNumber(
				accountRule?.GoldRankBenefit?.RankDiscountPercentOnOrder ?? 'N/A'
			),
			maxDiscount: formatNumber(
				accountRule?.GoldRankBenefit?.MaxAmountDiscountOnOrder ?? 'N/A'
			),
			shippingDiscount: formatNumber(
				accountRule?.GoldRankBenefit?.RankDiscountPercentOnShipping ?? 'N/A'
			),
		},
	];

	if (isLoading) return <p className="text-center text-lg">Đang tải...</p>;
	if (error)
		return (
			<p className="text-center text-red-500">
				Lỗi tải chính sách khách hàng thân thiết: {error}
			</p>
		);

	return (
		<div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
			<Title level={2} className="text-center text-gray-800 mb-8">
				Khách Hàng Thân Thiết
			</Title>

			<Card>
				<Text strong className="block mb-4">
					Khi trở thành khách hàng thân thiết tại cửa hàng, bạn sẽ nhận được nhiều ưu đãi
					hấp dẫn tùy theo hạng mức tài khoản:
				</Text>

				<Table
					columns={columns}
					dataSource={rankData}
					pagination={false}
					bordered
					rowKey="rank"
				/>

				<div className="mt-6">
					<Text strong>Tăng hạng:</Text>
					<p>
						Mỗi đơn hàng thành công sẽ nhận được{' '}
						<strong>{formatNumber(accountRule?.VndPerPoint ?? 'N/A')} VND</strong> = 1
						điểm tích lũy.
					</p>
					<p>
						Hạng mức tài khoản sẽ dựa trên số điểm tích lũy:
						<ul className="list-disc pl-6">
							<li>
								Hạng Đồng: {formatNumber(accountRule?.TotalPointToBronze ?? 'N/A')}{' '}
								điểm
							</li>
							<li>
								Hạng Bạc: {formatNumber(accountRule?.TotalPointToSilver ?? 'N/A')}{' '}
								điểm
							</li>
							<li>
								Hạng Vàng: {formatNumber(accountRule?.TotalPointToGold ?? 'N/A')}{' '}
								điểm
							</li>
						</ul>
					</p>
				</div>
			</Card>
		</div>
	);
};

export default LoyalCustomerPolicyPage;
