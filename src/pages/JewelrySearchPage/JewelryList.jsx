import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import jewelryImg from '../../assets/ring_classic.png';
import {GetAllJewelrySelector} from '../../redux/selectors';
import {getAllJewelry} from '../../redux/slices/jewelrySlice';
import {FilterJewelry} from '../../components/Filter/Filter';
import {useNavigate} from 'react-router-dom';

export const JewelryList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();

	useEffect(() => {
		dispatch(getAllJewelry());
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList);
	}, [jewelryList]);

	return (
		<>
			<div>
				<FilterJewelry />
			</div>
			<div className="text-2xl flex justify-end mt-10">
				<p className="p-2">200 Kết quả</p>
			</div>
			<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
				{jewelries?.map((jewelry, i) => (
					<div
						key={i}
						className="shadow-lg bg-white rounded-lg hover:border-2 cursor-pointer"
						onClick={() => navigate(`/jewelry/design-your-own-ring/${jewelry.id}`)}
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
	);
};
