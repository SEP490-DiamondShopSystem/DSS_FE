import React from 'react';

import {Button, Image, Radio} from 'antd';

export const Metal = ({
	setStep,
	customizeJewelry,
	setCustomizeJewelry,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
	filteredGroups,
}) => {
	const handleNextStep = () => {
		setStep(1);
	};

	console.log('selectedMetal', selectedMetal);

	return (
		<div>
			<div>
				{diamondJewelry?.MetalSupported?.map((metal, i) => (
					<div key={i}>
						<Radio.Group
							onChange={() => handleSelectMetal(metal)}
							value={selectedMetal}
						>
							<Radio value={metal}>
								<div
									className="flex items-center justify-between"
									style={{width: 500}}
								>
									<div className="flex items-center">
										<div className="mx-5 my-5">
											<Image
												preview={false}
												src={metal.image}
												height={50}
												width={50}
											/>
										</div>
										<p className="">{metal}</p>
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
					// disabled={selectedMetal.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
