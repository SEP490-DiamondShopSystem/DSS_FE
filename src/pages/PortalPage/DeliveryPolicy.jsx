import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Typography, Card, Divider} from 'antd';
import {fetchLocationRule, fetchOrderRule} from '../../redux/slices/configSlice';
import {selectIsLoading, selectConfigError} from '../../redux/selectors';

const {Title, Text} = Typography;

const ShippingPolicy = () => {
	const dispatch = useDispatch();
	const [locationRule, setLocationRule] = useState(null);
	const [orderRule, setOrderRule] = useState(null);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectConfigError);

	useEffect(() => {
		const fetchDeliveryData = async () => {
			try {
				const [location, order] = await Promise.all([
					dispatch(fetchLocationRule()).unwrap(),
					dispatch(fetchOrderRule()).unwrap(),
				]);

				setLocationRule(location || {});
				setOrderRule(order || {});
			} catch (error) {
				message.error('Failed to fetch delivery configuration data.');
				console.error('Fetch error:', error);
			}
		};
		fetchDeliveryData();
	}, [dispatch]);

	if (isLoading)
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg text-gray-600">Đang tải...</p>
			</div>
		);

	if (error)
		return (
			<div className="text-center mt-10">
				<p className="text-lg text-red-500">Lỗi tải điều khoản giao hàng: {error}</p>
			</div>
		);

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
			<Title level={2} className="text-center mb-6 text-indigo-700">
				Chính Sách Giao Hàng
			</Title>

			<Card className="mb-6">
				<div className="mb-8">
					<Title level={4} className="text-gray-700 mb-2">
						Nội thành TP. Hồ Chí Minh
					</Title>
					<Text className="block text-gray-600 mb-2">Miễn phí giao hàng</Text>
					<Text className="block text-gray-600">
						Với đơn hàng đặt cọc nhận tại cửa hàng, khách hàng vui lòng nhận trong{' '}
						<span className="text-indigo-600">
							{orderRule?.DaysWaitForCustomerToPay || 'X'}
						</span>{' '}
						ngày kể từ lúc đơn hàng đã được chuẩn bị xong.
					</Text>
				</div>

				<Divider />

				<div className="mb-8">
					<Title level={4} className="text-gray-700 mb-2">
						Các thành phố khác
					</Title>
					<Text className="block text-gray-600 mb-2">
						Cước phí giao hàng sẽ được tính dựa theo địa chỉ nhận hàng.
					</Text>
					<Text className="block text-gray-600">
						Thời gian nhận hàng có thể chậm hơn dự kiến.
					</Text>
				</div>

				<Divider />

				<div>
					<Title level={4} className="text-gray-700 mb-2">
						Yêu cầu giao lại
					</Title>
					<Text className="block text-gray-600 mb-2">
						Khách hàng được quyền yêu cầu giao lại cho mỗi đơn hàng{' '}
						<strong>
							tối đa{' '}
							<span className="text-indigo-600">
								{orderRule?.MaxRedelivery || 'X'}
							</span>{' '}
						</strong>
						lần yêu cầu giao lại.
					</Text>
					<Text className="block text-gray-600">
						Nếu vượt số lần yêu cầu mà đơn hàng vẫn giao thất bại, đơn hàng sẽ được tính
						như khách hàng đã hủy đơn.
					</Text>
				</div>
			</Card>
		</div>
	);
};

export default ShippingPolicy;
