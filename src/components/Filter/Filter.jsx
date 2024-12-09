import React, {useEffect, useState} from 'react';

import {DownOutlined, ReloadOutlined, UpOutlined} from '@ant-design/icons';
import {Button, Image, Input, Select, Slider} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {
	GetAllJewelryMetalSelector,
	GetAllJewelryModelCategoriesSelector,
	GetDiamondFilterSelector,
	GetDiamondShapeSelector,
} from '../../redux/selectors';
import {getDiamondFilter, getDiamondShape} from '../../redux/slices/diamondSlice';
import {getAllJewelryMetal, getAllJewelryModelCategory} from '../../redux/slices/jewelrySlice';
import {
	genderChoice,
	marks,
	marksClarity,
	marksCut,
	metalChoice,
	shapeItems,
	typeChoice,
} from '../../utils/constant';
import {formatPrice} from '../../utils';

export const FilterDiamond = ({filters, setFilters, handleReset, diamondForFilter, findShape}) => {
	const [collapsed, setCollapsed] = useState(false); // State to toggle collapse
	const toggleCollapse = () => {
		setCollapsed((prev) => !prev);
	};
	const dispatch = useDispatch();
	const filterLimits = useSelector(GetDiamondFilterSelector);

	const [filter, setFilter] = useState({});

	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	useEffect(() => {
		if (filterLimits) {
			setFilter(filterLimits);
		}
	}, [filterLimits]);

	const handleChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handlePriceChange = (value) => {
		handleChange('price', {minPrice: value[0], maxPrice: value[1]});
	};

	const handleCaratChange = (value) => {
		handleChange('carat', {minCarat: value[0], maxCarat: value[1]});
	};

	const handleColorChange = (value) => {
		handleChange('color', {minColor: value[0], maxColor: value[1]});
	};
	const handleClarityChange = (value) => {
		handleChange('clarity', {minClarity: value[0], maxClarity: value[1]});
	};
	const handleCutChange = (value) => {
		handleChange('cut', {minCut: value[0], maxCut: value[1]});
	};
	const handleShapeChange = (value) => {
		if (filters?.shape === value) {
			setFilters((prev) => ({
				...prev,
				shape: '',
			}));
		} else {
			handleChange('shape', value);
		}
	};

	return (
		<div className="filter-container p-4">
			{/* Toggle Button */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold">Lọc</h2>
				<Button
					type="text"
					icon={collapsed ? <DownOutlined /> : <UpOutlined />}
					onClick={toggleCollapse}
				>
					{collapsed ? 'Mở' : 'Đóng'}
				</Button>
			</div>

			{/* Filters Content */}
			{!collapsed && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
					{/* Shape Filter */}
					<div className="ml-4 min-w-44">
						<p className="mb-4">Hình Dạng:</p>
						<div className="grid grid-cols-3 sm:grid-cols-5 gap-6 w-full mx-auto">
							{shapeItems?.map((item) => (
								<div
									key={item.value}
									className={`flex items-center flex-col border-2 hover:border-2 hover:border-black px-4 py-2 ${
										filters?.shape === item?.value
											? 'border-black'
											: 'border-white'
									}`}
									onClick={() => handleShapeChange(item?.value)}
								>
									<div className="my-5 mx-auto">
										<Image
											preview={false}
											src={item.image}
											height={30}
											width={30}
										/>
									</div>
									<p className="font-semibold">{item.shape}</p>
								</div>
							))}
						</div>
					</div>

					{/* Price Range Slider */}
					<div className="ml-4 min-w-44">
						<p className="mb-4">Giá:</p>
						<div className="w-full">
							<Slider
								range
								marks={{
									0: '0',
									1000000000: '100M',
									5000000000: '500M',
									10000000000: '1000M',
									15000000000: '15000M',
									20000000000: '20000M',
								}}
								step={null}
								min={filter?.Price?.Min}
								max={filter?.Price?.Max}
								value={[
									filters?.price?.minPrice ?? filter?.Price?.Min,
									filters?.price?.maxPrice ?? filter?.Price?.Max,
								]}
								onChange={handlePriceChange}
								className="w-full mx-auto"
							/>
						</div>
					</div>

					{/* Carat Range Slider */}
					<div className="ml-4 min-w-44">
						<p className="mb-4">Carat:</p>
						<Slider
							range
							value={[filters?.carat?.minCarat, filters?.carat?.maxCarat]}
							marks={{
								[filters?.carat?.minCarat]: `${filters?.carat?.minCarat}`,
								[filters?.carat?.maxCarat]: `${filters?.carat?.maxCarat}`,
							}}
							step={0.01}
							min={findShape?.CaratFrom || filter?.Carat?.Min}
							max={findShape?.CaratTo || filter?.Carat?.Max}
							onChange={handleCaratChange}
							className="w-full"
						/>
					</div>

					{/* Color Range Slider */}
					<div className="ml-4 min-w-72">
						<p className="my-4">Color:</p>
						<Slider
							range
							marks={marks}
							min={filter?.Color?.Min}
							max={filter?.Color?.Max}
							value={[filters?.color?.minColor, filters?.color?.maxColor]}
							onChange={handleColorChange}
							className="w-full"
						/>
					</div>

					{/* Clarity Range Slider */}
					<div className="ml-4 min-w-72">
						<p className="my-4">Clarity:</p>
						<Slider
							range
							marks={marksClarity}
							min={filter?.Clarity?.Min}
							max={filter?.Clarity?.Max}
							value={[filters?.clarity?.minClarity, filters?.clarity?.maxClarity]}
							onChange={handleClarityChange}
							className="w-full"
						/>
					</div>

					{/* Cut Range Slider */}
					<div className="ml-4 min-w-72">
						<p className="my-4">Cut:</p>
						<Slider
							range
							marks={marksCut}
							min={filter?.Cut?.Min}
							max={filter?.Cut?.Max}
							value={[filters?.cut?.minCut, filters?.cut?.maxCut]}
							onChange={handleCutChange}
							className="w-full"
						/>
					</div>
				</div>
			)}
		</div>
	);
};
export const FilterJewelryDiamond = ({
	filters,
	setFilters,
	handleReset,
	diamondForFilter,
	findShape,
}) => {
	const dispatch = useDispatch();
	const filterLimits = useSelector(GetDiamondFilterSelector);

	const [filter, setFilter] = useState({});

	const filteredShapes = diamondForFilter?.Shapes?.map((shape) => shape?.ShapeId);

	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	useEffect(() => {
		if (filterLimits) {
			setFilter(filterLimits);
		}
	}, [filterLimits]);

	const handleChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));

		localStorage.setItem('selected', value);
	};

	const handlePriceChange = (value) => {
		handleChange('price', {minPrice: value[0], maxPrice: value[1]});
	};

	return (
		<div className="grid grid-cols-3">
			{/* Price Range Slider */}
			<div className="ml-10 min-w-44">
				<p className="mb-4">Giá:</p>
				<div className="flex">
					<Slider
						range
						marks={{
							0: '0',
							1000000000: '100M',
							5000000000: '500M',
							10000000000: '1000M',
							15000000000: '15000M',
							20000000000: '20000M',
						}}
						step={null}
						min={0}
						max={filter?.Price?.Max}
						value={[filters?.price?.minPrice, filters?.price?.maxPrice]}
						onChange={handlePriceChange}
						className="w-full mx-4"
					/>
				</div>
			</div>
		</div>
	);
};
export const FilterDiamondCustomize = ({
	filters,
	setFilters,
	handleReset,
	validShapes,
	minCarat,
	maxCarat,
}) => {
	const dispatch = useDispatch();
	const shape = useSelector(GetDiamondShapeSelector);
	const [diamondShape, setDiamondShape] = useState([]);

	useEffect(() => {
		dispatch(getDiamondShape());
	}, [dispatch]);

	useEffect(() => {
		if (shape) {
			// Set the diamond shapes based on the API response
			setDiamondShape(shape);
		}
	}, [shape]);

	// Filter the shapes based on validShapes
	const filteredShapes = diamondShape.filter((shape) => validShapes.includes(shape.Id));

	const handleChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));
		localStorage.setItem('selected', value);
	};

	const handleCaratChange = (value) => {
		handleChange('carat', {minCarat: value[0], maxCarat: value[1]});
	};

	return (
		<div className="py-4 mt-5">
			<div className="flex items-center">
				<Select
					placeholder="SHAPE"
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					className="h-12 ml-10"
					style={{width: '20%', lineHeight: 160}}
					onChange={(value) => handleChange('shape', value)}
					value={filters.shape === undefined ? 'Hình dạng' : filters.shape}
				>
					{filteredShapes.map((shape, i) => (
						<Select.Option key={shape.Id} value={shape.Id}>
							{shape.ShapeName}
						</Select.Option>
					))}
				</Select>
				<div className="ml-10 min-w-44">
					<p className="mb-4">Carat:</p>
					<Slider
						range
						marks={{
							[minCarat ?? 0]: {label: `${minCarat ?? 0}`}, // Mốc đầu
							[minCarat + (maxCarat - (minCarat ?? 0)) * 0.25]: {
								style: {color: '#000', marginTop: '-30px'},
								label: `${formatPrice(
									Math.floor(
										(minCarat ?? 0) + (maxCarat - (minCarat ?? 0)) * 0.25
									)
								)}`,
							},
							[(maxCarat + (minCarat ?? 0)) / 2]: {
								label: `${formatPrice(
									Math.floor((maxCarat + (minCarat ?? 0)) / 2)
								)}`,
							},
							[maxCarat]: `${formatPrice(maxCarat)}`,
						}}
						value={[filters.carat.minCarat, filters.carat.maxCarat]}
						// marks={{
						// 	[filters.carat.minCarat]: `${filters.carat.minCarat}`,
						// 	[filters.carat.maxCarat]: `${filters.carat.maxCarat}`,
						// }}
						step={0.1}
						min={minCarat}
						max={maxCarat}
						onChange={handleCaratChange}
					/>
				</div>
			</div>
			<div className="flex items-center mt-4"></div>
		</div>
	);
};

