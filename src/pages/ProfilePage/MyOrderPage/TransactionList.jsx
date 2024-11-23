import React from 'react';
import {Card, List, Typography, Col, Row, Space, Tag} from 'antd';
import {MoneyCollectOutlined, CreditCardOutlined} from '@ant-design/icons';
import {formatPrice} from '../../../utils';

const {Text, Title} = Typography;

export const TransactionDetails = ({transactions}) => {
	console.log('transactions', transactions);

	return (
		<>
			<Title level={3}>Chi tiết giao dịch</Title>
			<List
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
										className="grid grid-cols-3 gap-5"
									>
										<div className="flex flex-col">
											<Text strong>Mã giao dịch: </Text>
											<Text className="font-semibold text-lg">
												{transaction.AppTransactionCode}
											</Text>
										</div>
										<div className="flex flex-col">
											<Text strong>Mô tả giao dịch: </Text>
											<Text className="font-semibold text-lg">
												{transaction.Description}
											</Text>
										</div>

										<div className="flex flex-col">
											<Text strong>Ngày thanh toán: </Text>
											<Text className="font-semibold text-lg">
												{transaction.PayDate}
											</Text>
										</div>
										<div className="flex flex-col">
											<Text strong>Số tiền giao dịch: </Text>
											<Text className="font-semibold text-lg">
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
													{transaction.PayMethod?.MethodName}
												</Tag>
											</div>
										)}

										<div className="flex flex-col">
											<Text strong>Mã giao dịch Paygate: </Text>
											<Text className="font-semibold text-lg">
												{transaction.PaygateTransactionCode}
											</Text>
										</div>
										<div></div>
									</div>
								</Col>

								{/* Other Transaction Info */}
								<Col span={24}>
									<Title level={4}>Thông tin giao dịch khác</Title>
									<Space
										direction="horizontal"
										size="middle"
										style={{width: '100%'}}
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												width: '100%',
											}}
										>
											<div>
												<Text strong>Loại giao dịch: </Text>
												<Text
													className={`text-lg ${
														transaction.TransactionType === 1
															? 'text-darkGreen'
															: 'text-red'
													}`}
												>
													{transaction.TransactionType === 1
														? 'Thanh toán'
														: 'Hoàn tiền'}
												</Text>
											</div>
										</div>
									</Space>
								</Col>
							</Row>
						</Card>
					</List.Item>
				)}
			/>
		</>
	);
};
