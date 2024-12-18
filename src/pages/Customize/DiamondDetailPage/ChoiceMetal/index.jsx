import React, {useEffect, useState} from 'react';

import {Button, Input, message, Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../../components/Loading';
import {GetAllJewelryMetalSelector, GetLoadingCustomizeSelector} from '../../../../redux/selectors';
import {handleSendRequest} from '../../../../redux/slices/customizeSlice';
import {getAllJewelryMetal} from '../../../../redux/slices/jewelrySlice';
import {Diamond} from './Choose/Diamond';
import {Shape} from './Choose/Shape';
import {Specs} from './Choose/Specs';

export const ChoiceMetalDiamond = ({
	setCustomizeDiamond,
	customizeDiamond,
	jewelry,
	selectedDiamonds,
	setSelectedDiamonds,
	setStepChoose,
	id,
	selectedMetal,
	size,
	selectedSideDiamond,
	textValue,
	fontFamily,
	filteredGroups,
}) => {
	const dispatch = useDispatch();
	const metals = useSelector(GetAllJewelryMetalSelector);
	const loading = useSelector(GetLoadingCustomizeSelector);

	const [stepChooseDiamond, setStepChooseDiamond] = useState(0);
	const [steps, setStep] = useState(0);
	const [advanced, setAdvanced] = useState(false);
	const [note, setNote] = useState('');

	const items = [
		{
			title: 'Chọn Hình Dạng',
			disabled: steps < 0,
		},
		{
			title: 'Chọn 4C',
			disabled: steps < 1,
		},
		{
			title: 'Chọn Nâng Cao',
			disabled: steps < 2,
		},
	];

	const expandedDiamonds =
		jewelry?.MainDiamonds?.flatMap((diamond) => Array(diamond.Quantity).fill(diamond)) || [];

	const currentDiamond = expandedDiamonds[stepChooseDiamond];

	const currentJewelry = filteredGroups[stepChooseDiamond];

	const quantities = jewelry?.MainDiamonds?.map((diamond) => diamond.Quantity) || [];

	const totalQuantity =
		jewelry?.MainDiamonds?.reduce((sum, diamond) => sum + diamond.Quantity, 0) || 0;

	useEffect(() => {
		dispatch(getAllJewelryMetal());
	}, []);

	const itemsDiamond = Array.from({length: jewelry?.MainDiamondCount || 0}, (_, index) => ({
		title: `Kim Cương ${index + 1}`,
		disabled: true,
	}));

	useEffect(() => {
		if (itemsDiamond.length === 0) {
			setStepChooseDiamond(0);
		}
	}, [itemsDiamond.length]);

	if (itemsDiamond.length === 0) {
		return <Loading />;
	}

	const handleResetStep = () => {
		setStep(0);
		setStepChooseDiamond(0);
		setSelectedDiamonds([]);
	};

	const onChange = (value) => {
		setStep(value);
	};

	const onChangeDiamond = (value) => {
		setStepChooseDiamond(value);
	};

	const handleNoteChange = (e) => {
		setNote(e.target.value);
	};

	const handleSendReqCustomize = () => {
		const customizeDiamondRequests = selectedDiamonds?.map((diamond) => ({
			diamondShapeId: diamond?.shape,
			colorFrom: diamond?.colorFrom,
			colorTo: diamond?.colorTo,
			cutFrom: diamond?.cutFrom,
			cutTo: diamond?.cutTo,
			clarityFrom: diamond?.clarityFrom,
			clarityTo: diamond?.clarityTo,
			caratFrom: diamond?.caratFrom,
			caratTo: diamond?.caratTo,
			isLabGrown: diamond?.isLabGrown,
			polish: diamond?.polish,
			symmetry: diamond?.symmetry,
			girdle: diamond?.girdle,
			culet: diamond?.culet,
		}));

		dispatch(
			handleSendRequest({
				jewelryModelId: id,
				metalId: selectedMetal?.Id,
				sizeId: size,
				sideDiamondOptId: selectedSideDiamond?.Id,
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
				message.error(error?.data?.detail || error?.title);
			});
	};

	return (
		<div className="my-10 mx-5">
			<Steps
				items={itemsDiamond}
				current={stepChooseDiamond}
				type="navigation"
				onChange={onChangeDiamond}
			/>
			<div className="mx-10"></div>

			{stepChooseDiamond < itemsDiamond.length && (
				<>
					<Steps items={items} current={steps} type="navigation" onChange={onChange} />

					{steps === 0 && (
						<div className="mx-20">
							<Shape
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
								setStepChooseDiamond={setStepChooseDiamond}
								currentDiamond={currentDiamond}
								selectedDiamonds={selectedDiamonds}
								setSelectedDiamonds={setSelectedDiamonds}
								currentJewelry={currentJewelry}
							/>
						</div>
					)}
					{steps === 1 && (
						<div className="mx-20">
							<Diamond
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
								currentDiamond={currentDiamond}
								setAdvanced={setAdvanced}
								steps={steps}
								advanced={advanced}
								setStepChooseDiamond={setStepChooseDiamond}
								setSelectedDiamonds={setSelectedDiamonds}
								selectedDiamonds={selectedDiamonds}
							/>
						</div>
					)}
					{steps === 2 && (
						<div className="mx-20">
							<Specs
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
								setStepChooseDiamond={setStepChooseDiamond}
								currentDiamond={currentDiamond}
								selectedDiamonds={selectedDiamonds}
								setSelectedDiamonds={setSelectedDiamonds}
								currentJewelry={currentJewelry}
							/>
						</div>
					)}
				</>
			)}

			{stepChooseDiamond === itemsDiamond.length && (
				<div className="mx-20">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn kim cương thành công. Vui lòng kiểm tra lại lựa chọn của bạn để
							hoàn tất!
						</div>
						<div className="mx-32 my-5">
							<p>Ghi Chú</p>
							<Input.TextArea onChange={handleNoteChange} />
						</div>
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center ">
								<Button danger onClick={handleResetStep}>
									Chọn lại
								</Button>
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={handleSendReqCustomize}
								loading={loading}
							>
								Gửi Yêu Cầu
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
