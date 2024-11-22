import React from 'react';

import {InfoCircleFilled} from '@ant-design/icons';
import {Button, Image, Modal, Popover, Radio} from 'antd';
import {Polish} from './Polish';
import girdle from '../../../../../assets/advanceDiamond/Girdle .jpeg';
import culet from '../../../../../assets/advanceDiamond/Culet.jpg';

const symmetryItems = [
	{id: 1, value: 1, symmetry: 'Kém (Poor)'},
	{id: 2, value: 2, symmetry: 'Trung bình (Fair)'},
	{id: 3, value: 3, symmetry: 'Tốt (Good)'},
	{id: 4, value: 4, symmetry: 'Rất tốt (Very good)'},
	{id: 5, value: 5, symmetry: 'Hoàn hảo (Excellent)'},
];

const diamondLabItems = [
	{id: 1, value: false, isLabGrown: 'Tự Nhiên'},
	{id: 2, value: true, isLabGrown: 'Nhân Tạo'},
];

const girdleItems = [
	{id: 1, value: 1, girdle: 'Cực Mỏng (Extremely Thin)'},
	{id: 2, value: 2, girdle: 'Rất Mỏng (Very Thin)'},
	{id: 3, value: 3, girdle: 'Mỏng (Thin)'},
	{id: 4, value: 4, girdle: 'Trung Bình (Medium)'},
	{id: 5, value: 5, girdle: 'Hơi Dày (Slightly Thick)'},
	{id: 6, value: 6, girdle: 'Dày (Thick)'},
	{id: 7, value: 7, girdle: 'Rất Dày (Very Thick)'},
	{id: 8, value: 8, girdle: 'Cực Dày (Extremely Thick)'},
];

const culetItems = [
	{id: 1, value: 1, culet: 'Không Có (None)'},
	{id: 2, value: 2, culet: 'Rất Nhỏ (Very Small)'},
	{id: 3, value: 3, culet: 'Nhỏ (Small)'},
	{id: 4, value: 4, culet: 'Trung Bình (Medium)'},
	{id: 5, value: 5, culet: 'Hơi Lớn (Slightly Large)'},
	{id: 6, value: 6, culet: 'Lớn (Large)'},
	{id: 7, value: 7, culet: 'Rất Lớn (Very Large)'},
	{id: 8, value: 8, culet: 'Cực Lớn (Extremely Large)'},
];

