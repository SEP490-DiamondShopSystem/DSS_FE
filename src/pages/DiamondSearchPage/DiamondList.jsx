import React from 'react';
import {listDiamond} from '../../utils/constant';
import {Image} from 'antd';

export const DiamondList = () => {
	return (
		<div className="grid grid-cols-4 gap-10 m-20">
			{listDiamond?.map((diamond, i) => (
				<div key={i} className=" shadow-lg bg-white rounded-lg">
					<div className="w-80">
						<div className=" flex justify-center mb-5 " style={{background: '#b8b7b5'}}>
							<Image src={diamond.img} alt={diamond.title} className="" />
						</div>
						<div className="mx-10 my-5">
							<p>{diamond.title}</p>
							<p style={{color: '#707070'}}>{diamond.price}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
