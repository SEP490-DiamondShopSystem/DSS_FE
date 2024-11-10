import React, {useEffect, useState} from 'react';

import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Space, Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {GetAllJewelryModelDetailCustomizeSelector} from '../../../redux/selectors';
import {getJewelryModelDetail} from '../../../redux/slices/customizeSlice';
import {ChoiceMetalDiamond} from '../DiamondDetailPage/ChoiceMetal';
import {DetailMetalDiamond} from '../DiamondDetailPage/DetailMetal/DetailMetal';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';

const JewelryCustomDetail = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const jewelryDetail = useSelector(GetAllJewelryModelDetailCustomizeSelector);
	const navigate = useNavigate();

	const [stepChoose, setStepChoose] = useState(0);
	const [imageData, setImageData] = useState(null);
	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();
	const [textValue, setTextValue] = useState('Your Text Here');
	const [fontFamily, setFontFamily] = useState('Arial');
	const [diamondSelect, setDiamondSelect] = useState(null);
	const [selectedDiamonds, setSelectedDiamonds] = useState([]);
	const [customizeJewelry, setCustomizeJewelry] = useState({
		size: '',
		metal: '',
		shape: '',
	});
	const [customizeDiamond, setCustomizeDiamond] = useState({
		caratFrom: '',
		caratTo: '',
		shape: '',
		color: '',
		cut: '',
		clarity: '',
		polish: '',
		symmetry: '',
		girdle: '',
		culet: '',
		isLabGrown: null,
	});

	useEffect(() => {
		dispatch(getJewelryModelDetail({id}));
	}, []);

	useEffect(() => {
		if (jewelryDetail) {
			setJewelry(jewelryDetail);
			setSelectedMetal(jewelryDetail?.MetalSupported[0]);
			setSelectedSideDiamond(jewelryDetail?.SideDiamonds[0]);
			// setSize(jewelryDetail?.MetalGroups[0]?.SizeGroups[0].Size);
		}
	}, [jewelryDetail]);

	const items = [
		{
			title: `Chọn Thông Số Vỏ`,
			disabled: stepChoose < 0,
		},
		{
			title: 'Chọn Thông Số Kim Cương',
			disabled: stepChoose < 1,
		},
		{
			title: 'Hoàn Thành',
			disabled: stepChoose < 2,
		},
	];

	// const handleSizeChange = (e) => {
	// 	setCustomizeJewelry((prev) => ({
	// 		...prev,
	// 		size: e.target.value,
	// 	}));
	// };

	const handleSizeChange = (e) => {
		setSize(e.target.value);
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

	const handleSelectDiamond = (diamond) => {
		setDiamondSelect(diamond); // Update the selected diamond
	};

	const filterMetalGroups = (metalGroups, selectedMetal, selectedSideDiamond) => {
		// Check if metalGroups is defined and is an array
		if (!Array.isArray(metalGroups)) {
			console.warn('metalGroups is undefined or not an array');
			return []; // Return an empty array if metalGroups is undefined or not an array
		}

		return metalGroups
			.map((group) => {
				// Check if group matches the selected MetalId
				const isMatchingMetal = group.Metal.Name === selectedMetal;

				// Check if group matches the selected SideDiamondId (if provided)
				// const isMatchingSideDiamond = selectedSideDiamond
				// 	? group.SideDiamondId === selectedSideDiamond.Id
				// 	: true; // If no SideDiamondId is provided, consider it a match

				// If both metal and side diamond match (or only metal if no SideDiamondId), add details
				if (isMatchingMetal) {
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
		jewelry?.SizeMetals,
		selectedMetal,
		selectedSideDiamond
	);

	const onChange = (step) => {
		if (step <= stepChoose) {
			setStepChoose(step);
		}
	};

	return (
		<div className="mx-32">
			<Steps
				current={stepChoose}
				items={items}
				percent={100}
				className="bg-white p-4 rounded-full my-10"
				onChange={onChange}
			/>
			{stepChoose === 0 && (
				<>
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
								setFontFamily={setFontFamily}
								fontFamily={fontFamily}
								setTextValue={setTextValue}
								textValue={textValue}
								filteredGroups={filteredGroups}
								size={size}
								setSize={setSize}
								handleSizeChange={handleSizeChange}
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
			{stepChoose === 1 && (
				<>
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-2/3">
							<ChoiceMetalDiamond
								setCustomizeDiamond={setCustomizeDiamond}
								customizeDiamond={customizeDiamond}
								jewelry={jewelry}
								diamondSelect={diamondSelect}
								handleSelectDiamond={handleSelectDiamond}
								selectedDiamonds={selectedDiamonds}
								setSelectedDiamonds={setSelectedDiamonds}
								setDiamondSelect={setDiamondSelect}
								setStepChoose={setStepChoose}
								id={id}
								selectedMetal={selectedMetal}
								size={size}
								selectedSideDiamond={selectedSideDiamond}
								textValue={textValue}
								fontFamily={fontFamily}
								filteredGroups={filteredGroups}
							/>
						</div>

						<div className="w-1/3">
							<DetailMetalDiamond
								imageData={imageData}
								customizeJewelry={customizeJewelry}
								customizeDiamond={customizeDiamond}
								jewelry={jewelry}
								selectedMetal={selectedMetal}
								size={size}
								selectedDiamonds={selectedDiamonds}
							/>
						</div>
					</div>
				</>
			)}
			{stepChoose === 3 && (
				<>
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="text-center w-full p-6">
							<div className="my-10">
								<FontAwesomeIcon
									icon={faCheckCircle}
									color="green"
									style={{fontSize: 64}}
								/>
							</div>

							<h2 className="text-2xl font-semibold text-primary">
								Đơn hàng của bạn đã đặt hàng thành công!
							</h2>
							<h2 className="text-2xl font-semibold text-primary">
								Xin vui lòng kiểm tra giỏ hàng!
							</h2>
							<Space className="my-5">
								<Button
									type="text"
									className="bg-primary w-48 uppercase font-semibold"
									onClick={() => navigate('/customize/diamond-jewelry')}
								>
									Tiếp Tục Thiết Kế
								</Button>
								<Button
									type="text"
									className="bg-primary w-48 uppercase font-semibold"
								>
									Vào Giỏ Hàng
								</Button>
							</Space>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default JewelryCustomDetail;
