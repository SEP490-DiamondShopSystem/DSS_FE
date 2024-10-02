import {ArrowLeftOutlined, RightOutlined} from '@ant-design/icons';
import {faGem, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Image} from 'antd';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import diamondImage from '../../assets/img-diamond.png';

const shapes = [
	{
		name: 'Round',
		logo: '',

		options: [
			{metal: '1.53 Carat F VS2', price: '$14,040', image: diamondImage},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: diamondImage},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: diamondImage},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
		],
	},
	{
		name: 'Princess',
		logo: '',

		options: [
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
			{metal: '1.53 Carat F VS2', price: '$14,040', image: ''},
		],
	},
];

export const Sidebar = ({isOpen, toggleSidebar}) => {
	const navigate = useNavigate();
	const [link, setLink] = useState('/diamond/search');
	const [activeRcm, setActiveRcm] = useState('');
	const [active, setActive] = useState('diamond');
	const [shapeActive, setShapeActive] = useState();
	const [selectedImage, setSelectedImage] = useState('');
	const [jewelryChoice, setJewelryChoice] = useState(localStorage.getItem('jewelryChoice') || '');

	useEffect(() => {
		if (shapes.length > 0) {
			setShapeActive(shapes[0].name);
			setSelectedImage(shapes[0].options[0].image);
		}
	}, [shapes]);

	const handleSelect = (url, ac) => {
		setLink(url);
		setActive(ac);
	};

	const handleSelectDiamondRcm = (ac) => {
		setActiveRcm(ac);
	};

	const handleSelectShapeClick = (shape) => {
		setShapeActive(shape);
	};

	const handleSelectOptionClick = (option) => {
		setSelectedImage(option.image);
	};

	const currentShape = shapes.find((shape) => shape.name === shapeActive);

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
				{activeRcm === 'diamondRcm' ? (
					<>
						<div className="mx-5">
							<Button
								type="text"
								className="my-10 bg-primary"
								onClick={() => setActiveRcm('')}
							>
								<ArrowLeftOutlined />
								Quay lại
							</Button>
							<div className="">
								<h1 className="text-3xl font-semibold">
									Kim Cương Được Khuyến Nghị
								</h1>
								<p className="">
									Các viên kim cương này đã được chọn lựa kỹ càng cho nhẫn của
									bạn. Đây là những lựa chọn tốt nhất cho thiết lập của bạn dựa
									trên giá và đặc điểm kim cương.
								</p>
							</div>
							<div className="my-5">
								<div
									className="flex items-center"
									style={{
										overflowX: 'auto',
									}}
								>
									{shapes?.map((shape, i) => (
										<Button
											type="text"
											key={i}
											className={`px-8 py-2 rounded-lg my-5 md:cursor-pointer ${
												shapeActive === shape.name
													? 'bg-primary'
													: 'bg-lightGray'
											} mr-3`}
											onClick={() => handleSelectShapeClick(shape.name)}
										>
											<p>{shape.name}</p>
										</Button>
									))}
								</div>
								<div className="mx-5 overflow-y-auto">
									{currentShape && (
										<>
											<div className="flex justify-center w-full h-full my-5">
												<Image
													preview={false}
													src={selectedImage || diamondImage}
													className=""
												/>
											</div>
											<div
												className="mx-8 overflow-y-auto"
												style={{maxHeight: '20vh'}}
											>
												{currentShape.options?.map((option, i) => (
													<div
														key={i}
														className="w-full flex justify-between items-center cursor-pointer"
														onClick={() =>
															handleSelectOptionClick(option)
														} // update image on click
													>
														<span>{option.metal}</span>
														<p>{option.price}</p>
													</div>
												))}
											</div>
										</>
									)}
								</div>
							</div>
							<div className=" bottom-10" style={{width: '100%'}}>
								<Button
									onClick={
										link === '' ? () => navigate(link) : handleSelectDiamondRcm
									}
									type="text"
									className=" bg-primary w-full text-lg font-semibold p-5"
								>
									THÊM KIM CƯƠNG NÀY
								</Button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="mt-10">
							<div className="p-4">
								<h2 className="text-xl font-semibold">
									Thêm một trong các tùy chọn dưới đây để hoàn thành thiết lập của
									bạn
								</h2>
								<p>Chọn một viên kim cương để hoàn thành nhẫn của bạn.</p>
							</div>
							<div>
								<div
									className={`flex border-2 ${
										active === 'diamond' ? 'border-black' : 'border-white'
									} p-4 m-5 rounded-lg md:cursor-pointer`}
									onClick={() => handleSelect('/diamond/search', 'diamond')}
								>
									<div className="pr-5">
										<FontAwesomeIcon icon={faGem} />
									</div>
									<div>
										<p className="font-bold">Kim Cương</p>
										<span className="text-tintWhite">
											Khám phá và chọn lựa kim cương khác cho thiết lập của
											bạn.
										</span>
									</div>
								</div>
								<div
									className={`flex border-2 ${
										active === 'diamond_rcm' ? 'border-black' : 'border-white'
									} p-4 m-5 rounded-lg md:cursor-pointer`}
									onClick={() => handleSelect('', 'diamond_rcm')}
								>
									<div className="pr-5">
										<FontAwesomeIcon icon={faGem} />
									</div>
									<div>
										<p className="font-bold">Kim Cương Khuyến Nghị</p>
										<span className="text-tintWhite">
											Khám phá các viên kim cương đã được chọn lọc kỹ càng cho
											nhẫn của bạn.
										</span>
									</div>
								</div>
								{jewelryChoice && jewelryChoice.length > 0 && (
									<div
										className={`flex border-2 ${
											active === 'addToCart' ? 'border-black' : 'border-white'
										} p-4 m-5 rounded-lg md:cursor-pointer`}
										onClick={() => handleSelect('/cart', 'addToCart')}
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
								)}
							</div>
						</div>
						<div className="mx-5 absolute bottom-10" style={{width: '90%'}}>
							<Button
								onClick={() => {
									if (link === '') {
										handleSelectDiamondRcm('diamondRcm');
									} else {
										navigate(link);
									}
								}}
								type="text"
								className=" bg-primary w-full text-lg font-semibold p-5 uppercase"
							>
								Tiếp tục
							</Button>
						</div>
					</>
				)}

				<div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={toggleSidebar}>
					<RightOutlined />
				</div>
			</div>
		</>
	);
};
