import { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button, Form, Tabs, Tab } from 'react-bootstrap';
import { FaCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Ratings from '../components/common/Ratings';
import Reviews from '../components/shop/Reviews';
import axios from 'axios';
import tssurl from '../port';
import ProductsSlider from '../components/shop/ProductSlider';

const ProductDetailsPage = () => {
  const { pid: productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${tssurl}/productDetails/${productId}`
        );
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }

      try {
        const response = await axios.get(`${tssurl}/productcat/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProduct();
  }, [productId, product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { variants, colors, size, quantity_pi, product_detail } = product;
  const thumbImgUrl = variants?.[0]?.ThumbImg?.[0];
  const fitOptions = parseHtmlToList(product.fit);
  const fabricList = parseHtmlToList(product.fabric);
  const sizes = size?.map(({ name }) => name) || [];

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value, 10));
  };

  const addToCartHandler = () => {
    const updatedCart = [...cart, { ...product, qty }];
    setCart(updatedCart);

    navigate('/cart/carts');
  };

  return (
    <Container>
      <Link className="btn btn-light my-3" to="/products">
        Go Back
      </Link>
      <Row className="product-details">
        <Col md={6}>
          <Image src={thumbImgUrl} fluid />
        </Col>
        <Col md={6}>
          <h3>{product.product_name}</h3>
          <Row className="mt-2">
            <Col md={3}>
              <h5>${product.unit_price}</h5>
            </Col>
            <Col md={3}>
              <Ratings value={parseFloat(product.rating)} />
            </Col>
          </Row>
          <h6 className="mt-2">
            Color:{' '}
            <span>
              {colors.map((color, index) => (
                <FaCircle
                  key={index}
                  style={{
                    color: index === color.value && color.value,
                    cursor: 'pointer',
                  }}
                />
              ))}
            </span>
          </h6>
          <Row>
            <Col md={6}>
              <h6 className="pt-2">Size*</h6>
              {sizes.map((size, index) => (
                <Button
                  variant="light"
                  key={index}
                  className="me-2 border-dark mb-2"
                >
                  {size}
                </Button>
              ))}
              <p className="mt-1">
                <Link to="#">Size Guide</Link>
              </p>
            </Col>
            <Col md={3}>
              <h6>Quantity*</h6>
              <Form.Control
                className="quantity"
                as="select"
                value={qty}
                onChange={handleQtyChange}
              >
                {[...Array(quantity_pi).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Button
                variant="dark"
                className="btn-block p-2 w-100"
                type="button"
                disabled={quantity_pi === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
          <Tabs
            defaultActiveKey="details"
            id="fill-tab"
            className="mt-3 mb-2"
            fill
          >
            <Tab eventKey="details" title="Details">
              <span style={{ textAlign: 'justify' }}>
                {parseHtmlToText(product_detail)}
              </span>
            </Tab>
            <Tab eventKey="fabric" title="Fabric">
              <span style={{ textAlign: 'justify' }}>
                {fabricList.map((fabric, index) => (
                  <li key={index}>{fabric}</li>
                ))}
              </span>
            </Tab>
            <Tab eventKey="fit" title="Fit">
              <span style={{ textAlign: 'justify' }}>
                {fitOptions.map((fit, index) => (
                  <li key={index}>{fit}</li>
                ))}
              </span>
            </Tab>
            <Tab eventKey="about" title="About">
              <span style={{ textAlign: 'justify' }}>
                {parseHtmlToText(product.about)}
              </span>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <div className="mt-5">
        <ProductsSlider data={products} />
      </div>
      <div className="py-4">
        <Reviews />
      </div>
    </Container>
  );
};

const parseHtmlToList = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const fitListItems = doc.querySelectorAll('ol li');
  return Array.from(fitListItems).map((item) => item.textContent.trim());
};

const parseHtmlToText = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

export default ProductDetailsPage;
