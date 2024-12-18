import {message, Steps} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {
	GetDiamondDetailSelector,
	GetOrderWarrantySelector,
	LoadingDiamondSelector,
	UserInfoSelector,
} from '../../redux/selectors';
import {enums} from '../../utils/constant';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';
import {getDiamondDetail} from '../../redux/slices/diamondSlice';
import LoginModal from '../../components/LogModal/LoginModal';
import {getUserId} from '../../components/GetUserId';
import {getAllWarranty} from '../../redux/slices/warrantySlice';
import Loading from '../../components/Loading';

const mapAttributes = (data, attributes) => {
	return {
		DiamondId: data?.Id,
		SerialCode: data?.SerialCode,
		Carat: data?.Carat,
		Title: data?.Title,
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
		TruePrice: data.TruePrice,
		SalePrice: data.SalePrice,
		IsLabDiamond: data.IsLabDiamond,
		Criteria: data.DiamondPrice?.CriteriaId,
	};
};

const DiamondDetailPage = () => {
	const {id} = useParams();
	const location = useLocation();
	const diamondId = location.state?.diamondId;
	const userId = getUserId();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const diamondDetail = useSelector(GetDiamondDetailSelector);
	const userSelector = useSelector(UserInfoSelector);
	const warrantyList = useSelector(GetOrderWarrantySelector);
	const loading = useSelector(LoadingDiamondSelector);
	const local = JSON.parse(localStorage.getItem(`cart_${userId}`));

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [detail, setDetail] = useState({});
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [warrantyDiamond, setWarrantyDiamond] = useState([]);
	const [warrantyDiamondSelected, setWarrantyDiamondSelected] = useState('');

	useEffect(() => {
		dispatch(getAllWarranty());
	}, []);

	useEffect(() => {
		if (warrantyList) {
			setWarrantyDiamond(warrantyList?.Values?.filter((warranty) => warranty?.Type === 1));
		}
	}, [warrantyList]);

	useEffect(() => {
		if (warrantyDiamond) {
			setWarrantyDiamondSelected(warrantyDiamond[0]);
		}
	}, [warrantyDiamond]);

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

	const handleChangeWarranty = (value) => {
		if (value !== undefined) {
			const parseValue = JSON.parse(value);
			setWarrantyDiamondSelected(parseValue);
		} else {
			console.warn('Giá trị "value" là undefined, không có hành động nào được thực hiện');
		}
	};

	const handleAddToCart = () => {
		const isLoggedIn = userSelector && userSelector.UserId;

		if (!isLoggedIn) {
			message.warning('Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			setIsSidebarOpen(false);
			return;
		}

		if (
			warrantyDiamondSelected === undefined ||
			warrantyDiamondSelected === '' ||
			warrantyDiamondSelected === null
		) {
			message.warning('Bạn cần phải chọn phiếu bảo hành!');
			return;
		}

		const data = {
			...mappedDiamond,
			DiamondPrice: mappedDiamond.Price,
			warrantyDiamond: warrantyDiamondSelected,
		};

		// Lấy cart hiện tại từ localStorage
		const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

		const existingIndex = existingCart.findIndex(
			(item) =>
				item.DiamondId === mappedDiamond.DiamondId &&
				item.warrantyDiamond === warrantyDiamondSelected
		);

		if (existingIndex !== -1) {
			// Nếu sản phẩm đã tồn tại, hiện thông báo

			message.info('Sản phẩm này đã có trong giỏ hàng!');
		} else {
			// Kiểm tra nếu có cùng DiamondId nhưng các thuộc tính khác nhau
			const similarJewelryIndex = existingCart.findIndex(
				(cartItem) => cartItem.DiamondId === mappedDiamond.DiamondId
			);

			if (similarJewelryIndex !== -1) {
				// Thay thế sản phẩm cũ với các thuộc tính khác nhau
				existingCart[similarJewelryIndex] = data;
				message.success('Sản phẩm đã được cập nhật trong giỏ hàng!');
				// localStorage.setItem('warrantyDiamond', JSON.stringify(warrantyDiamondSelected));
				navigate('/cart');
			} else {
				// Thêm sản phẩm mới vào giỏ hàng
				existingCart.push(data);
				message.success('Đã thêm sản phẩm vào giỏ hàng!');
				navigate('/cart');
			}
		}

		// Lưu cart cập nhật lại vào localStorage
		localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="mx-6 md:mx-32">
					<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-full md:w-1/2 p-6">
							<ImageGallery diamondId={mappedDiamond.DiamondId} />
							<InformationLeft
								diamond={mappedDiamond}
								diamondId={mappedDiamond.DiamondId}
							/>
						</div>

						<div className="w-full md:w-1/2 p-6 md:pr-32">
							<InformationRight
								diamondChoice={diamondChoice}
								toggleSidebar={toggleSidebar}
								diamond={mappedDiamond}
								handleAddToCart={handleAddToCart}
								warrantyDiamond={warrantyDiamond}
								handleChangeWarranty={handleChangeWarranty}
								diamondId={diamondId}
								warrantyDiamondSelected={warrantyDiamondSelected}
							/>
						</div>
					</div>
					<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
				</div>
			)}
		</>
	);
};

export default DiamondDetailPage;
