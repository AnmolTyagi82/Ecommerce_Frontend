import "./Category.scss";
import Products from "../Products/Products";
import Header from "../Header/Header";
import Newsletter from "../Footer/Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        const fetchData = await response.json();
        setProduct(fetchData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const data1 = product
    .filter((prod) => prod.category.id == id)
    .map((data) => {
      return data;
    });

  return (
    <>
      <Header />
      <div className="category-main-content">
        <div className="layout">
          <div className="category-title">{data1?.[0]?.category?.title}</div>
          <Products innerPage={true} products={data1} />
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Category;
