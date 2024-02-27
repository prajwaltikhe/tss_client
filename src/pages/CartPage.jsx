import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import CartCard from '../components/cart/CartCard';
import axios from 'axios';
import tssurl from '../port';

const CartPage = () => {
  const mid = localStorage.getItem('MID');
  const [cartData, setCartData] = useState([]);
  const [bagTotal, setBagTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bagDiscount, setBagDiscount] = useState(0);
  const productsPerPage = 4;

  const fetchCartData = useCallback(async () => {
    try {
      const response = await axios.get(`${tssurl}/cart/carts/${mid}`);
      const cartItems = response.data.cart;
      setCartData(cartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }, [mid, setCartData]);

  const handleDelete = async (mid, pid) => {
    try {
      await axios.delete(`${tssurl}/cart/carts/delete`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { mid, pid },
      });

      await fetchCartData();
      updateBagTotal();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleQtyChange = (mid, pid, newQty) => {
    const updatedCartData = cartData.map((item) => {
      if (item.product.pid === pid) {
        return { ...item, quantity: newQty, product: { ...item.product } };
      }
      return item;
    });
    setCartData(updatedCartData);
  };

  const updateBagTotal = useCallback(() => {
    const total = cartData.reduce(
      (acc, item) => acc + item.product.unit_price,
      0
    );
    setBagTotal(total);
    setBagDiscount((total * 5) / 100);
  }, [cartData, setBagTotal, setBagDiscount]);

  useEffect(() => {
    fetchCartData();
    updateBagTotal();
  }, [cartData, updateBagTotal, fetchCartData]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cartData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const deliveryFee = 40;
  const tax = Number((bagTotal - bagDiscount) * 10) / 100;

  const total = Number(bagTotal - bagDiscount + deliveryFee + tax).toFixed(2);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="mt-3">
        <h5>
          <strong>
            MY BAG
            <span className="fw-normal ms-1">( {cartData.length} items )</span>
          </strong>
        </h5>
        {cartData.length === 0 ? (
          <Col md={12} className="my-2 text-center fs-3">
            <p>Your cart is empty</p>
            <Button variant="primary" href="/">
              Shop Now
            </Button>
          </Col>
        ) : (
          <>
            <Col md={8} className="my-2">
              {currentProducts.map((product, index) => (
                <CartCard
                  key={index}
                  product={product}
                  onDelete={handleDelete}
                  onQtyChange={handleQtyChange}
                />
              ))}
            </Col>
            <Col md={4} className="mt-4">
              <Card className="bg-light pt-3">
                <strong className="ps-3" style={{ fontSize: '1.4rem' }}>
                  Order Details
                </strong>
                <Row className="ps-3 my-2">
                  <Col md="7">Bag Total</Col>
                  <Col md="5">$ {bagTotal}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <Col md="7">Bag Discount</Col>
                  <Col md="5">$ {bagDiscount}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <p className="mb-0">Convenience Fee</p>

                  <Col md="2"></Col>
                  <Col md="5">Delivery Fee</Col>
                  <Col md="5">$ {deliveryFee}</Col>

                  <Col md="2"></Col>
                  <Col md="5">Tax (10%)</Col>
                  <Col md="5">$ {tax}</Col>
                </Row>
                <Row className="ps-3 mb-3">
                  <Col md="7">
                    <strong>Bag Discount</strong>
                  </Col>
                  <Col md="5">
                    <strong>$ {total}</strong>
                  </Col>
                </Row>

                <Button variant="dark w-100 fw-bold py-2">
                  Proceed to Checkout
                </Button>
              </Card>
            </Col>
          </>
        )}
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className="pagination" style={{ marginBottom: '0' }}>
            {Array.from(
              { length: Math.ceil(cartData.length / productsPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    onClick={() => paginate(i + 1)}
                    className="page-link"
                    style={{
                      color: 'white',
                      border: 'none',
                      background: 'gray',
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </Row>
    </Container>
  );
};

export default CartPage;
