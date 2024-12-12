import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import debounce from 'lodash/debounce';
import Loading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../../assets/jewelry.png';
import {FilterJewelryCustomize} from '../../../components/Filter/Filter';
import {
	GetAllJewelryModelCustomizeSelector,
	LoadingJewelrySelector,
} from '../../../redux/selectors';
import {getAllJewelryModelCustomize} from '../../../redux/slices/customizeSlice';

export const ProductList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelryModelCustomizeSelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
	// const [page, setPage] = useState(100);
	const [filters, setFilters] = useState({
		// gender: [],
		Type: undefined,
		name: undefined,
		IsRhodiumFinished: undefined,
		IsEngravable: undefined,
	});

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				type: saved,
			}));
		}
	}, []);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelryModelCustomize({
				Category: filters.Type,
				name: filters?.name,
				IsRhodiumFinished: filters?.IsRhodiumFinished,
				IsEngravable: filters?.IsEngravable,
			})
		);
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [filters]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList.Values);
	}, [jewelryList]);

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
					<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
						{jewelries?.map((jewelry, i) => (
							<div
								key={i}
								className="shadow-lg bg-white rounded-lg border-2 border-white hover:border-2 hover:border-black cursor-pointer"
								onClick={() => navigate(`/customize/diamond-jewelry/${jewelry.Id}`)}
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
												Mẫu Trang Sức {jewelry.MainDiamondCount} Kim Cương
												Chính
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
				</>
			)}
		</>
	);
};
