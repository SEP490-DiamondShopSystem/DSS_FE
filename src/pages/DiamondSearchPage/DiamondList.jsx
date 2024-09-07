import {
	AppstoreOutlined,
	HeartFilled,
	HeartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {Image} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import diamondImg from '../../assets/img-diamond.png';
import {GetAllDiamondSelector} from '../../redux/selectors';
import {getAllDiamond} from '../../redux/slices/diamondSlice';

export const DiamondList = () => {
	const dispatch = useDispatch();
	const diamondList = useSelector(GetAllDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(false);
	const [like, setLike] = useState(false);
	const [diamond, setDiamond] = useState();

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

	const handleHeartClick = (i) => {
		setLike((prev) => ({
			[i]: !prev[i],
		}));
	};

	return (
		<>
			<div className="text-2xl flex justify-end ">
				<p className="p-2">200 Results</p>
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
					{diamond?.map((diamond, i) => (
						<div
							key={i}
							className=" shadow-lg bg-white rounded-lg hover:border-2 cursor-pointer"
						>
							<div className="w-80">
								<div
									className=" flex justify-center mb-5 "
									style={{background: '#b8b7b5'}}
								>
									<Image src={diamondImg} alt={diamond.title} className="" />
								</div>
								<div className="mx-10 my-5">
									<p>{diamond.title}</p>
									<p style={{color: '#707070'}}>{diamond.price}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="transition-all duration-300 mb-20 mt-10">
					{diamond?.map((diamond, i) => (
						<div key={i} className="shadow-lg bg-white rounded-lg">
							<div className="flex w-full my-10 ">
								<div
									className="flex justify-center w-1/5"
									style={{background: '#b8b7b5'}}
								>
									<Image
										src={diamondImg}
										alt={diamond.title}
										className="w-full"
									/>
								</div>
								<div className="flex justify-between items-center w-4/5 ml-5">
									<p className="text-xl w-1/5 text-center">{diamond.shape}</p>
									<p className="text-xl w-1/5 text-center">{diamond.carat}</p>
									<p className="text-xl w-1/5 text-center">
										{diamond?.cut === '' ? '-' : diamond.cut}
									</p>
									<p className="text-xl w-1/5 text-center">{diamond.color}</p>
									<p className="text-xl w-1/5 text-center">{diamond.clarity}</p>
									<p
										className="text-xl w-1/5 text-center"
										style={{color: '#707070'}}
									>
										{diamond.price}
									</p>
									<p
										className="text-xl w-1/5 text-center cursor-pointer"
										onClick={() => handleHeartClick(i)}
									>
										{like[i] ? (
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
		</>
	);
};
