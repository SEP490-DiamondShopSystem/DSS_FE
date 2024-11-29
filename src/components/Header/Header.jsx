import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import Logo from './../../assets/logo-ex.png';
import NavLinks from './NavLinks';
import ActionLinks from './ActionLinks';

export const Header = () => {
	const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleValidate = () => {
		navigate('/cart');
	};
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	return (
		<nav className="bg-white shadow-md fixed top-0 right-0 left-0 z-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Link to={'/'}>
						<img src={Logo} alt="logo" className="h-10 md:h-12 cursor-pointer" />
					</Link>

					{/* Navigation Links */}
					<div className="hidden lg:flex items-center gap-6">
						<Link
							to="/"
							className="py-2 px-3 text-sm md:text-base lg:text-lg no-underline text-black"
						>
							Trang chủ
						</Link>
						<NavLinks />
						<Link
							to="/customize/diamond-jewelry"
							className="py-2 px-3 text-sm md:text-base lg:text-lg no-underline text-black"
						>
							Thiết Kế Trang Sức
						</Link>
						<Link
							to="/promotion"
							className="py-2 px-3 text-sm md:text-base lg:text-lg no-underline text-black"
						>
							Khuyến mãi
						</Link>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-4">
						<button
							onClick={handleValidate}
							className="text-gray-600 hover:text-gray-800 transition-colors"
						>
							<FontAwesomeIcon icon={faShoppingBag} className="text-lg md:text-xl" />
						</button>
						<div className="hidden lg:flex items-center">
                            <ActionLinks />
                        </div>

						{/* Mobile Menu Toggle */}
						<button
							onClick={toggleMobileMenu}
							className="lg:hidden text-gray-600 hover:text-gray-800"
						>
							<FontAwesomeIcon
								icon={isMobileMenuOpen ? faTimes : faBars}
								className="text-lg"
							/>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="lg:hidden absolute left-0 right-0 bg-white shadow-lg">
						<div className="px-4 pt-2 pb-4 space-y-2">
							<Link
								to="/"
								className="block py-2 text-base no-underline text-black hover:bg-gray-100"
								onClick={toggleMobileMenu}
							>
								Trang chủ
							</Link>
							<div>
								<NavLinks />
							</div>
							<Link
								to="/customize/diamond-jewelry"
								className="block py-2 text-base no-underline text-black hover:bg-gray-100"
								onClick={toggleMobileMenu}
							>
								Thiết Kế Trang Sức
							</Link>
							<Link
								to="/promotion"
								className="block py-2 text-base no-underline text-black hover:bg-gray-100"
								onClick={toggleMobileMenu}
							>
								Khuyến mãi
							</Link>
							<div className="pt-2 border-t">
								<ActionLinks />
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};
