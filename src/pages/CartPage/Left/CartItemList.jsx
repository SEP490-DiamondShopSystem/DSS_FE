// CartItemList.jsx
import React, { useState, useEffect } from 'react';

const CartItemList = ({ ringSize, setRingSize, promo, setPromo }) => {
    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedRingSize = localStorage.getItem('ringSize');
        const savedPromo = localStorage.getItem('promo');
        if (savedRingSize) setRingSize(savedRingSize);
        if (savedPromo) setPromo(savedPromo);
    }, [setRingSize, setPromo]);

    // Handle ring size change and save it to localStorage
    const handleRingSizeChange = (event) => {
        const newRingSize = event.target.value;
        setRingSize(newRingSize);
        localStorage.setItem('ringSize', newRingSize);
    };

    // Handle promo change and save it to localStorage
    const handlePromoChange = (event) => {
        const newPromo = event.target.value;
        setPromo(newPromo);
        localStorage.setItem('promo', newPromo);
    };

    return (
        <div className="w-full lg:w-2/3 space-y-16">
            {/* Engagement Ring Section */}
            <div className="bg-white p-10 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-6">
                    Engagement Ring (Completed)
                </h2>
                <div className="flex mt-8">
                    <div className="mr-8 flex-shrink-0">
                        <img
                            src="path-to-image"
                            alt="Engagement Ring"
                            className="w-40 h-40 object-cover rounded-lg border"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <p className="text-lg font-medium text-gray-800">
                            French Pavé Diamond Engagement Ring in 14k White Gold (1/4 ct. tw.)
                        </p>
                        <p className="text-gray-700 text-sm">
                            SKU: 501410w14{' '}
                            <span className="line-through text-gray-400 mr-2">$1,470</span>
                            <span className="font-semibold text-gray-900">$1,102</span>
                        </p>
                        <p className="text-gray-800">
                            1.03 Carat H-VS2 Excellent Cut Round Diamond
                        </p>
                        <p className="text-gray-700 text-sm">
                            SKU: 22226368{' '}
                            <span className="font-semibold text-gray-900">$3,530</span>
                        </p>
                        <div className="flex items-center mt-4">
                            <label className="mr-3 text-gray-700">Ring size:</label>
                            <select
                                value={ringSize}
                                onChange={handleRingSizeChange}
                                className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Size</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                {/* Add more sizes as needed */}
                            </select>
                            <span className="ml-3 text-blue-500 text-sm cursor-pointer">
                                Find your ring size
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-6 text-sm text-yellow-600">
                        <span className="cursor-pointer">View</span>
                        <span className="cursor-pointer">Remove</span>
                    </div>
                </div>
            </div>

            {/* Loose Diamond Section */}
            <div className="bg-white p-10 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-6">Loose Diamond</h2>
                <div className="flex mt-8">
                    <div className="mr-8 flex-shrink-0">
                        <img
                            src="path-to-image"
                            alt="Loose Diamond"
                            className="w-40 h-40 object-cover rounded-lg border"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <p className="text-lg font-medium text-gray-800">
                            Lab-Grown 1.55 Carat Round Diamond
                        </p>
                        <p className="text-gray-700 text-sm">
                            SKU: 800780y1401I{' '}
                            <span className="line-through text-gray-400 mr-2">$520</span>
                            <span className="font-semibold text-gray-900">$362</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end space-y-6 text-sm text-yellow-600">
                        <span className="cursor-pointer">View</span>
                        <span className="cursor-pointer">Remove</span>
                    </div>
                </div>
            </div>

            {/* Available Promotions Section */}
            <div className="bg-white p-10 border rounded-lg shadow-md">
                <label htmlFor="promotions" className="block mb-6 text-gray-700 font-medium">
                    Available Promotions
                </label>
                <select
                    id="promotions"
                    value={promo}
                    onChange={handlePromoChange}
                    className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Promotion</option>
                    {/* Add more promotions as needed */}
                </select>
            </div>
        </div>
    );
};

export default CartItemList;
