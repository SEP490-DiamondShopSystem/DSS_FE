import React, {useEffect, useState} from 'react';

import {DownOutlined, ReloadOutlined} from '@ant-design/icons';
import {Button, Select, Slider} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {
	genderChoice,
	marks,
	marksClarity,
	marksCut,
	metalChoice,
	Shape,
	typeChoice,
} from '../../utils/constant';
import {GetDiamondShapeSelector} from '../../redux/selectors';
import {getDiamondShape} from '../../redux/slices/diamondSlice';

export const FilterDiamond = ({filters, setFilters, handleReset}) => {
	const dispatch = useDispatch();
	const shape = useSelector(GetDiamondShapeSelector);

	const [diamondShape, setDiamondShape] = useState();

	useEffect(() => {
		dispatch(getDiamondShape());
	}, []);

	useEffect(() => {
		if (shape) {
			setDiamondShape(shape);
		}
	}, [shape]);

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
		<div className="py-4 ">
			<div className="flex items-center">
				<Select
					placeholder="SHAPE"
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					className="h-12 ml-10"
					style={{width: '10%', lineHeight: 160}}
					onChange={(value) => handleChange('shape', value)}
					value={filters.shape || 'Hình dạng'}
				>
					{diamondShape?.map((shape, i) => (
						<Select.Option key={i} value={shape?.ShapeName}>
							{shape?.ShapeName}
						</Select.Option>
					))}
				</Select>
			</div>
			<div className="flex items-center mt-4">
				{/* Price Range Slider */}
				<div className="ml-10 min-w-44">
					<p className="mb-4">Giá:</p>
					<Slider
						range
						value={[filters.price.minPrice, filters.price.maxPrice]}
						min={0}
						max={1000}
						onChange={handlePriceChange}
					/>
				</div>

				{/* Carat Range Slider */}
				<div className="ml-10 min-w-44">
					<p className="mb-4">Carat:</p>
					<Slider
						range
						value={[filters.carat.minCarat, filters.carat.maxCarat]}
						step={0.1}
						min={0.5}
						max={30.0}
						onChange={handleCaratChange}
					/>
				</div>

				{/* Color Slider */}
			</div>
			<div className="flex items-center mt-4">
				<div className="ml-10 min-w-72">
					<p className="my-4">Color:</p>
					<Slider
						range
						marks={marks}
						min={0}
						max={7}
						value={[filters.color.minColor, filters.color.maxColor]}
						onChange={handleColorChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Clarity:</p>
					<Slider
						range
						marks={marksClarity}
						min={0}
						max={7}
						value={[filters.clarity.minClarity, filters.clarity.maxClarity]}
						onChange={handleClarityChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Cut:</p>
					<Slider
						range
						marks={marksCut}
						min={0}
						max={3}
						value={[filters.cut.minCut, filters.cut.maxCut]}
						onChange={handleCutChange}
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

// Component for filtering jewelry items
export const FilterAllJewelry = ({handleFilter, setFilters, filters, handleReset}) => {
	const filterTypes = ['gender', 'type', 'metal'];

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
	const filterTypes = ['Loại trang sức', 'kim loại'];

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
