import {DownOutlined} from '@ant-design/icons';
import {Select, Slider} from 'antd';
import React, {useCallback, useState} from 'react';
import {
	diamondChoice,
	genderChoice,
	marks,
	marksClarity,
	marksCut,
	metalChoice,
	Shape,
} from '../../utils/constant';

export const FilterDiamond = () => {
	const [filters, setFilters] = useState({
		shape: '',
		price: {minPrice: '', maxPrice: ''},
		carat: {minCarat: '', maxCarat: ''},
		color: {minColor: '', maxColor: ''},
		clarity: {minClarity: '', maxClarity: ''},
		cut: {minCut: '', maxCut: ''},
	});

	console.log('filters', filters);

	const handleChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handlePriceChange = (value) => {
		handleChange('color', {minPrice: value[0], maxPrice: value[1]});
	};

	const handleCaratChange = (value) => {
		handleChange('color', {minCarat: value[0], maxCarat: value[1]});
	};

	const handleColorChange = (value) => {
		handleChange('color', {minColor: value[0], maxColor: value[1]});
	};
	const handleClarityChange = (value) => {
		handleChange('clarity', {minClarity: value[0], maxClarity: value[1]});
	};
	const handleCutChange = (value) => {
		handleChange('color', {minCut: value[0], maxCut: value[1]});
	};

	return (
		<div className="p-4">
			<div className="flex items-center">
				<Select
					placeholder="SHAPE"
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					className="h-12 ml-10"
					style={{width: '10%', lineHeight: 160}}
					onChange={(value) => handleChange('shape', value)}
					value={filters.shape}
				>
					{Shape?.map((shape, i) => (
						<Select.Option key={i} value={shape}>
							{shape}
						</Select.Option>
					))}
				</Select>
			</div>
			<div className="flex items-center mt-4">
				{/* Price Range Slider */}
				<div className="ml-10 min-w-44">
					<p className="mb-4">Price:</p>
					<Slider
						range
						defaultValue={[0, 1000]}
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
						defaultValue={[0.5, 30.0]}
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
						marks={marks} // Define your `marks` data
						min={0}
						max={7}
						defaultValue={[0, 7]}
						onChange={handleColorChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Clarity:</p>
					<Slider
						range
						marks={marksClarity} // Define your `marks` data
						min={0}
						max={7}
						defaultValue={[0, 7]}
						onChange={handleClarityChange}
					/>
				</div>
				<div className="ml-10 min-w-72">
					<p className="my-4">Cut:</p>
					<Slider
						range
						marks={marksCut} // Define your `marks` data
						min={0}
						max={3}
						defaultValue={[0, 3]}
						onChange={handleCutChange}
					/>
				</div>
			</div>
		</div>
	);
};

// Component for filtering jewelry items
export const FilterJewelry = () => {
	const [filters, setFilters] = useState({
		gender: [],
		diamond_type: [],
		metal: [],
		price: {minPrice: 0, maxPrice: 1000}, // Initialize with default price range
	});

	const filterTypes = ['gender', 'diamond_type', 'metal'];
	// Logs current filters state
	console.log(filters);

	// General handler for updating specific filter type (e.g., gender, diamond_type, metal)
	const handleFilterChange = (filterType, selectedValues) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: selectedValues,
		}));
	};

	// Specialized handler for updating price range
	const handlePriceChange = (value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			price: {minPrice: value[0], maxPrice: value[1]}, // Update min and max price
		}));
	};

	// Data mapping based on filter type (gender, diamond type, or metal)
	const filterOptions = {
		gender: genderChoice,
		diamond_type: diamondChoice,
		metal: metalChoice,
	};

	// Render the filter UI
	return (
		<div className="p-4 flex items-center">
			{/* Render Select components for each filter type */}
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
					{/* Render options dynamically based on the filter type */}
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
		</div>
	);
};
