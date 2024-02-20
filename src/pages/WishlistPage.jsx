import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { Row, Col, Card, Container } from 'react-bootstrap';
import tssurl from '../port';
import { Link } from 'react-router-dom';
// import img from '../assets/images/grid.jpg';

const WishlistPage = () => {
  const [hovered, setHovered] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const MID = localStorage.getItem('MID');
  console.log(MID);

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

        setLikedProducts(productDetails);
      } catch (error) {
        console.error('Error fetching liked products:', error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleDeleteProduct = async (productId) => {
    try {
      // Make a delete request to the API endpoint with MID and productId
      const response = await fetch(`${tssurl}/liked/liked-products/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mid: MID, // Using "mid" instead of "MID" based on API requirements
          pid: productId,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Filter out the deleted product from the likedProducts array
        setLikedProducts((prevProducts) =>
          prevProducts.filter((product) => product.pid !== productId)
        );
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="text-center fw-bold fs-2">Your Wishlist</div>
      <Container fluid>
        <Row className="g-4">
          {likedProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="my-3 wishlist-card "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/productDetails/${product.pid}`}>
                  <div className="card-container">
                    <FaTrash
                      className="icon trash-icon"
                      onClick={() => handleDeleteProduct(product.pid)}
                      size={24}
                      color="D3D3D3"
                    />

                    <FaHeart
                      className="icon heart-icon"
                      size={24}
                      color="red"
                    />

                    <Card.Img
                      variant="top"
                      src={product.variants.ThumbImg}
                      className="image"
                      fluid
                    />
                    {hovered && (
                      <div className="add-to-cart fw-bold">Add to Cart</div>
                    )}
                  </div>
                </Link>
                <Link to={`/productDetails/${product.pid}`}>
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                      as="div"
                      className="product-title"
                    >
                      <p className="text-dark">{product.product_name}</p>
                    </Card.Title>
                    <Card.Text as="h4">
                      <p className="mb-0">${product.unit_price}</p>
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default WishlistPage;
