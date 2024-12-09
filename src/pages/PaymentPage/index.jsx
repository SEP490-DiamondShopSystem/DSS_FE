import React, {useMemo, useState} from 'react';

import {Button, Card, Col, Divider, Image, List, QRCode, Row, Space, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {formatPrice} from '../../utils';
import styles from './PaymentPage.module.css';
import {Popup} from './Popup/Popup';
import logo from '../../assets/logo-short-ex.png';
import {GetCartSelector} from '../../redux/selectors';
import {enums} from '../../utils/constant';
import {BankOutlined, MessageOutlined, UserOutlined} from '@ant-design/icons';

const {Title} = Typography;

const getEnumKey = (enumObj, value) => {
	return enumObj
		? Object.keys(enumObj)
				.find((key) => enumObj[key] === value)
				?.replace('_', ' ')
		: '';
};

const mapAttributes = (data, attributes) => {
	return {
		Id: data.CartProductId,
		DiscountId: data.DiscountId,
		DiscountPercent: data.DiscountPercent,
		EngravedFont: data.EngravedFont,
		EngravedText: data.EngravedText,
		ErrorMessage: data.ErrorMessage,
		GiftAssignedId: data.GiftAssignedId,
		IsAvailable: data.IsAvailable,
		IsGift: data.IsGift,
		IsHavingDiscount: data.IsHavingDiscount,
		IsHavingPromotion: data.IsHavingPromotion,
		IsProduct: data.IsProduct,
		IsReqirement: data.IsReqirement,
		IsValid: data.IsValid,
		JewelryId: data?.Jewelry?.Id,
		Diamonds: data?.Jewelry?.Diamonds,
		IsPreset: data?.Jewelry?.IsPreset,
		IsSold: data?.Jewelry?.IsSold,
		IsAwaiting: data?.Jewelry?.IsAwaiting,
		MetalId: data?.Jewelry?.MetalId,
		MetalName: data?.Jewelry?.Metal?.Name,
		MetalPrice: data?.Jewelry?.Metal?.Price,
		Model: data?.Jewelry?.Model,
		ModelId: data?.Jewelry?.ModelId,
		JewelryPrice: data?.Jewelry?.TotalPrice,
		JewelryName: data?.Jewelry?.Name,
		SerialCode: data?.Jewelry?.SerialCode,
		ShippingDate: data?.Jewelry?.ShippingDate,
		SideDiamonds: data?.Jewelry?.SideDiamonds,
		SizeId: data?.Jewelry?.SizeId,
		Weight: data?.Jewelry?.Weight,
		JewelryModel: data.JewelryModel,
		PromotionId: data.PromotionId,
		RequirementQualifedId: data.RequirementQualifedId,
		Carat: data?.Diamond?.Carat || null,
		CategoryName: data?.Jewelry?.Model?.Category?.Name || null,

		// Using the helper function to map diamond attributes
		Clarity: getEnumKey(attributes.Clarity, data?.Diamond?.Clarity),
		Color: getEnumKey(attributes.Color, data?.Diamond?.Color),
		Culet: getEnumKey(attributes.Culet, data?.Diamond?.Culet),
		Cut: getEnumKey(attributes.Cut, data?.Diamond?.Cut),
		Fluorescence: getEnumKey(attributes.Fluorescence, data?.Diamond?.Fluorescence),
		Girdle: getEnumKey(attributes.Girdle, data?.Diamond?.Girdle),
		Symmetry: getEnumKey(attributes.Symmetry, data?.Diamond?.Symmetry),
		Polish: getEnumKey(attributes.Polish, data?.Diamond?.Polish),

		Depth: data?.Diamond?.Depth,
		Table: data?.Diamond?.Table,
		Measurement: data?.Diamond?.Measurement,
		DiamondShapeId: data?.Diamond?.DiamondShapeId,
		DiamondShape: data?.Diamond?.DiamondShape?.ShapeName,
		DiscountPrice: data?.Diamond?.DiscountPrice,
		DiamondTruePrice: data?.Diamond?.TruePrice,
		DiamondPriceOffset: data?.Diamond?.PriceOffset,
		IsLabDiamond: data?.IsLabDiamond,
		DiamondThumbnail: data?.Diamond?.Thumbnail,
		CriteriaId: data?.Diamond?.DiamondPrice?.CriteriaId,
	};
};

const PaymentPage = () => {
	const cartList = useSelector(GetCartSelector);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const jewelryOrDiamondProducts = cartList?.Products.filter(
		(product) => product.Jewelry || product.Diamond
	);

	const mappedProducts = useMemo(() => {
		if (jewelryOrDiamondProducts && enums) {
			return jewelryOrDiamondProducts.map((product) => mapAttributes(product, enums));
		}
		return [];
	}, [jewelryOrDiamondProducts, enums]);

	const handlePayment = () => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="my-10 mx-20 shadow-xl rounded">
			<div className="flex justify-center items-center">
				<Title level={1}>Trang Thanh Toán</Title>
			</div>
			<div className={styles['payment-container']}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						// maxWidth: '2000px',
						width: '100%',
					}}
				>
					<div style={{flex: 2.5}}>
						<div style={{marginBottom: '40px'}}>
							<Title level={3} style={{textAlign: 'center'}}>
								Mặt Hàng
							</Title>
							<div className="space-y-6">
								{mappedProducts?.map((item, index) => (
									<div
										className="flex mt-4 shadow-xl p-5 rounded-lg"
										key={item.Id}
									>
										<div className="mr-4 flex-shrink-0">
											<img
												src="path-to-image"
												alt={item?.JewelryName || 'Loose Diamond'}
												className="w-32 h-32 object-cover rounded-lg border"
											/>
										</div>
										<div className="flex-1 mx-5">
											{/* Kiểm tra và hiển thị thông tin sản phẩm */}
											{item.JewelryId ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item.JewelryName}
													</p>
													<p className="text-gray-700 text-sm py-3">
														Giá:
														<span className="text-gray-900 font-semibold">
															{formatPrice(item.JewelryPrice)}
														</span>
													</p>
													{item.CategoryName === 'Ring' && (
														<div className="flex items-center mt-2">
															<label className="mr-2 text-gray-700">
																Kích thước nhẫn:
															</label>
															<p>{item?.SizeId}</p>
														</div>
													)}
												</div>
											) : item.Carat ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item?.Carat}ct {item.Color}-{item.Clarity}{' '}
														{item.Cut} {item.ShapeName}
													</p>
													<p className="text-gray-700 text-sm">
														Giá:
														<span className="text-gray-900 font-semibold py-3">
															{formatPrice(item.DiamondTruePrice)}
														</span>
													</p>
												</div>
											) : (
												<p className="text-gray-800">Không có thông tin</p>
											)}
										</div>
									</div>
								))}
							</div>
							<Divider />
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								<span style={{marginRight: '8px'}}>Tổng Cộng:</span>
								<span style={{fontWeight: 'bold'}}>
									{formatPrice(cartList?.OrderPrices?.FinalPrice)}
								</span>
							</div>
						</div>
					</div>

					<Card
						title="Thông Tin Thanh Toán"
						bordered={false}
						className={styles.paymentCard}
						headStyle={{
							textAlign: 'center',
							fontSize: '1.5rem',
							fontWeight: 'bold',
						}}
					>
						<Row gutter={16}>
							{/* QR Code Section */}
							<Col span={12} className="text-center">
								<QRCode
									value="https://ant.design/components/qrcode/"
									icon={logo}
									size={160}
									className="mx-auto"
								/>
								<p style={{marginTop: '10px', fontSize: '0.9rem', color: '#555'}}>
									Quét mã QR để thanh toán nhanh chóng
								</p>
							</Col>

							{/* Bank Transfer Info Section */}
							<Col span={12}>
								<Space direction="vertical" size="middle" style={{width: '100%'}}>
									<div>
										<BankOutlined className={styles.icon} />
										<span className={styles.infoLabel}>Ngân Hàng:</span>
										<span className={styles.infoText}>Vietcombank</span>
									</div>
									<div>
										<UserOutlined className={styles.icon} />
										<span className={styles.infoLabel}>Tên Người Nhận:</span>
										<span className={styles.infoText}>Diamond Shop</span>
									</div>
									<div>
										<BankOutlined className={styles.icon} />
										<span className={styles.infoLabel}>Số Tài Khoản:</span>
										<span className={styles.infoText}>41111111111111</span>
									</div>
									<div>
										<MessageOutlined className={styles.icon} />
										<span className={styles.infoLabel}>Tin nhắn:</span>
										<span className={styles.infoText}>Thanh Toán Đơn Hàng</span>
									</div>
								</Space>
							</Col>
						</Row>
					</Card>
				</div>
				<div style={{textAlign: 'right', marginTop: '20px', width: '100%'}}>
					<Button type="text" className="bg-primary" size="large" onClick={handlePayment}>
						Kiểm Tra
					</Button>
				</div>

				<Popup closeModal={closeModal} isModalVisible={isModalVisible} />
			</div>
		</div>
	);
};

export default PaymentPage;
