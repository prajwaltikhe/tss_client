import { useNavigate } from 'react-router-dom';
import offer2 from '../assets/images/offer2.png';
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

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container>
      <Row className="mt-2">
        <h5>
          <strong>
            MY BAG <span className="fw-normal ms-1">( 5 items )</span>
          </strong>
        </h5>
        <Col md="8" className="my-2">
          <Card className="bg-light">
            <Row>
              <Col md="3">
                <Image
                  src={offer2}
                  alt="cart"
                  fluid
                  className="bg-white h-100"
                />
              </Col>
              <Col md="9">
                <Row className="my-2 mt-3">
                  <Col md="10">
                    <h4>Product Title</h4>
                  </Col>
                  <Col md="2">
                    <strong style={{ cursor: 'pointer' }}>Delete</strong>
                  </Col>
                </Row>
                <Row>
                  <p>$ 75</p>
                </Row>
                <Row style={{ margin: '4rem 0 2rem 0' }}>
                  <Col md="3" className="p-0 d-flex">
                    <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>
                      Size :
                    </span>
                    <Form.Select
                      style={{
                        width: '3.25rem',
                        padding: '0',
                        paddingLeft: '0.2rem',
                        boxShadow: 'none',
                        border: 'none',
                      }}
                    >
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                    </Form.Select>
                  </Col>
                  <Col md="3" className="p-0 d-flex ">
                    <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>
                      Qty :
                    </span>
                    <Form.Select
                      style={{
                        width: '3.25rem',
                        padding: '0',
                        paddingLeft: '0.2rem',
                        boxShadow: 'none',
                        border: 'none',
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </Col>
                  <Col md="2"></Col>
                  <Col md="4" className="text-end pe-4">
                    <FaRegHeart size="20" className="me-1" /> {''}{' '}
                    <span>Save to wishlist</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-light pt-3">
            <strong className="ps-3" style={{ fontSize: '1.4rem' }}>
              Order Details
            </strong>
            <Row className="ps-3 my-2">
              <Col md="7">Bag Total</Col>
              <Col md="5">$ 75</Col>
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

            <Button variant="dark w-100 fw-bold py-2" onClick={checkOutHandler}>
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
