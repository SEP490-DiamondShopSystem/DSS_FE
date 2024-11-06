import React, {useEffect, useState} from 'react';

import {Button, message, Steps} from 'antd';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../../components/Loading';
import {
	GetAllDiamondSelector,
	GetAllJewelryMetalSelector,
	GetDiamondShapeSelector,
	LoadingDiamondSelector,
} from '../../../../redux/selectors';
import {getAllDiamond, getDiamondShape} from '../../../../redux/slices/diamondSlice';
import {enums} from '../../../../utils/constant';
import {Carat} from './Choose/Carat';
import {Clarity} from './Choose/Clarity';
import {Color} from './Choose/Color';
import {Cut} from './Choose/Cut';
import {Polish} from './Choose/Polish';
import {Specs} from './Choose/Specs';
import {Shape} from './Choose/Shape';
import {handleSendRequest} from '../../../../redux/slices/customizeSlice';
import {getAllJewelryMetal} from '../../../../redux/slices/jewelrySlice';

const mapAttributes = (data, attributes) => {
	return {
		Id: data.Id,
		Carat: data.Carat,
		Clarity: attributes.Clarity
			? Object.keys(attributes.Clarity).find(
					(key) => attributes.Clarity[key] === data.Clarity
			  )
			: '',
		Color: attributes.Color
			? Object.keys(attributes.Color).find((key) => attributes.Color[key] === data.Color)
			: '',
		Culet: attributes.Culet
			? Object.keys(attributes.Culet)
					.find((key) => attributes.Culet[key] === data.Culet)
					.replace('_', ' ')
			: '',
		Cut: attributes.Cut
			? Object.keys(attributes.Cut)
					.find((key) => attributes.Cut[key] === data.Cut)
					.replace('_', ' ')
			: '',
		Fluorescence: attributes.Fluorescence
			? Object.keys(attributes.Fluorescence).find(
					(key) => attributes.Fluorescence[key] === data.Fluorescence
			  )
			: '',
		Girdle: attributes.Girdle
			? Object.keys(attributes.Girdle)
					.find((key) => attributes.Girdle[key] === data.Girdle)
					.replace('_', ' ')
			: '',
		Polish: attributes.Polish
			? Object.keys(attributes.Polish)
					.find((key) => attributes.Polish[key] === data.Polish)
					.replace('_', ' ')
			: '',
		Symmetry: attributes.Symmetry
			? Object.keys(attributes.Symmetry)
					.find((key) => attributes.Symmetry[key] === data.Symmetry)
					.replace('_', ' ')
			: '',
		Depth: data.Depth,
		Table: data.Table,
		Title: data.Title,
		Measurement: data.Measurement,
		DiamondShape: data?.DiamondShape?.ShapeName,
		DiscountPrice: data?.DiscountPrice,
		TruePrice: data?.TruePrice,
		IsLabDiamond: data.IsLabDiamond,
	};
};

