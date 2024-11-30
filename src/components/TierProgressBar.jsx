import React from 'react';
import {ProgressBar, Step} from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

const TierProgressBar = ({bronzePoints, silverPoints, goldPoints, currentPoints}) => {
	const totalPoints = goldPoints;

	const tiers = [
		{name: 'Bronze', points: bronzePoints, color: '#cd7f32'}, // Bronze
		{name: 'Silver', points: silverPoints, color: '#c0c0c0'}, // Silver
		{name: 'Gold', points: goldPoints, color: '#ffd700'}, // Gold
	];

	// Determine the current tier based on points
	const getTierColor = (currentPoints) => {
		if (currentPoints >= goldPoints) return tiers[2].color;
		if (currentPoints >= silverPoints) return tiers[1].color;
		if (currentPoints >= bronzePoints) return tiers[0].color;
		return '#ccc'; // Default color for no tier
	};

	const percentage = (currentPoints / totalPoints) * 100;

	return (
		<div className="w-full">
			<ProgressBar
				percent={percentage}
				filledBackground={getTierColor(currentPoints)} // Color depends on the current tier
			>
				{tiers.map((tier, index) => (
					<Step key={index} position={(tier.points / totalPoints) * 100}>
						{({accomplished}) => (
							<>
								{/* <div
									className="w-6 h-6 rounded-full flex items-center justify-center"
									style={{
										backgroundColor: accomplished ? tier.color : '#ccc',
										border: '2px solid #fff',
									}}
									title={tier.name}
								>
									<span className="text-xs font-bold text-white">
										{tier.name[0]}
									</span>
								</div> */}
							</>
						)}
					</Step>
				))}
			</ProgressBar>
			<div className="mt-4 text-center">
				{currentPoints} / {totalPoints} điểm
			</div>
		</div>
	);
};

export default TierProgressBar;
