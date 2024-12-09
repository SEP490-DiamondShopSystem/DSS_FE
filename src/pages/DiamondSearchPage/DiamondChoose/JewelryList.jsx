import React, {useEffect, useState} from 'react';

import {
	AppstoreOutlined,
	HeartFilled,
	HeartOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {Divider, Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import diamondImg from '../../../assets/ring_classic.png';
import {FilterDiamond, FilterJewelryDiamond} from '../../../components/Filter/Filter';
import {LoadingDiamondSelector} from '../../../redux/selectors';

import {formatPrice} from '../../../utils';
import Loading from '../../../components/Loading';
import {Clarity, Color, Cut} from '../../../utils/constant';

export const JewelryList = ({
	filters,
	setFilters,
	handleReset,
	filterLimits,
	diamondForFilter,
	findShape,
	diamondList,
	jewelryModel,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector(LoadingDiamondSelector);

	const [changeGrid, setChangeGrid] = useState(false);

	useEffect(() => {
		const savedShape = localStorage.getItem('selected');
		if (savedShape) {
			setFilters((prevFilters) => ({
				...prevFilters,
				shape: savedShape,
			}));
		}
	}, []);

	const handleGridClick = () => {
		setChangeGrid(true);
	};
	const handleListClick = () => {
		setChangeGrid(false);
	};

	const getLabelFromCode = (code, mapping) => {
		// Find the key in the mapping object that matches the code
		return Object.keys(mapping).find((key) => mapping[key] === code) || '-';
	};

	const handleClick = (id) => {
		navigate(`/completed-jewelry/${id}`);
	};

	return (
		<div>
			<FilterJewelryDiamond
				setFilters={setFilters}
				filters={filters}
				handleReset={handleReset}
				filterLimits={filterLimits}
				diamondForFilter={diamondForFilter}
				findShape={findShape}
			/>

			{loading ? (
				<Loading />
			) : (
				<>
					{!Array.isArray(diamondList) || diamondList.length === 0 ? (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					) : (
						<>
							<div className="text-2xl flex justify-end mt-10">
								<p className="p-2">{diamondList?.length} Kết quả</p>
							</div>

							<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
								{diamondList?.length > 0 ? (
									diamondList.map((item, index) => (
										<div
											key={item.Id}
											className="shadow-lg bg-white border-2 border-white rounded-lg hover:border-2 hover:border-black cursor-pointer"
											onClick={() => handleClick(item?.Id)}
										>
											<div className="">
												<div style={{background: '#b8b7b5'}}>
													<Image
														src={
															item.Thumbnail?.MediaPath || diamondImg
														}
														alt={
															item.Thumbnail?.MediaName ||
															'Default Image'
														}
														className="w-full"
														preview={false}
													/>
												</div>
												<div className="my-5">
													<p className="ml-3">
														{formatPrice(item.ND_Price)}
													</p>
												</div>
											</div>
										</div>
									))
								) : (
									<div className="flex items-center justify-center my-10">
										<p className="text-2xl">Chưa có sản phẩm nào</p>
									</div>
								)}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};
