import React, {useState} from 'react';

import {
	Card,
	List,
	Typography,
	Col,
	Row,
	Space,
	Tag,
	Empty,
	Image,
	Button,
	QRCode,
	Upload,
	Modal,
	message,
} from 'antd';
import {MoneyCollectOutlined, CreditCardOutlined, InboxOutlined} from '@ant-design/icons';
import {formatPrice} from '../../../utils';
import logo from '../../../assets/logo-short-ex.png';
import {handleChangeTransfer} from '../../../redux/slices/paymentSlice';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingPaymentSelector} from '../../../redux/selectors';

const {Text, Title} = Typography;

export const TransactionDetails = ({transactions, order}) => {
	const dispatch = useDispatch();

	const loading = useSelector(LoadingPaymentSelector);

	const [isEvidenceVisible, setIsEvidenceVisible] = useState(false);
	const [isChangeEvidenceVisible, setIsChangeEvidenceVisible] = useState(false);
	const [fileList, setFileList] = useState([]);

	const toggleEvidenceVisibility = () => {
		setIsEvidenceVisible((prev) => !prev);
	};

	const toggleChangeEvidenceVisibility = () => {
		setIsChangeEvidenceVisible((prev) => !prev);
	};

	const handleFileChange = ({file, fileList}) => {
		// Chỉ giữ lại file mới nhất, không thêm file vào danh sách cũ
		setFileList(fileList.slice(-1)); // Giữ lại 1 file
	};

	const beforeUpload = (file) => {
		// Chặn upload tự động và thêm file vào state
		setFileList([file]); // Chỉ giữ lại file này
		return false;
	};

	const handleCompleted = (id) => {
		Modal.confirm({
			title: 'Bạn có chắc chắn muốn tải lên ảnh này!',
			// content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Đồng Ý',
			cancelText: 'Hủy Bỏ',
			onOk: () => handleChange(id),
		});
	};

	const handleChange = (id) => {
		dispatch(handleChangeTransfer({TransactionId: id, Evidence: fileList}))
			.unwrap()
			.then((res) => {
				message.success('Thay đổi chứng từ thành công!');
			})
			.catch((error) => {
				message.error(error.detail || error.data.detail);
			});
	};

	return (
		<div className="">
			<Title level={3}>Chi tiết giao dịch</Title>
			<List
				locale={{
					emptyText: <Empty description="Hiện tại không có giao dịch để hiển thị!" />,
				}}
				itemLayout="vertical"
				size="large"
				dataSource={transactions}
				renderItem={(transaction) => (
					<List.Item key={transaction.AppTransactionCode}>
						<Card bordered={false}>
							<Row gutter={[16, 16]}>
								{/* Transaction Info */}
								<Col span={24}>
									<Title level={4}>Thông tin giao dịch</Title>
									<div
										// direction="horizontal"
										// size="large"
										style={{width: '100%'}}
										className="flex flex-col gap-5"
									>
										{/* <div className="flex flex-col">
											<Text strong>Mã giao dịch: </Text>
											<Text className="font-semibold text-lg">
												{transaction.AppTransactionCode}
											</Text>
										</div> */}
										<div className="flex bg-primary flex-col px-2 border rounded-lg">
											{/* <Text strong>Mô tả giao dịch: </Text> */}
											<Text className="font-semibold text-lg">
												{transaction.Description}
											</Text>
										</div>

										<div className="flex flex-col">
											<Text strong>Ngày thanh toán: </Text>
											<Text className="font-semibold text-lg">
												{transaction.PayDate ||
													transaction?.VerifiedDate ||
													transaction?.InitDate}
											</Text>
										</div>
										<div className="flex flex-col">
											<Text strong>Số tiền giao dịch: </Text>
											<Text className="font-bold text-lg text-darkGreen">
												{formatPrice(transaction.TransactionAmount)}
											</Text>
										</div>

										<div className="flex flex-col">
											{transaction.FineAmount ? (
												<>
													<Text strong>Số tiền phạt (nếu có): </Text>
													<Text className="font-semibold text-lg">
														{formatPrice(transaction.FineAmount)}
													</Text>
												</>
											) : (
												<></>
											)}
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											width: '100%',
										}}
									></div>

									<div className="flex flex-col"></div>
								</Col>

								{/* Payment Method Info */}
								<Col span={24}>
									<Title level={4}>Thông tin phương thức thanh toán</Title>
									<div style={{width: '70%'}} className="flex justify-between ">
										{transaction.PayMethod?.MethodName && (
											<div className="flex flex-col items-center">
												<Text strong>Phương thức: </Text>
												<Tag color="blue" className="font-semibold">
													{(transaction.PayMethod?.MethodName).replace(
														'_',
														' '
													)}
												</Tag>
											</div>
										)}

										{transaction?.PaygateTransactionCode && (
											<div className="flex flex-col">
												<Text strong>Mã giao dịch Paygate: </Text>
												<Text className="font-semibold text-lg">
													{transaction.PaygateTransactionCode}
												</Text>
											</div>
										)}

										{/* <div></div> */}
									</div>
								</Col>

								{/* Other Transaction Info */}
								<Col span={24}>
									<Title level={4}>Thông tin giao dịch khác</Title>
									<div className="flex flex-col gap-4 w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
										{/* Loại giao dịch */}
										<div className="flex justify-between w-full">
											<div>
												<Text strong>Loại giao dịch: </Text>
												<span
													className={`text-lg font-medium ${
														transaction.TransactionType === 1
															? 'text-green-600'
															: 'text-red-600'
													}`}
												>
													{transaction.TransactionType === 1
														? 'Thanh toán'
														: 'Hoàn tiền'}
												</span>
											</div>
										</div>

										{/* Nút ẩn/hiện chứng từ */}
										<div className="flex justify-between w-full">
											<div>
												<Text strong>Chứng từ: </Text>
												<button
													className="text-primary hover:underline"
													onClick={toggleEvidenceVisibility}
												>
													{isEvidenceVisible
														? 'Ẩn chứng từ'
														: 'Hiện chứng từ'}
												</button>
											</div>
										</div>

										{/* Hiển thị chứng từ nếu có */}
										{isEvidenceVisible && transaction?.Evidence?.MediaPath && (
											<>
												<div className="mt-4">
													<Image
														src={transaction.Evidence.MediaPath}
														alt="evidence"
														className="border border-lightGray rounded-lg"
														style={{width: 300, height: 'auto'}}
													/>
												</div>
												{order?.Status === 1 && (
													<Button
														onClick={toggleChangeEvidenceVisibility}
													>
														Thay đổi chứng từ
													</Button>
												)}
												{isChangeEvidenceVisible && (
													<>
														{order?.PaymentMethodId === '1' && (
															<div className="w-full">
																<h3 className="text-xl font-semibold mb-4">
																	Chuyển khoản ngân hàng
																</h3>
																<p className="mb-4 text-gray-600">
																	Phương Thức Thanh Toán:{' '}
																	{order?.PaymentType === 1
																		? 'Trả Hết'
																		: 'Thanh Toán Khi Nhận Hàng'}
																</p>
																<div className="space-y-4 flex sm:space-y-0 sm:flex sm:items-center sm:justify-around">
																	<div className="text-sm sm:text-base">
																		<p>
																			<strong className="text-gray">
																				Tên ngân hàng:
																			</strong>{' '}
																			{order.bankName ||
																				'Vietcombank'}
																		</p>
																		<p>
																			<strong className="text-gray">
																				Số tài khoản:
																			</strong>{' '}
																			{order.accountNumber ||
																				'1234567890'}
																		</p>
																		<p>
																			<strong className="text-gray">
																				Tên người nhận:
																			</strong>{' '}
																			{order.accountHolder ||
																				'Nguyễn Văn A'}
																		</p>
																		<p>
																			<strong className="text-gray">
																				Ghi chú:
																			</strong>{' '}
																			{order.transferNote ||
																				'Vui lòng ghi mã đơn hàng vào nội dung chuyển khoản.'}
																		</p>
																	</div>
																	<div className="sm:mt-0 sm:ml-10 flex justify-center">
																		<QRCode
																			value={
																				order.qrCode ||
																				'https://example.com'
																			}
																			icon={logo}
																			size={150}
																			className="rounded-md border border-gray-300"
																		/>
																	</div>
																</div>

																<div className="mt-6">
																	<h4 className="text-lg font-medium mb-2">
																		Tải ảnh đã thanh toán
																	</h4>
																	<div className="flex items-center justify-center">
																		<Upload.Dragger
																			listType="picture-card"
																			fileList={fileList}
																			onChange={
																				handleFileChange
																			}
																			beforeUpload={
																				beforeUpload
																			}
																			maxCount={1}
																			accept="image/*"
																			capture="camera"
																		>
																			<p className="ant-upload-drag-icon">
																				<InboxOutlined />
																			</p>
																			<p className="ant-upload-text">
																				Nhấp hoặc kéo tệp
																				vào khu vực này để
																				tải lên
																			</p>
																			<p className="ant-upload-hint">
																				Hỗ trợ cho một lần
																				tải lên. Kéo tệp vào
																				đây hoặc nhấp để tải
																				lên.
																			</p>
																		</Upload.Dragger>
																	</div>

																	<div className="flex justify-center items-center mt-5">
																		<Button
																			type="text"
																			className="px-10 py-2 bg-primary"
																			onClick={() =>
																				handleCompleted(
																					transaction?.Id
																				)
																			}
																			loading={loading}
																		>
																			Gửi
																		</Button>
																	</div>
																</div>
															</div>
														)}
													</>
												)}
											</>
										)}
									</div>
								</Col>
							</Row>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};
