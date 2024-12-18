import React from 'react';

import {Button, Image, Radio} from 'antd';
import {formatPrice} from '../../../../../utils';

export const Metal = ({
	setStep,
	customizeJewelry,
	setCustomizeJewelry,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
	filteredGroups,
	handleSizeChange,
	size,
	metals,
	findMetals,
	selectedSideDiamond,
	handleSideDiamondChange,
}) => {
	const handleNextStep = () => {
		setStep((prev) => prev + 1);
	};

	return (
		<div>
			<div>
				<div className="flex items-center justify-center mt-10">
					<label className=" font-semibold text-xl">Chọn Vật Liệu</label>
				</div>
				<div className="">
					{findMetals?.map((metal, i) => (
						<div key={i}>
							<Radio.Group
								onChange={() => handleSelectMetal(metal)}
								value={selectedMetal?.Name}
							>
								<Radio value={metal.Name}>
									<div className="">
										<div className="flex items-center m-5 justify-between">
											<div className="mr-10">
												<p className="font-semibold">{metal?.Name}</p>
											</div>
											<p className="">{formatPrice(metal?.Price)} / gram</p>
										</div>
									</div>
								</Radio>
							</Radio.Group>
						</div>
					))}
				</div>
			</div>
			{diamondJewelry?.SideDiamonds?.length > 0 && (
				<>
					<div className="flex items-center justify-center mt-10">
						<label className=" font-semibold text-xl">Chọn Kim Cương Tấm</label>
					</div>
					<div className="grid grid-cols-3 gap-5">
						{diamondJewelry?.SideDiamonds?.map((diamond, i) => (
							<div key={i}>
								<Radio.Group
									onChange={handleSideDiamondChange}
									value={selectedSideDiamond}
								>
									<Radio value={diamond}>
										<div className="">
											<div className="m-5">
												<p className="">
													{diamond?.CaratWeight} ct / {diamond?.Quantity}{' '}
													viên
												</p>
											</div>
										</div>
									</Radio>
								</Radio.Group>
							</div>
						))}
					</div>
				</>
			)}
			{filteredGroups && filteredGroups?.length > 0 && (
				<>
					<div className="flex items-center justify-center mt-10">
						<label className=" font-semibold text-xl">Chọn Kích Thước</label>
					</div>
					<div className="grid grid-cols-3 gap-5">
						{filteredGroups?.map((metal, i) => (
							<div key={i}>
								<Radio.Group onChange={handleSizeChange} value={size}>
									<Radio value={metal?.SizeId}>
										<div
											className="flex items-center justify-between"
											style={{width: 1000}}
										>
											<div className="flex items-center justify-between  m-5">
												<p className="">
													{metal?.SizeId} {metal?.Size?.Unit}
												</p>
											</div>
											{/* <p className="font-semibold">{formatPrice(metal.Price)}</p> */}
										</div>
									</Radio>
								</Radio.Group>
							</div>
						))}
					</div>
				</>
			)}

			<div className="flex justify-around items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={size === null}
					onClick={() => setStep(3)}
				>
					{diamondJewelry && diamondJewelry?.IsEngravable
						? 'Bỏ Qua Chữ Khắc'
						: 'Tiếp Tục'}
				</Button>
				{diamondJewelry && diamondJewelry?.IsEngravable && (
					<Button
						type="text"
						className="bg-primary w-48 uppercase font-semibold"
						disabled={size === null}
						onClick={handleNextStep}
					>
						Thêm Chữ Khắc
					</Button>
				)}
			</div>
		</div>
	);
};
