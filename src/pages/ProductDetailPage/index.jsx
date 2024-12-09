import React, {useState} from 'react';

import {Steps} from 'antd';
import {useNavigate} from 'react-router-dom';
import {addOrUpdateCartDesignItem} from '../../redux/slices/cartSlice';
import {data} from '../../utils/constant';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';
import {useDispatch} from 'react-redux';

const metalType = {
	id: 12212,
	name: 'Nhẫn Đính Hôn Heirloom Petite Milgrain',
	price: '$620',
	priceDiscount: '$465',
	productDetail:
		'Thể hiện tình yêu của bạn với chiếc nhẫn đính hôn bằng vàng trắng 14k này, với thiết kế gài kim cương bằng móc theo hướng đông-tây.',
	clarity: '',
	cut: '',
	color: '',
	optionsMetal: [
		{
			metal: '14k',
			metalSelect: 'Vàng Trắng 14k',
			color: 'gray',
			ship: 'Thứ Hai, 26 tháng 8',
		},
		{
			metal: '14k',
			metalSelect: 'Vàng Vàng 14k',
			color: 'second',
			ship: 'Thứ Sáu, 30 tháng 8',
		},
		{
			metal: '14k',
			metalSelect: 'Vàng Hồng 14k',
			color: 'red',
			ship: 'Chủ Nhật, 25 tháng 8',
		},
	],
	optionsWidth: [
		{
			width: '2.00',
		},
		{
			width: '3.00',
		},
		{
			width: '4.00',
		},
		{
			width: '5.00',
		},
	],
};

const ProductDetailPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

	const [size, setSize] = useState('');
	const [diamondJewelry, setDiamondJewelry] = useState(data);
	const [selectedMetal, setSelectedMetal] = useState(() => {
		const savedMetal = localStorage.getItem('selectedMetal');
		return savedMetal ? JSON.parse(savedMetal) : diamondJewelry.Metal[0].Name;
	});
	const [selectedWidth, setSelectedWidth] = useState(() => {
		const savedWidth = localStorage.getItem('selectedWidth');
		return savedWidth ? JSON.parse(savedWidth) : diamondJewelry?.Model?.Width;
	});

	// Function to handle metal selection
	const handleSelectMetal = (metal) => {
		setSelectedMetal(metal);

		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const handleSelectWidth = (width) => {
		setSelectedWidth(width);

		localStorage.setItem('selectedWidth', JSON.stringify(width));
	};

	const handleChoiceClick = (id) => {
		const data = {
			...diamondJewelry,
			JewelryId: diamondJewelry.Id,
			JewelryName: diamondJewelry.Name,
			Size: size,
			Price: diamondJewelry.Price,
			Thumbnail: diamondJewelry.Thumbnail,
			SerialCode: diamondJewelry.SerialCode,
			Width: selectedWidth,
			Metal: selectedMetal,
		};

		dispatch(addOrUpdateCartDesignItem({jewelry: data}));

		// Navigate to the completed jewelry page
		navigate(`/completed-jewelry/${id}`);
	};

	const handleChange = (value) => {
		setSize(value);
	};

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

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="mx-32">
			{diamondChoice.length > 0 ? (
				<Steps
					current={1}
					labelPlacement="horizontal"
					percent={100}
					items={itemsDiamond}
					className="bg-white p-4 rounded-full my-10"
				/>
			) : (
				<Steps
					current={0}
					labelPlacement="horizontal"
					percent={100}
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}
			{diamondChoice.length === 0 && (
				<Sidebar
					isOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					diamondJewelry={diamondJewelry}
					selectedWidth={selectedWidth}
					selectedMetal={selectedMetal}
					size={size}
				/>
			)}

			<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft
						diamondJewelry={diamondJewelry}
						selectedMetal={selectedMetal}
					/>
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight
						toggleSidebar={toggleSidebar}
						diamondChoice={diamondChoice}
						setSelectedMetal={setSelectedMetal}
						selectedMetal={selectedMetal}
						setSelectedWidth={setSelectedWidth}
						selectedWidth={selectedWidth}
						handleChoiceClick={handleChoiceClick}
						handleSelectMetal={handleSelectMetal}
						handleSelectWidth={handleSelectWidth}
						handleChange={handleChange}
						metalType={metalType}
						diamondJewelry={diamondJewelry}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
