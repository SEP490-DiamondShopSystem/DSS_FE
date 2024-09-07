import React, {useEffect, useState} from 'react';

import {listJewelry} from '../../utils/constant';
import {Image} from 'antd';
import jewelryImg from '../../assets/jewelry.png';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllJewelrySelector} from '../../redux/selectors';
import {getAllJewelry} from '../../redux/slices/jewelrySlice';

export const JewelryList = () => {
	const jewelryList = useSelector(GetAllJewelrySelector);
	const dispatch = useDispatch();
	const [jewelries, setJewelries] = useState();

	console.log(jewelries);

	useEffect(() => {
		dispatch(getAllJewelry());
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList);
	}, [jewelryList]);

	return (
		<>
			<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
				{jewelries?.map((jewelry, i) => (
					<div key={i} className=" shadow-lg bg-white rounded-lg">
						<div className="w-80">
							<div
								className=" flex justify-center mb-5 "
								style={{background: '#b8b7b5'}}
							>
								<Image src={jewelryImg} alt={jewelry.title} className="" />
							</div>
							<div className="mx-10 my-5">
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
