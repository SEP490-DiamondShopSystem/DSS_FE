import React, {useState} from 'react';
import {
	Card,
	List,
	Typography,
	Col,
	Row,
	Tag,
	Empty,
	Image,
	Button,
	QRCode,
	Upload,
	Modal,
	message,
} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {formatPrice} from '../../../utils';
import logo from '../../../assets/logo-short-ex.png';
import {useDispatch, useSelector} from 'react-redux';
import {handleChangeTransfer} from '../../../redux/slices/paymentSlice';
import {LoadingPaymentSelector} from '../../../redux/selectors';

const {Text, Title} = Typography;

export const TransactionDetails = ({transactions, order}) => {
	const dispatch = useDispatch();
	const loading = useSelector(LoadingPaymentSelector);
	const [isEvidenceVisible, setIsEvidenceVisible] = useState(false);
	const [fileList, setFileList] = useState([]);

	console.log('transactions', transactions);

	const toggleEvidenceVisibility = () => {
		setIsEvidenceVisible((prev) => !prev);
	};

	const handleFileChange = ({file, fileList}) => {
		setFileList(fileList.slice(-1)); // Giữ lại 1 file
	};

	const beforeUpload = (file) => {
		setFileList([file]);
		return false;
	};

	const handleCompleted = (id) => {
		Modal.confirm({
			title: 'Xác nhận tải ảnh lên',
			okText: 'Đồng ý',
			cancelText: 'Hủy bỏ',
			onOk: () => handleChange(id),
		});
	};

	const handleChange = (id) => {
		dispatch(handleChangeTransfer({TransactionId: id, Evidence: fileList}))
			.unwrap()
			.then(() => {
				message.success('Thay đổi chứng từ thành công!');
			})
			.catch((error) => {
				message.error(error.detail || error.data.detail);
			});
	};

	return (
		<div className="">
			<Title level={3} className="mb-4">
				Chi tiết giao dịch
			</Title>
			<List
				locale={{
					emptyText: <Empty description="Hiện tại không có giao dịch để hiển thị!" />,
				}}
				itemLayout="vertical"
				dataSource={transactions}
				renderItem={(transaction) => (
					<List.Item key={transaction.AppTransactionCode}>
						<Card bordered className=" bg-white rounded-lg shadow-md w-full">
							<Row gutter={[16, 16]}>
								{/* Transaction Info */}
								<Col span={24}>
									<Title level={4} className="text-primary">
										Thông tin giao dịch
									</Title>
									<div className="transaction-info">
										<div className="mb-5 mt-2">
											<Text strong className="block">
												Mô tả giao dịch:
											</Text>
											<Text className="text-lg text-dark">
												{transaction.Description}
											</Text>
										</div>
										<div className="mb-5">
											<Text strong className="block">
												Ngày giao dịch:
											</Text>
											<Text className="text-lg">{transaction.InitDate}</Text>
										</div>
										<div className="mb-5">
											<Text strong className="block">
												Ngày xác nhận:
											</Text>
											<Text className="text-lg">
												{transaction.VerifiedDate
													? transaction.VerifiedDate
													: 'Giao dịch chưa được xác nhận'}
											</Text>
										</div>
										<div className="mb-5">
											<Text strong className="block">
												Số tiền giao dịch:
											</Text>
											<Text className="text-lg text-green-600 font-bold">
												{formatPrice(transaction.TransactionAmount)}
											</Text>
										</div>
										{transaction.FineAmount !== 0 && (
											<div className="mb-5">
												<Text strong className="block">
													Số tiền phạt (nếu có):
												</Text>
												<Text className="text-lg">
													{formatPrice(transaction.FineAmount)}
												</Text>
											</div>
										)}
									</div>
								</Col>

								{/* Payment Method Info */}
								<Col span={24}>
									<Title level={4} className="text-primary">
										Phương thức thanh toán
									</Title>
									<div className="payment-method">
										{transaction.PayMethod?.MethodName && (
											<Tag color="blue" className="text-lg font-semibold">
												{transaction.PayMethod.MethodName.replace(
													'BANK_TRANSFER',
													'Chuyển Khoản'
												)}
											</Tag>
										)}
										{transaction.PaygateTransactionCode && (
											<div className="mt-2">
												<Text strong>Mã giao dịch Paygate:</Text>
												<Text className="ml-2">
													{transaction.PaygateTransactionCode}
												</Text>
											</div>
										)}
									</div>
								</Col>
								<Col span={24}>
									<Title level={4} className="text-primary">
										Loại giao dịch
									</Title>
									<div className="">
										<div className="mt-2">
											{transaction.TransactionType === 1 ? (
												<div className="text-darkGreen text-lg">
													Thanh Toán
												</div>
											) : (
												<div className="text-red text-lg">Hoàn Tiền</div>
											)}
										</div>
									</div>
								</Col>

								{/* Evidence Section */}
								{transaction?.Evidence && (
									<Col span={24}>
										<Title level={4} className="text-primary">
											Chứng từ
										</Title>
										<Button
											type="link"
											onClick={toggleEvidenceVisibility}
											className="px-0"
										>
											{isEvidenceVisible ? 'Ẩn chứng từ' : 'Hiện chứng từ'}
										</Button>
										{isEvidenceVisible && transaction?.Evidence?.MediaPath && (
											<div className="evidence mt-4">
												<Image
													src={transaction.Evidence.MediaPath}
													alt="Chứng từ"
													className="rounded-lg border shadow-md w-full md:w-[100px]"
												/>
												{order?.Status === 1 && (
													<>
														<div>Thay đổi chứng từ</div>
														<div className="mt-4">
															<Upload.Dragger
																listType="picture-card"
																fileList={fileList}
																onChange={handleFileChange}
																beforeUpload={beforeUpload}
																maxCount={1}
																accept="image/*"
															>
																<InboxOutlined className="text-xl text-gray-500" />
																<p>Kéo hoặc nhấp để tải lên</p>
															</Upload.Dragger>
															<Button
																type="primary"
																className="mt-2"
																onClick={() =>
																	handleCompleted(transaction.Id)
																}
																loading={loading}
																disabled={fileList?.length === 0}
															>
																Gửi
															</Button>
														</div>
													</>
												)}
											</div>
										)}
									</Col>
								)}
							</Row>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};
