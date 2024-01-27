import React, { useContext, useEffect, useState } from "react";
import "./OrderDetail.scss";
import AuthContext from "../../utils/Context";
import { Link } from "react-router-dom";
const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const data = await response.json();
      setOrderData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <>
      {orderData && orderData.length > 0 ? (
        <div className="order-detail-container">
          <Link to="/">
            <button
              style={{
                background: "rgb(198, 198, 139)",
                color: "black",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Back To Shop
            </button>
          </Link>
          <h2>Order Detail</h2>
          {orderData.map((orders) => (
            <div key={orders.id}>
              <div className="order-number">Order Number: {orders.id}</div>
              <div className="shipping-address">
                Shipping Address:{" "}
                {orders.shipping_address_data.shipping_address}
              </div>
              <div className="mobile-number">
                Mobile Number: {orders.shipping_address_data.mobile_number}
              </div>
              <div className="order-items">
                <h3>Ordered Items</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.items.map((items) => (
                      <tr key={items.id}>
                        <td>{items.product_name}</td>
                        <td>{items.product_price}</td>
                        <td>{items.quantity}</td>
                        <td>{items.product_price * items.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <button className="cancel-btn">Cancel Order</button> */}
              <div className="order-total">Total: {orders.subtotal}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OrderDetail;
