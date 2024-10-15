import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';
import {notifyError} from '../../utils/toast';
import {data} from '../../utils/constant';
import {useNavigate} from 'react-router-dom';

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
		console.log(metal);

		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const handleSelectWidth = (width) => {
		setSelectedWidth(width);
		console.log(width);

		localStorage.setItem('selectedWidth', JSON.stringify(width));
	};

	const handleChoiceClick = (id) => {
		const jewelryId = diamondJewelry.Id;
		const data = {
			JewelryId: diamondJewelry.Id,
			JewelryName: diamondJewelry.Name,
			Size: size,
			Price: diamondJewelry.Price,
			Thumbnail: diamondJewelry.Thumbnail,
			SerialCode: diamondJewelry.SerialCode,
			Width: selectedWidth,
			Metal: selectedMetal,
		};

		// Get the existing cart from localStorage
		const existingCart = localStorage.getItem('cartDesign');

		// Initialize cart as an empty array
		let cart = [];

		// Attempt to parse the existing cart data
		try {
			cart = existingCart ? JSON.parse(existingCart) : [];

			// Check if cart is an array; if not, reset it
			if (!Array.isArray(cart)) {
				cart = [];
			}
		} catch (error) {
			// Log error if parsing fails and reset cart
			console.error('Error parsing cart data:', error);
			cart = [];
		}
		const existingJewelryIndex = cart.findIndex((item) => item.JewelryId === jewelryId);
		// Add the current jewelry item to the cart
		if (existingJewelryIndex !== -1) {
			// If the diamond exists, replace it with the new diamond
			cart[existingJewelryIndex] = data;
		} else {
			// If the diamond doesn't exist, push the current diamond to the cart
			cart.push(data);
		}

		// Save the updated cart back to localStorage
		localStorage.setItem('cartDesign', JSON.stringify(cart));

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
