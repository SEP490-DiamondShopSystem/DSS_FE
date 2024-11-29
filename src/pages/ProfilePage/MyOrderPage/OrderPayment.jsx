import React from 'react';
import {message, QRCode} from 'antd';
import {getUserOrderTransaction} from '../../../redux/slices/orderSlice';
import {useDispatch} from 'react-redux';

export const OrderPayment = ({order}) => {
	const dispatch = useDispatch();
	if (!order) {
		return <div className="text-center text-gray-500">Không có dữ liệu đơn hàng.</div>;
	}

	const toggleTransactionModal = (id) => {
		dispatch(getUserOrderTransaction(id))
			.unwrap()
			.then((res) => {
				window.open(res?.PaymentUrl, '_blank');
			})
			.catch((error) => {
				message.error(error?.data?.title || error?.title);
			});
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-md mb-10 mx-auto">
			{order?.PaymentMethodId === '1' && (
				<div className="bank-payment">
					<h3 className="text-xl font-semibold mb-4">Chuyển khoản ngân hàng</h3>
					<div className="space-y-2">
						<p>
							<strong className="text-gray-700">Tên ngân hàng:</strong>{' '}
							{order.bankName || 'Vietcombank'}
						</p>
						<p>
							<strong className="text-gray-700">Số tài khoản:</strong>{' '}
							{order.accountNumber || '4524041843644629'}
						</p>
						<p>
							<strong className="text-gray-700">Tên người nhận:</strong>{' '}
							{order.accountHolder || 'Võ Tấn Tài'}
						</p>
						<p>
							<strong className="text-gray-700">Ghi chú:</strong>{' '}
							{order.transferNote ||
								'Vui lòng ghi mã đơn hàng vào nội dung chuyển khoản.'}
						</p>
					</div>
					<div className="mt-4 flex justify-center">
						<QRCode
							value={order.qrCode || 'https://example.com'}
							size={150}
							className="rounded-md border border-gray-300"
						/>
					</div>
				</div>
			)}

			{order?.PaymentMethodId === '2' && (
				<div className="zalopay-payment">
					<h3 className="text-xl font-semibold mb-4">Thanh toán qua ZaloPay</h3>
					<p className="mb-4 text-gray-600">
						Bấm nút bên dưới để chuyển đến cổng thanh toán ZaloPay:
					</p>
					<button
						onClick={() => toggleTransactionModal(order?.Id)}
						className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
					>
						Thanh toán với ZaloPay
					</button>
				</div>
			)}
		</div>
	);
};
