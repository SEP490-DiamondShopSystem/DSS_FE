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
import {GetAllDiamondSelector} from '../../redux/selectors';
import {getAllDiamond} from '../../redux/slices/diamondSlice';
import {useNavigate} from 'react-router-dom';
import {FilterDiamond} from '../../components/Filter/Filter';

export const DiamondList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const diamondList = useSelector(GetAllDiamondSelector);

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

	console.log(filters);

	useEffect(() => {
		const savedShape = localStorage.getItem('selectedShape');
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
		if (diamondList) setDiamond(diamondList);
	}, [diamondList]);

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
		setFilters({
			shape: '',
			price: {minPrice: 0, maxPrice: 1000},
			carat: {minCarat: 0.5, maxCarat: 30.0},
			color: {minColor: 0, maxColor: 7},
			clarity: {minClarity: 0, maxClarity: 7},
			cut: {minCut: 0, maxCut: 3},
		});
	};

	return (
		<div>
			<FilterDiamond setFilters={setFilters} filters={filters} handleReset={handleReset} />
			<div className="text-2xl flex justify-end ">
				<p className="p-2">{diamond.length} Kết quả</p>
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
					{diamond.map((diamondItem, i) => (
						<div
							key={diamondItem.id}
							className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
							onClick={() => navigate(`/diamond-detail/${diamondItem.id}`)}
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
									<p style={{color: '#707070'}}>{diamondItem.price}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="transition-all duration-300 mb-20 mt-10">
					{diamond.map((diamondItem, i) => (
						<div
							key={diamondItem.id}
							className="shadow-lg bg-white rounded-lg cursor-pointer"
							onClick={() => navigate(`/diamond-detail/${diamondItem.id}`)}
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
									<p className="text-xl w-1/5 text-center">{diamondItem.shape}</p>
									<p className="text-xl w-1/5 text-center">{diamondItem.carat}</p>
									<p className="text-xl w-1/5 text-center">
										{diamondItem.cut || '-'}
									</p>
									<p className="text-xl w-1/5 text-center">{diamondItem.color}</p>
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
		</div>
	);
};
