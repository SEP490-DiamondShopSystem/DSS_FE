import {CheckCircleFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faRing, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Rate, Select, Typography} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const {Text} = Typography;

const metalType = {
	jewelryName: 'Nhẫn Đính Hôn Petite Nouveau Six-Prong Solitaire trong Vàng Trắng 14k',
	diamondName: 'Kim Cương Tròn 1.01 Carat H-VS2 Cắt Xuất Sắc',
	price: '1.470 USD',
	priceDiscount: '1.102 USD',
	productDetail: 'Kim cương tròn 1.00 H này được bán độc quyền tại Diamond Shop.',
	ship: 'Thứ Hai, ngày 26 tháng 8',
	totalCarat: '1.01 Ct',
	carat: '1.00ct',
	clarity: 'Độ Sáng VS2',
	color: 'Màu H',
	cut: 'Rất Tốt',
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
					<p className="ml-5">477 Đánh Giá</p>
				</div>
				<div></div>
				<div className="font-semibold my-2">
					Giao hàng như kim cương lỏng vào: {metalType?.ship}
				</div>
				<div className="flex mb-2">
					<div className="font-semibold text-green cursor-pointer">
						Giao hàng miễn phí qua đêm
					</div>

					<div className="font-semibold pl-2 text-green cursor-pointer">
						Giao hàng miễn phí qua đêm
					</div>
				</div>
				<div>
					<Text strong style={{fontSize: '18px'}}>
						Nhẫn Hoàn Chỉnh:
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
							<p className="text-primary cursor-pointer">Thay Đổi Kim Cương</p>
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
							<p className="text-primary cursor-pointer">Thay Đổi Vỏ</p>
						</div>
						<div className="flex items-center">
							<p className="mr-3">Kích Cỡ Nhẫn Hiện Tại:</p>

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
							*Mã giảm giá được áp dụng tự động
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
					THÊM VÀO GIỎ
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
							Chúng tôi cam kết mang đến cho bạn trải nghiệm toàn diện, từ mua sắm đến
							giao hàng.
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
							Chúng tôi cam kết mang đến cho bạn trải nghiệm toàn diện, từ mua sắm đến
							giao hàng.
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
							Báo Cáo Đánh Giá GIA
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
							<span>Hàng Chính Hãng và Được Bảo Đảm</span>
						</div>
					</div>
				</div>
				<div className="my-4 cursor-pointer" onClick={toggleProductWarrantly}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Bảo Hành Sản Phẩm
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
							<span>Được bảo hành toàn diện, an tâm và tin cậy khi mua hàng.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
