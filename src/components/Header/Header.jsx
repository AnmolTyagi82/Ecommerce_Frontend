import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
// import { AiOutlineHeart } from "react-icons/ai";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import AuthContext from "../../utils/Context";
// import SingleProduct from "../SingleProduct/SingleProduct";

import "./Header.scss";
const Header = () => {
  const { user, cartCount, showCart, setShowCart } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/aboutUs">
              <li>About</li>
            </Link>
            <Link to="/contactUs">
              <li>Contact Us</li>
            </Link>
            {user ? (
              <Link to="/login" onClick={handleLogout}>
                <li>Logout</li>
              </Link>
            ) : (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}
          </ul>
          <Link to="/">
            <div className="center">E-SHOP</div>
          </Link>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            {/* <AiOutlineHeart /> */}
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
