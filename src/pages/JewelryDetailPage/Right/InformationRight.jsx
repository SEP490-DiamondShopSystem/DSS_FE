import React, {useEffect, useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, message, Rate, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getUserId} from '../../../components/GetUserId';
import {GetAllReviewSelector, UserInfoSelector} from '../../../redux/selectors';
import {convertToVietnamDate, formatPrice, Rating} from '../../../utils';
import JewelryPopup from '../Popup/ProductReviews';
import {getAllJewelryModelReview} from '../../../redux/slices/reviewSlice';
import ProductReviews from '../Popup/ProductReviews';

const {Option} = Select;

export const InformationRight = ({
	selectedMetal,
	setSelectedMetal,
	diamondJewelry,
	size,
	setSize,
	setIsLoginModalVisible,
	setSelectedSideDiamond,
	selectedSideDiamond,
	filteredGroups,
	id,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const reviewList = useSelector(GetAllReviewSelector);

	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarranty, setProductWarranty] = useState(false);
	const [reviewLength, setReviewLength] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [orderBy, setOrderBy] = useState(false);

	useEffect(() => {
		dispatch(
			getAllJewelryModelReview({
				ModelId: id,
				MetalId: selectedMetal?.Id,
				OrderByOldest: orderBy,
			})
		);
	}, [id, selectedMetal, orderBy]);

	useEffect(() => {
		if (reviewList) {
			setReviewLength(reviewList?.Values?.length);
			setReviews(reviewList?.Values);
		}
	}, [reviewList]);

	const toggleDetail = () => {
		setDetail(!showDetail);
	};
	const toggleSecureShopping = () => {
		setSecureShopping(!showSecureShopping);
	};
	const toggleProductWarranty = () => {
		setProductWarranty(!showProductWarranty);
	};

	const handleSelectMetal = (metal) => {
		setSelectedMetal(metal);
		setSize(null);
		localStorage.setItem('selectedMetal', JSON.stringify(metal));
	};

	const handleSelectSideDiamond = (diamond) => {
		setSelectedSideDiamond(diamond);
		setSize(null);
		localStorage.setItem('selectedSideDiamond', JSON.stringify(diamond));
	};

	const handleChange = (value) => {
		setSize(value);
	};

	const findSize = diamondJewelry?.MetalGroups?.find(
		(metal) => metal?.Name === filteredGroups[0]?.Name
	);

	const findSizePrice = findSize?.SizeGroups?.find(
		(sizePrice) => sizePrice?.Size === Number(size)
	);

	const handleDiamondNavigate = () => {
		const jewelryModel = {
			...diamondJewelry,
			findSizePrice,
			size,
			selectedMetal,
			selectedSideDiamond,
			jewelryModelId: id,
			filteredGroups,
		};

		console.log('jewelryModel', jewelryModel);
		if (diamondJewelry?.MainDiamonds?.length > 0) {
			navigate(`/diamond-choose/search`, {state: {jewelryModel}});
		} else {
			navigate(`/jewelry-choose/search`, {state: {jewelryModel}});
		}
	};

	// Tính điểm trung bình
	const averageRating =
		reviews?.reduce((total, review) => total + review.StarRating, 0) / reviewLength || 0;

	const someSize = filteredGroups[0]?.SizeGroups?.some((size) => size?.IsInStock);

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl">
					{diamondJewelry?.Name} {selectedMetal?.Name || selectedMetal}
				</h1>

				<div className="my-5 flex">
					<Rate value={averageRating} disabled allowHalf />
					<ProductReviews
						reviewLength={reviewLength}
						reviewList={reviews}
						averageRating={averageRating}
						setOrderBy={setOrderBy}
						orderBy={orderBy}
					/>
				</div>
			</div>
			<div>
				<div className="my-5 flex items-center">
					<div className="font-semibold">Loại Kim Loại</div>
					<div className={`font-semibold text-xl pl-4 text-primary`}>
						{selectedMetal?.Name} - {formatPrice(selectedMetal?.Price)}
					</div>
				</div>
				<div>
					<div className="flex">
						{diamondJewelry?.Metals?.map((metal, i) => (
							<div
								key={i}
								className={`${
									selectedMetal?.Name === metal?.Name
										? 'border-2 border-black'
										: 'border-2 border-white'
								} my-2 py-2 px-4 rounded-lg cursor-pointer hover:bg-offWhite`}
								onClick={() => handleSelectMetal(metal)} // Save selected metal on click
							>
								<div className={`rounded-full p-1`}>{metal?.Name}</div>
							</div>
						))}
					</div>
				</div>
				{selectedSideDiamond !== null && (
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
			</div>
			<div className="border-y border-tintWhite my-5">
				{diamondJewelry && diamondJewelry.Category === 'Ring' && someSize && (
					<>
						<div className="mt-5 flex items-center">
							<div className="font-semibold">Chọn kích thước:</div>
							<div className="font-semibold text-xl pl-4 text-primary">
								<Select value={size} style={{width: 120}} onChange={handleChange}>
									{filteredGroups[0]?.SizeGroups.map(
										(size, i) =>
											size?.IsInStock === true && (
												<Option key={size?.Size} value={size?.Size}>
													<p className="font-semibold mr-2">
														{size?.Size}
													</p>
												</Option>
											)
									)}
								</Select>
							</div>
							<div>
								<p className="text-red ml-5">* Vui lòng chọn kích thước!</p>
							</div>
						</div>
						<div className="flex items-center mt-2">
							<p className="text-2xl mr-2 font-semibold">Giá Sàn:</p>
							<p className="font-semibold text-2xl my-2">
								{formatPrice(findSizePrice?.Price || 0)}
							</p>
							{/* <div className="text-sm pl-2">(Giá Sàn)</div> */}
						</div>
						{/* <div>
							<div className="text-xl pt-2 font-semibold">
								*Mã giảm giá được áp dụng tự động
							</div>
						</div> */}
					</>
				)}
			</div>

			{size !== null && selectedMetal !== null && diamondJewelry?.Category === 'Ring' && (
				<div className="flex justify-between items-center mt-5">
					<Button
						type="text"
						className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
						onClick={handleDiamondNavigate}
					>
						{diamondJewelry?.MainDiamonds.length > 0
							? 'Chọn Kim Cương'
							: 'Chọn Trang Sức'}
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
							<span>{diamondJewelry?.Model?.Category?.Description}</span>
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
