import {DownOutlined} from '@ant-design/icons';
import {Select, Slider} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {marks, metalJewelry, Shape} from '../../utils/constant';
import MultiRangeSlider from './MultiRangeSlider/MultiRangePriceSlider';
import MultiRangePriceSlider from './MultiRangeSlider/MultiRangePriceSlider';
import MultiRangeCaratSlider from './MultiRangeSlider/MultiRangeCaratSlider';

export const FilterDiamond = () => {
	const [values, setValues] = useState({
		shape: '',
		price: '',
		carat: '',
		color: '',
	});
	const [price, setPrice] = useState({minPrice: '', maxPrice: ''});
	const [carats, setCarats] = useState({minCarat: '', maxCarat: ''});
	const [color, setColor] = useState();

	useEffect(() => {
		setValues((prev) => ({
			...prev,
			price: price,
			carat: carats,
			color: color,
		}));
	}, [price, carats, color]);

	const handlePriceChange = useCallback(({min, max}) => {
		setPrice({
			minPrice: min,
			maxPrice: max,
		});
	}, []);

	const handleCaratChange = useCallback(({min, max}) => {
		setCarats({
			minCarat: min,
			maxCarat: max,
		});
	}, []);

	const handleColorChange = (color) => {
		setColor(color);
	};

	const handleChange = (e) => {
		setValues((prev) => ({
			...prev,
			shape: e,
		}));
	};

	return (
		<div className="">
			<div className="p-4 flex items-center">
				{/* Select Metal Dropdown */}
				<Select
					// mode="multiple"
					placeholder="Shape"
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					style={{width: '6%'}}
					onChange={handleChange}
					value={values.shape}
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
				<div className="ml-10 my-5">
					<p className="mb-4">Carat:</p>
					<MultiRangeCaratSlider min={0.5} max={30.0} onChange={handleCaratChange} />
				</div>
				<div className="ml-10 my-5 min-w-40">
					<p className="mb-4">Color:</p>
					<Slider
						marks={marks}
						min={0}
						max={7}
						defaultValue={7}
						onChange={handleColorChange}
					/>
				</div>
			</div>
		</div>
	);
};

export const FilterJewelry = () => {
	const [values, setValues] = useState({min: '', max: ''});
	const [selectedMetals, setSelectedMetals] = useState([]);

	const handleRangeChange = useCallback(({min, max}) => {
		setValues({
			min: min,
			max: max,
		});
	}, []);

	console.log(values);

	const handleMetalChange = (selected) => {
		setSelectedMetals(selected);
	};

	return (
		<div className="">
			<div className="mb-4 p-4 flex items-center">
				{/* Select Metal Dropdown */}
				<Select
					mode="multiple"
					placeholder="Metal"
					allowClear
					maxTagCount={0}
					suffixIcon={<DownOutlined />}
					style={{width: '6%'}}
					onChange={handleMetalChange}
					value={selectedMetals}
				>
					{metalJewelry?.map((metal, i) => (
						<Select.Option key={i} value={metal}>
							{metal}
						</Select.Option>
					))}
				</Select>
				{/* Price Range Slider */}
				<div className="ml-10 my-5">
					<p className="mb-4">Price:</p>
					<MultiRangeSlider min={0} max={1000} onChange={handleRangeChange} />
				</div>
			</div>
		</div>
	);
};
