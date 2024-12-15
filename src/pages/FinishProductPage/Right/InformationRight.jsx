import {CheckCircleFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {
	faClose,
	faDiamond,
	faMinus,
	faPlus,
	faRefresh,
	faRing,
	faTruck,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Input, message, Popover, Select, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {GetOrderWarrantySelector, UserInfoSelector} from '../../../redux/selectors';
import {addToCartFinish} from '../../../redux/slices/cartSlice';
import {formatPrice, Rating} from '../../../utils';
import {getAllWarranty} from '../../../redux/slices/warrantySlice';
import DiamondIcon from '@mui/icons-material/Diamond';

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

export const InformationRight = ({
	jewelryDetail,
	diamondDetail,
	setIsLoginModalVisible,
	isLoginModalVisible,
	userId,
	jewelry,
	jewelryId,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userSelector = useSelector(UserInfoSelector);
	const warrantyList = useSelector(GetOrderWarrantySelector);

	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarrantly, setProductWarrantly] = useState(false);
	const [sizeChange, setSizeChange] = useState();
	const [warrantiesJewelry, setWarrantiesJewelry] = useState('');
	const [warrantiesJewelrySelected, setWarrantiesJewelrySelected] = useState();
	const [visible, setVisible] = useState(false);
	const [engravedText, setEngravedText] = useState(null);
	const [engravedFont, setEngravedFont] = useState(null);

	useEffect(() => {
		if (warrantiesJewelry) {
			setWarrantiesJewelrySelected(warrantiesJewelry[0]);
		}
	}, [warrantiesJewelry]);

	useEffect(() => {
		dispatch(getAllWarranty());
	}, []);

	useEffect(() => {
		if (warrantyList) {
			setWarrantiesJewelry(warrantyList?.Values?.filter((warranty) => warranty?.Type === 2));
		}
	}, [warrantyList]);

	const toggleDetail = () => {
		setDetail(!showDetail);
	};
	const toggleSecureShopping = () => {
		setSecureShopping(!showSecureShopping);
	};
	const toggleProductWarrantly = () => {
		setProductWarrantly(!showProductWarrantly);
	};

	console.log('jewelry', jewelry);

	const handleAddToCart = () => {
		if (!userId) {
			message.warning('Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			return;
		}

		if (
			warrantiesJewelrySelected === undefined ||
			warrantiesJewelrySelected === '' ||
			warrantiesJewelrySelected === null
		) {
			message.warning('Bạn cần phải chọn phiếu bảo hành!');
			return;
		}

		const diamond = jewelry?.Diamonds?.map((dia) => ({
			DiamondId: dia.Id,
			Cut: dia.Cut,
			Clarity: dia.Clarity,
			Color: dia.Color,
			Carat: dia.Carat,
			DiamondPrice: dia.TruePrice,
			DiamondShape: dia.DiamondShape,
			Title: dia.Title,
			CriteriaId: dia?.CriteriaId,
			DiamondThumbnail: dia?.Thumbnail,
		}));

		const data = {
			...jewelry,
			JewelryId: jewelry.Id,
			jewelryModelId: jewelry.ModelId,
			JewelryName: jewelry.JewelryName,
			Size: sizeChange || jewelry.Size,
			Metal: jewelry.MetalId,
			JewelryThumbnail: jewelry.Thumbnail,
			JewelryPrice: jewelry.TotalPrice,
			SerialCode: jewelry?.SerialCode,
			diamond,
			warrantyJewelry: warrantiesJewelrySelected,
			engravedFont,
			engravedText,
		};

		const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

		// Kiểm tra xem sản phẩm với JewelryId và các thuộc tính đã tồn tại chưa
		const existingIndex = existingCart.findIndex(
			(cartItem) =>
				cartItem.JewelryId === jewelry.Id &&
				cartItem.warrantyJewelry === warrantiesJewelrySelected &&
				cartItem.engravedFont === engravedFont &&
				cartItem.engravedText === engravedText &&
				cartItem.Size === (sizeChange || jewelry.Size)
		);

		if (existingIndex !== -1) {
			message.info('Sản phẩm này đã có trong giỏ hàng!');
		} else {
			// Kiểm tra nếu có cùng JewelryId nhưng các thuộc tính khác nhau
			const similarJewelryIndex = existingCart.findIndex(
				(cartItem) => cartItem.JewelryId === jewelry.Id
			);

			if (similarJewelryIndex !== -1) {
				// Thay thế sản phẩm cũ với các thuộc tính khác nhau
				existingCart[similarJewelryIndex] = data;
				message.success('Sản phẩm đã được cập nhật trong giỏ hàng!');
				navigate('/cart');
			} else {
				// Thêm sản phẩm mới vào giỏ hàng
				existingCart.push(data);
				message.success('Sản phẩm đã thêm vào giỏ hàng!');
				navigate('/cart');
			}
		}

		localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
	};

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	const onChangeWarrantyJewelry = (value) => {
		if (value !== undefined) {
			const parseValue = JSON.parse(value);
			setWarrantiesJewelrySelected(parseValue);
		} else {
			console.warn('Giá trị "value" là undefined, không có hành động nào được thực hiện');
		}
	};

	const handleEngravedTextChange = (e) => setEngravedText(e.target.value);
	const handleEngravedFontChange = (value) => setEngravedFont(value);

	const handleSubmit = () => {
		setVisible(false);
	};

	const content = (
		<div style={{width: '200px'}}>
			<label>Chữ Khắc</label>
			<Input
				placeholder="Nhập chữ khắc"
				style={{marginBottom: '10px'}}
				value={engravedText}
				onChange={handleEngravedTextChange}
			/>
			<label>Kiểu Chữ</label>
			<Select
				placeholder="Chọn kiểu chữ"
				style={{width: '100%', marginBottom: '10px'}}
				value={engravedFont}
				onChange={handleEngravedFontChange}
			>
				<Select.Option value="Lucida Sans">Lucida Sans</Select.Option>
				<Select.Option value="Pinyon Script">Pinyon Script</Select.Option>
			</Select>
			<div className="flex items-center justify-center my-2">
				<Button type="text" className="bg-primary" onClick={handleSubmit}>
					Xác Nhận
				</Button>
			</div>
		</div>
	);

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl mb-5">{jewelry?.Title}</h1>
				{/* <div className="my-5 flex">
					<Rating rating={0} />
					<p className="ml-5">477 Đánh Giá</p>
				</div> */}
				<div></div>
				{/* <div className="font-semibold my-2">Ngày Giao Hàng Dự Kiến: {metalType?.ship}</div> */}

				<div>
					<div className="mt-5">
						{jewelry?.Diamonds?.length > 0 && (
							<Text strong style={{fontSize: '18px'}}>
								Kim Cương:
							</Text>
						)}
						{jewelry &&
							jewelry?.Diamonds?.map((diamond) => (
								<div className="flex flex-wrap justify-between mb-2">
									<div className="flex w-full sm:w-auto">
										<div className="mr-3">
											<DiamondIcon />
										</div>
										<div className="flex-1">
											<div className="ml-5">
												<div className="text-ellipsis overflow-hidden">
													{diamond?.Title}
												</div>
												<div className="text-gray my-2">
													SKU: {diamond?.SerialCode}
												</div>
												<div className="text-xl font-semibold">
													{formatPrice(diamond?.TruePrice)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

						{jewelry?.SideDiamond && (
							<Text strong style={{fontSize: '18px'}}>
								Kim Cương Tấm:
							</Text>
						)}

						{jewelry?.SideDiamond && (
							<div className="flex flex-wrap justify-between mb-2">
								<div className="flex w-full sm:w-auto">
									<div className="mr-3">
										<DiamondIcon />
									</div>
									<div className="flex-1">
										<div className="ml-5">
											<div className="text-ellipsis overflow-hidden">
												{jewelry?.SideDiamond?.Carat} carat - Số lượng:{' '}
												{jewelry?.SideDiamond?.Quantity}
											</div>
											<div className="text-xl font-semibold">
												{formatPrice(jewelry?.SD_Price)}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{jewelry?.ND_Price && (
							<div className="flex flex-wrap justify-between mb-2">
								<div className="flex w-full sm:w-auto">
									<div className="mr-3">
										<FontAwesomeIcon icon={faRing} />
									</div>
									<div className="flex-1">
										<div className="ml-5">
											<div className="text-xl font-semibold">
												Giá Vỏ: {formatPrice(jewelry?.ND_Price)}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Warranty Selection */}
						<div className="flex flex-wrap justify-between mb-2">
							<div className="flex w-full sm:w-auto">
								<div className="ml-5 w-full sm:w-auto">
									<div className="flex flex-col">
										<label>Chọn Bảo Hành: </label>
										<Select
											size="large"
											style={{width: '100%'}}
											className="mt-2 mb-5"
											placeholder="Chọn bảo hành trang sức"
											onChange={onChangeWarrantyJewelry}
											value={
												warrantiesJewelrySelected?.warranty?.MappedName?.replace(
													/_/g,
													' '
												) ||
												warrantiesJewelrySelected?.MappedName?.replace(
													/_/g,
													' '
												)
											}
										>
											{warrantiesJewelry &&
												warrantiesJewelry?.map((warranty, i) => (
													<Select.Option
														key={i}
														value={JSON.stringify({
															warranty,
														})}
													>
														{warranty?.MappedName?.replace(/_/g, ' ')}
													</Select.Option>
												))}
										</Select>
									</div>
								</div>
							</div>
						</div>
					</div>

					{engravedText ? (
						<>
							<Popover
								content={content}
								title="Thêm Chữ Khắc"
								trigger="click"
								visible={visible}
								onVisibleChange={handleVisibleChange}
							>
								<div className="w-40 flex items-center">
									<span className="text-primary cursor-pointer hover:text-lightGray font-semibold mr-2 underline">
										{engravedText}
									</span>
									<span>
										<FontAwesomeIcon
											icon={faClose}
											color="red"
											onClick={() => {
												setEngravedFont('');
												setEngravedText('');
											}}
										/>
									</span>
								</div>
							</Popover>
						</>
					) : (
						<>
							<Popover
								content={content}
								title="Thêm Chữ Khắc"
								trigger="click"
								visible={visible}
								onVisibleChange={handleVisibleChange}
							>
								<div className="w-40">
									<span className="text-primary cursor-pointer hover:text-lightGray font-semibold">
										<FontAwesomeIcon icon={faPlus} color="#dec986" /> Thêm Chữ
										Khắc
									</span>
								</div>
							</Popover>
						</>
					)}
				</div>
				<div className="border-y border-tintWhite py-5 my-5">
					<div className="flex items-center">
						{/* <p className="line-through text-gray decoration-gray text-2xl">
							{metalType.price}
						</p> */}
						<p className="font-semibold text-2xl">
							{formatPrice(jewelry?.TotalPrice || 0)}
						</p>
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
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
					onClick={handleAddToCart}
				>
					{jewelryId ? 'Cập Nhật Giỏ Hàng' : 'THÊM VÀO GIỎ Hàng'}
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
