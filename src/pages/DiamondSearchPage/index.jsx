import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllDiamondSelector, GetDiamondAttributesSelector} from '../../redux/selectors';
import {getAllDiamond, getDiamondAttributesValues} from '../../redux/slices/diamondSlice';

const mapAttributes = (data, attributes) => {
	return {
		Id: data.Id,
		Carat: data.Carat,
		Clarity: attributes.Clarity
			? Object.keys(attributes.Clarity).find(
					(key) => attributes.Clarity[key] === data.Clarity
			  )
			: '',
		Color: attributes.Color
			? Object.keys(attributes.Color).find((key) => attributes.Color[key] === data.Color)
			: '',
		Culet: attributes.Culet
			? Object.keys(attributes.Culet).find((key) => attributes.Culet[key] === data.Culet)
			: '',
		Cut: attributes.Cut
			? Object.keys(attributes.Cut).find((key) => attributes.Cut[key] === data.Cut)
			: '',
		Fluorescence: attributes.Fluorescence
			? Object.keys(attributes.Fluorescence).find(
					(key) => attributes.Fluorescence[key] === data.Fluorescence
			  )
			: '',
		Girdle: attributes.Girdle
			? Object.keys(attributes.Girdle).find((key) => attributes.Girdle[key] === data.Girdle)
			: '',
		Polish: attributes.Polish
			? Object.keys(attributes.Polish).find((key) => attributes.Polish[key] === data.Polish)
			: '',
		Symmetry: attributes.Symmetry
			? Object.keys(attributes.Symmetry).find(
					(key) => attributes.Symmetry[key] === data.Symmetry
			  )
			: '',
		Depth: data.Depth,
		Table: data.Table,
		Measurement: data.Measurement,
		DiamondShape: data?.DiamondShape?.ShapeName,
		Price: data.DiamondPrice.Price,
		IsLabDiamond: data.IsLabDiamond,
	};
};

const DiamondSearchPage = () => {
	const dispatch = useDispatch();
	const diamondAttributes = useSelector(GetDiamondAttributesSelector);
	const diamondList = useSelector(GetAllDiamondSelector);

	const [changeDiamond, setChangeDiamond] = useState(true);
	const [attributes, setAttributes] = useState();
	const [mappedDiamonds, setMappedDiamonds] = useState([]);
	const [diamondChoice, setDiamondChoice] = useState(
		localStorage.getItem('diamondChoice') || localStorage.getItem('selected') || ''
	);
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

	useEffect(() => {
		dispatch(getAllDiamond());
	}, [dispatch]);

	console.log(mappedDiamonds);

	useEffect(() => {
		if (diamondList && attributes) {
			// Map diamond attributes to more readable values
			const mappedData = diamondList.map((diamond) => mapAttributes(diamond, attributes));
			setMappedDiamonds(mappedData);
		}
	}, [diamondList, attributes]);

	useEffect(() => {
		dispatch(getDiamondAttributesValues());
	}, []);

	useEffect(() => {
		if (diamondAttributes && diamondAttributes.length > 0) {
			setAttributes(diamondAttributes[0]); // Assuming the first element contains the necessary attributes
		}
	}, [diamondAttributes]);

	const items = [
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];

	return (
		<div className="mx-32">
			{diamondChoice.length === 0 && (
				<Steps
					current={1}
					percent={50}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			<div className="divide-x flex items-center justify-center my-5">
				<button
					className={`px-4 py-2 ${
						changeDiamond ? 'bg-primary' : 'bg-white'
					} rounded-s-lg`}
					onClick={() => setChangeDiamond(true)}
				>
					Tự nhiên
				</button>
				<button
					className={`px-4 py-2 ${
						!changeDiamond ? 'bg-primary' : 'bg-white'
					} rounded-e-lg`}
					onClick={() => setChangeDiamond(false)}
				>
					Nhân tạo
				</button>
			</div>

			{/* Use the mapped diamond data */}
			{changeDiamond ? (
				<DiamondList
					diamond={mappedDiamonds}
					diamondList={diamondList}
					setDiamond={setMappedDiamonds}
				/>
			) : (
				<DiamondLabList
					diamond={mappedDiamonds}
					setDiamond={setMappedDiamonds}
					diamondList={diamondList}
				/>
			)}
		</div>
	);
};

export default DiamondSearchPage;
