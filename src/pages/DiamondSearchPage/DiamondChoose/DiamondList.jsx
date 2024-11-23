import React, {useEffect, useState} from 'react';

import {
	AppstoreOutlined,
	HeartFilled,
	HeartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {Divider, Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import diamondImg from '../../../assets/img-diamond.png';
import {FilterDiamond, FilterJewelryDiamond} from '../../../components/Filter/Filter';
import {LoadingDiamondSelector} from '../../../redux/selectors';

import {formatPrice} from '../../../utils';
import Loading from '../../../components/Loading';
import {Clarity, Color, Cut} from '../../../utils/constant';

export const DiamondList = ({
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

	useEffect(() => {
		const savedShape = localStorage.getItem('selected');
		if (savedShape) {
			setFilters((prevFilters) => ({
				...prevFilters,
				shape: savedShape,
			}));
		}
	}, []);

	const handleGridClick = () => {
		setChangeGrid(true);
	};
	const handleListClick = () => {
		setChangeGrid(false);
	};

	const getLabelFromCode = (code, mapping) => {
		// Find the key in the mapping object that matches the code
		return Object.keys(mapping).find((key) => mapping[key] === code) || '-';
	};

	const handleClick = (id) => {
		console.log('id jewelry', id);

		navigate(`/completed-jewelry/${id}`);
	};

	console.log('diamond', diamondList);

	return (
		<div>
			<FilterJewelryDiamond
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
					{!Array.isArray(diamondList) || diamondList.length === 0 ? (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					) : (
						<>
							<div className="text-2xl flex justify-end mt-10">
								<p className="p-2">{diamondList?.length} Kết quả</p>
							</div>

							<div className="transition-all duration-300 mt-10">
								<Divider />
								{diamondList?.length > 0 ? (
									diamondList.map((item, index) => (
										<div
											key={item?.Id || index}
											className="shadow-lg bg-white rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-black my-10"
											onClick={() => handleClick(item?.Id)}
										>
											{item.Diamonds.filter(
												(diamond) => !diamond.IsLabDiamond
											).map((diamond) => (
												<div className="flex w-full">
													<div
														className=" justify-center "
														style={{background: '#b8b7b5'}}
													>
														<Image
															src={
																diamond?.Thumbnail?.MediaPath &&
																diamond?.Thumbnail.MediaPath.trim()
																	? diamond.Thumbnail.MediaPath
																	: diamondImg
															}
															alt={diamond?.Title || 'Diamond'}
															// className="w-16"
															style={{width: '80%'}}
															className="mx-auto"
															preview={false}
														/>
													</div>
													<div className="flex justify-between items-center w-4/6 ml-5">
														<p className="text-xl w-1/6 text-center">
															{diamond?.DiamondShape?.ShapeName ||
																'-'}
														</p>
														<p className="text-xl w-1/6 text-center">
															{diamond?.Carat || '-'}ct
														</p>
														<p className="text-xl w-1/6 text-center">
															{getLabelFromCode(
																diamond?.Color,
																Color
															) || '-'}{' '}
															Color
														</p>
														<p className="text-xl w-1/6 text-center">
															{getLabelFromCode(
																diamond?.Clarity,
																Clarity
															) || '-'}{' '}
															Clarity
														</p>
														<p className="text-xl w-1/6 text-center">
															{getLabelFromCode(
																diamond?.Cut,
																Cut
															).replace('_', ' ') || '-'}
														</p>
														{diamond?.SalePrice ===
														diamond?.TruePrice ? (
															<div className=" w-2/6 text-center">
																<p>
																	{formatPrice(
																		diamond?.SalePrice
																	)}
																</p>
															</div>
														) : (
															<div className=" w-2/6 text-center">
																<p>
																	{formatPrice(
																		diamond?.TruePrice
																	)}
																</p>
																<p>
																	{formatPrice(
																		diamond?.SalePrice
																	)}
																</p>
															</div>
														)}
													</div>
												</div>
											))}
										</div>
									))
								) : (
									<div className="flex items-center justify-center my-10">
										<p className="text-2xl">Chưa có sản phẩm nào</p>
									</div>
								)}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};
