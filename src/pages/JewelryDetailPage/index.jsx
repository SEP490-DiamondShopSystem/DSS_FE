import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import LoginModal from '../../components/LogModal/LoginModal';
import {GetJewelryDetailSelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import ProductReviews from './Popup/ProductReviews';
import Loading from '../../components/Loading';
import {getJewelryNoDiamond} from '../../redux/slices/reviewSlice';

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const loading = useSelector(LoadingJewelrySelector);

	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [selectedSideDiamond, setSelectedSideDiamond] = useState();
	const [jewelrySelected, setJewelrySelected] = useState();
	const [uniqueMetals, setUniqueMetals] = useState([]);
	const [uniqueSideDiamonds, setUniqueSideDiamonds] = useState([]);

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
		dispatch(getJewelryDetail({id}))
			.unwrap()
			.then((res) => {
				setJewelry(res);
			});
	}, []);

	useEffect(() => {
		if (size) {
			dispatch(
				getJewelryNoDiamond({
					ModelId: id,
					MetalId: selectedMetal?.Id,
					SizeId: size,
					SideDiamondOptId: selectedSideDiamond?.Id,
				})
			)
				.unwrap()
				.then((res) => {
					setJewelrySelected(res);
				});
		}
	}, [id, selectedMetal, size, selectedSideDiamond]);

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

	useEffect(() => {
		if (filteredGroups && size == null) {
			const availableSize = filteredGroups[0]?.SizeGroups.find(
				(group) => group.IsInStock === true
			);
			setSize(availableSize?.Size || null);
		}
	}, [filteredGroups, size]);

	useEffect(() => {
		// Lọc MetalGroups có SizeGroups với IsInStock = true và gộp MetalName
		const filteredMetals = jewelry?.MetalGroups?.filter((group) =>
			group?.SizeGroups?.some((size) => size?.IsInStock)
		).map((group) => {
			const metal = jewelry?.Metals?.find((m) => m?.Id === group?.MetalId);
			return {
				...group,
				OriginalName: group?.Name, // Lưu tên cũ vào OriginalName
				Name: metal ? metal?.Name : 'Unknown Metal', // Gán MetalName thành Name
				Price: metal?.Price,
				Id: group?.MetalId,
			};
		});

		// Loại bỏ MetalName (giờ là Name) trùng lặp
		const uniqueFilteredMetals = [];
		const seenNames = new Set();

		filteredMetals?.forEach((metal) => {
			if (!seenNames?.has(metal?.Name)) {
				seenNames?.add(metal?.Name);
				uniqueFilteredMetals?.push(metal);
			}
		});
		setSelectedMetal(uniqueFilteredMetals?.[0] || null);
		setUniqueMetals(uniqueFilteredMetals);
	}, [jewelry]);

	useEffect(() => {
		// Lọc MetalGroups có SizeGroups với IsInStock = true và gộp MetalName
		const filteredSideDiamonds = jewelry?.MetalGroups?.filter((group) =>
			group?.SizeGroups?.some((size) => size?.IsInStock)
		).map((group) => {
			const sideDiamond = jewelry?.SideDiamonds?.find((m) => m?.Id === group?.SideDiamondId);
			return {
				...group,
				OriginalName: group?.Name, // Lưu tên cũ vào OriginalName
				Quantity: sideDiamond?.Quantity,
				CaratWeight: sideDiamond?.CaratWeight,
				Id: group?.SideDiamondId,
			};
		});

		// Loại bỏ MetalName (giờ là Name) trùng lặp
		const uniqueFilteredMetals = [];
		const seenNames = new Set();

		filteredSideDiamonds?.forEach((sideDiamond) => {
			if (!seenNames?.has(sideDiamond?.SideDiamondId)) {
				seenNames?.add(sideDiamond?.SideDiamondId);
				uniqueFilteredMetals?.push(sideDiamond);
			}
		});
		setSelectedSideDiamond(filteredSideDiamonds?.[0] || null);
		setUniqueSideDiamonds(uniqueFilteredMetals);
	}, [jewelry]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="px-4 md:px-32 md:mt-10">
					<Steps items={items} current={0} className="w-full md:w-auto" />

					<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-full md:w-1/2 p-4 md:p-6">
							<ImageGallery diamondJewelry={jewelry} selectedMetal={selectedMetal} />
							<InformationLeft
								diamondJewelry={jewelry}
								selectedMetal={selectedMetal}
							/>
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
								jewelrySelected={jewelrySelected}
								processedMetals={uniqueMetals}
								uniqueSideDiamonds={uniqueSideDiamonds}
							/>
						</div>
					</div>

					{/* <ProductReviews /> */}
					<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
				</div>
			)}
		</>
	);
};

export default JewelryDetailPage;
