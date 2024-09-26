import React from 'react';

import {Row, Col, Typography, Table, Image, Divider} from 'antd';
import logo from '../../../assets/logo-short-ex.png';

const {Title, Text} = Typography;

const detailGroups = {
	total_price: 20138000,
	groups: [
		{
			jewelry_price: 10069000,
			status: 'Completed',
			items: [
				{
					id: 86,
					name: 'Round Diamond 3.5 Carat IF',
					unitPrice: 3357000,
					orderTime: '26/09/2024',
				},
				{
					id: 87,
					name: 'Round Diamond 3.5 Carat VVS1',
					unitPrice: 4467000,
					orderTime: '26/09/2024',
				},
				{
					id: 88,
					name: 'Petite Solitaire Engagement Ring In 14k White Gold',
					unitPrice: 2245000,
					orderTime: '26/09/2024',
				},
			],
		},
	],
};

export const OrderInvoiceModal = ({openInvoice, toggleInvoiceModal}) => {
	return (
		<>
			{openInvoice && (
				<div
					onClick={toggleInvoiceModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openInvoice && (
				<div
					className={`fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out ${
						openInvoice ? 'z-50' : 'z-0'
					} ${
						openInvoice ? 'translate-x-1/2 -translate-y-1/2' : 'translate-x-full'
					} p-10`}
					style={{width: 1200, maxHeight: '80vh', overflowY: 'auto'}}
				>
					<div className="flex justify-between mb-5">
						<div>
							<Image src={logo} preview={false} className="max-h-10 max-w-10 mb-2" />
							<div className="flex flex-col ">
								<div className="">
									<Text strong>Invoice Code:</Text>
								</div>
								<div className="">
									<Text strong>Purchase Date:</Text>
								</div>
								<div className="">
									<Text strong>Delivery Address:</Text>
								</div>
							</div>
						</div>
						<div className="justify-end">
							<Title level={4} className="">
								Thank you for your purchase!
							</Title>
							<Text>Shop Address: Quận 9, Tp. Hồ Chí Minh</Text>
						</div>
					</div>
					{/* Purchased Items */}
					<div className="mt-10">
						<div className="w-full bg-primary p-5 border rounded">
							<div className="w-full flex items-center font-semibold text-lg">
								<p style={{width: '10%'}} className="flex justify-center">
									Id
								</p>
								<p
									style={{width: '20%'}}
									className="flex justify-center text-center"
								>
									Thời gian đặt hàng
								</p>
								<p style={{width: '40%'}} className="flex justify-center">
									Sản phẩm
								</p>
								<p style={{width: '10%'}} className="flex justify-center">
									Giá
								</p>
								<p style={{width: '20%'}} className="flex justify-center">
									Trạng thái
								</p>
							</div>
						</div>
						<div className="w-full">
							{detailGroups.groups.map((gr, i) => (
								<div key={i} className="border mb-5 p-5 rounded">
									{gr.items.map((item, j) => (
										<div key={j}>
											<div className="w-full flex items-center text-lg">
												<p
													style={{width: '10%'}}
													className="flex justify-center"
												>
													{item.id}
												</p>
												<p
													style={{width: '20%'}}
													className="flex justify-center"
												>
													{item.orderTime}
												</p>
												<p style={{width: '40%'}} className="flex my-2">
													{item.name}
												</p>
												<p
													style={{width: '10%'}}
													className="flex justify-center my-2"
												>
													{item.unitPrice.toLocaleString()} ₫
												</p>
												<p
													style={{width: '20%'}}
													className="flex justify-center"
												>
													{gr.status}
												</p>
											</div>
											<Divider />
										</div>
									))}
									<div className="flex items-center justify-end">
										<p className="font-semibold">Giá trang sức</p>
										<p className="text-2xl font-semibold text-red-600 ml-5">
											{gr.jewelry_price.toLocaleString()} ₫
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="text-end">
						<p className="text-2xl font-semibold text-red-600">
							Tổng giá: {detailGroups.total_price.toLocaleString()} ₫
						</p>
					</div>

					<div className="w-full">
						<Title level={4} className="mb-0">
							Chi tiết thanh toán
						</Title>
						<Row>
							<Col span={6}>
								<Text strong>Phương thức thanh toán:</Text>
							</Col>
							<Col span={18}>
								<Text>Credit Card</Text>
							</Col>
						</Row>
					</div>
				</div>
			)}
		</>
	);
};
