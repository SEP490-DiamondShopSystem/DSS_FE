import React, {useEffect, useState} from 'react';

import {DownOutlined, ReloadOutlined} from '@ant-design/icons';
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

export const FilterDiamond = ({filters, setFilters, handleReset}) => {
	const dispatch = useDispatch();
	const shape = useSelector(GetDiamondShapeSelector);
	const filterLimits = useSelector(GetDiamondFilterSelector);

	const [diamondShape, setDiamondShape] = useState();
	const [filter, setFilter] = useState({});

	console.log('filter', filter);

	useEffect(() => {
		dispatch(getDiamondShape());
	}, []);
	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	useEffect(() => {
		if (shape) {
			setDiamondShape(shape);
		}
	}, [shape]);

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
		console.log('value', value);

		localStorage.setItem('selected', value);
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
		<div className="grid grid-cols-3">
			<div className="ml-10 min-w-44">
				<p className="mb-4">Hình Dạng:</p>
				<div className="grid grid-cols-5 gap-10 w-96 mx-auto">
					{shapeItems?.map((item) => (
						<div
							className={`flex items-center flex-col border-2 hover:border-2 hover:border-black px-10 ${
								filters?.shape === item?.value ? 'border-black' : 'border-white'
							}`}
							onClick={() => handleShapeChange(item?.value)}
						>
							<div className="my-5 mx-10">
								<Image preview={false} src={item.image} height={30} width={30} />
							</div>
							<p className="font-semibold">{item.shape}</p>
							{/* <p className="font-semibold ml-20">{item.price}</p> */}
						</div>
					))}
				</div>
			</div>

			{/* Price Range Slider */}
			<div className="ml-10 min-w-44">
				<p className="mb-4">Giá:</p>
				<Slider
					range
					value={[filters?.price?.minPrice, filters?.price?.maxPrice]}
					min={filter?.Price?.Min}
					max={filter?.Price?.Max}
					onChange={handlePriceChange}
				/>
			</div>

			{/* Carat Range Slider */}
			<div className="ml-10 min-w-44">
				<p className="mb-4">Carat:</p>
				<Slider
					range
					value={[filters?.carat?.minCarat, filters?.carat?.maxCarat]}
					step={0.1}
					min={filter?.Carat?.Min}
					max={filter?.Carat?.Max}
					onChange={handleCaratChange}
				/>
			</div>

			<div className="ml-10 min-w-72">
				<p className="my-4">Color:</p>
				<Slider
					range
					marks={marks}
					min={filter?.Color?.Min}
					max={filter?.Color?.Max}
					value={[filters?.color?.minColor, filters?.color?.maxColor]}
					onChange={handleColorChange}
				/>
			</div>
			<div className="ml-10 min-w-72">
				<p className="my-4">Clarity:</p>
				<Slider
					range
					marks={marksClarity}
					min={filter?.Clarity?.Min}
					max={filter?.Clarity?.Max}
					value={[filters?.clarity?.minClarity, filters?.clarity?.maxClarity]}
					onChange={handleClarityChange}
				/>
			</div>
			<div className="ml-10 min-w-72">
				<p className="my-4">Cut:</p>
				<Slider
					range
					marks={marksCut}
					min={filter?.Cut?.Min}
					max={filter?.Cut?.Max}
					value={[filters?.cut?.minCut, filters?.cut?.maxCut]}
					onChange={handleCutChange}
				/>
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
		console.log('value', value);
		localStorage.setItem('selected', value);
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
						value={[filters.carat.minCarat, filters.carat.maxCarat]}
						step={0.1}
						min={minCarat} // Use minCarat from props
						max={maxCarat} // Use maxCarat from props
						onChange={handleCaratChange}
					/>
				</div>
			</div>
			<div className="flex items-center mt-4">
				{/* Price Range Slider */}
				{/* <div className="ml-10 min-w-44">
					<p className="mb-4">Giá:</p>
					<Slider
						range
						value={[filters.price.minPrice, filters.price.maxPrice]}
						min={0}
						max={1000}
						onChange={handlePriceChange}
					/>
				</div> */}

				{/* Carat Range Slider */}
			</div>
			{/* <div className="flex items-center mt-4">
				<div className="ml-10 min-w-72">
					<p className="my-4">Color:</p>
					<Slider
						range
						marks={marks}
						min={1}
						max={8}
						value={[filters.color.minColor, filters.color.maxColor]}
						onChange={handleColorChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Clarity:</p>
					<Slider
						range
						marks={marksClarity}
						min={1}
						max={8}
						value={[filters.clarity.minClarity, filters.clarity.maxClarity]}
						onChange={handleClarityChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Cut:</p>
					<Slider
						range
						marks={marksCut}
						min={1}
						max={3}
						value={[filters.cut.minCut, filters.cut.maxCut]}
						onChange={handleCutChange}
					/>
				</div>
			</div> */}
			{/* <div className="ml-8 mt-6">
				<Button onClick={handleReset} danger>
					<ReloadOutlined />
				</Button>
			</div> */}
		</div>
	);
};

