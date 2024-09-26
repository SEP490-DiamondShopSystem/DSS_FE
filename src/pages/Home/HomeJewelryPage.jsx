import React from 'react';

import {Helmet} from 'react-helmet';
import {BannerJewelry} from '../../components/Banner/BannerJewelry-1';
import {jewelries} from '../../utils/constant';
import {BannerJewelry2} from '../../components/Banner/BannerJewelry-2';
import {BannerJewelry3} from '../../components/Banner/BannerJewelry-3';

const HomeJewelryPage = () => {
	return (
		<div>
			<Helmet>
				<title>Trang Sức: Mua Sắm Trang Sức Cao Cấp | Cửa Hàng Kim Cương</title>
			</Helmet>
			<BannerJewelry />
			<div className="bg-white">
				<h2 className="text-center w-full py-10 uppercase font-semibold text-3xl">
					Lấy Cảm Hứng
				</h2>
				<div className="grid grid-cols-4 py-5">
					{jewelries?.map((jewelry) => (
						<a href={jewelry.link} className="m-auto">
							<div className="text-center uppercase">
								<img
									src={jewelry.logo}
									alt={jewelry.title}
									className="rounded-full"
								/>
								<p className="mt-10">{jewelry.title}</p>
							</div>
						</a>
					))}
				</div>
			</div>
			<BannerJewelry2 />
			<div className="bg-primary flex justify-center items-center h-80 p-20 my-10">
				<div className="p-9" style={{width: 1300}}>
					<h1 className="text-3xl" style={{fontWeight: 500}}>
						Những món trang sức hoàn hảo cho mọi khoảnh khắc.
					</h1>
					<p style={{width: 761}} className="mt-5">
						Dù bạn tự thưởng cho bản thân hay kỷ niệm điều gì đó đặc biệt, bộ sưu tập
						trang sức chất lượng cao của chúng tôi sẽ đảm bảo bạn luôn tìm thấy món đồ
						phù hợp.
					</p>
				</div>
			</div>
			<BannerJewelry3 />
			<div></div>
		</div>
	);
};

export default HomeJewelryPage;
