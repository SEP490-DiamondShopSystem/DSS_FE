import React, {useEffect, useRef, useState} from 'react';

import {Image} from 'antd';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../../assets/jewelry.png';
import {FilterJewelryCustomize} from '../../../components/Filter/Filter';
import {
	GetAllJewelryModelCustomizeSelector,
	LoadingJewelrySelector,
} from '../../../redux/selectors';
import {getAllJewelryModelCustomize} from '../../../redux/slices/customizeSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchFrontendDisplayRule} from '../../../redux/slices/configSlice';
import Loading from '../../../components/Loading';

export const ProductList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelryModelCustomizeSelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState();
	const [hasMore, setHasMore] = useState(true);
	const [filters, setFilters] = useState({
		// gender: [],
		Type: undefined,
		name: undefined,
		IsRhodiumFinished: undefined,
		IsEngravable: undefined,
	});

	console.log('pageSize', pageSize);

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				type: saved,
			}));
		}
	}, []);

	useEffect(() => {
		dispatch(fetchFrontendDisplayRule())
			.unwrap()
			.then((res) => {
				setPageSize(res?.ModelPerQuery);
			});
	}, []);

	const fetchJewelryData = debounce(() => {
		if (pageSize) {
			dispatch(
				getAllJewelryModelCustomize({
					Category: filters.Type,
					Name: filters?.name,
					IsRhodiumFinished: filters?.IsRhodiumFinished,
					IsEngravable: filters?.IsEngravable,
					CurrentPage: page,
					PageSize: pageSize,
				})
			)
				.unwrap()
				.then((res) => {
					if (res?.Values?.length > 0) {
						setJewelries((prev) =>
							page === 1 ? [...res.Values] : [...prev, ...res.Values]
						);
					} else {
						setHasMore(false);
					}
				});
		}
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [filters, page, pageSize]);

	useEffect(() => {
		setPage(1);
		setJewelries([]);
		setHasMore(true);
	}, [filters]);

	const loadMoreData = () => {
		setTimeout(() => {
			setPage((prev) => prev + 1);
		}, 200);
	};
	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({gender: [], Type: [], metal: [], price: {minPrice: 0, maxPrice: 1000}});
	};

	return (
		<>
			<div className="mt-10">
				<FilterJewelryCustomize
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>

			{loading ? (
				<Loading />
			) : (
				<>
					{/* <div className="text-2xl flex justify-end mt-10">
						<p className="p-2">200 Kết quả</p>
					</div> */}
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
						<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
							{jewelries?.map((jewelry, i) => (
								<div
									key={i}
									className="shadow-lg bg-white rounded-lg border-2 border-white hover:border-2 hover:border-black cursor-pointer"
									onClick={() =>
										navigate(`/customize/diamond-jewelry/${jewelry.Id}`)
									}
								>
									<div className="">
										<div
											className=" flex justify-center mb-5"
											style={{background: '#b8b7b5'}}
										>
											<Image
												src={jewelry.Thumbnail?.MediaPath || jewelryImg}
												alt={jewelry.Thumbnail?.Name}
												className=""
												preview={false}
											/>
										</div>
										<div className="mx-5 my-5">
											<p>{jewelry.Name}</p>

											{jewelry.MainDiamondCount?.length !== 0 ? (
												<p className="mt-2" style={{color: '#b0b0b0'}}>
													Mẫu Trang Sức {jewelry.MainDiamondCount} Kim
													Cương Chính
												</p>
											) : (
												<p className="mt-2" style={{color: '#b0b0b0'}}>
													Mẫu Trang Sức Không Đính Kim Cương
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</InfiniteScroll>
				</>
			)}
		</>
	);
};
