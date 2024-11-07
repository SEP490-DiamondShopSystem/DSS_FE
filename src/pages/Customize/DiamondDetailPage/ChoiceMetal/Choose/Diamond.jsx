import React from 'react';

import {Button, Image} from 'antd';
import diamondImg from '../../../../../assets/img-diamond.png';
import {FilterDiamondCustomize} from '../../../../../components/Filter/Filter';
import Loading from '../../../../../components/Loading';
import {formatPrice} from '../../../../../utils';

export const Diamond = ({
	steps,
	currentDiamond,
	setStep,
	customizeDiamond,
	setCustomizeDiamond,
	jewelry,
	filters,
	setFilters,
	handleReset,
	loading,
	mappedDiamonds,
	handleSelectDiamond,
	diamondSelect,
	selectedDiamonds,
	setSelectedDiamonds,
}) => {
	// Assuming currentDiamond is already defined and contains Shapes
	const validShapes = currentDiamond.Shapes.map((shape) => shape.ShapeId);

	// Function to get CaratFrom and CaratTo for the selected ShapeId
	const getCaratValuesForShape = (selectedShapeId) => {
		const selectedShape = currentDiamond.Shapes.find(
			(shape) => shape.ShapeId === selectedShapeId
		);

		if (selectedShape) {
			return {
				caratFrom: selectedShape.CaratFrom ?? 0, // default to 0 if undefined
				caratTo: selectedShape.CaratTo ?? 0, // default to 0 if undefined
			};
		}
		return {caratFrom: 0, caratTo: 0}; // if shape not found, return defaults
	};

	// Example selected ShapeId (this would be determined by your UI, e.g., from user selection)
	const selectedShapeId = '1'; // replace with the ShapeId you want to select
	const {caratFrom, caratTo} = getCaratValuesForShape(selectedShapeId);

	// If you want to compute minCarat and maxCarat from all shapes regardless of selection
	const caratFromValues = currentDiamond.Shapes.map((shape) => shape.CaratFrom);
	const caratToValues = currentDiamond.Shapes.map((shape) => shape.CaratTo);

	const minCarat = caratFromValues.length > 0 ? Math.min(...caratFromValues) : 0;
	const maxCarat = caratToValues.length > 0 ? Math.max(...caratToValues) : 0;

	const handleNextStep = () => {
		if (!diamondSelect) {
			alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
			return;
		}

		// Check if the diamond is already in the selectedDiamonds for the currentDiamond Id
		const isAlreadySelected = selectedDiamonds.some(
			(selected) =>
				selected.Id === diamondSelect.Id && selected.currentDiamondId === currentDiamond.Id
		);

		if (!isAlreadySelected) {
			// Add the diamond to selectedDiamonds with the currentDiamond Id
			setSelectedDiamonds((prev) => [
				...prev,
				{...diamondSelect, currentDiamondId: currentDiamond.Id}, // Store with currentDiamond ID
			]);
		}

		setStep((prev) => prev + 1); // Proceed to the next step
	};

	console.log('validShapes', validShapes);
	console.log(`Selected ShapeId: ${selectedShapeId}`);
	console.log(`Carat From (selected): ${caratFrom}`);
	console.log(`Carat To (selected): ${caratTo}`);
	console.log(`Minimum Carat: ${minCarat}`);
	console.log(`Maximum Carat: ${maxCarat}`);
	console.log(`mappedDiamonds: `, mappedDiamonds);
	console.log(`diamondSelect: `, diamondSelect);
	console.log(`steps: `, steps);

	return (
		<div>
			<div>
				<FilterDiamondCustomize
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
					validShapes={validShapes} // Pass valid shapes to Filter
					minCarat={minCarat} // Pass carat range for filter adjustments
					maxCarat={maxCarat}
				/>

				{loading ? (
					<Loading />
				) : (
					<>
						{!Array.isArray(mappedDiamonds) || mappedDiamonds.length === 0 ? (
							<div className="flex items-center justify-center my-10">
								<p className="text-2xl">Chưa có sản phẩm nào</p>
							</div>
						) : (
							<>
								<div className="transition-all duration-300 grid grid-cols-3 gap-10 mb-20 mt-10">
									{mappedDiamonds?.map((diamondItem) => (
										<div
											key={diamondItem.Id}
											className={`shadow-lg bg-white ${
												diamondItem?.Id === diamondSelect?.Id
													? 'border-black'
													: 'border-white'
											} border-2 rounded-lg hover:border-2 hover:border-black cursor-pointer`}
											onClick={() => handleSelectDiamond(diamondItem)}
										>
											<div className="w-80">
												<div
													className="flex justify-center mb-5"
													style={{background: '#b8b7b5'}}
												>
													<Image
														preview={false}
														src={diamondImg}
														alt={diamondItem.Name}
													/>
												</div>
												<div className="mx-10 my-5">
													<p>{diamondItem?.Title}</p>
													<div className="flex">
														{diamondItem?.DiscountPrice !== null ? (
															<div className="flex">
																<p
																	style={{color: '#707070'}}
																	className="line-through"
																>
																	{formatPrice(
																		diamondItem.TruePrice
																	)}
																</p>
																<p className="ml-3">
																	{formatPrice(
																		diamondItem.DiscountPrice
																	)}
																</p>
															</div>
														) : (
															<div className="">
																<p>
																	{formatPrice(
																		diamondItem.TruePrice
																	)}
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</>
				)}
			</div>
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="w-48 uppercase font-semibold bg-primary"
					// disabled={!isCaratValid}
					onClick={handleNextStep}
				>
					{setStep === 0 ? 'Tiếp tục' : 'Xác Nhận'}
				</Button>
			</div>
		</div>
	);
};
