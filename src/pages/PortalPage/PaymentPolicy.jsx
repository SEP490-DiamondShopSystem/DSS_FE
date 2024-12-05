import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Typography, Card} from 'antd';
import {
	fetchOrderRulePayment,
	fetchOrderRule,
	fetchShopBankAccountRule,
} from '../../redux/slices/configSlice';
import {selectIsLoading, selectConfigError} from '../../redux/selectors';

const {Title, Text} = Typography;

const PaymentPolicyPage = () => {
	const dispatch = useDispatch();
	const [paymentRule, setPaymentRule] = useState(null);
	const [orderRule, setOrderRule] = useState(null);
	const [bankRule, setBankRule] = useState(null);

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectConfigError);

	useEffect(() => {
		const fetchPaymentData = async () => {
			try {
				const [payment, order, bank] = await Promise.all([
					dispatch(fetchOrderRulePayment()).unwrap(),
					dispatch(fetchOrderRule()).unwrap(),
					dispatch(fetchShopBankAccountRule()).unwrap(),
				]);
				setPaymentRule(payment || {});
				setOrderRule(order || {});
				setBankRule(bank || {});
			} catch (error) {
				message.error('Failed to fetch payment configuration data.');
				console.error('Fetch error:', error);
			}
		};
		fetchPaymentData();
	}, [dispatch]);
	const formatNumber = (value) => {
		if (value !== undefined && value !== null) {
			return value.toLocaleString(); // This formats the number with commas
		}
		return value;
	};
	if (isLoading)
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg text-gray-600">Đang tải...</p>
			</div>
		);

	if (error)
		return (
			<div className="text-center mt-10">
				<p className="text-lg text-red-500">Lỗi tải điều khoản thanh toán: {error}</p>
			</div>
		);

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
			<Title level={2} className="text-center mb-6 text-indigo-700">
				Chính Sách Thanh Toán
			</Title>

			<Card className="mb-6">
				<div className="mb-8">
					<Title level={4} className="text-gray-700 mb-2">
						1. Hình Thức Thanh Toán
					</Title>
					<Text className="block text-gray-600 mb-2">
						<strong className="text-gray-700">a. Thanh Toán Hết:</strong> Khách hàng sẽ
						được yêu cầu trả một lần DUY NHẤT sau khi tạo đơn hàng.
					</Text>
					<Text className="block text-gray-600 mb-2">
						<strong className="text-gray-700">b. Thanh Toán Khi Nhận Hàng:</strong>{' '}
						Khách hàng trả trước{' '}
						<span className="text-indigo-600">{paymentRule?.CODPercent || 'X'}%</span>{' '}
						giá trị cho đơn hàng thường ({' '}
						<span className="text-indigo-600">
							{paymentRule?.DepositPercent || 'X'}%
						</span>{' '}
						cho đơn hàng thiết kế). Số tiền còn lại thanh toán bằng hình thức đã chọn.
					</Text>
				</div>

				<div className="mb-8">
					<Title level={4} className="text-gray-700 mb-2">
						2. Thanh Toán ZaloPay
					</Title>
					<Text className="block text-gray-600 mb-2">
						Hỗ trợ thanh toán khi nhận hàng cho đơn dưới{' '}
						<span className="text-indigo-600">
							{formatNumber(orderRule?.MaxOrderAmountForDelivery) || 'X'} VND
						</span>
						.
					</Text>
					<Text className="block text-gray-600">
						Hỗ trợ thanh toán hết cho đơn dưới{' '}
						<span className="text-indigo-600">
							{formatNumber(orderRule?.MaxOrderAmountForFullPayment) || 'X'} VND
						</span>
						.
					</Text>
				</div>

				<div>
					<Title level={4} className="text-gray-700 mb-2">
						3. Thanh Toán Chuyển Khoản Ngân Hàng
					</Title>
					<Text className="block text-gray-600 mb-2">
						Khách hàng thanh toán chuyển khoản qua số tài khoản{' '}
						<strong>
							{' '}
							{bankRule?.AccountNumber} {bankRule?.AccountName}
							{'('} {bankRule?.BankName}
							{')'}
						</strong>
						<br />
						Để lại thông tin: [HỌ VÀ TÊN] [ SĐT] [MÓN HÀNG].
					</Text>
					<Text className="block text-gray-600 mb-2">
						Khách hàng phải chuyển <strong>MỘT</strong> giao dịch duy nhất và đúng số
						tiền với yêu cầu thanh toán.
					</Text>
					<Text className="block text-gray-600 mb-2">
						Thời gian hoàn thành giao dịch là{' '}
						<span className="text-indigo-600">
							{orderRule?.ExpiredOrderHour || 'X'} giờ
						</span>
						. Sau khi chuyển khoản, vui lòng chụp kết quả giao dịch và gửi vào mục bằng
						chứng của đơn hàng.
					</Text>
					<Text className="block text-gray-600">
						Các giao dịch không hợp lệ sẽ được hoàn tiền về tài khoản ngân hàng đã thanh
						toán (phí giao dịch do người mua trả).
					</Text>
				</div>
			</Card>
		</div>
	);
};

export default PaymentPolicyPage;
