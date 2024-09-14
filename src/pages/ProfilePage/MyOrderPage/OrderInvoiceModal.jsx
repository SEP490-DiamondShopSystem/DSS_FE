import React from 'react';

export const OrderInvoiceModal = ({openInvoice, toggleInvoiceModal}) => {
	return (
		<>
			{openInvoice && (
				<div
					onClick={toggleInvoiceModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openInvoice && (
				<div
					className={`fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out ${
						openInvoice ? 'z-50' : 'z-0'
					} ${openInvoice ? 'translate-x-1/2 -translate-y-1/2' : 'translate-x-full'}`}
					style={{width: 1200, height: 700}}
				>
					<div className="flex justify-between items-center px-10 mt-10">
						<div>
							<Image src="" alt="" preview={false} />
							<p>Địa chỉ Shop</p>
						</div>
						<div className="text-end">
							<h2 className="uppercase text-2xl font-semibold">order status</h2>
							<p className="">Invoice ID: #1031</p>
							<p className="">Date: August 19, 2024</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
