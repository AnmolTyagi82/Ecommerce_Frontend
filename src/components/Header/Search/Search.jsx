import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const filter = product.filter((value) => {
    return value.name.toLowerCase().includes(query.toLowerCase());
  });
  // if (!query.length) {
  //     filter = null;
  // }
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

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        {!query?.length && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="search-results">
          {filter?.map((item) => (
            <div
              className="search-result-item"
              key={item.id}
              onClick={() => {
                navigate("/product/" + item.id);
                setShowSearch(false);
              }}
            >
              <div className="img-container">
                <img src={`http://127.0.0.1:8000/${item.image}/`} alt="" />
              </div>
              <div className="prod-details">
                <span className="name">{item.name}</span>
                <span className="desc">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