export const ChoiceMetalDiamond = ({
	setCustomizeDiamond,
	customizeDiamond,
	jewelry,
	handleSelectDiamond,
	diamondSelect,
	selectedDiamonds,
	setSelectedDiamonds,
	setDiamondSelect,
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
	const diamondList = useSelector(GetAllDiamondSelector);
	const loading = useSelector(LoadingDiamondSelector);
	const metals = useSelector(GetAllJewelryMetalSelector);

	const [stepChooseDiamond, setStepChooseDiamond] = useState(0);
	const [steps, setStep] = useState(0);
	const [mappedDiamonds, setMappedDiamonds] = useState();
	const [filters, setFilters] = useState({
		shape: '',
		// price: {minPrice: 0, maxPrice: 1000},
		carat: {minCarat: 0.1, maxCarat: 3},
		// color: {minColor: 1, maxColor: 8},
		// clarity: {minClarity: 1, maxClarity: 8},
		// cut: {minCut: 1, maxCut: 3},
	});

	const items = [
		{
			title: 'Carat Weight',
		},
		{
			title: 'Cut',
		},
		{
			title: 'Color',
		},
		{
			title: 'Clarity',
		},
		{
			title: 'Polish',
		},
		{
			title: 'Specs',
		},
		{
			title: 'Shape',
		},
	];

	const currentDiamond = jewelry?.MainDiamonds[stepChooseDiamond];
	const currentJewelry = filteredGroups[stepChooseDiamond];

	console.log('currentDiamond', currentDiamond);
	console.log('currentJewelry', currentJewelry);

	const fetchDiamondData = debounce(() => {
		dispatch(
			getAllDiamond({
				// pageSize,
				// start,
				shapeId: filters?.shape,
				// cutFrom: filters?.cut?.minCut,
				// cutTo: filters?.cut?.maxCut,
				// colorFrom: filters?.color?.minColor,
				// colorTo: filters?.color?.maxColor,
				// clarityFrom: filters?.clarity?.minClarity,
				// clarityTo: filters?.clarity?.maxClarity,
				caratFrom: filters?.carat?.minCarat,
				caratTo: filters?.carat?.maxCarat,
			})
		);
	}, 500);

	useEffect(() => {
		fetchDiamondData();

		return () => fetchDiamondData.cancel();
	}, [dispatch, filters]);

	useEffect(() => {
		if (diamondList && enums) {
			// Map diamond attributes to more readable values
			const mappedData = diamondList?.Values?.map((diamond) => mapAttributes(diamond, enums));
			setMappedDiamonds(mappedData);
		}
	}, [diamondList, enums]);

	useEffect(() => {
		dispatch(getAllJewelryMetal());
	}, []);

	const itemsDiamond =
		jewelry?.MainDiamonds?.map((diamond, index) => ({
			title: `Kim Cương Chính ${index + 1}`,
		})) || [];

	useEffect(() => {
		if (itemsDiamond.length === 0) {
			setStepChooseDiamond(0);
		}
	}, [itemsDiamond.length]);

	if (itemsDiamond.length === 0) {
		return <Loading />;
	}

	const handleReset = () => {
		localStorage.removeItem('selected');
		setFilters({
			shape: '',
			// price: {minPrice: 0, maxPrice: 1000},
			carat: {minCarat: 0.1, maxCarat: 3},
			// color: {minColor: 1, maxColor: 8},
			// clarity: {minClarity: 1, maxClarity: 8},
			// cut: {minCut: 1, maxCut: 3},
		});
	};

	const handleResetStep = () => {
		setStep(0);
		setStepChooseDiamond(0);
		setSelectedDiamonds([]);
	};

	const filterShape = metals?.find((metal) => metal.Name === selectedMetal);

	const handleSendReqCustomize = () => {
		const customizeDiamondRequests = selectedDiamonds?.map((diamond) => ({
			diamondShapeId: diamond?.shape,
			clarity: diamond?.clarity,
			color: diamond?.color,
			cut: diamond?.cut,
			caratFrom: diamond?.caratFrom,
			caratTo: diamond?.caratTo,
			isLabGrown: diamond?.isLabGrown,
			polish: diamond?.polish,
			symmetry: diamond?.symmetry,
			girdle: diamond?.girdle,
			culet: diamond?.culet,
		}));

		console.log('jewelryModelId', id);
		console.log('metalId', filterShape?.Id);
		console.log('sizeId', size);
		console.log('sideDiamondOptId', selectedSideDiamond);
		console.log('engravedText', textValue);
		console.log('engravedFont', fontFamily);

		dispatch(
			handleSendRequest({
				jewelryModelId: id,
				metalId: filterShape?.Id,
				sizeId: size,
				sideDiamondOptId: selectedSideDiamond?.Id,
				// engravedText: null,
				// engravedFont: null,
				engravedText: textValue,
				engravedFont: fontFamily,
				note: null,
				customizeDiamondRequests,
			})
		).then((res) => {
			if (res.payload !== undefined) {
				message.success('Thiết kế trang sức thành công!');
				setStepChoose(3);
			} else {
				message.error('Có lỗi khi thiết kế.');
			}
		});
	};

	console.log('currentDiamond', currentDiamond);
	console.log('shapes', metals);
	console.log('filterShape', filterShape);

	return (
		<div className="my-10 mx-5">
			<Steps items={itemsDiamond} current={stepChooseDiamond} type="navigation" />
			<div className="mx-10"></div>
			{/* {steps < items.length && (
				<div className="mx-20">
					<Diamond
						steps={steps}
						setStep={setStep}
						customizeDiamond={customizeDiamond}
						setCustomizeDiamond={setCustomizeDiamond}
						jewelry={jewelry}
						filters={filters}
						setFilters={setFilters}
						handleReset={handleReset}
						loading={loading}
						mappedDiamonds={mappedDiamonds}
						handleSelectDiamond={handleSelectDiamond}
						diamondSelect={diamondSelect}
						currentDiamond={currentDiamond}
						selectedDiamonds={selectedDiamonds}
						setSelectedDiamonds={setSelectedDiamonds}
					/>
				</div>
			)} */}

			{/* {steps === items.length && (
				<div className="mx-20">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn kim cương thành công. Vui lòng kiểm tra lại lựa chọn của bạn để
							hoàn tất!
						</div>
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center ">
								<Button danger onClick={handleResetStep}>
									Cài lại
								</Button>
							
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={handleSendReqCustomize}
							>
								Xác Nhận
							</Button>
						</div>
					</div>
				</div>
			)} */}
			{stepChooseDiamond < itemsDiamond.length && (
				<>
					<Steps items={items} current={steps} type="navigation" />
					{steps === 0 && (
						<div className="mx-20">
							<Carat
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
								currentDiamond={currentDiamond}
							/>
						</div>
					)}
					{steps === 1 && (
						<div className="mx-20">
							<Cut
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
							/>
						</div>
					)}
					{steps === 2 && (
						<div className="mx-20">
							<Color
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
							/>
						</div>
					)}
					{steps === 3 && (
						<div className="mx-20">
							<Clarity
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
							/>
						</div>
					)}
					{steps === 4 && (
						<div className="mx-20">
							<Polish
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
							/>
						</div>
					)}
					{steps === 5 && (
						<div className="mx-20">
							<Specs
								setStep={setStep}
								customizeDiamond={customizeDiamond}
								setCustomizeDiamond={setCustomizeDiamond}
							/>
						</div>
					)}
					{steps === 6 && (
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
				</>
			)}

			{stepChooseDiamond === itemsDiamond.length && (
				<div className="mx-20">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn kim cương thành công. Vui lòng kiểm tra lại lựa chọn của bạn để
							hoàn tất!
						</div>
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center ">
								<Button danger onClick={handleResetStep}>
									Cài lại
								</Button>
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={handleSendReqCustomize}
							>
								Xác Nhận
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
