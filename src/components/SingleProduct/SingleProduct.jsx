import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Header from "../Header/Header";
import Newsletter from "../Footer/Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";
import AuthContext from "../../utils/Context";
const SingleProduct = () => {
  const { userId, addToCart } = useContext(AuthContext);
  // console.log(userId);
  const [singleProduct, setSingleProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const shareUrl = window.location.href;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(id, quantity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        const fetchData = await response.json();
        setSingleProduct(fetchData);
        setQuantity(1);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  return (
    <>
      <Header />
      {singleProduct
        .filter((prod) => prod.id == id)
        .map((data) => {
          // console.log(data);
          return (
            <div key={id} className="single-product-main-content">
              <div className="layout">
                <div className="single-product-page">
                  <div className="left">
                    <img src={`http://127.0.0.1:8000/${data.image}/`} alt="" />
                  </div>
                  <div className="right">
                    <span className="name">{data.name}</span>
                    <span className="price">&#8377;{data.price}</span>
                    <span className="desc">{data.description}</span>
                    <form onSubmit={handleAddToCart}>
                      <div className="cart-buttons">
                        <div className="quantity-buttons">
                          <span onClick={decrement}>-</span>
                          <span>{quantity}</span>
                          <span onClick={increment}>+</span>
                        </div>
                        <button className="add-to-cart-button" type="submit">
                          <FaCartPlus size={20} />
                          ADD TO CART
                        </button>
                      </div>
                    </form>
                    <span className="divider" />
                    <div className="info-item">
                      <span className="text-bold">
                        Category:
                        <span>{data.category.title}</span>
                      </span>
                      <span className="text-bold">
                        Share:
                        <span className="social-icons">
                          <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={18} round />
                          </FacebookShareButton>
                          <TwitterShareButton url={shareUrl}>
                            <TwitterIcon size={18} round />
                          </TwitterShareButton>
                          <LinkedinShareButton url={shareUrl}>
                            <LinkedinIcon size={18} round />
                          </LinkedinShareButton>
                          <WhatsappShareButton url={shareUrl}>
                            <WhatsappIcon size={18} round />
                          </WhatsappShareButton>
                          <EmailShareButton url={shareUrl}>
                            <EmailIcon size={18} round />
                          </EmailShareButton>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <RelatedProducts productId={id} categoryId={data.category.id} />
              </div>
            </div>
          );
        })}
      <Newsletter />
      <Footer />
    </>
  );
};

export default SingleProduct;
