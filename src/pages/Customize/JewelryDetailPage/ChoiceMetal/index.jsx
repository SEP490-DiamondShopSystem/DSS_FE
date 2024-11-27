import React, {useEffect, useState} from 'react';

import {Button, Input, message, Steps} from 'antd';
import {Engrave} from './Choose/Engrave';
import {Metal} from './Choose/Metal';
import {handleSendRequest} from '../../../../redux/slices/customizeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllJewelryMetalSelector, GetLoadingCustomizeSelector} from '../../../../redux/selectors';
import {getAllJewelryMetal} from '../../../../redux/slices/jewelrySlice';

export const ChoiceMetal = ({
	setImageData,
	imageData,
	setCustomizeJewelry,
	customizeJewelry,
	setStepChoose,
	findMetals,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
	setFontFamily,
	fontFamily,
	setTextValue,
	textValue,
	filteredGroups,
	size,
	setSize,
	handleSizeChange,
	selectedDiamonds,
	selectedSideDiamond,
	setSelectedSideDiamond,
	id,
}) => {
	const loading = useSelector(GetLoadingCustomizeSelector);

	const [steps, setStep] = useState(0);
	const dispatch = useDispatch();
	const [note, setNote] = useState('');

	const items = [
		{
			title: 'Chọn mẫu',
		},
		// {
		// 	title: 'Kích thước',
		// },
		...(diamondJewelry?.IsEngravable ? [{title: 'Chữ khắc'}] : []),
	];

	const handleStepClick = (index) => {
		if (index <= steps) {
			setStep(index); // Set step only if the index is less than or equal to the current step
		}
	};

	const handleSideDiamondChange = (e) => {
		console.log('side diamond', e.target.value);

		setSelectedSideDiamond(e.target.value);
	};

	console.log('jewelryModel', diamondJewelry);

	const handleNextStep = () => {
		if (diamondJewelry?.MainDiamonds.length === 0) {
			const customizeDiamondRequests = selectedDiamonds?.map((diamond) => ({
				diamondShapeId: diamond?.shape || null,
				clarity: diamond?.clarity || null,
				color: diamond?.color || null,
				cut: diamond?.cut || null,
				caratFrom: diamond?.caratFrom || null,
				caratTo: diamond?.caratTo || null,
				isLabGrown: diamond?.isLabGrown || null,
				polish: diamond?.polish || null,
				symmetry: diamond?.symmetry || null,
				girdle: diamond?.girdle || null,
				culet: diamond?.culet || null,
			}));

			dispatch(
				handleSendRequest({
					jewelryModelId: id,
					metalId: selectedMetal?.Id,
					sizeId: size,
					sideDiamondOptId: selectedSideDiamond || null,
					engravedText: textValue,
					engravedFont: fontFamily,
					note: note,
					customizeDiamondRequests,
				})
			)
				.unwrap()
				.then((res) => {
					message.success('Thiết kế trang sức thành công!');
					setStepChoose(3);
				})
				.catch((error) => {
					message.error(error.data.title || error.title || error.detail);
				});
		} else {
			setStepChoose((prev) => prev + 1);
		}
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
	};

	const handleReChoose = () => {
		setStep(0);
		setSize(null);
		setImageData(null);
		setSelectedMetal('');
	};

	console.log('diamondJewelry', diamondJewelry);
	console.log('selectedMetal', selectedMetal);

	return (
		<div className="my-10 mx-5">
			<div className="mx-10">
				<Steps
					items={items.map((item, index) => ({
						...item,
						onClick: () => handleStepClick(index),
						disabled: index > steps,
					}))}
					current={steps}
					type="navigation"
				/>
			</div>
			{steps === 0 && (
				<div className="mx-20">
					<Metal
						setStep={setStep}
						customizeJewelry={customizeJewelry}
						setCustomizeJewelry={setCustomizeJewelry}
						diamondJewelry={diamondJewelry}
						selectedMetal={selectedMetal}
						setSelectedMetal={setSelectedMetal}
						handleSelectMetal={handleSelectMetal}
						filteredGroups={filteredGroups}
						handleSizeChange={handleSizeChange}
						size={size}
						findMetals={findMetals}
						selectedSideDiamond={selectedSideDiamond}
						handleSideDiamondChange={handleSideDiamondChange}
					/>
				</div>
			)}

			{diamondJewelry && diamondJewelry?.IsEngravable
				? steps === 1 && (
						<div className="mx-20">
							<Engrave
								setImageData={setImageData}
								imageData={imageData}
								setStep={setStep}
								customizeJewelry={customizeJewelry}
								setCustomizeJewelry={setCustomizeJewelry}
								setFontFamily={setFontFamily}
								fontFamily={fontFamily}
								setTextValue={setTextValue}
								textValue={textValue}
								diamondJewelry={diamondJewelry}
							/>
						</div>
				  )
				: steps === 1 && (
						<div className="mx-20 my-auto">
							<div className="my-10 shadow-lg p-10 rounded-lg">
								<div className="text-center">
									Chọn vỏ thành công. Vui lòng kiểm tra lại lựa chọn của bạn!
								</div>
								{diamondJewelry?.MainDiamonds.length === 0 && (
									<div className="mx-14 my-2">
										<label>Ghi Chú</label>
										<Input.TextArea onChange={handleNoteChange} />
									</div>
								)}
								<div className="flex items-center justify-between mt-10">
									<div className="flex items-center">
										<Button danger onClick={() => setStep(0)}>
											Chọn lại
										</Button>
									</div>
									<Button
										type="text"
										className="bg-primary border"
										onClick={handleNextStep}
									>
										{diamondJewelry?.MainDiamonds.length === 0
											? 'Đặt thiết kế'
											: 'Xác Nhận'}
									</Button>
								</div>
							</div>
						</div>
				  )}

			{steps === 3 && (
				<div className="mx-20 my-auto">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn vỏ thành công. Vui lòng kiểm tra lại lựa chọn của bạn!
						</div>
						{diamondJewelry?.MainDiamonds.length === 0 && (
							<div className="mx-14 my-2">
								<label>Ghi Chú</label>
								<Input.TextArea onChange={handleNoteChange} />
							</div>
						)}
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center ">
								<Button danger onClick={handleReChoose}>
									Chọn lại
								</Button>
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={handleNextStep}
								loading={loading}
							>
								{diamondJewelry?.MainDiamonds.length === 0
									? 'Đặt thiết kế'
									: 'Xác Nhận'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
