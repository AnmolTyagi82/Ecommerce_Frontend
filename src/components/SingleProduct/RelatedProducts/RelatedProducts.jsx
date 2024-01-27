import Products from "../../Products/Products";
import { useState, useEffect } from "react";

const RelatedProducts = ({ categoryId }) => {
  const [product, setProduct] = useState([]);

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
    .filter((prod) => prod.category.id === categoryId)
    .map((data) => {
      return data;
    });

  return (
    <div className="related-products">
      <Products headingText="Related Products" products={data1} />
    </div>
  );
};

export default RelatedProducts;
