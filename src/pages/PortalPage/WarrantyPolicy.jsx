import React from 'react';
import {Typography, Card} from 'antd';
import 'antd/dist/reset.css';

const {Title, Text} = Typography;

const WarrantyPolicyPage = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <Title level={4} className="text-center text-gray-800 mb-8">
                Chính Sách Bảo Hành
            </Title>

            <Card>
                <ul className="list-disc pl-6 text-gray-600">
                    <li>
                        Trang sức kim cương:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Miễn phí làm mới, xi, đánh bóng, và làm sạch đá.</li>
                            <li>Hỗ trợ gắn lại hột tấm bị rớt hoặc bị mờ.</li>
                        </ul>
                    </li>
                    <li>Kim cương: MIỄN PHÍ làm sạch đá trong thời gian bảo hành.</li>
                    <li>Quý khách nên tới Showroom của cửa hàng 2 tháng / lần để vệ sinh trang sức.</li>
                </ul>
            </Card>
        </div>
    );
};

export default WarrantyPolicyPage;