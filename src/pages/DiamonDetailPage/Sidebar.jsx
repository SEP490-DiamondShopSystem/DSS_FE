import {RightOutlined} from '@ant-design/icons';
import {faGem, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import diamondImage from '../../assets/img-diamond.png';
import {addOrUpdateCartDesignDiamondItem, addOrUpdateItem} from '../../redux/slices/cartSlice';
import {UserInfoSelector} from '../../redux/selectors';
import {getUserId} from '../../components/GetUserId';

export const Sidebar = ({
	isOpen,
	toggleSidebar,
	diamond,
	setIsLoginModalVisible,
	setIsSidebarOpen,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userSelector = useSelector(UserInfoSelector);

	const userId = getUserId();

	const [link, setLink] = useState('/diamond/search');
	const [activeRcm, setActiveRcm] = useState('');
	const [active, setActive] = useState('diamond');

	const handleSelect = (url, ac, jewelry) => {
		setLink(url);
		setActive(ac);
		localStorage.setItem('jewelryType', jewelry);
	};

	console.log(diamond);

	const handleNavigate = () => {
		const isLoggedIn = userSelector && userSelector.UserId;

		if (!isLoggedIn) {
			message.warning('Bạn cần phải đăng nhập để thêm vào giỏ hàng!');
			setIsLoginModalVisible(true);
			setIsSidebarOpen(false);
			return;
		}

		const data = {
			...diamond,
			DiamondPrice: diamond.Price,
		};

		if (active === 'addToCart') {
			// Lấy cart hiện tại từ localStorage
			const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

			const existingIndex = existingCart.findIndex(
				(item) => item.DiamondId === diamond.DiamondId
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

			toggleSidebar();
		} else {
			dispatch(addOrUpdateCartDesignDiamondItem({diamond: data}));
		}

		navigate(link);
	};

	return (
		<>
			{isOpen && (
				<div
					onClick={toggleSidebar}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}

			<div
				className={`fixed top-0 right-0 h-full  bg-white transform transition-transform duration-300 ease-in-out z-50 ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
				style={{width: 550}}
			>
				<div className="mt-10">
					<div className="p-4">
						<h2 className="text-xl font-semibold">Thêm viên kim cương này vào</h2>
						<p>Chọn một trong các tùy chọn bên dưới để hoàn tất lựa chọn của bạn.</p>
					</div>
					<div>
						<div
							className={`flex border-2 ${
								active === 'ring' ? 'border-black' : 'border-white'
							} p-4 m-5 rounded-lg md:cursor-pointer`}
							onClick={() =>
								handleSelect(
									'/jewelry/design-your-own-rings/setting/all',
									'ring',
									'Nhẫn'
								)
							}
						>
							<div className="pr-5">
								<FontAwesomeIcon icon={faGem} />
							</div>
							<div>
								<p className="font-bold">Nhẫn</p>
								<span className="text-tintWhite">
									Chọn một chiếc nhẫn phù hợp với viên kim cương này.
								</span>
							</div>
						</div>
						<div
							className={`flex border-2 ${
								active === 'necklace' ? 'border-black' : 'border-white'
							} p-4 m-5 rounded-lg md:cursor-pointer`}
							onClick={() =>
								handleSelect(
									'/jewelry/design-your-own-necklaces/setting/all',
									'necklace',
									'Dây Chuyền'
								)
							}
						>
							<div className="pr-5">
								<FontAwesomeIcon icon={faGem} />
							</div>
							<div>
								<p className="font-bold">Dây chuyền</p>
								<span className="text-tintWhite">
									Khám phá và lựa chọn mặt dây chuyền cho viên kim cương của bạn.
								</span>
							</div>
						</div>
						<div
							className={`flex border-2 ${
								active === 'addToCart' ? 'border-black' : 'border-white'
							} p-4 m-5 rounded-lg md:cursor-pointer`}
							onClick={() => handleSelect(null, 'addToCart')}
						>
							<div className="pr-5">
								<FontAwesomeIcon icon={faShoppingBag} />
							</div>
							<div>
								<p className="font-bold">Thêm Vào Giỏ Hàng</p>
								<span className="text-tintWhite">
									Xem và chỉnh sửa các mục trong giỏ hàng của bạn.
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-5 absolute bottom-10" style={{width: '90%'}}>
					<Button
						onClick={handleNavigate}
						type="text"
						className=" bg-primary w-full text-lg font-semibold p-5 uppercase"
					>
						Tiếp tục
					</Button>
				</div>

				<div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={toggleSidebar}>
					<RightOutlined />
				</div>
			</div>
		</>
	);
};
