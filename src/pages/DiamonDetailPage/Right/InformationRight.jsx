import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Rate} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const infoMetal = {
	name: 'Kim cương tròn 1.00 Carat',
	price: '10.800.000 VND',
	detailProduct: 'Viên kim cương tròn H 1.00 này chỉ được bán tại Cửa hàng Kim cương.',
	delivery: 'Thứ hai, 26 tháng 8',
	tuyChon: [
		{
			carat: '1.00ct',
			doSang: 'VS2 Clarity',
			mauSac: 'H Color',
			cat: 'Very Good',
		},
	],
};
export const InformationRight = ({diamondChoice, toggleSidebar}) => {
	const navigate = useNavigate();
	const [showDetail, setDetail] = useState(false);
	const [showSecureShopping, setSecureShopping] = useState(false);
	const [showProductWarranty, setProductWarranty] = useState(false);

	const handleDetailOpen = () => {
		setDetail(!showDetail);
	};
	const handleSecureOpen = () => {
		setSecureShopping(!showSecureShopping);
	};
	const handleWarrantyOpen = () => {
		setProductWarranty(!showProductWarranty);
	};

	return (
		<div>
			<div className="border-tintWhite">
				<h1 className="text-3xl">{infoMetal.name}</h1>
				<div className="font-semibold my-2">
					Giao hàng như một viên kim cương rời vào: {infoMetal?.delivery}
				</div>
				<div className="flex mb-2">
					<div className="font-semibold text-green cursor-pointer">
						Giao hàng qua đêm miễn phí
					</div>
				</div>
				<div>
					{infoMetal?.tuyChon?.map((metal, i) => (
						<div className="flex items-center text-sm" key={i}>
							<p className="p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.carat}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.mauSac}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.doSang}
							</p>
							<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
								{metal.cat}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="border-y border-tintWhite py-5 my-5">
				<div className="flex items-center">
					<p className="font-semibold pl-2 text-2xl">{infoMetal.price}</p>
					<div className="text-sm pl-2">(Giá Kim Cương)</div>
				</div>
			</div>

			<div className="flex justify-between items-center mt-5">
				{diamondChoice.length > 0 ? (
					<Button
						type="text"
						className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full"
						onClick={toggleSidebar}
					>
						CHỌN VIÊN KIM CƯƠNG NÀY
					</Button>
				) : (
					<Button
						type="text"
						className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full"
						onClick={() => navigate(`/completed-jewelry/1`)}
					>
						CHỌN VIÊN KIM CƯƠNG NÀY
					</Button>
				)}
			</div>

			<div className="my-10">
				<h2 className="font-bold text-xl pb-3">Đơn hàng của bạn bao gồm:</h2>
				<div className="flex bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faTruck} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Miễn phí vận chuyển</p>
						<p>
							Chúng tôi cam kết mang đến trải nghiệm tuyệt vời từ mua sắm đến giao
							hàng.
						</p>
					</div>
				</div>
				<div className="flex mt-5 bg-offWhite p-5">
					<div className="p-5 bg-lightGray">
						<FontAwesomeIcon icon={faRefresh} style={{height: 30}} />
					</div>
					<div className="flex-col items-center ml-3">
						<p className="font-semibold">Miễn phí trả hàng</p>
						<p>
							Chúng tôi cam kết mang đến trải nghiệm tuyệt vời từ mua sắm đến giao
							hàng.
						</p>
					</div>
				</div>
			</div>

			<div className="border-y">
				<div className="border-b pb-4 my-4 cursor-pointer" onClick={handleDetailOpen}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Chi tiết sản phẩm
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
							<span>{infoMetal.detailProduct}</span>
						</div>
					</div>
				</div>

				<div className="border-b pb-4 my-4 cursor-pointer" onClick={handleSecureOpen}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Báo cáo phân loại GIA
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
								Đây là báo cáo ghi nhận các đặc điểm cụ thể của viên kim cương, do
								GIA cấp, một trong những tổ chức được kính trọng nhất trong ngành
								kim cương.
							</span>
						</div>
					</div>
				</div>

				<div className="my-4 cursor-pointer" onClick={handleWarrantyOpen}>
					<div className="flex justify-between">
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none font-semibold">
							Chương trình nâng cấp kim cương trọn đời
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
								Diamond Shop rất vui mừng cung cấp chương trình nâng cấp kim cương
								trọn đời cho tất cả các viên kim cương được chứng nhận. Gọi cho
								Chuyên gia Tư vấn Kim cương & Trang sức tại số 012345678 để biết
								thêm thông tin.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
