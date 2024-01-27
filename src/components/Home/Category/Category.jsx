import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories.map((cat) => (
          <div
            className="category"
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
          >
            <img
              key={cat.id}
              src={`http://127.0.0.1:8000/${cat.image}/`}
              alt={cat.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
