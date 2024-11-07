import {message, Steps} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {GetDiamondDetailSelector, UserInfoSelector} from '../../redux/selectors';
import {enums} from '../../utils/constant';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';
import {getDiamondDetail} from '../../redux/slices/diamondSlice';
import LoginModal from '../../components/LogModal/LoginModal';
import {getUserId} from '../../components/GetUserId';

const mapAttributes = (data, attributes) => {
	return {
		DiamondId: data.Id,
		Carat: data.Carat,
		Clarity:
			attributes.Clarity && data.Clarity !== undefined
				? Object.keys(attributes.Clarity).find(
						(key) => attributes.Clarity[key] === data.Clarity
				  ) || 'Unknown Clarity' // Thêm giá trị mặc định nếu không tìm thấy
				: '',
		Color:
			attributes.Color && data.Color !== undefined
				? Object.keys(attributes.Color).find(
						(key) => attributes.Color[key] === data.Color
				  ) || 'Unknown Color'
				: '',
		Culet:
			attributes.Culet && data.Culet !== undefined
				? Object.keys(attributes.Culet)
						.find((key) => attributes.Culet[key] === data.Culet)
						.replace('_', ' ') || 'Unknown Culet'
				: '',
		Cut:
			attributes.Cut && data.Cut !== undefined
				? Object.keys(attributes.Cut)
						.find((key) => attributes.Cut[key] === data.Cut)
						.replace('_', ' ') || 'Unknown Cut'
				: '',
		Fluorescence:
			attributes.Fluorescence && data.Fluorescence !== undefined
				? Object.keys(attributes.Fluorescence).find(
						(key) => attributes.Fluorescence[key] === data.Fluorescence
				  ) || 'Unknown Fluorescence'
				: '',
		Girdle:
			attributes.Girdle && data.Girdle !== undefined
				? Object.keys(attributes.Girdle)
						.find((key) => attributes.Girdle[key] === data.Girdle)
						.replace('_', ' ') || 'Unknown Girdle'
				: '',
		Polish:
			attributes.Polish && data.Polish !== undefined
				? Object.keys(attributes.Polish)
						.find((key) => attributes.Polish[key] === data.Polish)
						.replace('_', ' ') || 'Unknown Polish'
				: '',
		Symmetry:
			attributes.Symmetry && data.Symmetry !== undefined
				? Object.keys(attributes.Symmetry)
						.find((key) => attributes.Symmetry[key] === data.Symmetry)
						.replace('_', ' ') || 'Unknown Symmetry'
				: '',
		Depth: data.Depth,
		Table: data.Table,
		Measurement: data.Measurement,
		DiamondShape: data.DiamondShape?.ShapeName,
		Price: data.DiamondPrice?.Price,
		IsLabDiamond: data.IsLabDiamond,
		Criteria: data.DiamondPrice?.CriteriaId,
	};
};

const items = [
	{
		title: 'Chọn Vỏ',
	},
	{
		title: 'Chọn Kim Cương',
	},
	{
		title: 'Hoàn Thành',
	},
];

const DiamondDetailPage = () => {
	const {id} = useParams();
	const userId = getUserId();
	// const diamondAttributes = useSelector(GetDiamondAttributesSelector);
	const diamondDetail = useSelector(GetDiamondDetailSelector);
	const userSelector = useSelector(UserInfoSelector);
	const dispatch = useDispatch();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [detail, setDetail] = useState({});
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

	useEffect(() => {
		dispatch(getDiamondDetail(id));
	}, [dispatch]);

	useEffect(() => {
		if (diamondDetail) {
			setDetail(diamondDetail);
		}
	}, [diamondDetail]);

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const mappedDiamond = mapAttributes(detail, enums);

	const handleAddToCart = () => {
		const isLoggedIn = userSelector && userSelector.UserId;

		if (!isLoggedIn) {
			message.warning('Bạn cần phải đăng nhập để thêm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			setIsSidebarOpen(false);
			return;
		}

		const data = {
			...mappedDiamond,
			DiamondPrice: mappedDiamond.Price,
		};

		// Lấy cart hiện tại từ localStorage
		const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

		const existingIndex = existingCart.findIndex(
			(item) => item.DiamondId === mappedDiamond.DiamondId
		);

		if (existingIndex !== -1) {
			// Nếu sản phẩm đã tồn tại, hiện thông báo
			message.info('Sản phẩm này đã có trong giỏ hàng!');
		} else {
			// Nếu không tồn tại, thêm sản phẩm mới vào giỏ hàng thiết kế
			existingCart.push(data);
			message.success('Sản phẩm đã được thêm vào giỏ hàng!');
		}

		// Lưu cart cập nhật lại vào localStorage
		localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
	};

	console.log('diamondDetail', diamondDetail);
	console.log('detail', detail);
	console.log('mappedDiamond', mappedDiamond);
	console.log('diamondChoice', diamondChoice);

	return (
		<>
			<div className="mx-6 md:mx-32">
				{diamondChoice.length === 0 && (
					<Steps
						current={1}
						percent={100}
						labelPlacement="horizontal"
						items={items}
						className="bg-white p-4 rounded-full mt-10"
					/>
				)}

				{diamondChoice.length > 0 && (
					<Sidebar
						isOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
						toggleSidebar={toggleSidebar}
						diamond={mappedDiamond}
						isLoginModalVisible={isLoginModalVisible}
						setIsLoginModalVisible={setIsLoginModalVisible}
					/>
				)}

				<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
					<div className="w-full md:w-1/2 p-6">
						<ImageGallery />
						<InformationLeft diamond={mappedDiamond} />
					</div>

					<div className="w-full md:w-1/2 p-6 md:pr-32">
						<InformationRight
							diamondChoice={diamondChoice}
							toggleSidebar={toggleSidebar}
							diamond={mappedDiamond}
							handleAddToCart={handleAddToCart}
						/>
					</div>
				</div>
				<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
			</div>
		</>
	);
};

export default DiamondDetailPage;
