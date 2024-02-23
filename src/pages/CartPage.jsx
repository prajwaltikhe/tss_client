import { useNavigate } from 'react-router-dom';
import profile from '../assets/images/profile1.png';
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Form,
} from 'react-bootstrap';

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
          <Card>
            <Row>
              <Col md="3">
                <Image src={profile} alt="cart" fluid />
              </Col>
              <Col md="9">
                <Row className="my-2 mt-3">
                  <Col md="10">
                    <h4>Product Title</h4>
                  </Col>
                  <Col md="2">
                    <strong>Delete</strong>
                  </Col>
                </Row>
                <Row>
                  <p>$ 75</p>
                </Row>
                <Row style={{ margin: '1rem 0 2rem 0' }}>
                  <Col md="4" className="p-0 d-flex">
                    Size :
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
                  <Col md="4" className="p-0 d-flex ">
                    Size :
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
                </Row>
              </Col>
            </Row>
          </Card>
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
