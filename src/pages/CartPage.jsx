import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const addToCartHandler = (product, qty) => {
    const existItem = cartItems.find((item) => item.id === product.id);

    if (existItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, qty }]);
    }
  };

  const removeFromCartHandler = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={3}>
              <Image src={cartItems.Img} />
            </Col>
            <Col md="9">
              {/* Name */}
              {/* QTY */}
              {/* Price */}
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          {/* Subtotal */}
          <Button variant="light" onClick={checkOutHandler}>
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
