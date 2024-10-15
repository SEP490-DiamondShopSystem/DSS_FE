import React from 'react';

const Invoice = () => {
  // Fixed order details data
  const orderDetails = {
    invoiceCode: 'INV123456789',
    purchaseDate: 'October 15, 2024',
    deliveryAddress: '123 Main Street, City, Country',
    items: [
      {
        id: '001',
        name: 'French Pavé Diamond Engagement Ring in 14k White Gold',
        image: '/images/diamond-ring.jpg', // Replace with actual image path
        price: 1470,
        originalPrice: 2000, // Original price to show crossed-out
        quantity: 1,
      },
      {
        id: '002',
        name: '1.03 Carat H-VS2 Excellent Cut Round Diamond',
        image: '/images/gold-necklace.jpg', // Replace with actual image path
        price: 5000,
        originalPrice: 5500, // Original price to show crossed-out
        quantity: 2,
      },
    ],
    subtotal: 4632,
    discount: 3530,
    total: 4632,
  };

  // Fixed payment information
  const paymentInfo = {
    method: 'Credit Card',
  };

  // Function to handle invoice download
  const downloadInvoice = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(orderDetails, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Invoice_${orderDetails.invoiceCode}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="min-h-screen p-20 flex justify-center items-center bg-gray-100">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <img src="/path-to-logo.png" alt="Logo" className="h-12" />
          <div className="text-right">
            <p className="font-semibold">Thank you for your purchase!</p>
            <p className="text-sm">Shop Address: Some Address, City, Country</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p><strong>Invoice Code:</strong> {orderDetails.invoiceCode}</p>
            <p><strong>Purchase Date:</strong> {orderDetails.purchaseDate}</p>
            <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
          </div>
        </div>

        <table className="table-auto w-full mb-6">
          <thead>
            <tr className="border-b-2">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">IMAGE</th>
              <th className="text-left p-4">PRODUCT NAME</th>
              <th className="text-left p-4">ORIGINAL PRICE</th>
              <th className="text-left p-4">DISCOUNTED PRICE</th>
              <th className="text-left p-4">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{item.id}</td>
                <td className="p-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16" />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                  <span className="line-through">${item.originalPrice}</span>
                </td>
                <td className="p-4">${item.price}</td>
                <td className="p-4">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex w-full justify-between">
          <div className="mb-6 w-1/3 m-5">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <p><strong>Payment Method:</strong> {paymentInfo.method}</p>
          </div>

          <div className="text-right w-1/3 m-5">
            <p className="w-fit"><strong>Subtotal Amount:</strong> ${orderDetails.subtotal}</p>
            <p className="w-fit"><strong>Discount:</strong> ${orderDetails.discount}</p>
            <p className="w-fit"><strong>Total Amount:</strong> ${orderDetails.total}</p>
          </div>
        </div>

        <div className="flex w-full justify-end mt-6 ">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary text-black px-4 py-2 m-2 rounded-lg shadow hover:bg-blue-600"
          >
            Continue Shopping
          </button>
          <button
            onClick={downloadInvoice}
            className="bg-primary text-black px-4 py-2 m-2 rounded-lg shadow hover:bg-green-600"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