// Component for filtering jewelry items
export const FilterAllJewelry = ({handleFilter, setFilters, filters, handleReset}) => {
	const filterTypes = ['type', 'metal'];
	const [range, setRange] = useState([0, 40000000]);

	const handleFilterChange = (filterType, selectedValues) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedValues,
		}));
	};

	const handlePriceChange = (value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			price: {minPrice: value[0], maxPrice: value[1]},
		}));
	};

	const filterOptions = {
		gender: genderChoice,
		type: typeChoice,
		metal: metalChoice,
	};

	// Render the filter UI
	return (
		<div wrap className="py-4 flex items-center">
			{filterTypes.map((filterType) => (
				<Select
					key={filterType} // Use the filter type as key
					mode="multiple"
					placeholder={filterType.replace('_', ' ').toUpperCase()} // Display filter type in uppercase
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />} // Dropdown arrow icon
					className="h-12 mx-5"
					style={{width: '10%'}}
					onChange={(value) => handleFilterChange(filterType, value)} // Handle filter change
					value={filters[filterType]} // Current selected value for the filter
				>
					{filterOptions[filterType]?.map((item, i) => (
						<Select.Option key={i} value={item}>
							{item}
						</Select.Option>
					))}
				</Select>
			))}

			{/* Price Range Slider */}
			<div className="ml-10 min-w-44">
				<p className="mb-4">Giá:</p>
				<div className="flex">
					<Slider
						range
						marks={{
							0: '0',
							1000000000: '100M',
							5000000000: '500M',
							10000000000: '1000M',
							15000000000: '15000M',
							20000000000: '20000M',
						}}
						step={null}
						min={0}
						max={40000000}
						defaultValue={range}
						onChange={handlePriceChange}
						className="md:w-64 mx-4"
					/>
				</div>
			</div>
			<div className="ml-8 mt-6">
				<Button onClick={handleReset} danger>
					<ReloadOutlined />
				</Button>
			</div>
		</div>
	);
};

