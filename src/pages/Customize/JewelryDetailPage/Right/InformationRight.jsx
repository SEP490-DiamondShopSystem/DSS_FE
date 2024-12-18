import React, {useEffect, useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Rating} from '@mui/material';
import {Button, Select} from 'antd';
import {useNavigate} from 'react-router-dom';

const {Option} = Select;

export const InformationRight = ({
	handleSizeChange,
	setStepChoose,
	customizeJewelry,
	selectedMetal,
	diamondJewelry,
	size,
	selectedSideDiamond,
	filteredGroups,
	id,
	handleChange,
	handleSelectSideDiamond,
	handleSelectMetal,
}) => {
	const navigate = useNavigate();

	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarrantly, setProductWarrantly] = useState(false);
	const [sizeGroups, setSizeGroups] = useState();

	useEffect(() => {
		if (filteredGroups) {
			setSizeGroups(filteredGroups[0]);
		}
	}, [filteredGroups]);

	const toggleDetail = () => {
		setDetail(!showDetail);
	};
	const toggleSecureShopping = () => {
		setSecureShopping(!showSecureShopping);
	};
	const toggleProductWarrantly = () => {
		setProductWarrantly(!showProductWarrantly);
	};

	const handleNextStep = () => {
		setStepChoose(1);
	};

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl">
					{diamondJewelry?.Name} {selectedMetal?.Name || selectedMetal}
				</h1>
				<div className="my-5 flex">
					<Rating rating={0} />
					<p className="ml-5">477 Đánh Giá</p>
				</div>
			</div>
			<div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Loại Kim Loại</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>{selectedMetal}</div>
				</div>
				<div>
					<div className="flex">
						{diamondJewelry?.MetalSupported?.map((metal, i) => (
							<div
								key={i}
								className={`${
									selectedMetal === metal
										? 'border-2 border-black'
										: 'border-2 border-white'
								} my-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-offWhite`}
								onClick={() => handleSelectMetal(metal)} // Save selected metal on click
							>
								<div className={`rounded-full p-1`}>{metal}</div>
							</div>
						))}
					</div>
				</div>
				{selectedSideDiamond !== undefined && (
					<>
						<div className="my-5 flex items-center">
							<div className="font-semibold">Kim Cương Tấm</div>
							<div className={`font-semibold text-xl pl-4 text-primary`}>
								Số Lượng: {selectedSideDiamond?.Quantity} - Carat:{' '}
								{selectedSideDiamond?.CaratWeight}
							</div>
						</div>
						<div>
							<div className="flex">
								{diamondJewelry?.SideDiamonds?.map((diamond, i) => (
									<div
										key={i}
										className={`
								${
									selectedSideDiamond.CaratWeight === diamond?.CaratWeight
										? 'border-2 border-black'
										: 'border-2 border-white'
								}
						my-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-offWhite`}
										onClick={() => handleSelectSideDiamond(diamond)} // Save selected diamond on click
									>
										<div className={`rounded-full p-1 flex items-center`}>
											{/* <p className="mr-2">{diamond?.Quantity}</p> -{' '} */}
											<p className="">{diamond?.CaratWeight}ct</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}

				{/* <div className="my-5 flex items-center">
					<div className="font-semibold">Độ dài</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						{diamondJewelry?.Width}mm
					</div>
				</div> */}
				{/* <div>
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
				</div> */}
			</div>
			<div className="border-y border-tintWhite my-5">
				{diamondJewelry && diamondJewelry.Category?.Name === 'Ring' && (
					<div className="mt-5 flex items-center">
						<div className="font-semibold">Chọn kích thước:</div>
						<div className={`font-semibold text-xl pl-4 text-primary`}>
							<Select style={{width: 120}} onChange={handleChange}>
								{filteredGroups.map((size, i) => (
									<Option key={i} value={size?.SizeId}>
										<p className="font-semibold mr-2">{size?.SizeId}</p>
									</Option>
								))}
							</Select>
						</div>
						<div>
							<p className="text-red ml-5">* Vui lòng chọn kích thước!</p>
						</div>
					</div>
				)}

				{/* {selectedMetal !== undefined && size !== undefined && (
					<div className="my-5 flex items-center">
						<div className="font-semibold">Trang Sức Có Sẵn:</div>
						<div className={`font-semibold text-xl pl-4 text-primary`}>
							<Select
								// value={size?.Size}
								style={{width: 420, height: 40}}
								className=""
								onChange={handleJewelryChange}
								options={[
									{value: '', label: 'Chọn Trang Sức'},
									{value: '1', label: '1'},
									{value: '2', label: '2'},
									{value: '3', label: '3'},
									{value: '4', label: '4'},
								]}
							/>
						</div>
					</div>
				)} */}

				{/* <div className="flex items-center">
					<p className="text-2xl mr-2 font-semibold">Giá Sàn:</p>
					<p className="font-semibold text-2xl my-2">
						{formatPrice(findSizePrice?.Price || 0)}
					</p>
				</div> */}
				{/* <div>
					<div className="text-xl pt-2 font-semibold">
						*Mã giảm giá được áp dụng tự động
					</div>
				</div> */}
			</div>

			{size !== null &&
				selectedMetal !== null &&
				selectedSideDiamond !== null &&
				diamondJewelry?.Category.Name === 'Ring' && (
					<div className="flex justify-between items-center mt-5">
						<Button
							type="text"
							className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
							onClick={handleNextStep}
						>
							Chọn Cài Đặt Này
						</Button>
					</div>
				)}
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
							{/* <span>{metalType.productDetail}</span> */}
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
