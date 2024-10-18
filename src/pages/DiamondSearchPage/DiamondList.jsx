import React, {useEffect, useState} from 'react';

import {
	AppstoreOutlined,
	HeartFilled,
	HeartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import diamondImg from '../../assets/img-diamond.png';
import {FilterDiamond} from '../../components/Filter/Filter';
import {LoadingDiamondSelector} from '../../redux/selectors';

import Loading from 'react-loading';
import {formatPrice} from '../../utils';

export const DiamondList = ({diamond, diamondList, setDiamond}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector(LoadingDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(false);
	const [like, setLike] = useState({});
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

	const loadMoreData = () => {
		if (visibleDiamonds.length >= diamond.length) {
			setHasMore(false);
			return;
		}

		const nextData = diamond?.slice(visibleDiamonds.length, visibleDiamonds.length + 3);
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

	const handleDiamondChoiceClick = (id) => {
		navigate(`/diamond-detail/${id}`);
		console.log(id);

		localStorage.setItem('diamondChoice', 'Kim Cương');
	};
	const handleJewelryChoiceClick = (id) => {
		navigate(`/diamond-detail/${id}`);
	};

	// if (!diamondList) return <div>Loading....</div>;

	return (
		<div>
			<FilterDiamond setFilters={setFilters} filters={filters} handleReset={handleReset} />

			{loading ? (
				<Loading />
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
					{/* 
					<InfiniteScroll
						dataLength={visibleDiamonds.length}
						next={loadMoreData}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
					> */}
					{changeGrid ? (
						<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
							{diamondNatural?.map((diamondItem) => (
								<div
									key={diamondItem.Id}
									className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
									onClick={
										diamondChoice.length > 0
											? () => handleDiamondChoiceClick(diamondItem.Id)
											: () => handleJewelryChoiceClick(diamondItem.Id)
									}
								>
									<div className="w-80">
										<div
											className="flex justify-center mb-5"
											style={{background: '#b8b7b5'}}
										>
											<Image src={diamondImg} alt={diamondItem.title} />
										</div>
										<div className="mx-10 my-5">
											<p>
												{diamondItem.DiamondShape} {diamondItem.Carat}ct{' '}
												{diamondItem.Color} Color {diamondItem.Clarity}{' '}
												Clarity {diamondItem.Cut}
											</p>
											<div className="flex">
												<p
													style={{color: '#707070'}}
													className="line-through"
												>
													{formatPrice(diamondItem.TruePrice)}
												</p>
												<p className="ml-3">
													{formatPrice(diamondItem.DiscountPrice)}
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="transition-all duration-300 mb-20 mt-10">
							{diamondNatural?.map((diamondItem, i) => (
								<div
									key={diamondItem.Id}
									className="shadow-lg bg-white rounded-lg cursor-pointer"
									onClick={
										diamondChoice.length > 0
											? () => handleDiamondChoiceClick(diamondItem.Id)
											: () => handleJewelryChoiceClick(diamondItem.Id)
									}
								>
									<div className="flex w-full my-10">
										<div
											className="flex justify-center w-1/5"
											style={{background: '#b8b7b5'}}
										>
											<Image
												src={diamondImg}
												alt={
													diamondItem.IsLabDiamond === true
														? 'Kim cương nhân tạo'
														: 'Kim cương tự nhiên'
												}
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
											<p
												className="text-xl w-1/5 text-center"
												style={{color: '#707070'}}
											>
												{formatPrice(diamondItem.DiscountPrice)}
											</p>
											<p
												className="text-xl w-1/5 text-center cursor-pointer"
												onClick={(e) => {
													e.stopPropagation(); // Ngăn chặn sự kiện onClick khác
													handleHeartClick(diamondItem.Id);
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
					{/* </InfiniteScroll> */}
				</>
			)}
		</div>
	);
};
