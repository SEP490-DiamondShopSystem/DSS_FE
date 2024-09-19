import {CheckCircleFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faRing, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Rate, Select, Typography} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const {Text} = Typography;

const metalType = {
	jewelryName: 'Petite Nouveau Six-Prong Solitaire Engagement Ring in 14k White Gold',
	diamondName: '1.01 Carat H-VS2 Excellent Cut Round Diamond',
	price: '$1,470',
	priceDiscount: '$1,102',
	productDetail: 'This 1.00 round H diamond is sold exclusively on Diamond Shop.',
	ship: 'Monday, August 26',
	totalCarat: '1.01 Ct',
	carat: '1.00ct',
	clarity: 'VS2 Clarity',
	color: 'H Color',
	cut: 'Very Good',
	stock: '#18395827',
};

const ring = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '2',
		label: '2',
	},
	{
		value: '3',
		label: '3',
	},
	{
		value: '4',
		label: '4',
		disabled: true,
	},
];
export const InformationRight = ({toggleSidebar}) => {
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

	const handleChange = (value) => {
		console.log('value', value);
	};

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl">
					{metalType.jewelryName} {metalType.diamondName}
				</h1>
				<div className="my-5 flex">
					<Rate
						allowHalf
						defaultValue={5}
						style={{fontSize: 20, color: '#F9A825'}}
						disabled
					/>
					<p className="ml-5">477 Reviews</p>
				</div>
				<div></div>
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
					<Text strong style={{fontSize: '18px'}}>
						Complete Ring:
					</Text>
					<div className="mt-5">
						<div className="flex justify-between mb-2">
							<div className="flex">
								<div className="">
									<CheckCircleFilled className="text-green" />
								</div>
								<div>
									<div className="ml-5">
										<p style={{width: 400}}>{metalType.diamondName}</p>
										<p className="" style={{color: '#d2d5d8'}}>
											{metalType.cut} · {metalType.color} ·{' '}
											{metalType.clarity} · {metalType.stock}
										</p>
										<p className="text-xl font-semibold">{metalType.price}</p>
									</div>
								</div>
							</div>
							<p className="text-primary cursor-pointer">Change Diamond</p>
						</div>
						<div className="flex justify-between mb-2">
							<div className="flex">
								<div className="">
									<FontAwesomeIcon icon={faRing} color="#dec986" />
								</div>
								<div>
									<div className="ml-5">
										<p style={{width: 400}}>{metalType.jewelryName}</p>
										<p className="" style={{color: '#d2d5d8'}}>
											{metalType.stock}
										</p>
										<p className="text-xl font-semibold">{metalType.price}</p>
									</div>
								</div>
							</div>
							<p className="text-primary cursor-pointer">Change Setting</p>
						</div>
						<div className="flex items-center">
							<p className="mr-3">Current Ring Size:</p>

							<Select
								defaultValue="1"
								style={{
									width: 120,
								}}
								onChange={handleChange}
								options={ring}
							/>
						</div>
					</div>
				</div>
				<div className="border-y border-tintWhite py-5 my-5">
					<div className="flex items-center">
						<p className="line-through text-gray decoration-gray text-2xl">
							{metalType.price}
						</p>
						<p className="font-semibold pl-2 text-2xl">{metalType.priceDiscount}</p>
					</div>
					<div>
						<div className="text-xl pt-2 font-semibold">
							*Discount code is applied automatically
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center mt-5">
				<Button
					type="text"
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full"
					onClick={() => navigate('/cart')}
				>
					ADD TO CART
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
							<span>
								This is the report which documents the specific characteristics of a
								diamond, issued by the GIA, which is among the most respected
								organizations in the diamond industry.
							</span>
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
								Diamond Shop is pleased to offer a lifetime diamond upgrade program
								on all certified diamonds. Simply call a Diamond & Jewelry
								Consultant at 012345678 to learn more about our upgrade program and
								to select your new diamond.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
