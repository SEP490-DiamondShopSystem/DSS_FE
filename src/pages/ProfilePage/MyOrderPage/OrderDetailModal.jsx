import React, {useState} from 'react';

import {Button, Col, Image, Row, Table, Typography} from 'antd';
import {statusTimeLine} from '../../../utils/constant';
import logo from '../../../assets/logo-short-ex.png';

export const OrderDetailModal = ({openDetail, toggleDetailModal}) => {
	const [currentStatus, setCurrentStatus] = useState(0);
	const [showMore, setShowMore] = useState(false);

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

	// useEffect(() => {
	// 	if (currentStatus < statusTimeLine.length - 1) {
	// 		const timer = setTimeout(() => {
	// 			setCurrentStatus((prev) => prev + 1);
	// 		}, 3000);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [currentStatus]);

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const visibleStatuses = showMore ? statusTimeLine : statusTimeLine.slice(0, 3);
	const reversedStatuses = [...visibleStatuses].reverse(); // Reverse the statuses for display

	// const combinedData = [...initialOrderData.items, ...initialOrderData.additionalData];

	const dataSources = [dataSource1, dataSource2];

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
							{statusTimeLine.map((step, index) => (
								<React.Fragment key={step.status}>
									<div className="flex flex-col items-center">
										<div
											className={`w-8 h-8 rounded-full ${
												currentStatus >= index
													? 'bg-primary'
													: 'bg-lightGray'
											} flex justify-center items-center`}
										>
											{/* <span className="text-white">{index + 1}</span> */}
										</div>
										<p className="mt-2 text-center capitalize">
											{currentStatus >= index ? step.nameNext : step.namePrev}
										</p>
									</div>

									{index < statusTimeLine.length - 1 && (
										<div className="w-16 h-1 bg-lightGray"></div>
									)}
								</React.Fragment>
							))}
						</div>

						{/* Timeline section with data */}
						<div className="mt-8 flex justify-center">
							<div>
								{reversedStatuses.map(
									(status, index) =>
										currentStatus >= statusTimeLine.length - 1 - index && (
											<div key={status.status} className="flex">
												<div className="flex flex-col items-center">
													<div
														className={`w-4 h-4 rounded-full ${
															currentStatus ===
															statusTimeLine.length - 1 - index
																? 'bg-primary'
																: 'bg-lightGray'
														}`}
													></div>
													{index < reversedStatuses.length - 1 && (
														<div
															className={`w-1 h-16 ${
																currentStatus ===
																statusTimeLine.length - 1 - index
																	? 'bg-primary'
																	: 'bg-lightGray'
															}`}
														></div>
													)}
												</div>
												<div className="ml-4 flex">
													<p className="font-semibold">{status.date}</p>
													<div className="ml-20">
														<p className="font-bold">
															{status.nameNext}
														</p>
														<p className="text-lightGray">
															{status.description}
														</p>
													</div>
												</div>
											</div>
										)
								)}

								{statusTimeLine.length > 3 && (
									<button
										className="mt-4 text-primary underline cursor-pointer"
										onClick={handleShowMore}
									>
										{showMore ? 'Show Less' : 'Show More'}
									</button>
								)}
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
