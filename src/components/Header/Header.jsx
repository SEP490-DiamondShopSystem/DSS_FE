import React, {useState} from 'react';

import {HeartOutlined} from '@ant-design/icons';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import Logo from './../../assets/logo-ex.png';
import ActionLinks from './ActionLinks';
import NavLinks from './NavLinks';
import {Badge} from 'antd';

export const Header = () => {
	const [cartFinish, setCartFinish] = useState(() => {
		// Lấy cartFinish từ localStorage
		const storedCartFinish = localStorage.getItem('cartFinish');

		// Parse dữ liệu nếu tồn tại, nếu không thì trả về mảng rỗng
		try {
			return storedCartFinish ? JSON.parse(storedCartFinish) : [];
		} catch (error) {
			console.error('Error parsing cartFinish from localStorage:', error);
			return [];
		}
	});
	return (
		<nav className="bg-white">
			<div className="flex items-center font-semibold justify-around">
				<Link to={'/'}>
					<img src={Logo} alt="logo" className="md:cursor-pointer max-h-12" />
				</Link>
				<ul className="flex uppercase items-center gap-8">
					<li>
						<Link to="/" className={`py-7 px-3 inline-block no-underline text-black`}>
							Trang chủ
						</Link>
					</li>
					<NavLinks />
					<li>
						<Link
							to="/customize/diamond-jewelry"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Đặt trang sức
						</Link>
					</li>
					<li>
						<Link
							to="/promotion"
							className={`py-7 px-3 inline-block no-underline text-black`}
						>
							Khuyến mãi
						</Link>
					</li>
					{/* <li>
						<Link
							to="/contact"
							className={`py-7 px-3 inline-block no-underline text-black
							`}
							onClick={() => handleLinkClick('Contact')}
						>
							Liên hệ
						</Link>
					</li> */}
				</ul>
				{/* <div>
					<Search
						placeholder="Tìm kiếm sản phẩm..."
						onSearch={(value) => console.log(value)}
						style={{width: 400}}
					/>
				</div> */}
				<ul className="flex uppercase items-center gap-8 font-[Open sans]">
					<li>
						<Link
							to="/favorite"
							className="my-7 mx-3 inline-block no-underline text-black"
						>
							<HeartOutlined />
						</Link>
					</li>
					<li>
						<Badge
							count={cartFinish?.length}
							color="#dec986"
							className="my-7 mx-3 py-2 px-2 inline-block no-underline text-black"
						>
							<Link to="/cart">
								<FontAwesomeIcon icon={faShoppingBag} />
							</Link>
						</Badge>
					</li>
					<ActionLinks />
				</ul>
			</div>
		</nav>
	);
};
