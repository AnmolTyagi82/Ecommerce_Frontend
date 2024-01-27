import React, { useContext, useState } from "react";
import "./ShippingAddress.scss";
import AuthContext from "../../utils/Context";
import { useNavigate } from "react-router-dom";

const ShippingAddress = () => {
  const [shippingData, setShippingData] = useState({
    shipping_address: "",
    mobile_number: "",
    city: "",
    pincode: "",
  });
  const { userId, authTokens, cartSubTotal } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    if (
      !shippingData.shipping_address ||
      !shippingData.mobile_number ||
      !shippingData.city ||
      !shippingData.pincode
    ) {
      alert("Please fill the form completely before making the payment");
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }
    const options = {
      key: "rzp_test_20wsFBolivvVyg",
      currency: "INR",
      amount: amount * 100,
      name: "Ecommerce",
      image: "./images/img.png",
      description: "Thanks for purchasing",

      handler: function (response) {
        if (response.razorpay_payment_id) {
          handleSubmit(response.razorpay_payment_id);
          navigate("/orderDetail");
        } else {
          alert("Payment failed or was cancelled");
        }
      },
      prefill: {
        name: "Code with akky",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (paymentId) => {
    // e.preventDefault();
    try {
      const dataWithUserId = { ...shippingData, user: userId };
      const response = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          shipping_address_data: dataWithUserId,
          amount: cartSubTotal,
          razorpay_payment_id: paymentId,
        }),
      });
      if (response.ok) {
        setShippingData({
          shipping_address: "",
          mobile_number: "",
          city: "",
          pincode: "",
        });
        console.log("Order placed successfully!");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="shipping-address-container">
      <h2>Enter your address details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="shipping_address">Shipping Address:</label>
          <input
            type="text"
            id="shipping_address"
            name="shipping_address"
            value={shippingData.shipping_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            value={shippingData.mobile_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={shippingData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <button
            id="rzp-button1"
            type="button"
            onClick={() => displayRazorpay(cartSubTotal)}
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;

// import React, { useContext, useState } from "react";
// import "./ShippingAddress.scss";
// import AuthContext from "../../utils/Context";
// import { useNavigate } from "react-router-dom";

// const ShippingAddress = () => {
//   const { cartSubTotal } = useContext(AuthContext);
//   const [shippingData, setShippingData] = useState({
//     shipping_address: "",
//     mobile_number: "",
//     city: "",
//     pincode: "",
//   });
//   const { userId, authTokens } = useContext(AuthContext);
//   //   const navigate = useNavigate()

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const dataWithUserId = { ...shippingData, user: userId };
//       const response = await fetch("http://127.0.0.1:8000/api/orders/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authTokens.access}`,
//         },
//         body: JSON.stringify({
//           shipping_address_data: dataWithUserId,
//         }),
//       });
//       if (response.ok) {
//         setShippingData({
//           shipping_address: "",
//           mobile_number: "",
//           city: "",
//           pincode: "",
//         });
//         console.log("Order placed successfully!");
//       } else {
//         throw new Error("Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handlePayment = async () => {
//     const options = {
//       key: "rzp_test_20wsFBolivvVyg",
//       amount: cartSubTotal * 100, // Amount in paise or smallest currency unit
//       currency: "INR", // Currency code
//       name: "E-shop",
//       description: "Payment for your order",
//       image: "https://your-company-logo.png", // URL of your company logo or icon
//       order_id: "RAZORPAY_ORDER_ID", // Replace with the actual Razorpay order ID from your backend
//       handler: function (response) {
//         // This function will be called when payment is successful
//         console.log("Payment successful!", response);
//         // After successful payment, submit the order data to your backend
//         submitOrder();
//       },
//       theme: {
//         color: "#F37254", // Color of the Razorpay button
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const submitOrder = async () => {
//     try {
//       // Submit the order data to your backend here using the same method you used before
//       // ... remaining code for order submission
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // ... existing code

//   return (
//     <div className="shipping-address-container">
//       <h2>Enter your address details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="shipping_address">Shipping Address:</label>
//           <input
//             type="text"
//             id="shipping_address"
//             name="shipping_address"
//             value={shippingData.shipping_address}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="mobile_number">Mobile Number:</label>
//           <input
//             type="tel"
//             id="mobile_number"
//             name="mobile_number"
//             value={shippingData.mobile_number}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="city">City:</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={shippingData.city}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="pincode">Pincode:</label>
//           <input
//             type="text"
//             id="pincode"
//             name="pincode"
//             value={shippingData.pincode}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <button id="rzp-button1" type="button" onClick={handlePayment}>
//             Make Payment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ShippingAddress;
