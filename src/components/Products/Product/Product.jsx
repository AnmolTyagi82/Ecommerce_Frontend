import "./Product.scss";
import { useNavigate } from "react-router-dom";

const Product = ({ productData, id }) => {
  const navigate = useNavigate();
  // console.log(productData);
  // console.log(key);

  return (
    <div
      key={id}
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div>
        <div className="thumbnail">
          <img src={`http://127.0.0.1:8000/${productData.image}/`} alt="" />
        </div>
        <div className="prod-details">
          <span className="name">{productData.name}</span>
          <span className="price">&#8377;{productData.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
