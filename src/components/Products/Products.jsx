import "./Products.scss";

import Product from "./Product/Product";

const Products = ({ innerPage, headingText, products }) => {
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}

      <div className={`products ${innerPage ? "innerPage" : ""}`}>
        {products.map((data) => (
          <Product productData={data} id={data.id} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