export const FilterJewelry = ({handleFilter, setFilters, filters, handleReset}) => {
	const filterTypes = ['gender', 'metal'];
	const [range, setRange] = useState([0, 40000000]);

	const handleFilterChange = (filterType, selectedValues) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedValues,
		}));
	};

	const handlePriceChange = (value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			price: {minPrice: value[0], maxPrice: value[1]},
		}));
	};

	const filterOptions = {
		gender: genderChoice,
		metal: metalChoice,
	};

	// Render the filter UI
	return (
		<div className="p-4 flex items-center">
			{filterTypes.map((filterType) => (
				<Select
					key={filterType} // Use the filter type as key
					mode="multiple"
					placeholder={filterType.replace('_', ' ').toUpperCase()} // Display filter type in uppercase
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />} // Dropdown arrow icon
					className="h-12 mx-5"
					style={{width: '10%'}}
					onChange={(value) => handleFilterChange(filterType, value)} // Handle filter change
					value={filters[filterType]} // Current selected value for the filter
				>
					{filterOptions[filterType]?.map((item, i) => (
						<Select.Option key={i} value={item}>
							{item}
						</Select.Option>
					))}
				</Select>
			))}

			<div className="ml-10 min-w-44 md:min-w-96">
				<p className="mb-4">Giá:</p>
				<div className="flex">
					<Slider
						range
						marks={{
							0: '0',
							1000000000: '100M',
							5000000000: '500M',
							10000000000: '1000M',
							15000000000: '15000M',
							20000000000: '20000M',
						}}
						step={null}
						min={0}
						max={40000000}
						defaultValue={range}
						onChange={handlePriceChange}
						className=" mx-4"
					/>
				</div>
			</div>
			<div className="ml-8 mt-6">
				<Button onClick={handleReset} danger>
					<ReloadOutlined />
				</Button>
			</div>
		</div>
	);
};

