import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { Row, Col, Card, Container, Nav } from 'react-bootstrap';
import tssurl from '../port';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import img from '../assets/images/grid.jpg';

const WishlistPage = () => {
  const [hovered, setHovered] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const MID = localStorage.getItem('MID');
 

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        // Fetch liked product IDs from the API
        const response = await fetch(`${tssurl}/liked/liked-products/${MID}`);
        const data = await response.json();

        // Fetch product details for each liked product
        const productDetails = await Promise.all(
          data.likedProducts.map(async (productId) => {
            const productResponse = await fetch(
              `${tssurl}/productDetails/${productId}`
            );
            return productResponse.json();
          })
        );

        const productsWithHover = productDetails.map((product) => ({
          ...product,
          hovered: false,
        }));

        setLikedProducts(productsWithHover);
      } catch (error) {
        console.error('Error fetching liked products:', error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const handleMouseEnter = (index) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, hovered: true } : product
      )
    );
  };

  const handleMouseLeave = (index) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, hovered: false } : product
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Make a delete request to the API endpoint with MID and productId
      const response = await axios.delete(
        `${tssurl}/liked/liked-products/delete`,
        {
          data: { mid: MID, pid: productId },
        }
      );
      // Check if the request was successful
      if (response.ok) {
        // Filter out the deleted product from the likedProducts array
        setLikedProducts((prevProducts) =>
          prevProducts.filter((product) => product.pid !== productId)
        );
      } else {
        console.error('Failed to delete product');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="text-center fw-bold fs-2">Your Wishlist</div>
      <Container fluid>
        <Row className="g-4">
          {likedProducts.map((product, index) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="my-3 wishlist-card "
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="card-container">
                  <FaTrash
                    className="icon trash-icon"
                    onClick={() => handleDeleteProduct(product.pid)}
                    size={24}
                    color="D3D3D3"
                  />

                  <FaHeart className="icon heart-icon" size={24} color="red" />
                  <Link to={`/productDetails/${product.pid}`}>
                    <Card.Img
                      variant="top"
                      src={product.variants?.[0]?.ThumbImg}
                      className="image"
                      fluid
                    />
                  </Link>
                  {product.hovered && (
                    <div className="add-to-cart">Add to Cart</div>
                  )}
                </div>
                <Nav.Link to={`/productDetails/${product.pid}`}>
                  <Card.Body className="p-0 mt-1">
                    <Card.Title as="div">
                      <p className="text-dark mb-0 product-title">
                        {product.product_name}
                      </p>
                    </Card.Title>
                    <Card.Text>
                      <p className="mb-0 price">${product.unit_price}</p>
                    </Card.Text>
                  </Card.Body>
                </Nav.Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default WishlistPage;
