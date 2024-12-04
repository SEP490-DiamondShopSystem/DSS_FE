import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import {
  fetchAccountRule,
  fetchDiamondRule,
  fetchFrontendDisplayRule,
  fetchPromotionRule,
  fetchLocationRule,
  fetchOrderRule,
  fetchOrderRulePayment,
  fetchShopBankAccountRule,
} from '../redux/slices/configSlice';
import { selectIsLoading, selectConfigError } from '../redux/selectors';
import { Collapse, Typography } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Title, Text } = Typography;
const { Panel } = Collapse;

const TermOfServices = () => {
  const dispatch = useDispatch();
  const [accountRule, setAccountRule] = useState(null);
  const [diamondRule, setDiamondRule] = useState(null);
  const [frontendDisplayRule, setFrontendDisplayRule] = useState(null);
  const [promotionRule, setPromotionRule] = useState(null);
  const [locationRule, setLocationRule] = useState(null);
  const [orderRule, setOrderRule] = useState(null);
  const [orderPaymentRule, setOrderPaymentRule] = useState(null);
  const [shopBankAccountRule, setShopBankAccountRule] = useState(null);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectConfigError);

  const paymentMethods = [
    { value: 1, label: 'Chuyển Khoản Ngân Hàng' },
    { value: 2, label: 'ZaloPay' },
    { value: 3, label: 'Tiền Mặt' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, diamond, frontend, promotion, location, order, payment, bank] =
          await Promise.all([
            dispatch(fetchAccountRule()).unwrap(),
            dispatch(fetchDiamondRule()).unwrap(),
            dispatch(fetchFrontendDisplayRule()).unwrap(),
            dispatch(fetchPromotionRule()).unwrap(),
            dispatch(fetchLocationRule()).unwrap(),
            dispatch(fetchOrderRule()).unwrap(),
            dispatch(fetchOrderRulePayment()).unwrap(),
            dispatch(fetchShopBankAccountRule()).unwrap(),
          ]);

        const transformedPayment = {
          ...payment,
          LockedPaymentMethodOnCustomer: payment.LockedPaymentMethodOnCustomer.map(
            (methodValue) => {
              const method = paymentMethods.find(
                (m) => m.value.toString() === methodValue
              );
              return method ? method.value : methodValue;
            }
          ),
        };

        setAccountRule(account);
        setDiamondRule(diamond);
        setFrontendDisplayRule(frontend);
        setPromotionRule(promotion);
        setLocationRule(location);
        setOrderRule(order);
        setOrderPaymentRule(transformedPayment);
        setShopBankAccountRule(bank);
      } catch (error) {
        message.error('Failed to fetch configuration data.');
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-lg">Đang tải...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi tải điều khoản sử dụng: {error}</p>;

  const formatNumber = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString(); // This formats the number with commas
    }
    return value;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center text-gray-800 mb-8">
        Điều Khoản Sử Dụng
      </Title>

      <Collapse accordion bordered={false} className="mb-8">
        {/* Hướng Dẫn Mua Hàng */}
        <Panel header="Hướng Dẫn Mua Hàng" key="1">
          <Text className="block mb-4">
            <strong className="text-gray-700">Mua kim cương, trang sức:</strong>
          </Text>
          <ol className="list-decimal pl-6 text-gray-600 mb-4">
            <li>Chọn sản phẩm thông qua tìm kiếm</li>
            <li>
              Chọn size, chất liệu và kim cương gắn lên sản phẩm, sau đó thêm vào giỏ
              hàng
            </li>
            <li>Hoàn thành hình thức thanh toán</li>
          </ol>
          <Text className="block mb-4">
            <strong className="text-gray-700">Thiết kế trang sức:</strong>
          </Text>
          <ol className="list-decimal pl-6 text-gray-600">
            <li>Chọn mẫu trang sức cần thiết kế</li>
            <li>Chọn size, chất liệu và kim cương, sau đó đặt yêu cầu</li>
            <li>Yêu cầu được chấp thuận, chọn mua sản phẩm</li>
            <li>Hoàn thành hình thức thanh toán</li>
          </ol>
        </Panel>

        {/* Chính Sách Thanh Toán */}
        <Panel header="Chính Sách Thanh Toán" key="2">
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <Text>
                Thanh toán hết: Khách hàng trả một lần duy nhất sau khi tạo đơn
                hàng.
              </Text>
            </li>
            <li>
              <Text>
                Thanh toán khi nhận hàng: Trả trước{' '}
                <strong>{formatNumber(orderPaymentRule?.CODPercent ?? 'X')}%</strong> hoặc{' '}
                <strong>{formatNumber(orderPaymentRule?.DepositPercent ?? 'Y')}%</strong>, phần
                còn lại thanh toán khi giao hàng.
              </Text>
            </li>
            <li>
              Thanh toán bằng ZaloPay: Áp dụng cho đơn hàng dưới{' '}
              <strong>{formatNumber(orderRule?.MaxOrderAmountForDelivery ?? 'Z')} VND</strong>.
            </li>
            <li>
              Thanh toán bằng chuyển khoản ngân hàng: Gửi đúng số tiền, kèm bằng chứng
              giao dịch trong <strong>{formatNumber(orderRule?.ExpiredOrderHour ?? 'T')}</strong>{' '}
              giờ.
            </li>
          </ul>
        </Panel>

        {/* Chính Sách Giao Hàng */}
        <Panel header="Chính Sách Giao Hàng" key="3">
          <ul className="list-disc pl-6 text-gray-600">
            <li>Nội thành TP. Hồ Chí Minh: Miễn phí giao hàng.</li>
            <li>
              Đơn hàng đặt cọc tại cửa hàng: Vui lòng nhận trong{' '}
              <strong>{formatNumber(orderRule?.DaysWaitForCustomerToPay ?? 'N')}</strong> ngày kể từ
              khi đơn hàng chuẩn bị xong.
            </li>
            <li>Các thành phố khác: Cước phí giao hàng dựa theo địa chỉ nhận hàng.</li>
            <li>
              Yêu cầu giao lại: Tối đa{' '}
              <strong>{formatNumber(locationRule?.MaxRedelivery ?? 'M')}</strong> lần. Nếu vượt quá,
              đơn hàng sẽ được coi như đã hủy.
            </li>
          </ul>
        </Panel>

        {/* Chính Sách Bảo Hành */}
        <Panel header="Chính Sách Bảo Hành" key="4">
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Trang sức kim cương:
              <ul className="list-disc pl-6 mt-2">
                <li>Miễn phí làm mới, xi, đánh bóng, và làm sạch đá.</li>
                <li>Hỗ trợ gắn lại hột tấm bị rớt hoặc bị mờ.</li>
              </ul>
            </li>
            <li>Kim cương: Miễn phí làm sạch trong thời gian bảo hành.</li>
            <li>Khuyến nghị: Đến Showroom vệ sinh trang sức 2 tháng/lần.</li>
          </ul>
        </Panel>

        {/* Khách Hàng Thân Thiết */}
        <Panel header="Khách Hàng Thân Thiết" key="5">
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Chiết khấu đặc biệt dựa trên hạng mức tài khoản:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Hạng Đồng: Giảm{' '}
                  <strong>
                    {formatNumber(accountRule?.BronzeRankBenefit?.RankDiscountPercentOnOrder ?? 'X')}%
                  </strong>{' '}
                  trên tổng giá trị đơn hàng.
                </li>
                <li>
                  Hạng Bạc: Giảm{' '}
                  <strong>
                    {formatNumber(accountRule?.SilverRankBenefit?.RankDiscountPercentOnOrder ?? 'Y')}%
                  </strong>{' '}
                  trên tổng giá trị đơn hàng.
                </li>
                <li>
                  Hạng Vàng: Giảm{' '}
                  <strong>
                    {formatNumber(accountRule?.GoldRankBenefit?.RankDiscountPercentOnOrder ?? 'Z')}%
                  </strong>{' '}
                  trên tổng giá trị đơn hàng.
                </li>
              </ul>
            </li>
            <li>
              Tăng hạng: Mỗi đơn hàng được{' '}
              <strong>{formatNumber(accountRule?.VndPerPoint ?? 'A')} VND</strong> = 1 điểm.
            </li>
          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};

export default TermOfServices;
