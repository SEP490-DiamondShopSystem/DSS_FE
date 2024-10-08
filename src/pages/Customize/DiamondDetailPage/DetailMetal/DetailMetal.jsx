import {Divider, Image} from 'antd';
import React from 'react';

export const DetailMetalDiamond = ({customizeJewelry, imageData, customizeDiamond}) => {
	return (
		<div className="my-10 mx-20">
			<div>
				<h1 className="text-center text-2xl font-semibold">Thông số vỏ của bạn</h1>
			</div>
			<div className="flex items-center justify-between mt-10">
				<p className="font-semibold">ID</p>
				<p>123456</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Vỏ:</p>
				<p>Petite Solitaire Engagement Ring</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Kích thước vỏ:</p>
				<p>{customizeJewelry.size}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Vật liệu đã chọn:</p>
				<p>{customizeJewelry.metal}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình dạng vỏ đã chọn:</p>
				<p>{customizeJewelry.shape}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình:</p>
				<p className="h-16 w-16">
					<Image src={imageData} alt={imageData} />
				</p>
			</div>
			<Divider />
			<div>
				<h1 className="text-center text-2xl font-semibold">Thông số kim cương</h1>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Carat Weight:</p>
				<p>{customizeDiamond.carat}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Cut:</p>
				<p>{customizeDiamond.cut}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Color:</p>
				<p>{customizeDiamond.color}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Clarity:</p>
				<p>{customizeDiamond.clarity}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Tổng cộng:</p>
				<p className="font-semibold">$2,040</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Ngày vận chuyển dự kiến:</p>
				<p style={{color: '#c0c0c0'}}>7 ngày 2 giờ sau khi thanh toán thành công</p>
			</div>
		</div>
	);
};
