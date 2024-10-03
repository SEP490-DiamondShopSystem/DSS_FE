import React from 'react';

import {Helmet} from 'react-helmet';
import {BannerRings} from '../../components/Banner/BannerRing-1';
import {BannerRing2} from '../../components/Banner/BannerRing-2';
import styles from '../../css/wrapper.module.css';
import {Image, Space} from 'antd';
import ringImg from '../../assets/ring_classic.png';

const HomeRingPage = () => {
	const list = [
		{id: 1, image: '', name: 'East-West Solitaire'},
		{id: 2, image: '', name: 'Classic Four-Prong Solitaire'},
		{id: 3, image: '', name: 'Petite Cathedral Solitaire'},
		{id: 4, image: '', name: 'Heirloom Petite Milgrain'},
		{id: 5, image: '', name: 'Classic Six-Prong Solitaire'},
		{id: 6, image: '', name: 'Graduated Milgrain Diamond'},
		{id: 7, image: '', name: 'East-West Solitaire'},
		{id: 8, image: '', name: 'Twisted Halo Solitaire'},
		{id: 9, image: '', name: 'Vintage Bezel Diamond'},
		{id: 10, image: '', name: 'Pavé Halo Diamond'},
	];

	return (
		<div>
			<Helmet>
				<title>Thiết Kế Nhẫn Cho Riêng Bạn | Diamond Shop</title>
			</Helmet>
			<BannerRings />
			<div className="text-center my-10">
				<h2 className="text-2xl">
					10 Chiếc Nhẫn Đính Hôn Tự Thiết Kế Hàng Đầu Của Chúng Tôi
				</h2>
				<p className="text-sm mx-52">
					Câu chuyện tình yêu của bạn là duy nhất, và nhẫn đính hôn của bạn cũng vậy.
					Chúng tôi giúp bạn dễ dàng thiết kế nhẫn đính hôn tùy chỉnh trực tuyến bằng cách
					cho phép bạn chọn kiểu dáng, kim cương và đá quý hoàn hảo mà bạn thích. Khám phá
					các thiết kế nhẫn kim cương tùy chỉnh của chúng tôi để bắt đầu. Chiếc nhẫn hoàn
					hảo chỉ cách bạn vài cú nhấp chuột. Các chuyên gia của chúng tôi cũng sẵn sàng
					hỗ trợ 24/7 nếu bạn muốn được trợ giúp một chút trong việc thiết kế nhẫn đính
					hôn tùy chỉnh.
				</p>

				<div className="flex justify-center items-center">
					<div
						className={`${styles.wrapper} border border-white bg-white rounded-lg items-center my-5`}
					>
						{list?.map((item) => (
							<div
								key={item.id}
								style={{minWidth: 250, minHeight: 250}}
								className="mx-10"
							>
								<Space className="m-auto">
									<Image className="h-full w-full" src={ringImg} />
								</Space>
								<div className={`${styles.item} uppercase h-12 mt-5`}>
									{item.name}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="my-10">
				<BannerRing2 />
			</div>
		</div>
	);
};

export default HomeRingPage;
