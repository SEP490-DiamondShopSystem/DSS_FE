import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';
import {ChoiceMetalDiamond} from '../DiamondDetailPage/ChoiceMetal';
import {DetailMetalDiamond} from '../DiamondDetailPage/DetailMetal/DetailMetal';
import {getJewelryDetail} from '../../../redux/slices/jewelrySlice';
import {GetJewelryDetailSelector} from '../../../redux/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const JewelryCustomDetail = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const jewelryDetail = useSelector(GetJewelryDetailSelector);

	const [stepChoose, setStepChoose] = useState(0);
	const [imageData, setImageData] = useState(null);
	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();
	const [customizeJewelry, setCustomizeJewelry] = useState({
		size: '',
		metal: '',
		shape: '',
		textValue: 'Your Text Here',
	});
	const [customizeDiamond, setCustomizeDiamond] = useState({
		carat: '',
		color: '',
		cut: '',
		clarity: '',
	});

	console.log(customizeDiamond);
	console.log('id', id);
	console.log('customizeJewelry', customizeJewelry);
	console.log('jewelry', jewelry);

	useEffect(() => {
		dispatch(getJewelryDetail({id}));
	}, []);

	useEffect(() => {
		if (jewelryDetail) {
			setJewelry(jewelryDetail);
			setSelectedMetal(jewelryDetail?.Metals[0]);
			setSelectedSideDiamond(jewelryDetail?.SideDiamonds[0]);
			// setSize(jewelryDetail?.MetalGroups[0]?.SizeGroups[0].Size);
		}
	}, [jewelryDetail]);

	const items = [
		{
			title: `Chọn Trang Sức`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];

	const handleSizeChange = (e) => {
		setCustomizeJewelry((prev) => ({
			...prev,
			size: e.target.value,
		}));
	};

	const handleChange = (value) => {
		setSize(value);
		console.log('value', value);
	};

	const handleSelectSideDiamond = (diamond) => {
		setSelectedSideDiamond(diamond);
		console.log(diamond);

		localStorage.setItem('selectedSideDiamond', JSON.stringify(diamond));
	};
	const handleSelectMetal = (metal) => {
		setSelectedMetal(metal);
		console.log('metal', metal);

		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const filterMetalGroups = (metalGroups, selectedMetal, selectedSideDiamond) => {
		// Check if metalGroups is defined and is an array
		if (!Array.isArray(metalGroups)) {
			console.warn('metalGroups is undefined or not an array');
			return []; // Return an empty array if metalGroups is undefined or not an array
		}

		console.log('MetalGroups:', metalGroups);
		console.log('Selected Metal:', selectedMetal);
		console.log('Selected SideDiamond:', selectedSideDiamond);

		return metalGroups
			.map((group) => {
				// Check if group matches the selected MetalId
				const isMatchingMetal = group.MetalId === selectedMetal?.Id;

				// Check if group matches the selected SideDiamondId (if provided)
				const isMatchingSideDiamond = selectedSideDiamond
					? group.SideDiamondId === selectedSideDiamond.Id
					: true; // If no SideDiamondId is provided, consider it a match

				// If both metal and side diamond match (or only metal if no SideDiamondId), add details
				if (isMatchingMetal && isMatchingSideDiamond) {
					return {
						...group,
						MetalDetails: selectedMetal,
						SideDiamondDetails: selectedSideDiamond || null, // Set SideDiamondDetails to null if not provided
					};
				}

				return null; // return null if no match
			})
			.filter((item) => item !== null); // filter out unmatched items
	};

	// Usage with individual selected items
	const filteredGroups = filterMetalGroups(
		jewelry?.MetalGroups,
		selectedMetal,
		selectedSideDiamond
	);

	return (
		<div className="mx-32">
			{stepChoose === 0 && (
				<>
					<Steps
						current={0}
						items={items}
						percent={67}
						className="bg-white p-4 rounded-full my-10"
					/>
					<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-full md:w-1/2 p-6">
							<ImageGallery />
							<InformationLeft />
						</div>

						<div className="w-full md:w-1/2 p-6 md:pr-32">
							<InformationRight
								handleSizeChange={handleSizeChange}
								setStepChoose={setStepChoose}
								customizeJewelry={customizeJewelry}
								id={id}
								filteredGroups={filteredGroups}
								diamondJewelry={jewelry}
								setSelectedMetal={setSelectedMetal}
								selectedMetal={selectedMetal}
								setSize={setSize}
								size={size}
								setSelectedSideDiamond={setSelectedSideDiamond}
								selectedSideDiamond={selectedSideDiamond}
								handleChange={handleChange}
								handleSelectMetal={handleSelectMetal}
								handleSelectSideDiamond={handleSelectSideDiamond}
							/>
						</div>
					</div>
				</>
			)}
			{stepChoose === 1 && (
				<>
					<Steps
						current={0}
						items={items}
						percent={100}
						className="bg-white p-4 rounded-full my-10"
					/>
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-1/2">
							<ChoiceMetal
								imageData={imageData}
								setImageData={setImageData}
								setCustomizeJewelry={setCustomizeJewelry}
								customizeJewelry={customizeJewelry}
								setStepChoose={setStepChoose}
								diamondJewelry={jewelry}
								selectedMetal={selectedMetal}
								setSelectedMetal={setSelectedMetal}
								handleSelectMetal={handleSelectMetal}
							/>
						</div>

						<div className="w-1/2">
							<DetailMetal
								imageData={imageData}
								customizeJewelry={customizeJewelry}
								jewelry={jewelry}
								selectedMetal={selectedMetal}
								size={size}
							/>
						</div>
					</div>
				</>
			)}
			{stepChoose === 2 && (
				<>
					<Steps current={1} items={items} className="bg-white p-4 rounded-full my-10" />
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-1/2">
							<ChoiceMetalDiamond
								setCustomizeDiamond={setCustomizeDiamond}
								customizeDiamond={customizeDiamond}
							/>
						</div>

						<div className="w-1/2">
							<DetailMetalDiamond
								imageData={imageData}
								customizeJewelry={customizeJewelry}
								customizeDiamond={customizeDiamond}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default JewelryCustomDetail;
