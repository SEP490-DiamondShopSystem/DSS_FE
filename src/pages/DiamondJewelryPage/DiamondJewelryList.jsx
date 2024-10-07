import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../assets/ring_classic.png';
import {FilterDiamondJewelry} from '../../components/Filter/Filter';
import {GetAllJewelrySelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getAllJewelry} from '../../redux/slices/jewelrySlice';

export const DiamondJewelryList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelrySelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
	const [filters, setFilters] = useState({
		gender: [],
		type: [],
		metal: [],
		price: {minPrice: 0, maxPrice: 1000},
	});

	console.log(filters);

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				type: saved,
			}));
		}
	}, []);

	console.log(filters);

	useEffect(() => {
		dispatch(getAllJewelry());
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList);
	}, [jewelryList]);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({gender: [], type: [], metal: [], price: {minPrice: 0, maxPrice: 1000}});
	};

	if (jewelryList) return <div>Loading...</div>;
	return (
		<>
			<div className="mt-10">
				<FilterDiamondJewelry
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>

			{loading ? (
				<div className="flex items-center justify-center my-10">
					<ReactLoading height={'10%'} width={'10%'} type="spin" color="#dec986" />
				</div>
			) : (
				<>
					<div className="text-2xl flex justify-end mt-10">
						<p className="p-2">200 Kết quả</p>
					</div>
					<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
						{jewelries?.map((jewelry, i) => (
							<div
								key={i}
								className="shadow-lg bg-white rounded-lg hover:border-2 cursor-pointer"
								onClick={() => navigate(`/jewelry/diamond-jewelry/${jewelry.id}`)}
							>
								<div className="w-80">
									<div
										className=" flex justify-center mb-5"
										style={{background: '#b8b7b5'}}
									>
										<Image
											src={jewelryImg}
											alt={jewelry.title}
											className=""
											preview={false}
										/>
									</div>
									<div className="mx-5 my-5">
										<p>{jewelry.title}</p>
										<div className="flex mt-2">
											<p className="line-through" style={{color: '#b0b0b0'}}>
												{jewelry.price}
											</p>
											<p className="ml-5 " style={{color: '#707070'}}>
												{jewelry.discountPrice}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};
