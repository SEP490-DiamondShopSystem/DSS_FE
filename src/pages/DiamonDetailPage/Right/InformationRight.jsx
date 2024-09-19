import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Rate} from 'antd';
import React, {useState} from 'react';

const metalType = {
	name: '1.00 Carat Round Diamond',
	price: '$465',
	productDetail: 'This 1.00 round H diamond is sold exclusively on Blue Nile.',
	GIA_report:
		'This is the report which documents the specific characteristics of a diamond, issued by the GIA, which is among the most respected organizations in the diamond industry.',
	ship: 'Monday, August 26',
	options: [
		{
			carat: '1.00ct',
			clarity: 'VS2 Clarity',
			color: 'H Color',
			cut: 'Very Good',
		},
	],
};
export const InformationRight = ({toggleSidebar}) => {
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

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl">{metalType.name}</h1>
				{/* <div className="my-5 flex">
					<Rate
						allowHalf
						defaultValue={5}
						style={{fontSize: 20, color: '#F9A825'}}
						disabled
					/>
					<p className="ml-5">477 Reviews</p>
				</div> */}
				<div className="font-semibold my-2">
					Ships as a loose diamond by: {metalType?.ship}
				</div>
				<div className="flex mb-2">
					<div className="font-semibold  text-green cursor-pointer">
						Free Overnight Shipping
					</div>

					<div className="font-semibold pl-2 text-green cursor-pointer">
						Free Overnight Shipping
					</div>
				</div>
				<div>
					{metalType?.options?.map((metal, i) => (
						<div className="flex items-center text-sm">
							<p className="p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.carat}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.color}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.clarity}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.cut}
							</p>
						</div>
					))}
				</div>
			</div>
			{/* <div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Metal Type</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						{selectedMetal?.metalSelect}
					</div>
				</div>
				<div>
					<div className="flex">
						{metalType?.options?.map((metal, i) => (
							<div
								key={i}
								className={`${
									selectedMetal?.metalSelect === metal?.metalSelect
										? 'border'
										: ''
								} m-2 py-2 px-4 rounded-lg cursor-pointer`}
								onClick={() => handleSelectMetal(metal)} // Save selected metal on click
							>
								<div className={`rounded-full border-2 p-1 border-${metal.color}`}>
									{metal.metal}
								</div>
							</div>
						))}
					</div>
				</div>
			</div> */}
			<div className="border-y border-tintWhite py-5 my-5">
				<div className="flex items-center">
					<p className="font-semibold pl-2 text-2xl">{metalType.price}</p>
					<div className="text-sm pl-2">(Diamond Price)</div>
				</div>
				{/* <div>
					<div className="text-xl pt-2 font-semibold">
						*Discount code is applied automatically
					</div>
				</div> */}
			</div>
			<div className="flex justify-between items-center mt-5">
				<Button
					type="text"
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full"
					// onClick={toggleSidebar}
				>
					SELECT THIS DIAMOND
				</Button>
			</div>
			<div className="my-10">
				<h2 className="font-bold text-xl pb-3">Your Order Includes:</h2>
				<div className="flex bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faTruck} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Free Shipping</p>
						<p>
							We're committed to making your entire experience a pleasant one, from
							shopping to shipping.
						</p>
					</div>
				</div>
				<div className="flex mt-5 bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faRefresh} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Free Returns</p>
						<p>
							We're committed to making your entire experience a pleasant one, from
							shopping to shipping.
						</p>
					</div>
				</div>
			</div>
			<div className="border-y ">
				<div className="border-b pb-4 my-4 cursor-pointer" onClick={toggleDetail}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Product Details
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
							GIA Grading Report
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
							<span>{metalType.GIA_report}</span>
						</div>
					</div>
				</div>
				<div className="my-4 cursor-pointer" onClick={toggleProductWarrantly}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Lifetime Diamond Upgrade Program
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
								Blue Nile is pleased to offer a lifetime diamond upgrade program on
								all certified diamonds. Simply call a Diamond & Jewelry Consultant
								at 012345678 to learn more about our upgrade program and to select
								your new diamond.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
