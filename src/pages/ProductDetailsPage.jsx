import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { FaCircle, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Ratings from '../components/common/Ratings';
import Reviews from '../components/shop/Reviews';
import axios from 'axios';
import tssurl from '../port';
import ProductsSlider from '../components/shop/ProductSlider';
import ProductGallery from '../components/shop/ProductGallery';

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

  const { colors, size, quantity_pi, product_detail } = product;
  const fitOptions = parseHtmlToList(product.fit);
  const fabricList = parseHtmlToList(product.fabric);
  const sizes = size?.map(({ name }) => name) || [];

  const handleQtyChange = (change) => {
    setQty((prevQty) => {
      const newQty = Math.max(1, Math.min(10, prevQty + change));
      return newQty;
    });
  };
  const mid = localStorage.getItem('MID');

  const addToCartHandler = () => {
    const data = {
      mid: mid,
      pid: productId,
    };

    fetch(`${tssurl}/cart/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Add to cart successful:', response);
        const updatedCart = [...cart, { ...product, qty }];
        setCart(updatedCart);
        navigate('/cart/carts');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  console.log('cart', cart);
  return (
    <Container>
      <p className="breadcrumb">
        <Link to="/" className="me-1">
          Home
        </Link>
        /
        <Link to="/products" className="mx-1">
          Products
        </Link>
        / <strong className="ms-1">{product.product_name}</strong>
      </p>
      <Row className="product-details">
        <Col md={6}>
          <ProductGallery product={product} />
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
                <Button variant="light" key={index} className="me-2 mb-2">
                  {size}
                </Button>
              ))}
              <p className="mt-1">
                <Link to="#">Size Guide</Link>
              </p>
            </Col>
            <Col md={4}>
              <h6>Quantity*</h6>
              <div className="quantity-selector">
                <Button variant="light" onClick={() => handleQtyChange(-1)}>
                  <FaMinus size={10} />
                </Button>
                <span className="mx-4">{qty}</span>
                <Button variant="light" onClick={() => handleQtyChange(1)}>
                  <FaPlus size={10} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
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
            className="mt-3 mb-2 prodTabs"
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
      <Row>
        <h4 className="m-2 mt-5 mb-3 fw-bold">Similar Products</h4>
        <ProductsSlider data={products} />
      </Row>
      <div className="py-4">
        <Reviews productID={product.pid} />
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
