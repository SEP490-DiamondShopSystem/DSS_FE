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

	useEffect(() => {
		const savedShape = localStorage.getItem('selected');
		if (savedShape) {
			setFilters((prevFilters) => ({
				...prevFilters,
				shape: savedShape,
			}));
		}
	}, []);

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
								{/* Table Header */}
								<div className="shadow-md bg-gray-100 rounded-lg">
									<div className="justify-between items-center py-3 px-5 bg-primary border hidden lg:flex">
										<p className="text-lg font-semibold text-center w-1/6">
											Hình Ảnh
										</p>
										<div className="w-5/6 flex justify-between items-center">
											<p className="text-lg font-semibold text-center w-1/5">
												Hình Dạng
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Carat
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Color
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Clarity
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Cut
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Giá
											</p>
											<p className="text-lg font-semibold text-center w-1/5">
												Nguồn Gốc
											</p>
										</div>
									</div>
								</div>

								{/* Diamond List */}
								{diamondList?.length > 0 ? (
									diamondList.map((item, index) => (
										<div
											key={item?.Id || index}
											className="shadow-lg bg-white rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-black my-10"
											onClick={() => handleClick(item?.Id)}
										>
											{item.Diamonds.map((diamond, idx) => (
												<div
													key={idx}
													className="flex flex-col md:flex-row md:items-center w-full p-3"
												>
													<div className="flex justify-center w-full sm:w-1/6 mb-3 sm:mb-0">
														<Image
															src={
																diamond?.Thumbnail?.MediaPath &&
																diamond?.Thumbnail.MediaPath.trim()
																	? diamond.Thumbnail.MediaPath
																	: diamondImg
															}
															alt={diamond?.Title || 'Diamond'}
															className="mx-auto"
															preview={false}
														/>
													</div>
													<div className="flex flex-col md:flex-row w-full sm:w-5/6 sm:ml-5">
														<p className="text-xl w-full sm:w-1/6 text-center mb-2 sm:mb-0">
															{diamond?.DiamondShape?.ShapeName ||
																'-'}
														</p>
														<p className="text-xl w-full sm:w-1/6 text-center mb-2 sm:mb-0">
															{diamond?.Carat || '-'}ct
														</p>
														<p className="text-xl w-full sm:w-1/6 text-center mb-2 sm:mb-0">
															{getLabelFromCode(
																diamond?.Color,
																Color
															) || '-'}{' '}
															Color
														</p>
														<p className="text-xl w-full sm:w-1/6 text-center mb-2 sm:mb-0">
															{getLabelFromCode(
																diamond?.Clarity,
																Clarity
															) || '-'}{' '}
															Clarity
														</p>
														<p className="text-xl w-full sm:w-1/6 text-center mb-2 sm:mb-0">
															{getLabelFromCode(
																diamond?.Cut,
																Cut
															).replace('_', ' ') || '-'}
														</p>
														{diamond?.SalePrice ===
														diamond?.TruePrice ? (
															<div className="w-full sm:w-1/6 text-center mb-2 sm:mb-0">
																<p>
																	{formatPrice(
																		diamond?.SalePrice
																	)}
																</p>
															</div>
														) : (
															<div className="w-full sm:w-1/6 text-center mb-2 sm:mb-0">
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
														<p className="w-full sm:w-1/6 text-center">
															{diamond?.IsLabDiamond
																? 'Nhân Tạo'
																: 'Tự Nhiên'}
														</p>
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
