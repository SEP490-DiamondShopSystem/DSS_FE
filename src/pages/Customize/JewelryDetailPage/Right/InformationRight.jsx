import React, {useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import {notifyError} from '../../../../utils/toast';

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
	options: [
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
};

export const InformationRight = ({handleSizeChange, setStepChoose, customizeJewelry}) => {
	const navigate = useNavigate();

	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarrantly, setProductWarrantly] = useState(false);

	const toggleDetail = () => {
		setDetail(!showDetail);
	};
	const toggleSecureShopping = () => {
		setSecureShopping(!showSecureShopping);
	};
	const toggleProductWarrantly = () => {
		setProductWarrantly(!showProductWarrantly);
	};

	// State to store the selected metal
	const [selectedMetal, setSelectedMetal] = useState(() => {
		// Get the saved metal from localStorage, default to first metal if not present
		const savedMetal = localStorage.getItem('selectedMetal');
		return savedMetal ? JSON.parse(savedMetal) : metalType.options[0];
	});

	// Function to handle metal selection
	const handleSelectMetal = (metal) => {
		setSelectedMetal(metal);
		console.log(metal);

		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const handleNextStep = () => {
		if (customizeJewelry.size !== '') {
			setStepChoose(1);
		} else {
			notifyError('Vui lòng chọn kích thước nhẫn!');
		}
	};

	return (
		<div>
			<div className="border-b border-tintWhite">
				<h1 className="text-3xl">
					{metalType.name} {selectedMetal?.metalSelect}
				</h1>

				<div className="font-semibold my-2">
					Giao hàng như kim cương rời vào: {selectedMetal?.ship}
				</div>
				<div className="flex mb-2">
					<div className="font-semibold  text-green cursor-pointer">
						Giao Hàng Miễn Phí Ngay
					</div>

					<div className="font-semibold pl-2 text-green cursor-pointer">
						Giao Hàng Miễn Phí Ngay
					</div>
				</div>
			</div>
			<div>
				<div>
					<div>
						<p className="my-2">Vui lòng chọn kích thước nhẫn để tiếp tục</p>
						<div className="flex items-center">
							<p className="mr-5">Kích thước nhẫn:</p>
							<select
								className="w-34 border-2 rounded-lg p-2"
								onChange={handleSizeChange}
							>
								<option value={''}>--Chọn size--</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="border-y border-tintWhite py-5 my-5">
				<div className="flex items-center">
					<p className="line-through text-gray decoration-gray text-2xl">
						{metalType.price}
					</p>
					<p className="font-semibold pl-2 text-2xl">{metalType.priceDiscount}</p>
					<div className="text-sm pl-2">(Giá Cài Đặt)</div>
				</div>
				<div>
					<div className="text-xl pt-2 font-semibold">
						*Mã giảm giá được áp dụng tự động
					</div>
				</div>
			</div> */}
			<div className="flex justify-between items-center mt-5">
				<Button
					type="text"
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
					onClick={handleNextStep}
				>
					Chọn Cài Đặt Này
				</Button>
			</div>
			<div className="my-10">
				<h2 className="font-bold text-xl pb-3">Đơn Hàng Của Bạn Bao Gồm:</h2>
				<div className="flex bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faTruck} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Giao Hàng Miễn Phí</p>
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
				<div className="my-4 cursor-pointer" onClick={toggleProductWarrantly}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Đảm Bảo Sản Phẩm
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showProductWarrantly ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showProductWarrantly ? 'max-h-screen' : 'max-h-0'
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
