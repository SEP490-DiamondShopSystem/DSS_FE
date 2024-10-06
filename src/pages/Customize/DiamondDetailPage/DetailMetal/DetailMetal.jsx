import {Divider, Image} from 'antd';
import React from 'react';

export const DetailMetal = ({customizeDiamond, imageData}) => {
	return (
		<div className="my-10 mx-20">
			<div>
				<h1 className="text-center text-2xl font-semibold">Lựa chọn của bạn</h1>
			</div>
			<div className="flex items-center justify-between mt-10">
				<p className="font-semibold">ID</p>
				<p>JW1234</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Vỏ:</p>
				<p>Petite Solitaire Engagement Ring</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Các hình dáng phù hợp:</p>
				<p>Round, Heart, Oval</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Kích thước vỏ:</p>
				<p>{customizeDiamond.size}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Vật liệu có sẵn:</p>
				<p>14K gold, 14k rose gold, 18k gold, platinum</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Vật liệu đã chọn:</p>
				<p>{customizeDiamond.metal}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình dạng vỏ đã chọn:</p>
				<p>{customizeDiamond.shape}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Chữ khắc:</p>
				<p>{customizeDiamond.textValue}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình:</p>
				<p className="h-16 w-16">
					<Image src={imageData} alt={imageData} />
				</p>
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
