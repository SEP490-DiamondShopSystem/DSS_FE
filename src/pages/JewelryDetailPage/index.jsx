import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import LoginModal from '../../components/LogModal/LoginModal';
import {GetJewelryDetailSelector} from '../../redux/selectors';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Steps} from 'antd';

const items = [
	{
		title: 'Chọn Vỏ',
	},
	{
		title: 'Chọn Kim Cương',
	},
	{
		title: 'Hoàn Thành',
	},
];

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	const jewelryDetail = useSelector(GetJewelryDetailSelector);
	const storedUser = localStorage.getItem('user');
	const user = JSON.parse(storedUser);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [sizePrice, setSizePrice] = useState();
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();

	console.log('idModel', id);

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

	const hideLoginModal = () => setIsLoginModalVisible(false);

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
			<Steps items={items} current={0} />
			<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft diamondJewelry={jewelry} selectedMetal={selectedMetal} />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
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
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
		</div>
	);
};

export default JewelryDetailPage;
