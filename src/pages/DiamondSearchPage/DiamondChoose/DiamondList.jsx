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
import {FilterDiamond} from '../../../components/Filter/Filter';
import {LoadingDiamondSelector} from '../../../redux/selectors';

import {formatPrice} from '../../../utils';
import Loading from '../../../components/Loading';

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

	const getLabelFromCode = (code, mapping) => {
		// Find the key in the mapping object that matches the code
		return Object.keys(mapping).find((key) => mapping[key] === code) || '-';
	};

	const handleClick = (id) => {
		navigate(`/completed-jewelry/${id}`);
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
					{!Array.isArray(diamondList) || diamondList.length === 0 ? (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					) : (
						<>
							<div className="text-2xl flex justify-end mt-10">
								<p className="p-2">{diamondList?.length} Kết quả</p>
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
									{diamondList &&
									diamondList?.flatMap((jewelry) =>
										jewelry?.Diamonds?.filter((diamond) => diamond.IsLabDiamond)
									).length > 0 ? (
										diamondList?.map((jewelry) =>
											jewelry?.Diamonds?.filter(
												(diamond) => diamond.IsLabDiamond
											).map((diamond) => (
												<div
													key={diamond.Id}
													className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
													onClick={() => handleClick(jewelry?.JewelryId)}
												>
													<div className="w-80">
														<div
															className="flex justify-center mb-5"
															style={{background: '#b8b7b5'}}
														>
															<Image
																src={diamondImg}
																alt={diamond.Title}
															/>
														</div>
														<div className="mx-10 my-5">
															<p>{diamond.Title}</p>
															<div className="flex">
																{diamond.DiscountPrice != null ? (
																	<div className="flex">
																		<p
																			style={{
																				color: '#707070',
																			}}
																			className="line-through"
																		>
																			{formatPrice(
																				diamond.TruePrice
																			)}
																		</p>
																		<p className="ml-3">
																			{formatPrice(
																				diamond.DiscountPrice
																			)}
																		</p>
																	</div>
																) : (
																	<p>
																		{formatPrice(
																			diamond.TruePrice
																		)}
																	</p>
																)}
															</div>
														</div>
													</div>
												</div>
											))
										)
									) : (
										<div className="flex items-center justify-center my-10">
											<p className="text-2xl">Chưa có sản phẩm nào</p>
										</div>
									)}
								</div>
							) : (
								<div className="transition-all duration-300 mt-10">
									{/* <div className="flex w-full my-10 ">
										<div className="flex justify-center w-1/5">Image</div>
										<div className="flex justify-between items-center w-4/5 ml-5">
											<p className="text-xl w-1/5 text-center">Shape</p>
											<p className="text-xl w-1/5 text-center">Carat</p>
											<p className="text-xl w-1/5 text-center">Color</p>
											<p className="text-xl w-1/5 text-center">Clarity</p>
											<p className="text-xl w-1/5 text-center">Cut</p>
										</div>
									</div> */}
									<Divider />
									{diamondList?.flatMap((jewelry) =>
										jewelry?.Diamonds?.filter(
											(diamonds) => diamonds.IsLabDiamond
										)
									).length > 0 ? (
										diamondList?.map((jewelry) =>
											jewelry?.Diamonds?.filter(
												(diamonds) => diamonds.IsLabDiamond
											).map((diamonds) => (
												<div
													key={diamonds.Id}
													className="shadow-lg bg-white rounded-lg cursor-pointer"
													onClick={() => handleClick(jewelry?.JewelryId)}
												>
													<div className="flex w-full my-10">
														<div
															className="flex justify-center w-1/5"
															style={{background: '#b8b7b5'}}
														>
															<Image
																src={diamondImg}
																alt={diamonds.Title}
																className="w-full"
																preview={false}
															/>
														</div>
														<div className="flex justify-between items-center w-4/5 ml-5">
															<p className="text-xl w-1/5 text-center">
																{diamonds.DiamondShape?.ShapeName ||
																	'-'}
															</p>
															<p className="text-xl w-1/5 text-center">
																{diamonds.Carat || '-'}ct
															</p>
															<p className="text-xl w-1/5 text-center">
																{getLabelFromCode(
																	diamonds.Color,
																	Color
																) || '-'}{' '}
																Color
															</p>
															<p className="text-xl w-1/5 text-center">
																{getLabelFromCode(
																	diamonds.Clarity,
																	Clarity
																) || '-'}{' '}
																Clarity
															</p>
															<p className="text-xl w-1/5 text-center">
																{getLabelFromCode(
																	diamonds.Cut,
																	Cut
																) || '-'}
															</p>
															{diamonds.SalePrice ===
																diamonds.TruePrice && (
																<div>
																	<p>
																		{formatPrice(
																			jewelry.D_Price
																		)}
																	</p>
																</div>
															)}
															<p className="text-xl w-1/5 text-center cursor-pointer"></p>
														</div>
													</div>
												</div>
											))
										)
									) : (
										<div className="flex items-center justify-center my-10">
											<p className="text-2xl">Chưa có sản phẩm nào</p>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};
