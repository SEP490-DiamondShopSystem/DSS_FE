import React, {useEffect, useState} from 'react';

import {Button, Col, Image, Row, Steps, Table, Typography} from 'antd';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';

const {Title, Text} = Typography;

// Data for the first table
const dataSource1 = [
	{
		key: '1',
		id: '86',
		name: 'Round Diamond 3.5 Carat IF',
		unitPrice: '3,357,000 ₫',
		quantity: '1',
		totalPrice: '3,357,000 ₫',
	},
	{
		key: '2',
		id: '87',
		name: 'Round Diamond 3.5 Carat VSS1',
		unitPrice: '4,467,000 ₫',
		quantity: '1',
		totalPrice: '4,467,000 ₫',
	},
];

// Data for the second table
const dataSource2 = [
	{
		key: '1',
		id: '101',
		name: 'Petite Solitaire Engagement Ring In 14k White Gold',
		unitPrice: '2,245,000 ₫',
		quantity: '1',
		totalPrice: '2,245,000 ₫',
	},
	{
		key: '2',
		id: '102',
		name: 'Platinum Diamond Necklace',
		unitPrice: '6,500,000 ₫',
		quantity: '1',
		totalPrice: '6,500,000 ₫',
	},
];

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		id: 'id',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		id: 'name',
	},
	{
		title: 'Unit Price',
		dataIndex: 'unitPrice',
		id: 'unitPrice',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		id: 'quantity',
	},
	{
		title: 'Total Price',
		dataIndex: 'totalPrice',
		id: 'totalPrice',
	},
];

export const OrderDetailModal = ({openDetail, toggleDetailModal}) => {
	const [currentStatus, setCurrentStatus] = useState(0);
	const [showMore, setShowMore] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	console.log(currentStep);

	const orderStatus = 'Vận Chuyển';

	useEffect(() => {
		switch (orderStatus) {
			case 'Shop Chấp Nhận':
				setCurrentStep(0);
				break;
			case 'Chuẩn Bị Hàng':
				setCurrentStep(1);
				break;
			case 'Vận Chuyển':
				setCurrentStep(2);
				break;
			case 'Nhận Hàng':
				setCurrentStep(3);
				break;
			case 'Hoàn Thành':
				setCurrentStep(4);
				break;
			default:
				setCurrentStep(0);
		}
	}, [orderStatus]);

	const steps = [
		{
			title: 'Shop Chấp Nhận',
		},
		{
			title:
				currentStep === 2 || currentStep === 3 || currentStep === 4
					? 'Chuẩn Bị Hàng Xong'
					: 'Đang Chuẩn Bị Hàng',
		},
		{
			title:
				currentStep === 3 || currentStep === 4
					? 'Vận Chuyển Thành Công'
					: 'Đang Vận Chuyển',
		},
		{
			title: currentStep === 4 ? 'Nhận Hàng Thành Công' : 'Nhận Hàng',
		},
	];

	const allSteps = [
		{
			title: 'Finished 123',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'finish',
		},
		{
			title: 'Finished 345',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'finish',
		},
		{
			title: 'In Progress 123',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'finish',
		},
		{
			title: 'Waiting 123',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'finish',
		},
		{
			title: 'Waiting 345',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'finish',
		},
	];

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const dataSources = [dataSource1, dataSource2];

	const getFilteredSteps = () => {
		const reversedSteps = [...allSteps].reverse();

		if (showMore) {
			return reversedSteps;
		}

		// Tìm các bước có trạng thái 'process'
		const processSteps = reversedSteps.filter((step) => step.status === 'process');

		if (processSteps.length > 0) {
			return processSteps;
		}

		// Nếu không có bước 'process', chỉ hiển thị 2 bước 'finish' cuối cùng
		const finishSteps = reversedSteps.filter((step) => step.status === 'finish');
		return finishSteps.slice(0, 2);
	};

	return (
		<>
			{openDetail && (
				<div
					onClick={toggleDetailModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openDetail && (
				<div
					className={`fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out ${
						openDetail ? 'z-50' : 'z-0'
					} ${openDetail ? 'translate-x-1/2 -translate-y-1/2' : 'translate-x-full'} p-10`}
					style={{width: 1200, maxHeight: '80vh', overflowY: 'auto'}}
				>
					<div className="flex justify-between items-center">
						<div className="">
							<Image
								src={logo}
								alt=""
								preview={false}
								className="max-h-10 max-w-10 mb-2"
							/>
							<p>Thủ Đức, TP.Ho Chi Minh, VietNam</p>
						</div>
						<div className="text-end">
							<h2 className="uppercase text-2xl font-semibold">Order Status</h2>
							<p>Invoice ID: #1031</p>
							<p>Date: August 19, 2024</p>
						</div>
					</div>

					<div className="mt-5">
						<div>
							<h2 className="text-2xl font-semibold">Delivery Address</h2>
							<p>VietNam</p>
							<p>Quận 9, Tp. Hồ Chí Minh</p>
							<p>0912345678</p>
						</div>

						<div className="flex justify-center items-center space-x-4 mt-8">
							<Steps labelPlacement="vertical" current={currentStep} items={steps} />
						</div>

						<div className="mt-8">
							<div>
								<Steps
									progressDot
									direction="vertical"
									items={getFilteredSteps()}
								/>
								<button
									className="mt-4 text-primary underline cursor-pointer"
									onClick={handleShowMore}
								>
									{showMore ? 'Show Less' : 'Show More'}
								</button>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Order Details</h1>
						<Button type="text" className="bg-red text-white">
							Request a return and refund
						</Button>
					</div>
					<div className="mt-5">
						{/* <table className="table-auto w-full border">
							<thead className="border rounded-lg">
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Unit Price</th>
									<th>Quantity</th>
									<th>Total Price</th>
								</tr>
							</thead>
							{content?.[0]?.options?.map((item) => (
								<tbody key={item.id}>
									<tr>
										<td className="text-center">{item.id}</td>
										<td className="text-center">{item.name}</td>
										<td className="text-center">{item.unitPrice}</td>
										<td className="text-center">{item.quantity}</td>
										<td className="text-center">{item.totalPrice}</td>
									</tr>
								</tbody>
							))}
						</table> */}
						<div>
							{dataSources.map((dataSource, index) => (
								<div key={index}>
									<Table
										dataSource={dataSource}
										columns={columns}
										pagination={false}
										bordered
										style={{marginTop: 32}}
										className="custom-table-header"
									/>
									<Row justify="end" style={{marginTop: 16}}>
										<Col className="mr-10">
											<Text strong>{`Jewelry Price (Table ${
												index + 1
											}):`}</Text>
										</Col>
										<Col>
											<Text>10,069,000 ₫</Text>
										</Col>
									</Row>
								</div>
							))}
							<Row justify="end" className="bg-lightGray my-3 p-4">
								<Col className="mr-10">
									<Text strong>Total Price:</Text>
								</Col>
								<Col>
									<Text>20,138,000 ₫</Text>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
