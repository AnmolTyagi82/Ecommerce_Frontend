import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userId, setUserId] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(authTokens.access);
  // console.log(accessToken);
  useEffect(() => {
    if (authTokens && authTokens.access) {
      try {
        const decodedToken = jwt_decode(authTokens.access);
        setUserId(decodedToken.user_id);
      } catch (error) {
        console.log("Error decoding access token:", error);
      }
    }
  }, [authTokens]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let count = 0;
    cartItems.map((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const addToCart = async (id, quantity) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          user: userId,
          product: id,
          quantity: quantity,
        }),
      });
      console.log(response);
      if (response.ok) {
        let res = await response.json();
        console.log(res);
        setCartCount((prevCount) => prevCount + quantity);
        console.log("Added to cart successfully");
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cart/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log(authTokens.access);
        const fetchData = await response.json();
        console.log(fetchData);
        setCartItems(fetchData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [cartCount]);

  // const handleAddToCart = async (product, quantity) => {
  //   let items = [...cartItems];
  //   let index = items.findIndex((p) => p.id === product.id);
  //   if (index !== -1) {
  //     items[index].quantity += quantity;
  //   } else {
  //     product.quantity = quantity;
  //     items = [...items, product];
  //   }
  //   setCartItems(items);
  // };

  const handleRemoveFromCart = async (item) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({ cart_item_id: item.id }),
      });
      if (response.ok) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        console.log("Cart item deleted successfully");
      } else {
        console.log("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCartProductQuantity = async (type, product) => {
    try {
      let newQuantity;
      if (type === "inc") {
        newQuantity = product.quantity + 1;
      } else if (type === "dec") {
        if (product.quantity > 1) {
          newQuantity = product.quantity - 1;
        } else {
          return;
        }
      }
      const response = await fetch(`http://127.0.0.1:8000/api/cart/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          cart_item_id: product.id,
          quantity: newQuantity,
          type,
        }),
      });
      if (response.ok) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        console.log("Cart items updated successfully");
      } else {
        console.log(
          "Failed to update cart items. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error updating cart items:", error);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      const cartResponse = await fetch(`http://127.0.0.1:8000/api/cart/`, {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });
      const cartData = await cartResponse.json();
      setCartItems(cartData);
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };
  // console.log(userId);

  const refreshAccessToken = async () => {
    setIsRefreshingToken(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: authTokens.refresh,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        setTokenExpiration(data.access ? jwt_decode(data.access).exp : 0);
      } else {
        console.error("Failed to refresh access token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    } finally {
      setIsRefreshingToken(false);
    }
  };

  useEffect(() => {
    if (authTokens && authTokens.access) {
      const decodedToken = jwt_decode(authTokens.access);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp - currentTime < 60) {
        refreshAccessToken();
      }
      setTokenExpiration(decodedToken.exp);
    }
  }, [authTokens]);

  useEffect(() => {
    if (tokenExpiration > 0) {
      const timeUntilExpiration = tokenExpiration - Date.now() / 1000;
      if (timeUntilExpiration > 0) {
        // Refresh the token 1 minute before it expires
        const refreshTimer = setTimeout(
          refreshAccessToken,
          (timeUntilExpiration - 60) * 1000
        );
        return () => clearTimeout(refreshTimer);
      }
    }
  }, [tokenExpiration]);

  const contextData = {
    user: user,
    loginUser: loginUser,
    // handleAddToCart: handleAddToCart,
    addToCart: addToCart,
    handleRemoveFromCart: handleRemoveFromCart,
    handleCartProductQuantity: handleCartProductQuantity,
    showCart: showCart,
    setShowCart: setShowCart,
    cartItems: cartItems,
    setCartItems: setCartItems,
    cartCount: cartCount,
    setCartCount: setCartCount,
    cartSubTotal: cartSubTotal,
    setCartSubTotal: setCartSubTotal,
    userId: userId,
    authTokens: authTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
