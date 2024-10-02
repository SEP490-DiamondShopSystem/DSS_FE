import React, {useEffect, useState} from 'react';

import {
	AppstoreOutlined,
	HeartFilled,
	HeartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import diamondImg from '../../assets/img-diamond.png';
import {GetAllDiamondSelector, LoadingDiamondSelector} from '../../redux/selectors';
import {getAllDiamond} from '../../redux/slices/diamondSlice';
import {useNavigate} from 'react-router-dom';
import {FilterDiamond} from '../../components/Filter/Filter';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';

export const DiamondLabList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const diamondList = useSelector(GetAllDiamondSelector);
	const loading = useSelector(LoadingDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(false);
	const [like, setLike] = useState({});
	const [diamond, setDiamond] = useState([]);
	const [filters, setFilters] = useState({
		shape: '',
		price: {minPrice: 0, maxPrice: 1000},
		carat: {minCarat: 0.5, maxCarat: 30.0},
		color: {minColor: 0, maxColor: 7},
		clarity: {minClarity: 0, maxClarity: 7},
		cut: {minCut: 0, maxCut: 3},
	});
	const [hasMore, setHasMore] = useState(true);
	const [visibleDiamonds, setVisibleDiamonds] = useState([]);

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
		dispatch(getAllDiamond());
	}, [dispatch]);

	useEffect(() => {
		if (diamondList) {
			setDiamond(diamondList);
			setVisibleDiamonds(diamondList.slice(0, 10));
		}
	}, [diamondList]);

	const loadMoreData = () => {
		if (visibleDiamonds.length >= diamond.length) {
			setHasMore(false);
			return;
		}

		const nextData = diamond.slice(visibleDiamonds.length, visibleDiamonds.length + 3);
		setVisibleDiamonds([...visibleDiamonds, ...nextData]);
	};

	const handleGridClick = () => {
		setChangeGrid(true);
	};
	const handleListClick = () => {
		setChangeGrid(false);
	};

	const handleHeartClick = (id) => {
		setLike((prevLike) => ({
			...prevLike,
			[id]: !prevLike[id],
		}));
	};

	const handleReset = () => {
		localStorage.removeItem('selected');
		setFilters({
			shape: '',
			price: {minPrice: 0, maxPrice: 1000},
			carat: {minCarat: 0.5, maxCarat: 30.0},
			color: {minColor: 0, maxColor: 7},
			clarity: {minClarity: 0, maxClarity: 7},
			cut: {minCut: 0, maxCut: 3},
		});
	};

	const handleDetailDiamondClick = (id) => {
		navigate(`/diamond-detail/${id}`);
	};

	return (
		<div>
			<FilterDiamond setFilters={setFilters} filters={filters} handleReset={handleReset} />

			{loading ? (
				<div className="flex items-center justify-center my-10">
					<ReactLoading height={'10%'} width={'10%'} type="spin" color="#dec986" />
				</div>
			) : (
				<>
					<div className="text-2xl flex justify-end mt-10">
						<p className="p-2">{visibleDiamonds.length} Kết quả</p>
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

					<InfiniteScroll
						dataLength={visibleDiamonds.length}
						next={loadMoreData}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
					>
						{changeGrid ? (
							<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
								{visibleDiamonds.map((diamondItem) => (
									<div
										key={diamondItem.id}
										className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
										onClick={() => handleDetailDiamondClick(diamondItem.id)}
									>
										<div className="w-80">
											<div
												className="flex justify-center mb-5"
												style={{background: '#b8b7b5'}}
											>
												<Image src={diamondImg} alt={diamondItem.title} />
											</div>
											<div className="mx-10 my-5">
												<p>{diamondItem.title}</p>
												<p style={{color: '#707070'}}>
													{diamondItem.price}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="transition-all duration-300 mb-20 mt-10">
								{visibleDiamonds.map((diamondItem, i) => (
									<div
										key={i + 1}
										className="shadow-lg bg-white rounded-lg cursor-pointer"
										onClick={() => handleDetailDiamondClick(diamondItem.id)}
									>
										<div className="flex w-full my-10">
											<div
												className="flex justify-center w-1/5"
												style={{background: '#b8b7b5'}}
											>
												<Image
													src={diamondImg}
													alt={diamondItem.title}
													className="w-full"
													preview={false}
												/>
											</div>
											<div className="flex justify-between items-center w-4/5 ml-5">
												<p className="text-xl w-1/5 text-center">
													{diamondItem.shape}
												</p>
												<p className="text-xl w-1/5 text-center">
													{diamondItem.carat}
												</p>
												<p className="text-xl w-1/5 text-center">
													{diamondItem.cut || '-'}
												</p>
												<p className="text-xl w-1/5 text-center">
													{diamondItem.color}
												</p>
												<p className="text-xl w-1/5 text-center">
													{diamondItem.clarity}
												</p>
												<p
													className="text-xl w-1/5 text-center"
													style={{color: '#707070'}}
												>
													{diamondItem.price}
												</p>
												<p
													className="text-xl w-1/5 text-center cursor-pointer"
													onClick={(e) => {
														e.stopPropagation(); // Ngăn chặn sự kiện onClick khác
														handleHeartClick(diamondItem.id);
													}}
												>
													{like[diamondItem.id] ? (
														<HeartFilled color="#F65252" />
													) : (
														<HeartOutlined />
													)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</InfiniteScroll>
				</>
			)}
		</div>
	);
};
