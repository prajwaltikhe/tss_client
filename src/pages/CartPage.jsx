import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tssurl from '../port';
import offer2 from '../assets/images/profile1.png';
import CartCard from '../components/cart/CartCard';
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { FaRegHeart } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [bagTotal, setBagTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  // Function to fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await fetch(`${tssurl}/cart/carts/${localStorage.getItem("MID")}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const responseData = await response.json();
      const cartItems = responseData.cart;
      setCartData(cartItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const total = cartData.reduce((acc, item) => acc + item.product.unit_price, 0);
    setBagTotal(total);
  }, [cartData]);
  console.log("cat", cartData);
  console.log("total", bagTotal);
  const handleDelete = async (mid, pid) => {
    try { 
      const response = await fetch(`${tssurl}/cart/carts/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mid, pid }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      // Update the cart data after deletion
      fetchCartData();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleShopNow = () => {
    // Redirect to shop page
    navigate('/shop');
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cartData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container>
      <Row className="mt-2">
      <h5>
          <strong>
            MY BAG <span className="fw-normal ms-1">( {cartData.length} items )</span>
          </strong>
        </h5>
        {cartData.length === 0 ? (
          <Col md={12} className="my-2 text-center fs-3">
            <p>Your cart is empty</p>
            <Button variant="primary" href='/'>Shop Now</Button>
          </Col>
        )  : (
          <>
            <Col md={8} className="my-2">
            {currentProducts.map((product, index) => (
            <CartCard key={index} product={product} onDelete={handleDelete}/>
          ))}
            </Col>
            <Col md={4} className='mt-4'>
              
              <Card className="bg-light pt-3">
            <strong className="ps-3" style={{ fontSize: "1.4rem" }}>
              Order Details
            </strong>
            <Row className="ps-3 my-2">
              <Col md="7">Bag Total</Col>
              <Col md="5">$ {bagTotal}</Col>
            </Row>
            <Row className="ps-3 mb-2">
              <Col md="7">Bag Discount</Col>
              <Col md="5">$ 8</Col>
            </Row>
            <Row className="ps-3 mb-2">
              <p className="mb-0">Convenience Fee</p>

              <Col md="2"></Col>
              <Col md="5">Delivery Fee</Col>
              <Col md="5">$ 12</Col>

              <Col md="2"></Col>
              <Col md="5">Tax</Col>
              <Col md="5">$ 6</Col>
            </Row>
            <Row className="ps-3 mb-3">
              <Col md="7">
                <strong>Bag Discount</strong>
              </Col>
              <Col md="5">
                <strong>$ 101</strong>
              </Col>
            </Row>

            <Button variant="dark w-100 fw-bold py-2" >
              Proceed to Checkout
            </Button>
          </Card>
              
            </Col>
          </>
        )}
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ul className="pagination" style={{ marginBottom: '0' }}>
        {Array.from({ length: Math.ceil(cartData.length / productsPerPage) }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button 
              onClick={() => paginate(i + 1)} 
              className="page-link" 
              style={{ color: 'white', border: 'none', background: 'gray' }}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
      </Row>
    </Container>
  );
};

export default CartPage;
