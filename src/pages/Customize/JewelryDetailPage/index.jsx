import React, {useEffect, useState} from 'react';

import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Space, Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {
	GetAllJewelryMetalSelector,
	GetAllJewelryModelDetailCustomizeSelector,
} from '../../../redux/selectors';
import {getJewelryModelDetail} from '../../../redux/slices/customizeSlice';
import {ChoiceMetalDiamond} from '../DiamondDetailPage/ChoiceMetal';
import {DetailMetalDiamond} from '../DiamondDetailPage/DetailMetal/DetailMetal';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';
import {getAllJewelryMetal} from '../../../redux/slices/jewelrySlice';

const JewelryCustomDetail = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const jewelryDetail = useSelector(GetAllJewelryModelDetailCustomizeSelector);
	const metals = useSelector(GetAllJewelryMetalSelector);
	const navigate = useNavigate();

	const [stepChoose, setStepChoose] = useState(0);
	const [imageData, setImageData] = useState(null);
	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState('');
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();
	const [textValue, setTextValue] = useState(null);
	const [fontFamily, setFontFamily] = useState(null);
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
		colorFrom: 1,
		colorTo: 8,
		cutFrom: 1,
		cutTo: 3,
		clarityFrom: 1,
		clarityTo: 8,
		polish: '',
		symmetry: '',
		girdle: '',
		culet: '',
		isLabGrown: false,
	});

	const findMetals = metals?.filter((metal) => jewelry?.MetalSupported.includes(metal.Name));

	useEffect(() => {
		dispatch(getAllJewelryMetal());
	}, []);

	useEffect(() => {
		dispatch(getJewelryModelDetail({id}));
	}, []);

	useEffect(() => {
		if (jewelryDetail) {
			setJewelry(jewelryDetail);
		}
	}, [jewelryDetail, metals]);

	const items = [
		{
			title: 'Chọn Thông Số Vỏ',
			disabled: stepChoose !== 0 && stepChoose !== 1,
		},
		...(jewelry?.MainDiamonds?.length > 0
			? [
					{
						title: 'Chọn Thông Số Kim Cương',
						disabled: stepChoose === 0 || stepChoose !== 2,
					},
			  ]
			: []),
		{
			title: 'Hoàn Thành',
			disabled: stepChoose < 2,
		},
	];

	const handleSizeChange = (e) => {
		setSize(e.target.value);
	};

	const handleSelectMetal = (metal) => {
		setSelectedMetal(metal);

		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const handleSelectDiamond = (diamond) => {
		setDiamondSelect(diamond); // Update the selected diamond
	};

	const filterMetalGroups = (metalGroups, selectedMetal, selectedSideDiamond) => {
		if (!Array.isArray(metalGroups)) {
			console.warn('metalGroups is undefined or not an array');
			return [];
		}

		return metalGroups
			.map((group) => {
				// Check if group matches the selected MetalId
				const isMatchingMetal = group.Metal.Name === selectedMetal?.Name;

				if (isMatchingMetal) {
					return {
						...group,
						MetalDetails: selectedMetal?.Name,
						SideDiamondDetails: selectedSideDiamond || null,
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
								selectedDiamonds={selectedDiamonds}
								selectedSideDiamond={selectedSideDiamond}
								findMetals={findMetals}
								id={id}
								setSelectedSideDiamond={setSelectedSideDiamond}
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
								Yêu cầu thiết kế của bạn đã được gửi thành công!
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
									onClick={() => navigate('/request-customize')}
								>
									Kiểm Tra Đơn Thiết Kế
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