export const FilterDiamondJewelry = ({handleFilter, setFilters, filters, handleReset}) => {
	const dispatch = useDispatch();
	const metalList = useSelector(GetAllJewelryMetalSelector);
	const categoryList = useSelector(GetAllJewelryModelCategoriesSelector);

	const [metals, setMetals] = useState();
	const [categories, setCategories] = useState();
	const [range, setRange] = useState([0, 40000000]);

	useEffect(() => {
		dispatch(getAllJewelryMetal());
	}, []);

	useEffect(() => {
		dispatch(getAllJewelryModelCategory());
	}, []);

	useEffect(() => {
		if (metalList) {
			setMetals(metalList);
		}
	}, [metalList]);
	useEffect(() => {
		if (categoryList) {
			setCategories(categoryList);
		}
	}, [categoryList]);

	const filterTypes = ['Loại trang sức', 'Kim loại', 'Được Khắc Chữ'];

	const handleFilterChange = (filterType, selectedValues) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedValues,
		}));
	};

	const handlePriceChange = (value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			price: {minPrice: value[0], maxPrice: value[1]},
		}));
	};

	const filterOptions = {
		Type: categories?.map((category) => ({id: category.Name, name: category.Name})),
		Metal: metals?.map((metal) => ({id: metal.Id, name: metal.Name})),
		IsRhodiumFinished: [
			{id: true, name: 'Có'},
			{id: false, name: 'Không'},
		],
		IsEngravable: [
			{id: true, name: 'Có'},
			{id: false, name: 'Không'},
		],
	};

	const filterTypeMapping = {
		'Kim loại': 'Metal',
		'Loại trang sức': 'Type',
		'Được Khắc Chữ': 'IsEngravable',
	};

	// Render the filter UI
	return (
		<div className="p-4 flex flex-wrap items-center md:mr-10">
			{filterTypes.map((filterType) => {
				const optionKey = filterTypeMapping[filterType]; // Map to the correct key in filterOptions
				return (
					<div key={filterType} className="flex flex-col mb-4 sm:mb-0 sm:mr-10">
						<label className="block text-gray-700 mb-1">{filterType}</label>
						<Select
							placeholder={filterType.replace('_', ' ').toUpperCase()} // Display filter type in uppercase
							allowClear
							maxTagCount={0}
							suffixIcon={<DownOutlined />} // Dropdown arrow icon
							className="h-12"
							style={{width: 190}}
							onChange={(value) => handleFilterChange(optionKey, value)} // Handle filter change
							value={filters[optionKey]} // Current selected value for the filter
						>
							{filterOptions[optionKey]?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</div>
				);
			})}

			{/* Price Range Slider */}
			<div className="ml-10 min-w-44 md:min-w-96 sm:ml-0 sm:mt-4">
				<p className="mb-4">Giá:</p>
				<div className="flex">
					<Slider
						range
						min={0}
						max={40000000}
						defaultValue={range}
						onChange={handlePriceChange}
						className="w-full sm:w-64 mx-4"
						marks={{
							0: '0',
							5000000: '5M',
							10000000: '10M',
							20000000: '20M',
							30000000: '30M',
							40000000: '40M',
						}}
						step={null}
					/>
				</div>
			</div>
		</div>
	);
};

