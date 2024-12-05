import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import LoginModal from '../../components/LogModal/LoginModal';
import {getUserId} from '../../components/GetUserId';
import {useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {GetJewelryDetailPresetSelector} from '../../redux/selectors';
import {getJewelryDetailPreset} from '../../redux/slices/jewelrySlice';

const FinishProductPage = () => {
	const userId = getUserId();
	const {id} = useParams();
	const dispatch = useDispatch();
	const jewelryDetailPreset = useSelector(GetJewelryDetailPresetSelector);
	const location = useLocation();
	const jewelryId = location.state?.jewelryId;
	const jewelryDetail = location.state?.jewelryModel;

	const [jewelry, setJewelry] = useState({});
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [diamondDetail, setDiamondDetail] = useState(
		JSON.parse(localStorage.getItem(`diamond_${userId}`)) || ''
	);

	console.log('jewelry', jewelry);

	useEffect(() => {
		dispatch(getJewelryDetailPreset(id))
			.unwrap()
			.then((res) => {
				setJewelry(res);
			});
	}, []);

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const items = [
		{
			title: 'Chọn Vỏ',
		},
		...(jewelry?.Diamonds?.length > 0 ? [{title: 'Chọn Kim Cương'}] : []),
		{
			title: 'Hoàn Thành',
		},
	];

	return (
		<div className="mx-4 md:mx-32">
			<Steps
				current={3}
				labelPlacement="horizontal"
				items={items}
				className="bg-white p-4 rounded-full my-10"
			/>
			{/* Responsive flex container */}
			<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
				{/* Left side */}
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery jewelryDetail={jewelryDetail} jewelry={jewelry} />
					<InformationLeft
						jewelryDetail={jewelryDetail}
						diamondDetail={diamondDetail}
						jewelry={jewelry}
					/>
				</div>

				{/* Right side */}
				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight
						jewelryDetail={jewelryDetail}
						diamondDetail={diamondDetail}
						setIsLoginModalVisible={setIsLoginModalVisible}
						isLoginModalVisible={isLoginModalVisible}
						userId={userId}
						jewelry={jewelry}
						jewelryId={jewelryId}
					/>
				</div>
			</div>
			{/* Login Modal */}
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
		</div>
	);
};

export default FinishProductPage;
