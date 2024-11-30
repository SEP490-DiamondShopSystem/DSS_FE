import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import LoginModal from '../../components/LogModal/LoginModal';
import {GetJewelryDetailSelector} from '../../redux/selectors';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import ProductReviews from './Popup/ProductReviews';

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	const jewelryDetail = useSelector(GetJewelryDetailSelector);

	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();

	const items = [
		{
			title: 'Chọn Vỏ',
		},
		...(jewelry?.MainDiamonds?.length > 0 ? [{title: 'Chọn Kim Cương'}] : []),
		{
			title: 'Hoàn Thành',
		},
	];

	useEffect(() => {
		console.log('chạy ở đây');

		dispatch(getJewelryDetail({id}))
			.unwrap()
			.then((res) => {
				setJewelry(res);
				setSelectedMetal(res?.Metals?.[0] || null);
				setSelectedSideDiamond(res?.SideDiamonds?.[0] || null);
			});
	}, []);

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const filterMetalGroups = (metalGroups, selectedMetal, selectedSideDiamond) => {
		// Check if metalGroups is defined and is an array
		if (!Array.isArray(metalGroups)) {
			console.warn('metalGroups is undefined or not an array');
			return []; // Return an empty array if metalGroups is undefined or not an array
		}

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
		<div className="px-4 md:px-32">
			<Steps items={items} current={0} className="w-full md:w-auto" />

			<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-4 md:p-6">
					<ImageGallery diamondJewelry={jewelry} selectedMetal={selectedMetal} />
					<InformationLeft diamondJewelry={jewelry} selectedMetal={selectedMetal} />
				</div>

				<div className="w-full md:w-1/2 p-4 md:p-6">
					<InformationRight
						diamondJewelry={jewelry}
						setSelectedMetal={setSelectedMetal}
						selectedMetal={selectedMetal}
						setSize={setSize}
						size={size}
						setIsLoginModalVisible={setIsLoginModalVisible}
						setSelectedSideDiamond={setSelectedSideDiamond}
						selectedSideDiamond={selectedSideDiamond}
						filteredGroups={filteredGroups}
						id={id}
					/>
				</div>
			</div>

			{/* <ProductReviews /> */}
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
		</div>
	);
};

export default JewelryDetailPage;
