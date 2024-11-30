import React from 'react';
import {useNavigate} from 'react-router-dom';

// Importing diamond shape images
import roundImg from '../../assets/diamondShapes/round.png';
import princessImg from '../../assets/diamondShapes/princess.png';
import emeraldImg from '../../assets/diamondShapes/emerald.png';
import cushionImg from '../../assets/diamondShapes/cushionSquare.png';
import marquiseImg from '../../assets/diamondShapes/marquise.png';
import radiantImg from '../../assets/diamondShapes/radiant.png';
import ovalImg from '../../assets/diamondShapes/oval.png';
import pearImg from '../../assets/diamondShapes/pear.png';
import asscherImg from '../../assets/diamondShapes/asscher.png';
import heartImg from '../../assets/diamondShapes/heart.png';
import {Typography} from 'antd';

const {Title} = Typography;

const diamondShapes = [
	{label: 'Round', value: '1', image: roundImg},
	{label: 'Princess', value: '2', image: princessImg},
	{label: 'Emerald', value: '4', image: emeraldImg},
	{label: 'Cushion', value: '3', image: cushionImg},
	{label: 'Marquise', value: '8', image: marquiseImg},
	{label: 'Radiant', value: '6', image: radiantImg},
	{label: 'Oval', value: '5', image: ovalImg},
	{label: 'Pear', value: '10', image: pearImg},
	{label: 'Asscher', value: '7', image: asscherImg},
	{label: 'Heart', value: '9', image: heartImg},
];

const BannerShape = () => {
	const navigate = useNavigate();

	const handleShapeClick = (shape) => {
		localStorage.setItem('selected', JSON.stringify(shape));
		navigate(`/diamond/search`);
	};

	return (
		<div className=" py-10 bg-gray-50 px-4 md:px-10 lg:px-20 mt-8 pt-8">
			<Title level={3} align="center">
				Khám Phá Thế Giới Kim Cương
			</Title>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				{diamondShapes.map((shape) => (
					<div
						key={shape.value}
						className="cursor-pointer transition-transform duration-300 transform hover:scale-105"
						onClick={() => handleShapeClick(shape.value)}
					>
						<div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
							<div className=" h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 flex items-center justify-center mb-4">
								<img
									src={shape.image}
									alt={shape.label}
									className="w-full h-full object-contain"
								/>
							</div>
							<p className="text-center text-sm sm:text-base lg:text-lg font-medium text-gray-700">
								{shape.label}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BannerShape;
