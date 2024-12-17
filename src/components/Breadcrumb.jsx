import React from 'react';
import {Breadcrumb} from 'antd';
import {Link, useLocation} from 'react-router-dom';

const Breadcrumbs = () => {
	const location = useLocation();

	// Từ điển ánh xạ đường dẫn sang tiếng Việt

	const urlToVietnameseMap = {
		'/': 'Trang chủ',
		jewelry: 'Trang sức',
		'jewelry-model': 'Mẫu Trang Sức',
		search: 'Tìm Kiếm',
		diamond: 'Kim Cương',
		'diamond-detail': 'Chi Tiết Kim Cương',
		'my-orders': 'Đơn Hàng Của Tôi',
		'request-customize': 'Đơn Thiết Kế',
		'my-info': 'Thông Tin',
		'lock-product': 'Sản Phẩm Đã Khóa',
		'jewelry/design-your-own-earrings': 'Tự thiết kế bông tai',
		'jewelry/design-your-own-necklaces': 'Tự thiết kế dây chuyền',
		'jewelry/design-your-own-rings': 'Tự thiết kế nhẫn',
		'price-list/main': 'Bảng giá chính',
		'price-list/side': 'Bảng giá phụ',
		'diamond/search': 'Tìm kiếm kim cương',
		'jewelry-model/search': 'Mẫu trang sức',
		'change-password': 'Đổi mật khẩu',
		cart: 'Giỏ hàng',
		checkout: 'Thanh toán',
		payment: 'Thanh toán',
		invoice: 'Hóa đơn',
		coupons: 'Mã giảm giá',
		promotion: 'Khuyến mãi',
		discount: 'Giảm giá',
		'payment-policy': 'Chính sách thanh toán',
		'shipping-policy': 'Chính sách vận chuyển',
		terms: 'Điều khoản dịch vụ',
		'member-policy': 'Chính sách khách hàng thân thiết',
		guide: 'Hướng dẫn mua sắm',
		warranty: 'Chính sách bảo hành',
		verified: 'Xác minh thành công',
		'verify-failed': 'Xác minh thất bại',
		'payment-success': 'Thanh toán thành công',
		'payment-error': 'Thanh toán thất bại',
		'cart/summary': 'Tóm tắt giỏ hàng',
		'cart/checkout': 'Kiểm tra giỏ hàng',
		'product/:id': 'Chi tiết sản phẩm',
		'coupon/:id': 'Mã giảm giá',
		'order/:id': 'Chi tiết đơn hàng',
		'order-status/:id': 'Trạng thái đơn hàng',
		'payment-result/:id': 'Kết quả thanh toán',
		customize: 'Yêu cầu thiết kế',
		'diamond-jewelry': 'Trang sức',
		'*': 'Không tìm thấy trang',
	};

	// Tách đường dẫn hiện tại thành các đoạn
	const pathSnippets = location.pathname.split('/').filter((i) => i);

	// Thêm "Trang chủ" vào đầu breadcrumbs
	const breadcrumbItems = [
		<Breadcrumb.Item key="home">
			<Link to="/" className="text-blue-500 hover:underline">
				Trang chủ
			</Link>
		</Breadcrumb.Item>,
		...pathSnippets.map((segment, index) => {
			const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
			const isLast = index === pathSnippets.length - 1;
			console.log('segment', segment);

			const label = urlToVietnameseMap[segment] || segment;

			return isLast ? (
				<Breadcrumb.Item key={url} className="text-gray-500">
					{decodeURIComponent(label)}
				</Breadcrumb.Item>
			) : (
				<Breadcrumb.Item key={url}>
					<Link to={url} className="text-blue-500 hover:underline">
						{decodeURIComponent(label)}
					</Link>
				</Breadcrumb.Item>
			);
		}),
	];

	return (
		<div className="bg-gray-100 p-4 rounded-md shadow-md">
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	);
};

export default Breadcrumbs;
