import {Steps} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useParams} from 'react-router-dom';
import Loading from '../../components/Loading';
import LoginModal from '../../components/LogModal/LoginModal';
import {LoadingJewelrySelector} from '../../redux/selectors';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {getJewelryNoDiamond} from '../../redux/slices/reviewSlice';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const jewelryFromList = location.state?.jewelry;
	const loading = useSelector(LoadingJewelrySelector);

	const [size, setSize] = useState(null);
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(null);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [selectedSideDiamond, setSelectedSideDiamond] = useState(null);
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
	}, [dispatch, id]);

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
	}, [id, selectedMetal, size, selectedSideDiamond, dispatch]);

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const filterMetalGroups = (metalGroups, selectedMetal, selectedSideDiamond) => {
		if (!Array.isArray(metalGroups)) {
			console.warn('metalGroups is undefined or not an array');
			return [];
		}

		return metalGroups
			.map((group) => {
				const isMatchingMetal = group.MetalId === selectedMetal?.Id;
				const isMatchingSideDiamond = selectedSideDiamond
					? group.SideDiamondId === selectedSideDiamond.Id
					: true;

				if (isMatchingMetal && isMatchingSideDiamond) {
					return {
						...group,
						MetalDetails: selectedMetal,
						SideDiamondDetails: selectedSideDiamond || null,
					};
				}

				return null;
			})
			.filter((item) => item !== null);
	};

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
		const filteredMetals = jewelry?.MetalGroups?.filter((group) =>
			group?.SizeGroups?.some((size) => size?.IsInStock)
		).map((group) => {
			const metal = jewelry?.Metals?.find((m) => m?.Id === group?.MetalId);
			return {
				...group,
				OriginalName: group?.Name,
				Name: metal ? metal?.Name : 'Unknown Metal',
				Price: metal?.Price,
				Id: group?.MetalId,
			};
		});

		const uniqueFilteredMetals = [];
		const seenNames = new Set();

		filteredMetals?.forEach((metal) => {
			if (!seenNames?.has(metal?.Name)) {
				seenNames?.add(metal?.Name);
				uniqueFilteredMetals?.push(metal);
			}
		});
		// setSelectedMetal(uniqueFilteredMetals?.[0] || null);
		setUniqueMetals(uniqueFilteredMetals);
	}, [jewelry]);

	useEffect(() => {
		if (selectedMetal && jewelry) {
			const filteredSideDiamonds = jewelry.MetalGroups.filter(
				(group) => group.MetalId === selectedMetal.MetalId
			).map((group) => {
				const sideDiamond = jewelry.SideDiamonds.find((m) => m.Id === group.SideDiamondId);
				return {
					...group,
					OriginalName: group.Name,
					Quantity: sideDiamond?.Quantity,
					CaratWeight: sideDiamond?.CaratWeight,
					Id: group.SideDiamondId,
				};
			});

			const uniqueFilteredSideDiamonds = [];
			const seenSideDiamondIds = new Set();

			filteredSideDiamonds.forEach((sideDiamond) => {
				if (!seenSideDiamondIds.has(sideDiamond.SideDiamondId)) {
					seenSideDiamondIds.add(sideDiamond.SideDiamondId);
					uniqueFilteredSideDiamonds.push(sideDiamond);
				}
			});

			setUniqueSideDiamonds(uniqueFilteredSideDiamonds);
		}
	}, [selectedMetal, jewelry]);

	useEffect(() => {
		if (jewelryFromList && uniqueMetals) {
			const {SideDiamondOptId, MetalId} = jewelryFromList;
			console.log('SideDiamondOptId', SideDiamondOptId);
			console.log('MetalId', MetalId);

			const sideDiamond = uniqueSideDiamonds.find(
				(diamond) => diamond?.Id === SideDiamondOptId
			);

			console.log('sideDiamond', sideDiamond);

			if (!selectedSideDiamond && sideDiamond) {
				setSelectedSideDiamond(sideDiamond);
			}

			const metal = uniqueMetals?.find((metal) => metal?.Id === MetalId);

			console.log('metal', metal);

			if (!selectedMetal && metal) {
				setSelectedMetal(metal);
			}
		}
	}, [jewelryFromList, uniqueSideDiamonds, uniqueMetals, selectedMetal, selectedSideDiamond]);

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
								selectedSideDiamond={selectedSideDiamond}
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
					<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
				</div>
			)}
		</>
	);
};

export default JewelryDetailPage;
