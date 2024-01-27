import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const handleShopNowClick = () => {
    window.scrollTo({
      top: 850,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>ESHOP</h1>
          <p>
            What are you waiting for! Just scroll down, explore and buy whatever
            you want from this shop
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={() => navigate("/readMore")}>
              Read More
            </div>
            <div className="banner-cta v2" onClick={handleShopNowClick}>
              Shop Now
            </div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;
