import {InboxOutlined} from '@ant-design/icons';
import {Button, Image, Modal, QRCode, Upload, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingPaymentSelector} from '../../../redux/selectors';
import {fetchShopBankAccountRule} from '../../../redux/slices/configSlice';
import {getUserOrderTransaction} from '../../../redux/slices/orderSlice';
import {handleAddTransfer} from '../../../redux/slices/paymentSlice';

export const OrderPayment = ({order, setTransfer}) => {
	const dispatch = useDispatch();
	const loading = useSelector(LoadingPaymentSelector);
	const [ruleBank, setRuleBank] = useState();

	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		dispatch(fetchShopBankAccountRule())
			.unwrap()
			.then((res) => {
				setRuleBank(res);
			});
	}, []);

	const handleFileChange = ({file, fileList}) => {
		// Chỉ giữ lại file mới nhất, không thêm file vào danh sách cũ
		setFileList(fileList.slice(-1)); // Giữ lại 1 file
	};

	const beforeUpload = (file) => {
		// Chặn upload tự động và thêm file vào state
		setFileList([file]); // Chỉ giữ lại file này
		return false;
	};

	const handleCompleted = () => {
		Modal.confirm({
			title: 'Bạn có chắc chắn muốn tải lên ảnh này!',
			// content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Đồng Ý',
			cancelText: 'Hủy Bỏ',
			onOk: handleAdd,
		});
	};

	const handleAdd = () => {
		dispatch(handleAddTransfer({OrderId: order?.Id, Evidence: fileList}))
			.unwrap()
			.then((res) => {
				message.success('Gửi chứng từ thành công!');
			})
			.catch((error) => {
				message.error(error.detail || error.data.detail);
			});
	};

	const handleZaloPay = () => {
		dispatch(getUserOrderTransaction(order?.Id))
			.unwrap()
			.then((res) => {
				window.open(res?.PaymentUrl, '_blank');
			})
			.catch((error) => {
				message.error(error?.detail || error?.title);
			});
	};

	if (!order) {
		return <div className="text-center text-gray-500">Không có dữ liệu đơn hàng.</div>;
	}

	console.log('ruleBank', ruleBank);

	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
			{order?.PaymentMethodId === '1' && (
				<div className="w-full">
					<h3 className="text-xl font-semibold mb-4">Chuyển khoản ngân hàng</h3>
					<div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
						<div className="text-sm sm:text-base">
							<p>
								<strong className="text-gray-700">Tên ngân hàng:</strong>{' '}
								{ruleBank?.BankName || 'VIETCOMBANK'}
							</p>
							<p>
								<strong className="text-gray-700">Số tài khoản:</strong>{' '}
								{ruleBank?.AccountNumber || '0701000439554'}
							</p>
							<p>
								<strong className="text-gray-700">Tên người nhận:</strong>{' '}
								{ruleBank?.AccountName || 'PHAM XUAN HUY'}
							</p>
							<p>
								<strong className="text-gray-700">Ghi chú:</strong>{' '}
								{'Vui lòng ghi mã đơn hàng vào nội dung chuyển khoản.'}
							</p>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-10 flex justify-center">
							<Image
								preview={false}
								src={ruleBank?.BankQr?.MediaPath}
								className="max-w-52"
							/>
						</div>
					</div>

					<div className="mt-6">
						<h4 className="text-lg font-medium mb-2">Tải ảnh đã thanh toán</h4>
						<div className="flex items-center justify-center">
							<Upload.Dragger
								listType="picture-card"
								fileList={fileList}
								onChange={handleFileChange}
								beforeUpload={beforeUpload}
								maxCount={1}
								accept="image/*"
								capture="camera"
							>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">
									Nhấp hoặc kéo tệp vào khu vực này để tải lên
								</p>
								<p className="ant-upload-hint">
									Hỗ trợ cho một lần tải lên. Kéo tệp vào đây hoặc nhấp để tải
									lên.
								</p>
							</Upload.Dragger>
						</div>

						<div className="flex justify-center items-center mt-5">
							<Button
								type="text"
								className="px-10 py-2 bg-primary"
								onClick={handleCompleted}
								loading={loading}
								disabled={fileList?.length === 0}
							>
								Gửi
							</Button>
						</div>
					</div>
				</div>
			)}

			{order?.PaymentMethodId === '2' && (
				<div className="zalopay-payment">
					<h3 className="text-xl font-semibold mb-4">Thanh toán qua ZaloPay</h3>
					<span className="mb-4 text-gray-600">
						Bấm nút bên dưới để chuyển đến cổng thanh toán ZaloPay:
					</span>
					<button
						onClick={handleZaloPay}
						className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
					>
						Thanh toán với ZaloPay
					</button>
				</div>
			)}
		</div>
	);
};
