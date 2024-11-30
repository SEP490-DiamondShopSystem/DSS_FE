import React, {useState} from 'react';
import {QRCode, Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

export const OrderPayment = ({order}) => {
	const [uploadedFile, setUploadedFile] = useState(null);

	// Xử lý khi upload file
	const handleUpload = (file) => {
		const isImage = file.type.startsWith('image/');
		if (!isImage) {
			message.error('Vui lòng tải lên tệp hình ảnh.');
			return Upload.LIST_IGNORE;
		}
		setUploadedFile(file);
		message.success('Tải ảnh thành công!');
		return false; // Không tải lên trực tiếp (local handling)
	};

	if (!order) {
		return <div className="text-center text-gray-500">Không có dữ liệu đơn hàng.</div>;
	}

	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
			{order?.PaymentMethodId === '1' && (
				<div className="w-full">
					<h3 className="text-xl font-semibold mb-4">Chuyển khoản ngân hàng</h3>
					<div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
						<div className="text-sm sm:text-base">
							<p>
								<strong className="text-gray-700">Tên ngân hàng:</strong>{' '}
								{order.bankName || 'Ngân hàng Ví Dụ'}
							</p>
							<p>
								<strong className="text-gray-700">Số tài khoản:</strong>{' '}
								{order.accountNumber || '1234567890'}
							</p>
							<p>
								<strong className="text-gray-700">Tên người nhận:</strong>{' '}
								{order.accountHolder || 'Nguyễn Văn A'}
							</p>
							<p>
								<strong className="text-gray-700">Ghi chú:</strong>{' '}
								{order.transferNote ||
									'Vui lòng ghi mã đơn hàng vào nội dung chuyển khoản.'}
							</p>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-10 flex justify-center">
							<QRCode
								value={order.qrCode || 'https://example.com'}
								size={150}
								className="rounded-md border border-gray-300"
							/>
						</div>
					</div>

					<div className="mt-6">
						<h4 className="text-lg font-medium mb-2">Tải ảnh đã thanh toán</h4>
						<div className="flex items-center justify-center">
							<Upload
								beforeUpload={handleUpload}
								showUploadList={false}
								maxCount={1}
								accept="image/*"
							>
								<div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition">
									<InboxOutlined className="text-3xl mb-2" />
									<p>Kéo thả hoặc bấm để tải ảnh</p>
								</div>
							</Upload>
						</div>
						{uploadedFile && (
							<div className="mt-4">
								<p>
									<strong>Ảnh đã tải lên:</strong>
								</p>
								<img
									src={URL.createObjectURL(uploadedFile)}
									alt="Ảnh thanh toán"
									className="mt-2 rounded-md shadow-md max-h-40"
								/>
							</div>
						)}
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
						onClick={() => {
							window.location.href =
								order.zaloPayLink || 'https://zalopay.vn/payment-gateway';
						}}
						className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
					>
						Thanh toán với ZaloPay
					</button>
				</div>
			)}
		</div>
	);
};
