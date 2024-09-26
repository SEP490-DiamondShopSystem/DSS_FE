import React, {useEffect, useState} from 'react';
import {Button, Divider, Image, Space, Steps} from 'antd';
import logo from '../../../assets/logo-short-ex.png';
import '../../../css/antd.css';

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

export const OrderDetailModal = ({openDetail, toggleDetailModal}) => {
	const [showMore, setShowMore] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

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
			status: 'process',
		},
		{
			title: 'Error 345',
			description: 'This is a description.',
			subTitle: '00:01:02',
			status: 'error',
		},
	];

	const handleShowMore = () => {
		setShowMore(!showMore);
	};

	const getFilteredSteps = () => {
		const reversedSteps = [...allSteps].reverse();

		// Lọc ra các bước có trạng thái 'finish' và 'process'
		const filteredSteps = reversedSteps.filter(
			(step) => step.status === 'finish' || step.status === 'process'
		);

		if (showMore) {
			return filteredSteps;
		}

		// Tìm các bước có trạng thái 'process'
		const processSteps = filteredSteps.filter((step) => step.status === 'process');

		if (processSteps.length > 0) {
			return processSteps;
		}

		// Nếu không có bước 'process', chỉ hiển thị 2 bước 'finish' cuối cùng
		const finishSteps = filteredSteps.filter((step) => step.status === 'finish');
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
							<p>Thủ Đức, TP.Hồ Chí Minh, VietNam</p>
						</div>
						<div className="text-end">
							<h2 className="uppercase text-2xl font-semibold">
								Trạng thái đơn hàng
							</h2>
							<p>Hóa đơn ID: #1031</p>
							<p>Ngày: 19/9/2024</p>
						</div>
					</div>

					<div className="mt-5">
						<div>
							<h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
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
						<h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
						<Button type="text" className="bg-red text-white">
							Yêu cầu trả lại
						</Button>
					</div>
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
				</div>
			)}
		</>
	);
};
