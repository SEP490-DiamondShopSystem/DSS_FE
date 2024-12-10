import React from 'react';

import DiscountTable from './DiscountTable';

const discounts = [
	{
		Id: '07ff1b57-c7c1-4c91-b3c4-ab526f78bf9f',
		Name: 'giảm giá kim cương mọi loại hình, từ 0 - 1 carat',
		StartDate: '09-12-2024 22:00:00',
		EndDate: '29-12-2024 00:00:00',
		IsActive: true,
		Status: 2,
		DiscountCode: 'KCSALEOFF',
		DiscountPercent: 20,
		DiscountReq: [
			{
				Id: 'b2a5d753-c18d-4cb7-9593-003d25728ffc',
				Name: 'Yêu cầu kim cương',
				DiamondRequirementSpec: {
					CaratFrom: 0,
					CaratTo: 1,
				},
			},
		],
	},
	// ...các mục khuyến mãi khác
];

const DiscountPage = () => {
	return (
		<div style={{padding: '20px'}}>
			<h1>Danh sách khuyến mãi</h1>
			<DiscountTable discounts={discounts} />
		</div>
	);
};

export default DiscountPage;
