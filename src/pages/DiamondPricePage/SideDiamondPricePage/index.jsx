import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	fetchPriceBoard,
	fetchDiamondPrices,
	createDiamondPrice,
	updateDiamondPrices,
	deleteDiamondPrice,
} from '../../../redux/slices/diamondPriceSlice';
import {fetchDiamondPriceRule} from '../../../redux/slices/configSlice';
import {getPriceBoardSelector, LoadingDiamondPriceSelector} from '../../../redux/selectors';
import {message} from 'antd';
import Loading from '../../../components/Loading';

const formatPrice = (price) => {
	if (price === null || price === undefined) return 'N/A';
	if (price < 0) return 'Not Set';
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
};

const SideDiamondPricePage = () => {
	const dispatch = useDispatch();
	const {priceBoard, loading} = useSelector((state) => ({
		priceBoard: getPriceBoardSelector(state),
		loading: LoadingDiamondPriceSelector(state),
	}));
	const [filters, setFilters] = useState({
		isLabDiamond: false,
	});

	const handleFilterChange = (filterName) => (event) => {
		setFilters((prev) => ({
			...prev,
			[filterName]: event.target.checked || Number(event.target.value),
		}));
	};

	const [isLabDiamond, setIsLabDiamond] = useState(false);
	const [shapeId, setShapeId] = useState(99);

	const [isSideDiamond, setIsSideDiamond] = useState(true);
	const [editedCells, setEditedCells] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedPrices, setSelectedPrices] = useState([]);
	const [isCreating, setIsCreating] = useState(false);
	const [listPrices, setListPrices] = useState([]);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [criteriaTitle, setCriteriaTitle] = useState('');

	useEffect(() => {
		dispatch(fetchPriceBoard({isLabDiamond, isSideDiamond}));
		// Fetch diamond price rule to set title
		dispatch(fetchDiamondPriceRule()).then((response) => {
			const data = response.payload;
			// Set title based on shapeId
			setCriteriaTitle(
				isSideDiamond === true
					? data.DefaultSideDiamondCriteriaPriceBoard
					: data.DefaultSideDiamondCriteriaPriceBoard
			);
		});
	}, [dispatch, isLabDiamond, isSideDiamond]);

	const handleCheckboxChange = (criteriaId) => {
		setSelectedPrices(
			(prev) =>
				prev.includes(criteriaId)
					? prev.filter((id) => id !== criteriaId) // Uncheck
					: [...prev, criteriaId] // Check
		);
	};

	const handleDelete = () => {
		if (selectedPrices.length === 0) return;
		setShowDeleteConfirm(true); // Show confirmation popup
	};

	const confirmDelete = async () => {
		try {
			const deleteList = selectedPrices.map((criteriaId) => ({criteriaId}));
			const payload = {
				deleteList,
				isLabDiamond,
			};

			dispatch(deleteDiamondPrice(payload))
				.unwrap()
				.then((res) => {
					message.success('Xóa Giá Thành Công!');
				})
				.catch((error) => {
					message.error(error?.data?.detail || error?.detail);
				}); // Wait for delete to finish
		} catch (error) {
			message.error(error?.data?.detail || error?.detail);
		}
		setSelectedPrices([]);
		setShowDeleteConfirm(false);
		await dispatch(fetchPriceBoard({isLabDiamond, isSideDiamond})); // Fetch updated board
	};

	const savePrices = async () => {
		try {
			const listPrices = editedCells.map((cell) => ({
				diamondCriteriaId: cell.diamondCriteriaId,
				price: Number(cell.price),
			}));

			if (listPrices.length === 0) return;

			await dispatch(createDiamondPrice({listPrices, isLabDiamond, isSideDiamond, shapeId}))
				.unwrap()
				.then((res) => {
					message.success('Thêm Giá Thành Công!');
				})
				.catch((error) => {
					message.error(error?.data?.detail || error?.detail);
				});
		} catch (error) {
			message.error(error?.data?.detail || error?.detail);
		}
		setEditedCells([]);
		setIsCreating(!isCreating);
		await dispatch(fetchPriceBoard({isLabDiamond, isSideDiamond})); // Fetch updated board
	};

	const handleSave = async () => {
		const updatedPrices = editedCells.map((cell) => ({
			diamondCriteriaId: cell.diamondCriteriaId,
			price: Number(cell.price),
		}));

		await dispatch(
			updateDiamondPrices({
				updatedDiamondPrices: updatedPrices,
				shapeId,
				isLabDiamond,
				isSideDiamond,
			})
		)
			.unwrap()
			.then(() => {
				message.success('Cập Nhật Giá Thành Công!');
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
		setEditedCells([]);
		setIsEditing(!isEditing);
		await dispatch(fetchPriceBoard({isLabDiamond, isSideDiamond, shapeId})); // Fetch updated board
	};

	const cancelDelete = () => {
		setShowDeleteConfirm(false);
	};
	const handleLabDiamondChange = (event) => {
		setIsLabDiamond(event.target.checked);
	};

	const handleAddPriceToggle = () => {
		setIsCreating(!isCreating);
		setIsEditing(false);
		setListPrices([]);
	};
	const handleEditPriceToggle = () => {
		setIsEditing(!isEditing);
		setIsCreating(false);
		setEditedCells([]);
	};
	const handleEditCell = (rowIndex, cellIndex, criteriaId, newValue) => {
		const numericValue = parseFloat(newValue.replace(/\./g, '').replace(',', '.')) || 0;

		setEditedCells((prev) => {
			const existingCell = prev.find(
				(cell) => cell.rowIndex === rowIndex && cell.cellIndex === cellIndex
			);

			if (existingCell) {
				if (newValue.trim() === '' || numericValue === 0) {
					// Remove the existing cell entry if the new value is empty
					return prev.filter((cell) => cell !== existingCell);
				} else {
					// Update the existing entry
					return prev.map((cell) =>
						cell === existingCell ? {...existingCell, price: numericValue} : cell
					);
				}
			} else {
				if (numericValue > 0) {
					// Add new entry only if the value is greater than zero
					const newEntry = {
						diamondCriteriaId: criteriaId,
						price: numericValue,
						rowIndex,
						cellIndex,
					};
					return [...prev, newEntry];
				}
				// If the numeric value is zero or the new value is empty, do not add a new entry
				return prev;
			}
		});
	};

	const handleAddPriceCell = (rowIndex, cellIndex, criteriaId, newValue) => {
		const numericValue = parseFloat(newValue.replace(/\./g, '').replace(',', '.')) || 0;

		setEditedCells((prev) => {
			const existingCell = prev.find(
				(cell) => cell.rowIndex === rowIndex && cell.cellIndex === cellIndex
			);

			if (existingCell) {
				if (newValue.trim() === '' || numericValue === 0) {
					// Remove the existing cell entry if the new value is empty
					return prev.filter((cell) => cell !== existingCell);
				} else {
					// Update the existing entry
					return prev.map((cell) =>
						cell === existingCell ? {...existingCell, price: numericValue} : cell
					);
				}
			} else {
				if (numericValue > 0) {
					// Add new entry only if the value is greater than zero
					const newCell = {
						diamondCriteriaId: criteriaId,
						price: numericValue,
						rowIndex,
						cellIndex,
					};
					return [...prev, newCell];
				}
				// If the numeric value is zero or the new value is empty, do not add a new entry
				return prev;
			}
		});
	};

	const clearFilters = () => {
		setIsLabDiamond(false);
		setIsSideDiamond(true);
	};

	if (loading) {
		return <Loading />;
	}

	const renderPriceRows = (cellMatrix, colorRange, isCreating) => {
		return cellMatrix.map((row, rowIndex) => (
			<tr key={`row-${rowIndex}`} className="transition duration-200">
				<td className="border p-4 text-center bg-primary">{colorRange[rowIndex]}</td>

				{row.map((cell, cellIndex) => {
					const editedCell = editedCells.find(
						(edited) => edited.rowIndex === rowIndex && edited.cellIndex === cellIndex
					);
					const cellValue = editedCell ? editedCell.price : cell.Price;

					const cellClass = isCreating
						? cell.IsPriceKnown
							? `border p-4 text-center bg-gray col-${cellIndex}`
							: `border p-4 text-center col-${cellIndex}`
						: cell.IsPriceKnown
						? `border p-4 text-center col-${cellIndex}`
						: `border p-4 text-center bg-gray col-${cellIndex}`;

					return (
						<td key={`cell-${cellIndex}`} className={cellClass}>
							{isCreating && !cell.IsPriceKnown ? (
								<input
									type="number"
									onChange={(e) => {
										handleAddPriceCell(
											rowIndex,
											cellIndex,
											cell.CriteriaId,
											e.target.value
										);
									}}
									min={0}
									step={1000}
									className="w-full text-center border rounded"
									placeholder="New Price"
								/>
							) : (
								<div>
									{isEditing && cell.IsPriceKnown ? (
										<div>
											<input
												type="number"
												value={cellValue}
												onChange={(e) =>
													handleEditCell(
														rowIndex,
														cellIndex,
														cell.CriteriaId,
														e.target.value
													)
												}
												min={0}
												step={1000}
												className="w-full text-center border rounded"
											/>
											<input
												type="checkbox"
												checked={selectedPrices.includes(cell.CriteriaId)}
												onChange={() =>
													handleCheckboxChange(cell.CriteriaId)
												}
												className="mr-2"
											/>
										</div>
									) : (
										formatPrice(cell.Price)
									)}
								</div>
							)}
						</td>
					);
				})}
			</tr>
		));
	};

	if (!priceBoard || !priceBoard.PriceTables || priceBoard.PriceTables.length === 0) {
		return (
			<div className="container mx-auto p-6 bg-offWhite rounded-lg shadow-lg">
				<h1 className="text-5xl font-bold mb-6 text-center text-blue-600">
					{criteriaTitle || 'Bảng Giá Kim Cương Tấm'}{' '}
				</h1>
				<div className="flex flex-wrap gap-4 items-center justify-between p-4 ">
					{/* Lab Diamond Checkbox */}
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={isLabDiamond}
							onChange={handleLabDiamondChange}
							className="rounded focus:ring-blue-500"
						/>
						<label className="text-lg font-semibold">Kim Cương Nhân Tạo</label>
					</div>

					{/* Clear Filters Button */}
					<div>
						<button
							onClick={clearFilters}
							className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 hover:text-red-200 transition duration-200 font-semibold"
						>
							Xóa bộ lọc
						</button>
					</div>
				</div>
				<div className="flex flex-wrap gap-4 items-center justify-between p-4">
					Bảng giá không có sẵn
				</div>
			</div>
		);
	}

	return (
		<div className="container gap-4 my-3 mx-auto bg-white rounded-lg">
			<h1 className="text-5xl pb-4 font-bold text-center text-blue-600">
				Bảng Giá Kim Cương Tấm
			</h1>
			<p className="text-lg text-center text-gray">{criteriaTitle} </p>
			<div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-offWhite rounded-lg shadow-md">
				{/* Lab Diamond Checkbox */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={isLabDiamond}
						onChange={handleLabDiamondChange}
						className="rounded text-blue focus:ring-blue-500 hover:ring-2 transition duration-200"
						aria-label="Lab Diamond"
					/>
					<label className="text-lg font-semibold text-gray-800">
						Kim Cương Nhân Tạo
					</label>
				</div>

				{/* Clear Filters Button */}
				<div>
					<button
						onClick={clearFilters}
						className="bg-red text-white px-4 py-2 rounded hover:bg-redLight transition duration-200 font-semibold shadow hover:scale-105"
						aria-label="Clear Filters"
					>
						Xóa bộ lọc
					</button>
				</div>
			</div>
			{/* Table Rendering */}
			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 text-sm w-full">
					<thead className="bg-primary">
						<tr>
							<th className="border p-4 text-center text-Black">Color</th>
							{priceBoard.PriceTables[0].ClarityRange &&
								Object.keys(priceBoard.PriceTables[0].ClarityRange).map(
									(clarity) => (
										<th
											key={clarity}
											className="border p-4 text-center text-Black"
										>
											{clarity}
										</th>
									)
								)}
						</tr>
					</thead>
					<tbody>
						{priceBoard.PriceTables.map((table, tableIndex) => (
							<React.Fragment key={`table-${tableIndex}`}>
								<tr>
									<td
										className="border p-4 font-semibold text-center bg-second text-black"
										colSpan={Object.keys(table.ClarityRange).length + 1}
									>
										{table.CaratFrom} - {table.CaratTo} Carat
									</td>
								</tr>
								{renderPriceRows(
									table.CellMatrix,
									Object.keys(table.ColorRange),
									isCreating
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
			{isEditing && (
				<div className="mt-4 text-center">
					{editedCells.length > 0 ? (
						<button
							onClick={handleSave}
							className="border-2 bg-blue-500 text-black px-6 py-2 rounded hover:bg-blue-600 transition duration-200 font-semibold"
						>
							Lưu{' '}
						</button>
					) : (
						<button
							onClick={handleEditPriceToggle} // Replace with your cancel function
							className="border-2 bg-red text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200 font-semibold"
						>
							Hủy
						</button>
					)}
				</div>
			)}
			{isCreating && (
				<div className="mt-4 text-center">
					{editedCells.length > 0 ? (
						<button
							onClick={savePrices}
							className="border-2 bg-blue text-black px-6 py-2 rounded hover:bg-blue-600 transition duration-200 font-semibold"
						>
							Lưu{' '}
						</button>
					) : (
						<button
							onClick={handleAddPriceToggle} // Replace with your cancel function
							className="border-2 bg-red text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200 font-semibold"
						>
							Hủy
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default SideDiamondPricePage;
