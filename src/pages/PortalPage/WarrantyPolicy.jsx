import React from 'react';
import {Typography, Card} from 'antd';
import { HomeOutlined, SmileOutlined} from '@ant-design/icons';
import 'antd/dist/reset.css';

const {Title, Text} = Typography;

const WarrantyPolicyPage = () => {
	return (
		<div className="bg-gray-100 min-h-screen py-10">
			{/* Hero Section */}
			<div className="text-center bg-blue-50 py-10 mb-8">
				<Title level={2} className="text-gray-800">
					Chính Sách Bảo Hành
				</Title>
				<Text className="text-gray-600">
					Chúng tôi cam kết mang đến dịch vụ bảo hành tốt nhất cho sản phẩm của bạn.
				</Text>
			</div>

			<div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
				<Card bordered={false} className="bg-gray-50">
					{/* Diamond Warranty */}
					<div className="mb-6">
						<Title level={4} className="flex items-center text-gray-800">
							<span role="img" aria-label="diamond" className="mr-2 text-blue-500">
								💎
							</span>
							Trang Sức Kim Cương
						</Title>

						<ul className="list-disc pl-6 text-gray-600">
							<li>Miễn phí làm mới, xi, đánh bóng, và làm sạch đá.</li>
							<li>Hỗ trợ gắn lại hột tấm bị rớt hoặc bị mờ.</li>
						</ul>
					</div>

					{/* Diamond Cleaning */}
					<div className="mb-6">
						<Title level={4} className="flex items-center text-gray-800">
							<SmileOutlined className="mr-2 text-blue-500" />
							Kim Cương
						</Title>
						<Text className="text-gray-600">
							Miễn phí làm sạch đá trong thời gian bảo hành.
						</Text>
					</div>

					{/* Showroom Visit Reminder */}
					<div>
						<Title level={4} className="flex items-center text-gray-800">
							<HomeOutlined className="mr-2 text-blue-500" />
							Chăm Sóc Định Kỳ
						</Title>
						<Text className="text-gray-600">
							Quý khách nên tới showroom của cửa hàng <strong>2 tháng/lần</strong> để
							vệ sinh trang sức.
						</Text>
					</div>
				</Card>

				{/* Call-to-Action */}
				<div className="text-center mt-8">
					<Text strong className="block text-gray-700">
						Để biết thêm thông tin chi tiết, vui lòng ghé thăm showroom hoặc liên hệ đội
						ngũ hỗ trợ của chúng tôi.
					</Text>
					<a
						href="#"
						className="inline-block mt-4 px-6 py-2 text-primary bg-blue-500 hover:bg-blue-600 rounded-full"
					>
						Liên Hệ Ngay
					</a>
				</div>
			</div>
		</div>
	);
};

export default WarrantyPolicyPage;
