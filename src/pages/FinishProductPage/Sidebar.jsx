import {faGem, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from 'antd';
import React from 'react';

export const Sidebar = ({isOpen, toggleSidebar}) => {
	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					onClick={toggleSidebar}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}

			<div
				className={`fixed top-0 right-0 h-full w-96 bg-white text-white transform transition-transform duration-300 ease-in-out z-50 ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<button onClick={toggleSidebar} className="p-2 bg-red-500">
					Close
				</button>
				<div className="text-black">
					<div className="p-4">
						<h2 className="text-xl font-semibold">
							Add one of the options below to complete your setting
						</h2>
						<p>Choose a diamond to finish your ring.</p>
					</div>
					<div>
						<div className="flex border p-4 m-5 rounded-lg md:cursor-pointer">
							<div className="m-auto pr-5">
								<FontAwesomeIcon icon={faGem} />
							</div>
							<div>
								<p className="font-bold">Diamond</p>
								<span className="text-tintWhite">
									Explore and select different diamond for your setting.
								</span>
							</div>
						</div>
						<div className="flex border p-4 m-5 rounded-lg md:cursor-pointer">
							<div className="m-auto pr-5">
								<FontAwesomeIcon icon={faGem} />
							</div>
							<div>
								<p className="font-bold">Recommended Diamond</p>
								<span className="text-tintWhite">
									Explore diamonds that have been carefully handpicked for your
									ring.
								</span>
							</div>
						</div>
						<div className="flex border p-4 m-5 rounded-lg md:cursor-pointer">
							<div className="m-auto pr-5">
								<FontAwesomeIcon icon={faShoppingBag} />
							</div>
							<div>
								<p className="font-bold">Add to Cart</p>
								<span className="text-tintWhite">
									Happy with this setting? Add to cart now.
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-5">
					<Button type="text" className=" bg-primary w-full text-lg font-semibold p-5">
						CONTINUE
					</Button>
				</div>
			</div>
		</>
	);
};
