import {Button, Divider, Image, List, QRCode, Typography} from 'antd';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {formatPrice} from '../../utils';
import styles from './PaymentPage.module.css';
import {Popup} from './Popup/Popup';

const {Title} = Typography;

const PaymentPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const cartItems = [
		{
			id: 1,
			imageURL: 'https://example.com/image1.jpg',
			title: 'Item 1',
			price: 200000,
		},
		{
			id: 2,
			imageURL: 'https://example.com/image2.jpg',
			title: 'Item 2',
			price: 150000,
		},
	];

	// Calculate total price
	const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

	const handlePayment = () => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	return (
		<div>
			<Title level={1}>Trang Thanh Toán</Title>
			<div className={styles['payment-container']}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						maxWidth: '2000px',
						width: '100%',
					}}
				>
					<div style={{flex: 2.5}}>
						<div style={{marginBottom: '40px'}}>
							<Title level={3} style={{textAlign: 'center'}}>
								Shopping Cart
							</Title>
							<List
								size="default"
								bordered
								dataSource={cartItems}
								renderItem={(item) => (
									<List.Item
										style={{display: 'flex', justifyContent: 'space-between'}}
									>
										<Image
											style={{
												width: 100,
												height: 100,
												objectFit: 'cover',
												marginRight: 20,
											}}
											src={item.imageURL}
										/>
										<div>{item.title}</div>
										<span>{formatPrice(item.price)}</span>
									</List.Item>
								)}
							/>
							<Divider />
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								<span style={{marginRight: '8px'}}>Total Price:</span>
								<span style={{fontWeight: 'bold'}}>{formatPrice(totalPrice)}</span>
							</div>
						</div>
					</div>

					<div style={{flex: 1.5}}>
						<div style={{marginBottom: '40px'}}>
							<Title level={3} style={{textAlign: 'center'}}>
								Thông Tin Thanh Toán
							</Title>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
									textAlign: 'center',
								}}
							>
								<div style={{marginTop: 30, textAlign: 'center'}}>
									<QRCode value="https://ant.design/components/qrcode/" />
								</div>
								<div className={styles.transferInfo}>
									<Title level={4}>Bank Transfer Information:</Title>
									<p>
										<b>Bank:</b> Vietcombank
									</p>
									<p>
										<b>Account Number:</b> 123456789
									</p>
									<p>
										<b>Account Holder:</b> Vo Tan Tai
									</p>
									<p>
										<b>Message:</b> Payment for the order
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{textAlign: 'right', marginTop: '20px', width: '100%'}}>
					<Button type="primary" size="large" onClick={handlePayment}>
						Payment
					</Button>
				</div>

				<Popup closeModal={closeModal} isModalVisible={isModalVisible} />
			</div>
		</div>
	);
};

export default PaymentPage;
