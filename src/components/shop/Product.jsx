import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import tssurl from "../../port";

const Product = ({ product }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const thumbImgUrl = product.variants?.[0]?.ThumbImg?.[0];
  const colors = product.colors;
  const MID = localStorage.getItem("MID");

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await axios.get(`${tssurl}/liked/liked-products/${MID}`); // Replace 'backend_url_here' with the actual backend URL to fetch liked product IDs
      setLikedProducts(response.data.likedProducts); // Assuming the backend returns an array of liked product IDs
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching liked products:", error);
      setIsLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      // Check if product is already liked
      if (likedProducts.includes(product.pid)) {
        // Unlike the product
        setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
        // Send DELETE request to remove the like
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: MID, pid: product.pid },
        });
      } else {
        // Like the product
        setLikedProducts([...likedProducts, product.pid]);
        // Send PID and MID to backend via POST request
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: MID,
          pid: product.pid,
        }); // Replace 'backend_url_here' with the actual backend URL to send the data
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Card className="product">
      <div>
        {likedProducts.includes(product.pid) ? (
          <FaHeart
            className="heart"
            size="20px"
            onClick={toggleLike}
            style={{ color: "red" }}
          />
        ) : (
          <FaRegHeart className="heart" size="20px" onClick={toggleLike} />
        )}
        <Link to={`/productDetails/${product.pid}`}>
          <Card.Img src={thumbImgUrl} variant="top" fluid />
          {product.rating > "4.5" ? <Badge bg="light">TOP RATED</Badge> : ""}
        </Link>
      </div>

      <Card.Body>
        <Link to={`productDetails/${product.pid}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.product_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h4">
          <p>${product.unit_price}</p>
        </Card.Text>

        <Card.Text as="div">
          {colors.map((color) => (
            <FaCircle key={color.name} size="20px" color={color.value} />
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
