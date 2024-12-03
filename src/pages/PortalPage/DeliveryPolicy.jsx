import React from 'react';

const ShippingPolicy = () => {
	return (
		<div className="px-6 py-8 md:px-12 md:py-16">
			{/* Breadcrumb */}

			{/* Title */}
			<h1 className="text-center text-2xl md:text-3xl font-bold mb-8">
				CHÍNH SÁCH GIAO HÀNG
			</h1>

			{/* Nội thành TP.HCM */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-4">1. Nội thành TP. Hồ Chí Minh</h2>
				<ul className="list-disc ml-5 space-y-2">
					<li>Miễn phí giao hàng, kiểm tra, thanh toán.</li>
					<li>
						Đối với hàng thiết kế theo yêu cầu, quý khách vui lòng chuyển khoản trước
						<strong> 5.000.000 (năm triệu đồng)</strong>, giao tận nơi thanh toán số
						tiền còn lại.
					</li>
					<li>
						Thời gian nhận hàng trong vòng <strong>12 tiếng</strong> từ khi nhân viên
						Diamond Shop gọi xác nhận đơn hàng. (Nếu quý khách đặt sau 20h thì đơn hàng
						sẽ được xử lý vào sáng hôm sau).
					</li>
				</ul>
			</section>

			{/* Các thành phố khác */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-4">2. Các thành phố khác</h2>
				<ul className="list-disc ml-5 space-y-2">
					<li>
						Miễn phí giao hàng với các hóa đơn trên{' '}
						<strong>10.000.000 (mười triệu đồng)</strong>.
					</li>
					<li>
						Quý khách chuyển khoản trước <strong>10%</strong>, nhân viên của Diamond
						Shop sẽ giao tận nơi và thanh toán, không gửi hàng theo chính sách gói đảm
						bảo.
					</li>
					<li>
						Thời gian nhận hàng trong vòng <strong>72 tiếng</strong> (tùy khu vực).
					</li>
				</ul>
			</section>

			{/* Hình thức thanh toán */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-4">3. Hình thức thanh toán</h2>
				<ul className="list-disc ml-5 space-y-2">
					<li>Trả bằng tiền mặt khi nhân viên Diamond Shop giao tận nơi.</li>
					<li>
						Thanh toán qua số tài khoản:{' '}
						<strong>999 111 8888 Nguyễn Thị Ngọc Dung (Vietcombank)</strong>.
					</li>
					<li>Để lại thông tin: [HỌ VÀ TÊN] | [SĐT] | [MÓN HÀNG].</li>
					<li>Nếu khách hàng trả bằng USD sẽ tính theo thời điểm giao hàng.</li>
				</ul>
			</section>

			{/* Lưu ý */}
			<p className="text-yellow-500 text-sm mb-6">
				<strong>Lưu ý:</strong> Quý khách có thể không nhận sản phẩm khi không hài lòng với
				sản phẩm của chúng tôi do lỗi kỹ thuật hoặc sai mẫu khách hàng đã chọn.
			</p>
		</div>
	);
};

export default ShippingPolicy;