// Component for filtering jewelry items
export const FilterAllJewelry = ({handleFilter, setFilters, filters, handleReset}) => {
	const filterTypes = ['type', 'metal'];

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
				<p className="mb-4">Price:</p>
				<Slider
					range
					min={0}
					max={1000}
					defaultValue={[0, 1000]} // Default price range
					onChange={handlePriceChange} // Handle price change
				/>
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
		<div wrap className="p-4 flex items-center">
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
				<p className="mb-4">Price:</p>
				<Slider
					range
					min={0}
					max={1000}
					defaultValue={[0, 1000]} // Default price range
					onChange={handlePriceChange} // Handle price change
				/>
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

	console.log('metalList', metals);
	console.log('categoryList', categories);

	const filterTypes = ['Loại trang sức', 'Kim loại'];

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
		type: categories?.map((category) => ({id: category.Name, name: category.Name})),
		metal: metals?.map((metal) => ({id: metal.Id, name: metal.Name})),
	};

	const filterTypeMapping = {
		'Kim loại': 'metal',
		'Loại trang sức': 'type',
	};

	console.log('filterOptions', filterOptions[1]);

	// Render the filter UI
	return (
		<div wrap className="p-4 flex items-center">
			{filterTypes.map((filterType) => {
				const optionKey = filterTypeMapping[filterType]; // Map to the correct key in filterOptions
				return (
					<Select
						key={filterType} // Use the filter type as key
						placeholder={filterType.replace('_', ' ').toUpperCase()} // Display filter type in uppercase
						allowClear
						maxTagCount={0}
						suffixIcon={<DownOutlined />} // Dropdown arrow icon
						className="h-12 mx-5"
						style={{width: '10%'}}
						onChange={(value) => handleFilterChange(optionKey, value)} // Handle filter change
						value={filters[optionKey]} // Current selected value for the filter
					>
						{filterOptions[optionKey]?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				);
			})}

			{/* Price Range Slider */}
			<div className="ml-10 min-w-44">
				<p className="mb-4">Price:</p>
				<Slider
					range
					min={0}
					max={40000000}
					defaultValue={[0, 40000000]} // Default price range
					onChange={handlePriceChange} // Handle price change
				/>
			</div>
			<div className="ml-8 mt-6">
				<Button onClick={handleReset} danger>
					<ReloadOutlined />
				</Button>
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

	console.log('categoryList', categories);

	const filterTypes = ['Loại trang sức', 'Hoàn Thiện Rhodium', 'Được Khắc Chữ'];

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
		type: categories?.map((category) => ({id: category.Name, name: category.Name})),
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
		'Loại trang sức': 'type',
		'Hoàn Thiện Rhodium': 'IsRhodiumFinished',
		'Được Khắc Chữ': 'IsEngravable',
	};

	console.log('filterOptions', filterOptions[1]);

	// Render the filter UI
	return (
		<div wrap className="p-4 flex items-center">
			{filterTypes.map((filterType) => {
				const optionKey = filterTypeMapping[filterType]; // Map to the correct key in filterOptions
				return (
					<Select
						key={filterType} // Use the filter type as key
						placeholder={filterType.replace('_', ' ').toUpperCase()} // Display filter type in uppercase
						allowClear
						maxTagCount={0}
						suffixIcon={<DownOutlined />} // Dropdown arrow icon
						className="h-12 mx-5"
						style={{width: '10%'}}
						onChange={(value) => handleFilterChange(optionKey, value)} // Handle filter change
						value={filters[optionKey]} // Current selected value for the filter
					>
						{filterOptions[optionKey]?.map((item) => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				);
			})}

			<div className="ml-10 min-w-44">
				<Input
					allowClear
					onChange={handleChange}
					placeholder="Tên Trang Sức"
					className="h-12 "
				/>
			</div>
			{/* <div className="ml-8 mt-6">
				<Button onClick={handleReset} danger>
					<ReloadOutlined />
				</Button>
			</div> */}
		</div>
	);
};
