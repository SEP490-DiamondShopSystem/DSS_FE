import React from 'react';

import {Image, Steps} from 'antd';
import {useLocation} from 'react-router-dom';

const {Step} = Steps;

const steps = [
	{title: 'Page 1', path: '/profile', imgSrc: '/path-to-image1.png'},
	{title: 'Page 2', path: '/my-info', imgSrc: '/path-to-image2.png'},
	{title: 'Page 3', path: '/my-orders', imgSrc: '/path-to-image3.png'},
];

const StepProgressBar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const currentIndex = steps.findIndex((step) => step.path === currentPath);

	return (
		<div className="mt-10">
			<Steps
				current={currentIndex}
				direction="horizontal"
				style={{width: '600px', margin: '0 auto'}}
				className="bg-white p-4 rounded-full"
			>
				{steps.map((step, index) => (
					<Step
						key={index}
						title={
							<div className="flex items-center">
								<span className="mr-2">{step.title}</span>
								<Image width={30} src={step.imgSrc} preview={false} />
							</div>
						}
					/>
				))}
			</Steps>
		</div>
	);
};

export default StepProgressBar;
