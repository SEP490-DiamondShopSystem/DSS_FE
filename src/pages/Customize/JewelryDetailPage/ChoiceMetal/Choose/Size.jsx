import React from 'react';

import {Button, Radio} from 'antd';

export const Size = ({
	setStep,
	customizeJewelry,
	setCustomizeJewelry,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
	filteredGroups,
	size,
	setSize,
	handleSizeChange,
}) => {
	const handleNextStep = () => {
		setStep(1);
	};

	console.log('diamondJewelry', diamondJewelry);
	console.log('size', size);
	console.log('selectedMetal', selectedMetal.length);

	return (
		<div>
			<div>
				{filteredGroups?.map((metal, i) => (
					<div key={i}>
						<Radio.Group onChange={handleSizeChange} value={size}>
							<Radio value={metal?.SizeId}>
								<div
									className="flex items-center justify-between"
									style={{width: 1000}}
								>
									<div className="flex items-center justify-between">
										<p className="">{metal?.SizeId}</p>
									</div>
									{/* <p className="font-semibold">{formatPrice(metal.Price)}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={selectedMetal.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
