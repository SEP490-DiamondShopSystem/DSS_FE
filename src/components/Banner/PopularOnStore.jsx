import {Image} from 'antd';
import React, {useEffect, useState} from 'react';
import Loading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../assets/ring_classic.png'; // Fallback image
import {GetAllJewelrySelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getAllJewelry} from '../../redux/slices/jewelrySlice';

export const PopularOnStore = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const jewelryList = useSelector(GetAllJewelrySelector);
	const loading = useSelector(LoadingJewelrySelector);
	const [jewelries, setJewelries] = useState([]);
	const [currentStartIndex, setCurrentStartIndex] = useState(0);
	const itemsToShow = 5; // Number of items to show

	useEffect(() => {
		dispatch(getAllJewelry());
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) {
			setJewelries(jewelryList);
		}
	}, [jewelryList]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStartIndex((prevIndex) => {
				// Calculate the new index based on the current index
				const newIndex = prevIndex + itemsToShow;
				// Wrap around if we exceed the length
				return newIndex >= jewelries.length ? 0 : newIndex;
			});
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval);
	}, [jewelries.length]); // Runs when the length of jewelry changes

	const onProductClick = (id) => {
		navigate(`/jewelry-model/search/${id}`);
	};

	// Function to display only the current set of items
	const displayedJewelry = () => {
		if (jewelries.length === 0) return [];
		return jewelries.slice(currentStartIndex, currentStartIndex + itemsToShow);
	};

	return (
		<div className="mt-10 p-4">
			{' '}
			{/* Added padding on the x-axis */}
			{loading ? (
				<Loading />
			) : (
				<div>
					<h2 className="text-center text-3xl font-bold m-5 text-gray-800">
						{' '}
						{/* Increased margin-bottom from 8 to 12 */}
						Popular on our store
					</h2>
					<div className="relative">
						{/* Scrollable product container */}
						<div
							className="flex gap-6 overflow-hidden" // Increased gap from 4 to 6 for more space
							style={{
								width: '100%', // Full width of the parent
								overflowX: 'hidden',
								padding: '0 10px', // Added horizontal padding
							}}
						>
							{displayedJewelry().map((jewelry, index) => (
								<div
									key={index}
									className="min-w-[200px] max-w-[200px] shadow-lg bg-white rounded-lg hover:border-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
									onClick={() => onProductClick(jewelry.id)}
									style={{margin: '0 10px'}} // Added margin to each item
								>
									<div className="w-full">
										<div
											className="flex justify-center mb-5"
											style={{background: '#b8b7b5', padding: '10px'}} // Added padding for the image container
										>
											<Image
												src={jewelry.image ? jewelry.image : jewelryImg} // Use fallback if image is not available
												alt={jewelry.title}
												preview={false}
												className="w-full h-auto object-cover"
											/>
										</div>
										<div className="mx-5 my-5 text-center">
											<p className="text-lg font-semibold">{jewelry.title}</p>
											<div className="flex justify-center mt-2">
												<p className="line-through text-gray-400">
													{jewelry.price}
												</p>
												<p className="ml-5 text-gray-700 font-bold">
													{jewelry.discountPrice}
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PopularOnStore;
