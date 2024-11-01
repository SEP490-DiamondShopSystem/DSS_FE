import {Rate} from 'antd';
import React from 'react';
import {StarFilled, StarOutlined, StarTwoTone} from '@ant-design/icons';

export const Rating = ({rating}) => {
	const maxStars = 5;

	// Tính số lượng sao đầy, nửa sao và sao trống
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 !== 0;
	const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

	return (
		<div className="flex items-center">
			{/* Hiển thị sao đầy */}
			{Array(fullStars)
				.fill(0)
				.map((_, index) => (
					<StarFilled key={`full-${index}`} className="text-yellow-400 text-xl" />
				))}

			{/* Hiển thị nửa sao nếu có */}
			{halfStar && <StarTwoTone twoToneColor="#fadb14" className="text-xl" />}

			{/* Hiển thị sao trống */}
			{Array(emptyStars)
				.fill(0)
				.map((_, index) => (
					<StarOutlined key={`empty-${index}`} className="text-gray-300 text-xl" />
				))}
		</div>
	);
};

export const StarRating = ({rating}) => {
	console.log('rating', rating);

	return (
		<>
			<Rate allowHalf value={rating} disabled />
		</>
	);
};

export const formatPrice = (price) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0, // To avoid decimal places for whole numbers
	}).format(price);
};

export function convertToVietnamDate(utcDateString) {
	// Create a Date object from the UTC date string
	const utcDate = new Date(utcDateString);

	// Get the timezone offset in minutes and convert it to milliseconds
	const vnTimeZoneOffset = 7 * 60; // UTC+7 in minutes
	const utcOffset = utcDate.getTimezoneOffset(); // Offset in minutes

	// Calculate the local time in Vietnam
	const vnDate = new Date(utcDate.getTime() + (vnTimeZoneOffset + utcOffset) * 60 * 1000);

	// Extract the day, month, and year
	const day = String(vnDate.getDate()).padStart(2, '0'); // Pad single digit day with leading zero
	const month = String(vnDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
	const year = vnDate.getFullYear();

	// Format to DD/MM/YYYY
	return `${day}/${month}/${year}`;
}

export const getOrderStatus = (status) => {
	switch (status) {
		case 1:
			return 'Pending';
		case 2:
			return 'Processing';
		case 3:
			return 'Rejected';
		case 4:
			return 'Cancelled';
		case 5:
			return 'Prepared';
		case 6:
			return 'Delivering';
		case 7:
			return 'Delivery Failed';
		case 8:
			return 'Success';
		case 9:
			return 'Refused';
		default:
			return 'Unknown';
	}
};

export const getOrderPaymentStatus = (status) => {
	switch (status) {
		case 1:
			return 'Paid All';
		case 2:
			return 'Deposited';
		case 3:
			return 'Refunding';
		case 4:
			return 'Refunded';
		case 5:
			return 'Pending';
		case 6:

		default:
			return 'Unknown';
	}
};

export const getStepFromStatus = (status) => {
	switch (status) {
		case 'Pending':
			return 0;
		case 'Processing':
			return 1;
		case 'Prepared':
			return 2;
		case 'Delivering':
			return 3;
		case 'Delivery_Failed':
			return 4;
		case 'Success':
			return 5;
		case 'Refused':
			return 6;
		default:
			return 0;
	}
};
