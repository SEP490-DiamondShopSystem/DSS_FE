import React from 'react';

import {Row, Col, Typography, Table, Image} from 'antd';
import logo from '../../../assets/logo-short-ex.png';

const {Title, Text} = Typography;

const dataSource = [
	{
		key: '1',
		id: '86',
		productName: 'Round Diamond 3.5 Carat IF',
		unitPrice: '3,357,000 ₫',
		amount: '1',
		totalPrice: '3,357,000 ₫',
	},
	{
		key: '2',
		id: '86',
		productName: 'Round Diamond 3.5 Carat VSS1',
		unitPrice: '4,467,000 ₫',
		amount: '1',
		totalPrice: '4,467,000 ₫',
	},
	{
		key: '3',
		id: '86',
		productName: 'Petite Solitaire Engagement Ring In 14k White Gold',
		unitPrice: '2,245,000 ₫',
		amount: '1',
		totalPrice: '2,245,000 ₫',
	},
];

const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
		align: 'center',
	},
	{
		title: () => <div className="text-center">Product Name</div>,
		dataIndex: 'productName',
		key: 'productName',
	},
	{
		title: 'Unit Price',
		dataIndex: 'unitPrice',
		key: 'unitPrice',
		align: 'center',
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		align: 'center',
	},
	{
		title: 'Total Price',
		dataIndex: 'totalPrice',
		key: 'totalPrice',
		align: 'center',
	},
];

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
					<div className="w-full">
						<Title level={4} className="mb-0">
							Purchased Items
						</Title>
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							bordered
							className="custom-table-header"
						/>
					</div>
					<Row justify="end" className="bg-lightGray my-3 p-4">
						<Col className="mr-10">
							<Text strong>Total Price:</Text>
						</Col>
						<Col>
							<Text>20,138,000 ₫</Text>
						</Col>
					</Row>

					<div className="w-full">
						<Title level={4} className="mb-0">
							Payment Details
						</Title>
						<Row>
							<Col span={6}>
								<Text strong>Payment Method:</Text>
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
