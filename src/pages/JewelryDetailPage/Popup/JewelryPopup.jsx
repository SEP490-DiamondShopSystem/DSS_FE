import React, {useEffect, useState} from 'react';
import {Modal, Button, Card, Row, Col, Divider, message, Slider, Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJewelry} from '../../../redux/slices/jewelrySlice';
import {GetAllJewelrySelector} from '../../../redux/selectors';

const fakeJewelryList = [
	{
		id: 1,
		name: 'Engagement Ring (Completed)',
		description: 'French Pavé Diamond Engagement Ring in 14k White Gold (1/4 ct. tw.)',
		sku: '5103456',
		sizeOptions: [5, 6, 7, 8, 9],
		diamondDetails: '1.02 Carat H&A Excellent Cut Round Diamond',
		price: 1512,
		originalPrice: 1979,
		thumbnail: 'https://via.placeholder.com/100',
	},
	{
		id: 2,
		name: 'Classic Solitaire Ring',
		description: 'Classic Solitaire Diamond Ring in 18k Yellow Gold (1/3 ct. tw.)',
		sku: '6103457',
		sizeOptions: [5, 6, 7, 8],
		diamondDetails: '1.50 Carat Excellent Cut Round Diamond',
		price: 1899,
		originalPrice: 2399,
		thumbnail: 'https://via.placeholder.com/100',
	},
	// Add more fake items as needed
];

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
	const [jewelries, setJewelries] = useState(fakeJewelryList);
	const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
	const [isSliderVisible, setIsSliderVisible] = useState(false);
	const [priceRange, setPriceRange] = useState([0, 5000]); // Min and Max price range
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(5000);

	console.log('minPrice', minPrice);
	console.log('maxPrice', maxPrice);

	useEffect(() => {
		dispatch(
			getAllJewelry({
				ModelId: id,
				MetalId: selectedMetal?.Id,
				SizeId: size,
				SideDiamondOptId: selectedSideDiamond?.Id,
			})
		);
	}, [id, selectedMetal, size, selectedSideDiamond]);

	const handleOk = () => {
		if (!userId) {
			message.warning('Bạn cần phải đăng nhập để thêm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			return;
		}

		const data = {
			...diamondJewelry,
			JewelryId: diamondJewelry.Id,
			JewelryName: diamondJewelry.Name,
			JewelryPrice: diamondJewelry.Price,
			JewelryThumbnail: diamondJewelry.Thumbnail,
		};

		const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

		const existingIndex = existingCart.findIndex(
			(item) => item.JewelryId === diamondJewelry.Id
		);

		if (existingIndex !== -1) {
			message.info('Sản phẩm này đã có trong giỏ hàng!');
		} else {
			existingCart.push(data);
			message.success('Sản phẩm đã được thêm vào giỏ hàng!');
		}

		localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
		setIsModalVisible(false);
	};

	const handlePriceChange = (value) => {
		setPriceRange(value);
		setMinPrice(value[0]);
		setMaxPrice(value[1]);

		// Filter jewelryList based on the selected price range
		const filteredList = fakeJewelryList.filter(
			(item) => item.price >= value[0] && item.price <= value[1]
		);
		setJewelries(filteredList);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const addToCompare = (item) => {
		if (compareList.length >= 2) {
			message.warning('Chỉ có thể so sánh tối đa 2 sản phẩm.');
			return;
		}

		if (!compareList.find((jewelry) => jewelry.id === item.id)) {
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

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Hiển Thị Trang Sức Có Sẵn
			</Button>
			<Modal
				title="Trang Sức Có Sẵn"
				visible={isModalVisible}
				onCancel={handleCancel}
				width={1200}
				footer={null}
			>
				<Row justify="space-between">
					<Col span={12}>
						<h1>Trang Sức</h1>
					</Col>
					<Col span={12} style={{textAlign: 'right'}}>
						<Button onClick={toggleSlider}>Lọc Theo Giá</Button>
					</Col>
				</Row>
				{isSliderVisible && (
					<div style={{padding: '10px 20px'}}>
						<h4>Select Price Range:</h4>
						<Slider
							range
							min={0}
							max={5000}
							step={50}
							value={priceRange}
							onChange={handlePriceChange}
							marks={{
								0: '$0',
								1000: '$1000',
								2500: '$2500',
								5000: '$5000',
							}}
						/>
						<p>
							Selected Range: ${minPrice} - ${maxPrice}
						</p>
					</div>
				)}
				<Divider />
				{jewelries.map((item) => (
					<Card key={item.id} style={{marginBottom: 16}}>
						<Row>
							<Col span={6} className="flex items-center justify-center">
								<Image
									src={item.thumbnail}
									alt="Jewelry"
									style={{width: '100%'}}
									preview={false}
								/>
							</Col>
							<Col span={18}>
								<h3>{item.name}</h3>
								<p>{item.description}</p>
								<p>SKU: {item.sku}</p>
								<p>Size: {item.sizeOptions.join(', ')}</p>
								<p>{item.diamondDetails}</p>
								<Row justify="space-between" align="middle">
									<Col>
										<p style={{textDecoration: 'line-through', color: '#999'}}>
											${item.originalPrice}
										</p>
										<p style={{fontWeight: 'bold', fontSize: '18px'}}>
											${item.price}
										</p>
									</Col>
									<Col>
										<Button type="link" onClick={() => addToCompare(item)}>
											So Sánh
										</Button>
										<Button type="primary">Thêm Vào Giỏ</Button>
									</Col>
								</Row>
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
				title="Compare Jewelry"
				visible={isCompareModalVisible}
				onCancel={closeCompareModal}
				footer={null}
				width={1000}
			>
				<Row>
					{compareList.map((item) => (
						<Col span={12} key={item.id}>
							<Card>
								<div className="flex justify-center items-center my-5">
									<img
										src={item.thumbnail}
										alt="Jewelry"
										style={{width: '60%'}}
									/>
								</div>
								<h3>{item.name}</h3>
								<p>{item.description}</p>
								<p>SKU: {item.sku}</p>
								<p>Size Options: {item.sizeOptions.join(', ')}</p>
								<p>{item.diamondDetails}</p>
								<p>
									Price: <span style={{fontWeight: 'bold'}}>${item.price}</span>
								</p>
							</Card>
						</Col>
					))}
				</Row>
			</Modal>
		</>
	);
};

export default JewelryPopup;
