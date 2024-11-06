import React, {useEffect, useState} from 'react';

import {Button, Card, Col, Divider, Image, message, Modal, Row, Slider} from 'antd';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllJewelrySelector} from '../../../redux/selectors';
import {getAllJewelry} from '../../../redux/slices/jewelrySlice';
import {formatPrice} from '../../../utils';

const JewelryPopup = ({
	showModal,
	isModalVisible,
	setIsModalVisible,
	userId,
	setIsLoginModalVisible,
	diamondJewelry,
	size,
	selectedMetal,
	selectedSideDiamond,
	id,
}) => {
	const dispatch = useDispatch();
	const jewelryList = useSelector(GetAllJewelrySelector);

	const [compareList, setCompareList] = useState([]);
	const [jewelries, setJewelries] = useState([]);
	const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
	const [isSliderVisible, setIsSliderVisible] = useState(false);
	const [priceRange, setPriceRange] = useState([0, 40000000000]); // Min and Max price range
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40000000000);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelry({
				ModelId: 'c0530ffb-f954-41c9-8793-650478e43546',
				MetalId: '3',
				SizeId: '8',
				SideDiamondOptId: selectedSideDiamond?.Id,
				// ModelId: id,
				// MetalId: selectedMetal?.Id,
				// SizeId: size,
				// SideDiamondOptId: selectedSideDiamond?.Id,
				MinPrice: minPrice,
				MaxPrice: maxPrice,
			})
		);
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [id, selectedMetal, size, selectedSideDiamond, minPrice, maxPrice]);

	useEffect(() => {
		if (jewelryList) {
			setJewelries(jewelryList?.Values);
		}
	}, [jewelryList]);

	const handleOk = (item) => {
		if (!userId) {
			message.warning('Bạn cần phải đăng nhập để thêm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			return;
		}

		const data = {
			...item,
			JewelryId: item.Id,
			JewelryName: item.Name,
			JewelryPrice: item.TotalPrice,
			JewelryThumbnail: item.Thumbnail,
		};

		const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
		const existingIndex = existingCart.findIndex((cartItem) => cartItem.JewelryId === item.Id);

		if (existingIndex !== -1) {
			message.info('Sản phẩm này đã có trong giỏ hàng!');
		} else {
			existingCart.push(data);
			message.success('Sản phẩm đã được thêm vào giỏ hàng!');
		}

		localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
	};

	const handlePriceChange = (value) => {
		setPriceRange(value);
		setMinPrice(value[0]);
		setMaxPrice(value[1]);

		// Filter jewelryList based on the selected price range
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const addToCompare = (item) => {
		if (compareList.length >= 2) {
			message.warning('Chỉ có thể so sánh tối đa 2 sản phẩm.');
			return;
		}

		if (!compareList.find((jewelry) => jewelry.Id === item.Id)) {
			setCompareList([...compareList, item]);
			message.success('Sản phẩm đã được thêm vào danh sách so sánh!');
		} else {
			message.info('Sản phẩm đã có trong danh sách so sánh.');
		}
	};

	const openCompareModal = () => {
		setIsCompareModalVisible(true);
	};

	const closeCompareModal = () => {
		setIsCompareModalVisible(false);
		setCompareList([]);
	};

	const toggleSlider = () => {
		setIsSliderVisible(!isSliderVisible);
	};

	console.log('jewelry', jewelries);

	return (
		<>
			<Modal
				title="Trang Sức Có Sẵn"
				visible={isModalVisible}
				onCancel={handleCancel}
				width={1200}
				footer={null}
			>
				<Row>
					{/* <Col span={12}>
						<h1 className="font-semibold text-xl">Trang Sức Có Sẵn</h1>
					</Col> */}
					<Col span={24} style={{textAlign: 'right'}}>
						<Button onClick={toggleSlider}>Lọc Theo Giá</Button>
					</Col>
				</Row>{' '}
				<Row>
					<Col span={14}></Col>
					<Col span={10} style={{textAlign: 'right'}}>
						{isSliderVisible && (
							<div style={{padding: '10px 20px'}}>
								<Slider
									range
									min={0}
									max={40000000000}
									step={50}
									value={priceRange}
									onChange={handlePriceChange}
									marks={{
										0: `${formatPrice(0)}`,
										10000000: `${formatPrice(10000000)}`,
										20000000: `${formatPrice(20000000)}`,
										40000000000: `${formatPrice(40000000000)}`,
									}}
								/>
								<p className="font-semibold text-lg">
									Giá: {formatPrice(minPrice)} -{formatPrice(maxPrice)}
								</p>
							</div>
						)}
					</Col>
				</Row>
				<Divider />
				{jewelries &&
					jewelries.map((item) => (
						<Card key={item?.Id} style={{marginBottom: 16}}>
							<Row>
								<Col span={6} className="flex items-center justify-center">
									<Image
										src={item?.Thumbnail}
										alt="Jewelry"
										style={{width: '100%'}}
										preview={false}
									/>
								</Col>

								<Col span={18}>
									<div className="flex items-center justify-around">
										<div>
											<div className="flex items-center font-semibold text-lg">
												<h3 className="mr-2">{item?.SerialCode}</h3>
												<p>{item?.Metal?.Name}</p>
											</div>
											<p>SKU: {item?.SerialCode}</p>
											{/* <p>Kích Thước: {item?.SizeId}</p> */}

											<div className="flex items-center mb-5">
												{/* <p
													style={{
														textDecoration: 'line-through',
														color: '#999',
													}}
													className="mr-5"
												>
													{formatPrice(item?.D_Price)}
												</p> */}
												<p style={{fontWeight: 'bold', fontSize: '16px'}}>
													Giá: {formatPrice(item?.ND_Price)}
												</p>
											</div>
											{item?.Diamonds?.map((diamond) => (
												<div>
													<div className="flex items-center">
														<h3 className="mr-5 font-semibold text-lg">
															{diamond?.Title}
														</h3>
													</div>
													<p>SKU: </p>
													<p
														style={{
															fontWeight: 'bold',
															fontSize: '16px',
														}}
													>
														Giá: {formatPrice(item?.D_Price)}
													</p>
												</div>
											))}
											<div className="flex items-center justify-end mt-10">
												<p
													style={{
														fontWeight: 'bold',
														fontSize: '16px',
													}}
												>
													Tổng Giá: {formatPrice(item?.TotalPrice)}
												</p>
											</div>
										</div>

										<Col>
											<Button
												type="link"
												className="text-primary font-semibold"
												onClick={() => addToCompare(item)}
											>
												So Sánh
											</Button>
											<Button
												type="text"
												className="bg-primary font-semibold"
												onClick={() => handleOk(item)}
											>
												Thêm Vào Giỏ
											</Button>
										</Col>
									</div>
								</Col>
							</Row>
						</Card>
					))}
				<Button type="default" block style={{marginTop: 16}}>
					Xem Thêm
				</Button>
				{compareList.length === 2 && (
					<Button type="primary" block style={{marginTop: 16}} onClick={openCompareModal}>
						So Sánh Sản Phẩm Đã Chọn
					</Button>
				)}
			</Modal>

			{/* Compare Modal */}
			<Modal
				title="So Sánh Trang Sức"
				visible={isCompareModalVisible}
				onCancel={closeCompareModal}
				footer={null}
				width={1000}
			>
				<Row>
					{compareList.map((item) => (
						<Col span={12} key={item.id}>
							<Card>
								<div className="flex items-center justify-around">
									<div>
										<div className="flex items-center font-semibold text-lg">
											<h3 className="mr-2">{item?.SerialCode}</h3>
											<p>{item?.Metal?.Name}</p>
										</div>
										<p>SKU: {item?.SerialCode}</p>
										{/* <p>Kích Thước: {item?.SizeId}</p> */}

										<div className="flex items-center mb-5">
											{/* <p
													style={{
														textDecoration: 'line-through',
														color: '#999',
													}}
													className="mr-5"
												>
													{formatPrice(item?.D_Price)}
												</p> */}
											<p style={{fontWeight: 'bold', fontSize: '16px'}}>
												Giá: {formatPrice(item?.ND_Price)}
											</p>
										</div>
										{item?.Diamonds?.map((diamond) => (
											<div>
												<div className="flex items-center">
													<h3 className="mr-5 font-semibold text-lg">
														{diamond?.Title}
													</h3>
												</div>
												<p>SKU: </p>
												<p
													style={{
														fontWeight: 'bold',
														fontSize: '16px',
													}}
												>
													Giá: {formatPrice(item?.D_Price)}
												</p>
											</div>
										))}
										<div className="flex items-center justify-end mt-10">
											<p
												style={{
													fontWeight: 'bold',
													fontSize: '16px',
												}}
											>
												Tổng Giá: {formatPrice(item?.TotalPrice)}
											</p>
										</div>
									</div>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</Modal>
		</>
	);
};

export default JewelryPopup;
