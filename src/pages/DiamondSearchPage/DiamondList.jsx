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
import InfiniteScroll from 'react-infinite-scroll-component';

export const DiamondList = ({
	diamond,
	filters,
	setFilters,
	handleReset,
	filterLimits,
	findShape,
	diamondList,
	jewelryModel,
	loadMoreData,
	hasMore,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector(LoadingDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(true);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [diamondNatural, setDiamondNatural] = useState();

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
	};

	return (
		<div>
			<FilterDiamond
				setFilters={setFilters}
				filters={filters}
				handleReset={handleReset}
				filterLimits={filterLimits}
				findShape={findShape}
			/>

			{loading ? (
				<Loading />
			) : (
				<>
					{Array.isArray(diamondNatural) ? (
						<>
							{/* Results Header */}
							<InfiniteScroll
								dataLength={diamondNatural.length}
								next={loadMoreData}
								hasMore={hasMore}
								loader={<Loading />}
								endMessage={
									<p className="text-center mt-5 text-lg">
										Bạn đã xem hết danh sách sản phẩm.
									</p>
								}
							>
								<div className="text-xl flex justify-between items-center flex-wrap mt-10 px-4">
									<p className="p-2">{diamondNatural?.length} Kết quả</p>
									{/* Nút chuyển đổi hiển thị chỉ hiện trên desktop */}
									<div className="hidden md:flex space-x-4">
										<div
											className={`cursor-pointer hover:bg-neutral-300 rounded-xl p-2 ${
												changeGrid ? 'bg-neutral-200' : ''
											}`}
											onClick={handleGridClick}
										>
											<AppstoreOutlined />
										</div>
										<div
											className={`cursor-pointer hover:bg-neutral-300 rounded-xl p-2 ${
												!changeGrid ? 'bg-neutral-200' : ''
											}`}
											onClick={handleListClick}
										>
											<UnorderedListOutlined />
										</div>
									</div>
								</div>

								{/* Hiển thị Grid View */}
								{changeGrid && (
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-20 mt-10">
										{diamondNatural?.map((diamondItem) => (
											<div
												key={diamondItem.Id}
												className="shadow-lg bg-white border border-gray-200 rounded-lg hover:border-black cursor-pointer"
												onClick={() =>
													handleDiamondChoiceClick(diamondItem.Id)
												}
											>
												<div>
													<div className="flex justify-center bg-gray-300">
														<Image
															src={
																diamondItem?.Thumbnail === null
																	? diamondImg
																	: diamondItem.Thumbnail
																			.MediaPath
															}
															alt={
																diamondItem?.Thumbnail?.MediaName ||
																'Default Image'
															}
															className="max-w-full h-auto"
															preview={false}
														/>
													</div>
													<div className="p-4">
														<p className="font-semibold">
															{diamondItem?.Title}
														</p>
														<div className="flex items-center space-x-2 mt-2">
															{diamondItem?.SalePrice <
															diamondItem?.TruePrice ? (
																<div className="flex items-center">
																	<p className="line-through text-gray-500">
																		{formatPrice(
																			diamondItem.TruePrice
																		)}
																	</p>
																	<p className="text-red-500 ml-2">
																		{formatPrice(
																			diamondItem.SalePrice
																		)}
																	</p>
																</div>
															) : (
																<p>
																	{formatPrice(
																		diamondItem.TruePrice
																	)}
																</p>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								)}

								{/* Hiển thị List View trên desktop */}
								{!changeGrid && (
									<div className="hidden md:block mb-20 mt-10 px-4">
										<div className="shadow-md bg-gray-100 rounded-lg">
											<div className="flex justify-between items-center py-3 px-5 bg-primary border">
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
												</div>
											</div>
										</div>

										{diamondNatural?.map((diamondItem) => (
											<div
												key={diamondItem.Id}
												className="flex flex-col md:flex-row items-center shadow-lg bg-white rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-black my-5"
												onClick={() =>
													diamondChoice.length > 0
														? handleDiamondChoiceClick(diamondItem.Id)
														: handleJewelryChoiceClick(diamondItem.Id)
												}
											>
												<div className="w-full md:w-1/6 bg-gray-300 p-2">
													<Image
														src={
															diamondItem?.Thumbnail === null
																? diamondImg
																: diamondItem.Thumbnail.MediaPath
														}
														alt={diamondItem?.Thumbnail?.MediaName}
														className="max-w-full h-auto"
														preview={false}
													/>
												</div>
												<div className="w-full md:w-5/6 flex flex-col md:flex-row justify-between items-center p-4">
													<p className="text-sm md:text-lg w-1/5 text-center">
														{diamondItem.DiamondShape || '-'}
													</p>
													<p className="text-sm md:text-lg w-1/5 text-center">
														{diamondItem.Carat || '-'}ct
													</p>
													<p className="text-sm md:text-lg w-1/5 text-center">
														{diamondItem.Color || '-'} Color
													</p>
													<p className="text-sm md:text-lg w-1/5 text-center">
														{diamondItem.Clarity || '-'} Clarity
													</p>
													<p className="text-sm md:text-lg w-1/5 text-center">
														{diamondItem.Cut || '-'}
													</p>
													<p className="text-sm md:text-lg w-1/5 text-center">
														{formatPrice(diamondItem?.TruePrice)}
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</InfiniteScroll>
						</>
					) : (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};
