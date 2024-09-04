import {DownOutlined} from '@ant-design/icons';
import {Select} from 'antd';
import React, {useCallback, useState} from 'react';
import {metalJewelry} from '../../utils/constant';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';

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
