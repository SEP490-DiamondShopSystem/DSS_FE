import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, message, Rate, Select} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {convertToVietnamDate, formatPrice} from '../../../utils';

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

export const InformationRight = ({
	selectedMetal,
	setSelectedMetal,
	diamondJewelry,
	size,
	setSize,
}) => {
	const navigate = useNavigate();

	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarranty, setProductWarranty] = useState(false);

	const toggleDetail = () => {
		setDetail(!showDetail);
	};
	const toggleSecureShopping = () => {
		setSecureShopping(!showSecureShopping);
	};
	const toggleProductWarranty = () => {
		setProductWarranty(!showProductWarranty);
	};

	const [selectedWidth, setSelectedWidth] = useState(() => {
		const savedWidth = localStorage.getItem('selectedWidth');
		return savedWidth ? JSON.parse(savedWidth) : metalType.optionsWidth[0];
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

	const handleChange = (value) => {
		setSize(value);
	};

	const handleAddCart = () => {
		if (size === '') return message.warning('Vui lòng chọn kích thước nhẫn!');
		const data = {
			JewelryId: diamondJewelry.Id,
			JewelryName: diamondJewelry.Name,
			Size: size,
			Width: selectedWidth.width,
			Metal: selectedMetal.Name,
			JewelryThumbnail: diamondJewelry.Thumbnail,
		};

		// Get the existing cart from localStorage
		const existingCart = localStorage.getItem('cart');

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

		// Add the current jewelry item to the cart
		cart.push(data);

		// Save the updated cart back to localStorage
		localStorage.setItem('cart', JSON.stringify(cart));

		// Thông báo thành công khi sản phẩm được thêm vào
		message.success('Sản phẩm đã được thêm vào giỏ hàng!');
	};

	return (
		<div>
			<div className="border-b border-tintWhite">
				<h1 className="text-3xl">
					{diamondJewelry.Name} {selectedMetal?.Name}
				</h1>
				<div className="my-5 flex">
					<Rate
						allowHalf
						defaultValue={5}
						style={{fontSize: 20, color: '#F9A825'}}
						disabled
					/>
					<p className="ml-5">477 Đánh Giá</p>
				</div>
				<div className="font-semibold my-2">
					Ngày Giao Hàng Dự Kiến: {convertToVietnamDate(diamondJewelry?.ShippingDate)}
				</div>
				{/* <div className="flex mb-2">
					<div className="font-semibold  text-green cursor-pointer">
						Giao Hàng Miễn Phí Ngay
					</div>

					<div className="font-semibold pl-2 text-green cursor-pointer">
						Giao Hàng Miễn Phí Ngay
					</div>
				</div> */}
			</div>
			<div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Loại Kim Loại</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						{selectedMetal?.Name}
					</div>
				</div>
				<div>
					<div className="flex">
						{diamondJewelry?.Metal?.map((metal, i) => (
							<div
								key={i}
								className={`${
									selectedMetal?.metalSelect === metal?.metalSelect
										? 'border border-black'
										: 'border border-white'
								} m-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-offWhite`}
								onClick={() => handleSelectMetal(metal)} // Save selected metal on click
							>
								<div className={`rounded-full  p-1`}>{metal.Name}</div>
							</div>
						))}
					</div>
				</div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Độ dài</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						{selectedWidth?.width}mm
					</div>
				</div>
				<div>
					<div className="flex">
						{metalType?.optionsWidth?.map((metal, i) => (
							<div
								key={i}
								className={`${
									selectedWidth?.width === metal?.width
										? 'border border-black'
										: 'border border-white'
								} m-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-offWhite`}
								onClick={() => handleSelectWidth(metal)} // Save selected metal on click
							>
								<div className={`rounded-full p-1`}>{metal.width}</div>
							</div>
						))}
					</div>
				</div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Chọn kích thước nhẫn:</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						<Select
							defaultValue=""
							style={{width: 120}}
							onChange={handleChange}
							options={[
								{value: '', label: 'Chọn size'},
								{value: '1', label: '1'},
								{value: '2', label: '2'},
								{value: '3', label: '3'},
								{value: '4', label: '4'},
							]}
						/>
					</div>
				</div>
			</div>
			<div className="border-y border-tintWhite py-5 my-5">
				<div className="flex items-center">
					{/* <p className="line-through text-gray decoration-gray text-2xl">
						{metalType.price}
					</p> */}
					<p className="font-semibold pl-2 text-2xl">
						{formatPrice(diamondJewelry.Price)}
					</p>
					<div className="text-sm pl-2">(Giá Cài Đặt)</div>
				</div>
				<div>
					<div className="text-xl pt-2 font-semibold">
						*Mã giảm giá được áp dụng tự động
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center mt-5">
				<Button
					type="text"
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
					onClick={handleAddCart}
				>
					Thêm Vào Giỏ Hàng
				</Button>
			</div>
			<div className="my-10">
				<h2 className="font-bold text-xl pb-3">Đơn Hàng Của Bạn Bao Gồm:</h2>
				<div className="flex bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faTruck} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Giao Hàng Nhanh Chóng</p>
						<p>
							Chúng tôi cam kết mang đến trải nghiệm mua sắm và giao hàng hài lòng
							nhất cho bạn.
						</p>
					</div>
				</div>
				<div className="flex mt-5 bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faRefresh} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Hoàn Trả Miễn Phí</p>
						<p>
							Chúng tôi cam kết mang đến trải nghiệm mua sắm và giao hàng hài lòng
							nhất cho bạn.
						</p>
					</div>
				</div>
			</div>
			<div className="border-y">
				<div className="border-b pb-4 my-4 cursor-pointer" onClick={toggleDetail}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Chi Tiết Sản Phẩm
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showDetail ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showDetail ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="flex justify-between px-4 py-2">
							<span>{metalType.productDetail}</span>
						</div>
					</div>
				</div>
				<div className="border-b pb-4 my-4 cursor-pointer" onClick={toggleSecureShopping}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Mua Sắm An Toàn
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showSecureShopping ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showSecureShopping ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="flex justify-between px-4 py-2">
							<span>
								Chúng tôi cam kết đảm bảo trải nghiệm mua sắm của bạn vượt ngoài
								mong đợi, với các biện pháp đảm bảo đơn hàng của bạn sẽ an toàn và
								bảo mật từ cửa nhà chúng tôi đến tay bạn.
							</span>
						</div>
					</div>
				</div>
				<div className="my-4 cursor-pointer" onClick={toggleProductWarranty}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Đảm Bảo Sản Phẩm
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showProductWarranty ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showProductWarranty ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="flex justify-between px-4 py-2">
							<span>
								Chúng tôi cam kết mang đến cho bạn sản phẩm chất lượng cao nhất, đi
								kèm với dịch vụ bảo hành chu đáo và tận tâm.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
