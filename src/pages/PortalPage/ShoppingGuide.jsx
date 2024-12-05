import React from 'react';
import { Typography, Divider, Spin } from 'antd';
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectConfigError } from '../../redux/selectors';

const { Title, Text } = Typography;

const ShoppingGuide = () => {
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectConfigError);

    if (isLoading) 
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
                <p className="ml-4 text-lg text-gray-600">Đang tải...</p>
            </div>
        );

    if (error) 
        return (
            <div className="text-center mt-10">
                <p className="text-red-500 text-lg">
                    <InfoCircleOutlined /> Lỗi tải điều khoản sử dụng: {error}
                </p>
            </div>
        );

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <Title level={2} className="text-center text-indigo-700 mb-8">
                Hướng Dẫn Mua Hàng
            </Title>

            {/* Section 1 */}
            <section className="mb-8">
                <Title level={3} className="text-lg text-gray-700 mb-4">
                    Mua kim cương, trang sức
                </Title>
                <Divider />
                <ol className="list-decimal pl-6 text-gray-600 space-y-4">
                    <li>
                        Chọn sản phẩm thông qua tìm kiếm 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                    <li>
                        Chọn size, chất liệu và kim cương gắn lên sản phẩm (nếu mua trang sức), sau đó thêm vào giỏ hàng. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                    <li>
                        Hoàn thành hình thức thanh toán. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                </ol>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
                <Title level={3} className="text-lg text-gray-700 mb-4">
                    Thiết kế trang sức
                </Title>
                <Divider />
                <ol className="list-decimal pl-6 text-gray-600 space-y-4">
                    <li>
                        Chọn mẫu trang sức cần thiết kế. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                    <li>
                        Chọn size, chất liệu và kim cương, sau đó đặt yêu cầu. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                    <li>
                        Một khi yêu cầu được chấp thuận, chọn mua sản phẩm. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                    <li>
                        Hoàn thành hình thức thanh toán. 
                        <span className="text-gray-400"> [Hình ảnh]</span>
                    </li>
                </ol>
            </section>
        </div>
    );
};

export default ShoppingGuide;