export const Specs = ({
	setStep,
	customizeDiamond,
	setCustomizeDiamond,
	setStepChooseDiamond,
	selectedDiamonds,
	currentDiamond,
	setSelectedDiamonds,
}) => {
	const onChangeSymmetry = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			symmetry: e.target.value,
		}));
	};
	const onChangeGirdle = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			girdle: e.target.value,
		}));
	};
	const onChangeCulet = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			culet: e.target.value,
		}));
	};
	const onChangeDiamondLab = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			isLabGrown: e.target.value,
		}));
	};

	// const handleNextStep = () => {
	// 	if (!customizeDiamond) {
	// 		alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
	// 		return;
	// 	}

	// 	// Update or add the diamond to selectedDiamonds based on currentDiamond Id
	// 	setSelectedDiamonds((prev) => {
	// 		// Check if a diamond with the same currentDiamondId already exists
	// 		const existingIndex = prev.findIndex(
	// 			(selected) =>
	// 				selected.Id === customizeDiamond.Id &&
	// 				selected.currentDiamondId === currentDiamond.Id
	// 		);

	// 		// If found, replace it; otherwise, add a new entry
	// 		if (existingIndex !== -1) {
	// 			// Create a new array with the updated diamond
	// 			const updatedDiamonds = [...prev];
	// 			updatedDiamonds[existingIndex] = {
	// 				...customizeDiamond,
	// 				currentDiamondId: currentDiamond.Id,
	// 			};
	// 			return updatedDiamonds;
	// 		} else {
	// 			// Add as a new entry
	// 			return [...prev, {...customizeDiamond, currentDiamondId: currentDiamond.Id}];
	// 		}
	// 	});

	// 	// Reset customizeDiamond and proceed to the next step
	// 	setCustomizeDiamond({
	// 		caratFrom: '',
	// 		caratTo: '',
	// 		shape: '',
	// 		color: '',
	// 		cut: '',
	// 		clarity: '',
	// 		polish: '',
	// 		symmetry: '',
	// 		girdle: '',
	// 		culet: '',
	// 		isLabGrown: null,
	// 	});
	// 	setStep(0);
	// 	setStepChooseDiamond((prev) => prev + 1);
	// };

	const handleCompleted = () => {
		Modal.confirm({
			title: 'Vui lòng kiểm tra lại thông số kim cương trước khi tiếp tục!',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Đồng Ý',
			cancelText: 'Hủy Bỏ',
			onOk: handleNextStep,
		});
	};

	const handleNextStep = () => {
		if (!customizeDiamond) {
			alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
			return;
		}

		// Always add a new diamond entry to selectedDiamonds
		setSelectedDiamonds((prev) => [
			...prev,
			{...customizeDiamond, currentDiamondId: currentDiamond.Id},
		]);

		// Reset customizeDiamond and proceed to the next step
		setCustomizeDiamond({
			caratFrom: '',
			caratTo: '',
			shape: '',
			colorFrom: '',
			colorTo: '',
			cutFrom: '',
			cutTo: '',
			clarityFrom: '',
			clarityTo: '',
			polish: '',
			symmetry: '',
			girdle: '',
			culet: '',
			isLabGrown: false,
		});
		setStep(0);
		setStepChooseDiamond((prev) => prev + 1);
	};

	const handleBackStep = () => {
		setStep((prev) => prev - 1);
	};

	const textSymmetry = <span>Độ đối xứng</span>;
	const contentSymmetry = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	const textGirdle = <span>Viền cạnh kim cương</span>;
	const contentGirdle = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<div className="flex items-center justify-center">
				<Image src={girdle} preview={false} />
			</div>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	const textCulet = <span>Chóp đáy kim cương</span>;
	const contentCulet = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<div className="flex items-center justify-center">
				<Image src={culet} preview={false} />
			</div>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	return (
		<div>
			<Polish
				setStep={setStep}
				customizeDiamond={customizeDiamond}
				setCustomizeDiamond={setCustomizeDiamond}
			/>
			<div className="mt-10 mb-5">
				<label className="my-5 font-semibold text-xl">
					Chọn Đối Xứng (Symmetry){' '}
					<Popover placement="topLeft" title={textSymmetry} content={contentSymmetry}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2">
				{symmetryItems.map((item, index) => (
					<div
						key={item.id}
						className={`${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}`}
					>
						<Radio.Group onChange={onChangeSymmetry} value={customizeDiamond.symmetry}>
							<Radio value={item.value}>
								<div className="flex items-center">
									<p className="font-semibold text-xl">{item.symmetry}</p>
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>

			<div className="mt-10 mb-5">
				<label className="my-5 font-semibold text-xl">
					Chọn Viền Cạnh (Girdle){' '}
					<Popover placement="topLeft" title={textGirdle} content={contentGirdle}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{girdleItems.map((item, index) => (
					<div
						key={item.id}
						className={`${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}`}
					>
						<Radio.Group onChange={onChangeGirdle} value={customizeDiamond.girdle}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.girdle}</p>
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="mt-10 mb-5">
				<label className="my-5 font-semibold text-xl">
					Chọn Chóp Đáy Kim Cương (Culet){' '}
					<Popover placement="topLeft" title={textCulet} content={contentCulet}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{culetItems.map((item, index) => (
					<div
						key={item.id}
						className={`${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}`}
					>
						<Radio.Group onChange={onChangeCulet} value={customizeDiamond.culet}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.culet}</p>
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="mt-10 mb-5">
				<label className="my-5 font-semibold text-xl">Chọn Nguồn Gốc </label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{diamondLabItems.map((item) => (
					<div key={item.id} className="mx-auto">
						<Radio.Group
							onChange={onChangeDiamondLab}
							value={customizeDiamond.isLabGrown}
						>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.isLabGrown}</p>
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="flex justify-between items-center mt-10">
				<Button
					type="text"
					size="large"
					className="w-48 uppercase font-semibold bg-primary"
					onClick={handleBackStep}
				>
					Quay Lại
				</Button>

				<Button
					className="bg-primary w-48 uppercase font-semibold"
					type="text"
					size="large"
					onClick={handleCompleted}
				>
					Xác Nhận
				</Button>
			</div>
		</div>
	);
};
