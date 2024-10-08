// CheckOutSummary.jsx
import React from 'react';

const CheckOutSummary = ({ promo }) => {
    const subtotal = 525; // Example subtotal, update as necessary
    const promoDiscount = promo ? parseFloat(promo) : 0;
    const total = subtotal - promoDiscount;

    return (
        <div className="w-full lg:w-1/3 bg-gray-50 p-10 border rounded-lg shadow-md lg:sticky lg:top-8">
            <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                <div className="space-y-6">
                    <p className="flex justify-between text-lg text-gray-700">
                        <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg text-gray-700">
                        <span>Promo</span> <span>{promo ? `-${promo}` : '$0'}</span>
                    </p>
                    <hr className="border-t" />
                    <p className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span> <span>${total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
            <button className="mt-10 w-full bg-[rgb(222,201,134)] hover:bg-[rgb(202,181,114)] text-black font-bold py-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[rgb(222,201,134)]">
                Check Out
            </button>
        </div>
    );
};

export default CheckOutSummary;
