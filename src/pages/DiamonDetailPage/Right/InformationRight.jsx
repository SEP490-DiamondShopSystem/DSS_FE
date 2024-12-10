import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {faRefresh, faTruck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Rate, Select} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatPrice} from '../../../utils';
import {useDispatch} from 'react-redux';
import {addOrUpdateCartDesignDiamondItem} from '../../../redux/slices/cartSlice';
import {jewelries} from '../../../utils/constant';
import {getUserId} from '../../../components/GetUserId';

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
export const InformationRight = ({
	diamondChoice,
	toggleSidebar,
	diamond,
	handleAddToCart,
	handleChangeWarranty,
	warrantyDiamond,
	diamondId,
	warrantyDiamondSelected,
}) => {
	const dispatch = useDispatch();

	const userId = getUserId();

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
				<h1 className="text-3xl">{diamond?.Title}</h1>

				<div>
					<div className="flex items-center text-sm mt-5">
						<p className="p-2" style={{backgroundColor: '#f7f7f7'}}>
							{diamond?.Carat}ct
						</p>
						<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
							{diamond?.Color} Color
						</p>
						<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
							{diamond?.Clarity} Clarity
						</p>
						<p className="ml-4 p-2" style={{backgroundColor: '#f7f7f7'}}>
							{diamond?.Cut}
						</p>
					</div>
				</div>
			</div>

			<div className="border-y border-tintWhite py-5 my-5">
				<div className="flex flex-col">
					<label>Chọn Bảo Hành: </label>
					<Select
						// allowClear
						className="mb-5 mt-2"
						style={{
							width: 300,
							textOverflow: 'ellipsis',
						}}
						size="small"
						value={
							warrantyDiamondSelected?.warranty?.MappedName?.replace(/_/g, ' ') ||
							warrantyDiamondSelected?.MappedName?.replace(/_/g, ' ')
						}
						placeholder="Chọn bảo hành kim cương"
						onChange={handleChangeWarranty}
					>
						{warrantyDiamond &&
							warrantyDiamond?.map((warranty, i) => (
								<Select.Option
									key={i}
									value={JSON.stringify({
										warranty,
									})}
								>
									{warranty?.MappedName?.replace(/_/g, ' ')}
								</Select.Option>
							))}
					</Select>
				</div>

				<div className="flex items-center">
					<p className="font-semibold pl-2 text-2xl">{formatPrice(diamond.Price)}</p>
					<div className="text-sm pl-2">(Giá Kim Cương)</div>
				</div>
			</div>

			<div className="flex justify-between items-center mt-5">
				<Button
					type="text"
					className="border py-7 px-14 font-bold text-lg bg-primary rounded hover:bg-second w-full uppercase"
					// onClick={toggleSidebar}
					onClick={handleAddToCart}
				>
					{diamondId ? 'Cập Nhật Đơn Hàng' : 'Thêm Vào giỏ hàng'}
				</Button>
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

			<div className="border-t">
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
							<span>
								Viên kim cương {diamond?.DiamondShape} {diamond?.Carat}ct này chỉ
								được bán tại Cửa hàng Kim cương.
							</span>
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
			</div>
		</div>
	);
};
