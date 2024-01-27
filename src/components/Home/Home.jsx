import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import Header from "../Header/Header";
import Newsletter from "../Footer/Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
const Home = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  // const authTokens = localStorage.getItem("authTokens");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProduct = await fetch(
          "http://127.0.0.1:8000/api/products/"
        );
        const fetchDataProduct = await responseProduct.json();
        const responseCategory = await fetch(
          "http://127.0.0.1:8000/api/categories/"
          // {
          //   method: "GET",
          //   Authorization: `Bearer ${authTokens}`,
          // }
        );
        const fetchDataCategory = await responseCategory.json();
        setProduct(fetchDataProduct);
        setCategory(fetchDataCategory);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Banner />
        <div className="main-content">
          <div className="layout">
            <Category categories={category} />
            <Products headingText="Popular Products" products={product} />
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
