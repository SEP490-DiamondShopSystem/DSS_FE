import {DownOutlined} from '@ant-design/icons';
import {Select, Slider} from 'antd';
import React, {useCallback, useState} from 'react';
import {diamondChoice, genderChoice, marks, metalChoice, Shape} from '../../utils/constant';
import MultiRangeCaratSlider from './MultiRangeSlider/MultiRangeCaratSlider';
import MultiRangePriceSlider from './MultiRangeSlider/MultiRangePriceSlider';

export const FilterDiamond = () => {
	const [filters, setFilters] = useState({
		shape: '',
		price: {minPrice: '', maxPrice: ''},
		carat: {minCarat: '', maxCarat: ''},
		color: '',
	});

	console.log('filters', filters);

	const handleChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handlePriceChange = useCallback(({min, max}) => {
		handleChange('price', {minPrice: min, maxPrice: max});
	}, []);

	const handleCaratChange = useCallback(({min, max}) => {
		handleChange('carat', {minCarat: min, maxCarat: max});
	}, []);

	return (
		<div className="p-4 flex items-center">
			<Select
				placeholder="Shape"
				allowClear
				maxTagCount={0}
				suffixIcon={<DownOutlined />}
				style={{width: '6%'}}
				onChange={(value) => handleChange('shape', value)}
				value={filters.shape}
			>
				{Shape?.map((shape, i) => (
					<Select.Option key={i} value={shape}>
						{shape}
					</Select.Option>
				))}
			</Select>

			{/* Price Range Slider */}
			<div className="ml-10 my-5">
				<p className="mb-4">Price:</p>
				<MultiRangePriceSlider min={0} max={1000} onChange={handlePriceChange} />
			</div>

			{/* Carat Range Slider */}
			<div className="ml-10 my-5">
				<p className="mb-4">Carat:</p>
				<MultiRangeCaratSlider min={0.5} max={30.0} onChange={handleCaratChange} />
			</div>

			{/* Color Slider */}
			<div className="ml-10 my-5 min-w-40">
				<p className="mb-4">Color:</p>
				<Slider
					marks={marks} // Define your `marks` data
					min={0}
					max={7}
					defaultValue={7}
					onChange={(value) => handleChange('color', value)}
				/>
			</div>
		</div>
	);
};

export const FilterJewelry = () => {
	const [filters, setFilters] = useState({
		gender: [],
		diamond_type: [],
		metal: [],
		price: {minPrice: '', maxPrice: ''},
	});

	console.log(filters);

	const handleFilterChange = (type, value) => {
		setFilters((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handlePriceChange = useCallback(({min, max}) => {
		setFilters((prev) => ({
			...prev,
			price: {minPrice: min, maxPrice: max},
		}));
	}, []);

	return (
		<div className="p-4 flex items-center">
			{['gender', 'diamond_type', 'metal'].map((filterType, index) => (
				<Select
					key={index}
					mode="multiple"
					placeholder={filterType.replace('_', ' ').toUpperCase()}
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					className="h-12 mx-5"
					style={{width: '10%', lineHeight: 160}}
					onChange={(value) => handleFilterChange(filterType, value)}
					value={filters[filterType]}
				>
					{(filterType === 'gender'
						? genderChoice
						: filterType === 'diamond_type'
						? diamondChoice
						: metalChoice
					)?.map((item, i) => (
						<Select.Option key={i} value={item}>
							{item}
						</Select.Option>
					))}
				</Select>
			))}

			<div className="ml-10 my-5">
				<p className="mb-4">Price:</p>
				<MultiRangePriceSlider min={0} max={1000} onChange={handlePriceChange} />
			</div>
		</div>
	);
};
