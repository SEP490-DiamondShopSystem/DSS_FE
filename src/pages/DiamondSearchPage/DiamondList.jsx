import React, {useEffect, useState} from 'react';

import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import diamondImg from '../../assets/img-diamond.png';
import {FilterDiamond} from '../../components/Filter/Filter';
import Loading from '../../components/Loading';
import {LoadingDiamondSelector} from '../../redux/selectors';
import {formatPrice} from '../../utils';

export const DiamondList = ({
	diamond,
	filters,
	setFilters,
	handleReset,
	filterLimits,
	diamondForFilter,
	findShape,
	diamondList,
	jewelryModel,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector(LoadingDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [diamondNatural, setDiamondNatural] = useState();

	console.log('diamondNatural', diamondNatural);

	useEffect(() => {
		const savedShape = localStorage.getItem('selected');
		if (savedShape) {
			setFilters((prevFilters) => ({
				...prevFilters,
				shape: savedShape,
			}));
		}
	}, []);

	useEffect(() => {
		// Filter diamonds where IsLabDiamond is false
		if (diamond) {
			const filteredDiamonds = diamond.filter((diamondItem) => !diamondItem.IsLabDiamond);
			setDiamondNatural(filteredDiamonds);
		}
	}, [diamond]);

	const handleGridClick = () => {
		setChangeGrid(true);
	};
	const handleListClick = () => {
		setChangeGrid(false);
	};

	const handleDiamondChoiceClick = (id) => {
		navigate(`/diamond-detail/${id}`);
		console.log(id);

		localStorage.setItem('diamondChoice', 'Kim Cương');
	};
	const handleJewelryChoiceClick = (id) => {
		navigate(`/diamond-detail/${id}`);
	};

	return (
		<div>
			<FilterDiamond
				setFilters={setFilters}
				filters={filters}
				handleReset={handleReset}
				filterLimits={filterLimits}
				diamondForFilter={diamondForFilter}
				findShape={findShape}
			/>

			{loading ? (
				<Loading />
			) : (
				<>
					{!Array.isArray(diamondNatural) || diamondNatural.length === 0 ? (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					) : (
						<>
							<div className="text-2xl flex justify-end mt-10">
								<p className="p-2">{diamondNatural?.length} Kết quả</p>
								<div
									className="md:cursor-pointer mx-10 hover:bg-neutral-300 rounded-xl p-2"
									onClick={handleListClick}
								>
									<UnorderedListOutlined />
								</div>
								<div
									className="md:cursor-pointer hover:bg-neutral-300 rounded-xl p-2"
									onClick={handleGridClick}
								>
									<AppstoreOutlined />
								</div>
							</div>

							{changeGrid ? (
								<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
									{diamondNatural?.map((diamondItem) => (
										<div
											key={diamondItem.Id}
											className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
											onClick={() =>
												diamondChoice.length > 0
													? handleDiamondChoiceClick(diamondItem.Id)
													: handleJewelryChoiceClick(diamondItem.Id)
											}
										>
											<div className="">
												<div
													className="flex justify-center mb-5"
													style={{background: '#b8b7b5'}}
												>
													<Image
														src={
															diamondItem?.Thumbnail === null
																? diamondImg
																: diamondItem.Thumbnail.MediaPath
														}
														alt={
															diamondItem?.Thumbnail?.MediaName ||
															'Default Image'
														}
														className="w-full"
														preview={false}
													/>
												</div>
												<div className="mx-10 my-5">
													<p>{diamondItem?.Title}</p>
													<div className="flex">
														{diamondItem?.SalePrice !==
														diamondItem?.TruePrice ? (
															<div className="flex">
																<p
																	style={{color: '#707070'}}
																	className="line-through"
																>
																	{formatPrice(
																		diamondItem.TruePrice
																	)}
																</p>
																<p className="ml-3">
																	{formatPrice(
																		diamondItem.DiscountPrice
																	)}
																</p>
															</div>
														) : (
															<div className="">
																<p>
																	{formatPrice(
																		diamondItem.TruePrice
																	)}
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="transition-all duration-300 mb-20 mt-10">
									{diamondNatural?.map((diamondItem) => (
										<div
											key={diamondItem.Id}
											className="shadow-lg bg-white rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-black my-10"
											onClick={() =>
												diamondChoice.length > 0
													? handleDiamondChoiceClick(diamondItem.Id)
													: handleJewelryChoiceClick(diamondItem.Id)
											}
										>
											<div className="flex w-full">
												<div
													className="flex justify-center w-1/5"
													style={{background: '#b8b7b5'}}
												>
													<Image
														src={
															diamondItem?.Thumbnail === null
																? diamondImg
																: diamondItem.Thumbnail.MediaPath
														}
														alt={diamondItem.Thumbnail?.MediaName}
														className="w-full"
														preview={false}
													/>
												</div>
												<div className="flex justify-between items-center w-4/5 ml-5">
													<p className="text-xl w-1/5 text-center">
														{diamondItem.DiamondShape || '-'}
													</p>
													<p className="text-xl w-1/5 text-center">
														{diamondItem.Carat || '-'}ct
													</p>
													<p className="text-xl w-1/5 text-center">
														{diamondItem.Color || '-'} Color
													</p>
													<p className="text-xl w-1/5 text-center">
														{diamondItem.Clarity || '-'} Clarity
													</p>
													<p className="text-xl w-1/5 text-center">
														{diamondItem.Cut || '-'}
													</p>
													{diamondItem.SalePrice ===
														diamondItem.TruePrice && (
														<div>
															<p>
																{formatPrice(
																	diamondItem?.TruePrice
																)}
															</p>
														</div>
													)}
													<p className="text-xl w-1/5 text-center cursor-pointer"></p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};
