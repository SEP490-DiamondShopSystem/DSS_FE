import React, {useEffect, useState} from 'react';
import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {GetDiamondAttributesSelector} from '../../redux/selectors';
import {getDiamondAttributesValues} from '../../redux/slices/diamondSlice';
import {useParams} from 'react-router-dom';

const fakeData = {
	Carat: 0.5,
	Clarity: 6,
	Color: 2,
	Culet: 4,
	Cut: 3,
	Depth: 0.3,
	DiamondPrice: {
		ShapeId: '10',
		CriteriaId: '638639878904151872',
		Criteria: {},
		Shape: {
			Id: '10',
			ShapeName: 'Pear',
		},
		Price: 23800000,
	},
	DiamondShape: {
		Id: '10',
		ShapeName: 'Pear',
	},
	DiamondShapeId: '10',
	Fluorescence: 2,
	Girdle: 5,
	Id: '9a282eae-41b9-4819-8e26-47760aa4c33c',
	IsLabDiamond: true,
	JewelryId: null,
	Measurement: '0.3x0.3x0.3',
	Polish: 4,
	PriceOffset: 1,
	Symmetry: 3,
	Table: 0.3,
	WidthLengthRatio: 0.3,
};

const DiamondDetailPage = () => {
	const {id} = useParams();
	const diamondAttributes = useSelector(GetDiamondAttributesSelector);
	const dispatch = useDispatch();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [attributes, setAttributes] = useState({});

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

	const itemsDiamond = [
		{
			title: `Chọn Kim Cương`,
		},
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Hoàn Thành',
		},
	];

	useEffect(() => {
		dispatch(getDiamondAttributesValues());
	}, [dispatch]);

	useEffect(() => {
		if (diamondAttributes && diamondAttributes.length > 0) {
			setAttributes(diamondAttributes[0]); // Assuming the first element contains the necessary attributes
		}
	}, [diamondAttributes]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const mapAttributes = (data, attributes) => {
		return {
			DiamondId: data.Id,
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
				? Object.keys(attributes.Girdle).find(
						(key) => attributes.Girdle[key] === data.Girdle
				  )
				: '',
			Polish: attributes.Polish
				? Object.keys(attributes.Polish).find(
						(key) => attributes.Polish[key] === data.Polish
				  )
				: '',
			Symmetry: attributes.Symmetry
				? Object.keys(attributes.Symmetry).find(
						(key) => attributes.Symmetry[key] === data.Symmetry
				  )
				: '',
			Depth: data.Depth,
			Table: data.Table,
			Measurement: data.Measurement,
			DiamondShape: data.DiamondShape.ShapeName,
			Price: data.DiamondPrice.Price,
			IsLabDiamond: data.IsLabDiamond,
		};
	};

	const mappedDiamond = mapAttributes(fakeData, attributes); // Use fake data with fetched attributes

	console.log(mappedDiamond);

	return (
		<>
			<div className="mx-6 md:mx-32">
				{diamondChoice.length === 0 ? (
					<Steps
						current={1}
						percent={100}
						labelPlacement="horizontal"
						items={items}
						className="bg-white p-4 rounded-full mt-10"
					/>
				) : (
					<Steps
						current={0}
						labelPlacement="horizontal"
						items={itemsDiamond}
						className="bg-white p-4 rounded-full mt-10"
					/>
				)}

				{diamondChoice.length > 0 && (
					<Sidebar
						isOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						diamond={mappedDiamond}
					/>
				)}

				<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
					<div className="w-full md:w-1/2 p-6">
						<ImageGallery />
						<InformationLeft diamond={mappedDiamond} />
					</div>

					<div className="w-full md:w-1/2 p-6 md:pr-32">
						<InformationRight
							diamondChoice={diamondChoice}
							toggleSidebar={toggleSidebar}
							diamond={mappedDiamond}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default DiamondDetailPage;
