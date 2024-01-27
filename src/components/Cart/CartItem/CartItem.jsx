import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { useContext } from "react";
import AuthContext from "../../../utils/Context";
import Product from "../../Products/Product/Product";
const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(AuthContext);
  console.log(cartItems);

  return (
    <div className="cart-products">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-product">
          <div className="img-container">
            <img
              src={`http://127.0.0.1:8000/${item.image}/`}
              alt={item.product.name}
            />
          </div>
          <div className="prod-details">
            <span className="name">{item.name}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                +
              </span>
            </div>
            <div className="text">
              <span>{item.quantity}</span>
              <span>x</span>
              <span className="highlight">
                &#8377;{item.price * item.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