export const FilterJewelryCustomize = ({handleFilter, setFilters, filters, handleReset}) => {
	const dispatch = useDispatch();

	const categoryList = useSelector(GetAllJewelryModelCategoriesSelector);

	const [categories, setCategories] = useState();

	useEffect(() => {
		dispatch(getAllJewelryModelCategory());
	}, []);

	useEffect(() => {
		if (categoryList) {
			setCategories(categoryList);
		}
	}, [categoryList]);

	const filterTypes = ['Loại trang sức', 'Được Khắc Chữ'];

	const handleFilterChange = (filterType, selectedValues) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedValues,
		}));
	};

	const handleChange = (e) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			name: e.target.value,
		}));
	};

	const filterOptions = {
		Type: categories?.map((category) => ({id: category.Name, name: category.Name})),
		IsRhodiumFinished: [
			{id: true, name: 'Có'},
			{id: false, name: 'Không'},
		],
		IsEngravable: [
			{id: true, name: 'Có'},
			{id: false, name: 'Không'},
		],
	};

	const filterTypeMapping = {
		'Loại trang sức': 'Type',
		'Hoàn Thiện Rhodium': 'IsRhodiumFinished',
		'Được Khắc Chữ': 'IsEngravable',
	};

	return (
		<div className="p-4 flex items-center">
			{filterTypes.map((filterType) => {
				const optionKey = filterTypeMapping[filterType];
				return (
					<div key={filterType} className="mx-5">
						<label className="block text-gray-700 mb-1">{filterType}</label>
						<Select
							placeholder={filterType.replace('_', ' ').toUpperCase()}
							allowClear
							maxTagCount={0}
							suffixIcon={<DownOutlined />}
							className="h-12"
							style={{width: 190}}
							onChange={(value) => handleFilterChange(optionKey, value)}
							value={filters[optionKey]}
						>
							{filterOptions[optionKey]?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</div>
				);
			})}

			<div className="ml-5 min-w-44">
				<label className="block text-gray-700 mb-1">Tên Trang Sức</label>
				<Input
					allowClear
					onChange={handleChange}
					placeholder="TÊN TRANG SỨC"
					className="h-12"
				/>
			</div>
		</div>
	);
};
