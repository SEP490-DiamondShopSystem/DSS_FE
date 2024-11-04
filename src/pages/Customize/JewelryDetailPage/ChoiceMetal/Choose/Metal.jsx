import React from 'react';

import gold from '../../../../../assets/gold.png';
import rose_gold from '../../../../../assets/rose-gold.png';
import platinum from '../../../../../assets/platinum.png';
import {Button, Image, Radio} from 'antd';
import {notifyError} from '../../../../../utils/toast';
import {formatPrice} from '../../../../../utils';

export const Metal = ({
	setStep,
	customizeJewelry,
	setCustomizeJewelry,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
}) => {
	const handleNextStep = () => {
		setStep(1);
	};

	console.log('diamondJewelry', diamondJewelry);
	console.log('selectedMetal', selectedMetal.length);

	return (
		<div>
			<div>
				{diamondJewelry?.Metals?.map((metal, i) => (
					<div key={metal.Id}>
						<Radio.Group
							onChange={() => handleSelectMetal(metal)}
							value={selectedMetal?.Name}
						>
							<Radio value={metal.Name}>
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
										<p className="">{metal.Name}</p>
									</div>
									<p className="font-semibold">{formatPrice(metal.Price)}</p>
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
