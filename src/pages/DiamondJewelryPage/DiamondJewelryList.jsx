import React, {useEffect, useState} from 'react';
import {Image, Rate} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import jewelryImg from '../../assets/ring_classic.png';
import {FilterDiamondJewelry} from '../../components/Filter/Filter';
import Loading from '../../components/Loading';
import {GetAllJewelryModelSelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getAllJewelryModel} from '../../redux/slices/jewelrySlice';
import {formatPrice, Rating, StarRating} from '../../utils';
import debounce from 'lodash/debounce';

export const DiamondJewelryList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jewelryList = useSelector(GetAllJewelryModelSelector);
	const loading = useSelector(LoadingJewelrySelector);

	const [jewelries, setJewelries] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		Type: undefined,
		IsRhodiumFinished: undefined,
		IsEngravable: undefined,
		Metal: undefined,
		price: {minPrice: 0, maxPrice: 40000000},
	});

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelryModel({
				Category: filters.Type,
				metalId: filters.Metal,
				minPrice: filters.price.minPrice,
				maxPrice: filters.price.maxPrice,
				IsRhodiumFinished: filters?.IsRhodiumFinished,
				IsEngravable: filters?.IsEngravable,
				page,
			})
		)
			.unwrap()
			.then((res) => {
				if (res?.Values?.length > 0) {
					setJewelries((prev) =>
						page === 1 ? [...res.Values] : [...prev, ...res.Values]
					);
				} else {
					setHasMore(false); // Không còn dữ liệu mới
				}
			});
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [filters, page]);

	useEffect(() => {
		setPage(1);
		setJewelries([]);
		setHasMore(true);
	}, [filters]);

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				Type: saved,
			}));
		}
	}, []);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({
			IsRhodiumFinished: '',
			IsEngravable: '',
			Type: [],
			Metal: '',
			price: {minPrice: 0, maxPrice: 40000000},
		});
		setPage(1); // Reset về trang đầu tiên
		setJewelries([]); // Reset dữ liệu hiện tại
		setHasMore(true); // Cho phép tải lại dữ liệu
	};

	const loadMoreData = () => {
		setTimeout(() => {
			setPage((prev) => prev + 1);
		}, 300);
	};

	return (
		<>
			<div className="mt-10">
				<FilterDiamondJewelry
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>

			{loading && page === 1 ? (
				<Loading />
			) : (
				<>
					{Array.isArray(jewelries) && (
						<InfiniteScroll
							dataLength={jewelries.length}
							next={loadMoreData}
							hasMore={hasMore}
							loader={<Loading />}
							endMessage={
								<p className="text-center mt-5 text-lg">
									Bạn đã xem hết danh sách sản phẩm.
								</p>
							}
						>
							<div className="transition-all duration-300 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-20 mt-10">
								{jewelries.map((jewelry, i) => (
									<div
										key={i}
										className="shadow-lg bg-white rounded-lg hover:border-2 border-2 border-white cursor-pointer hover:border-black"
										onClick={() =>
											navigate(
												`/jewelry-model/search/${jewelry.JewelryModelId}`,
												{state: {jewelry}}
											)
										}
									>
										<div>
											<div
												className="flex justify-center mb-5"
												style={{background: '#b8b7b5'}}
											>
												<Image
													src={
														jewelry?.Thumbnail?.MediaPath || jewelryImg
													}
													alt={jewelry?.Thumbnail?.MediaName}
													className="w-full h-56 object-cover rounded-t-lg"
													preview={false}
												/>
											</div>
											<div className="mx-5 my-5">
												<div className="flex items-center">
													<p className="text-lg font-semibold">
														{jewelry.Name}
													</p>
												</div>
												<div className="flex items-center mt-2">
													{jewelry?.MinPrice ===
														jewelry?.MinPriceAfterDiscount &&
													jewelry?.MaxPrice ===
														jewelry?.MaxPriceAfterDiscount ? (
														<p className="text-sm">
															Giá Mẫu: {formatPrice(jewelry.MinPrice)}{' '}
															- {formatPrice(jewelry.MaxPrice)}
														</p>
													) : (
														<div className="space-y-1">
															<p className="text-sm line-through">
																Giá Mẫu:{' '}
																{formatPrice(jewelry.MinPrice)} -{' '}
																{formatPrice(jewelry.MaxPrice)}
															</p>
															<br />
															<p className="text-sm">
																Giá Mẫu Đã Giảm:{' '}
																{formatPrice(
																	jewelry.MinPriceAfterDiscount
																)}{' '}
																-{' '}
																{formatPrice(
																	jewelry.MaxPriceAfterDiscount
																)}
															</p>
														</div>
													)}
												</div>

												<div className="flex items-center mt-2">
													<p className="mr-3">
														<StarRating rating={jewelry?.StarRating} />
													</p>
													<p>{jewelry.ReviewCount}</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</InfiniteScroll>
					)}
				</>
			)}
		</>
	);
};
