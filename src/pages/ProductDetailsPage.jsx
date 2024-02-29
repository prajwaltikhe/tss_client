import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { FaCircle, FaPlus, FaMinus, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Ratings from '../components/common/Ratings';
import Reviews from '../components/shop/Reviews';
import axios from 'axios';
import tssurl from '../port';
import ProductsSlider from '../components/shop/ProductSlider';
import ProductGallery from '../components/shop/ProductGallery';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { pid: productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const mid = localStorage.getItem('MID');

  const { colors, size, quantity_pi, product_detail } = product;
  const fitOptions = parseHtmlToList(product.fit);
  const fabricList = parseHtmlToList(product.fabric);
  const sizes = size?.map(({ name }) => name) || [];

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

  const handleQtyChange = (change) => {
    setQty((prevQty) => {
      const newQty = Math.max(1, Math.min(10, prevQty + change));
      return newQty;
    });
  };

  const addToCartHandler = async () => {
    const data = {
      mid: mid,
      pid: productId,
    };

    try {
      const isProductInCart = cart.some((item) => item.user.pid === productId);

      if (isProductInCart) {
        toast('Product is already in the cart');
        return;
      }

      const response = await axios.post(`${tssurl}/cart/carts`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        const errorMessage = response.data
          ? response.data.error
          : 'Unknown error';
        throw new Error(
          `Failed to add item to cart. Server response: ${errorMessage}`
        );
      }

      toast.success('Item added to cart successfully!');

      console.log('Add to cart successful:', response);
      const updatedCart = [...cart, { ...product, qty }];
      setCart(updatedCart);
      navigate('/cart/carts');
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const toggleLike = async () => {
    try {
      if (likedProducts.includes(product.pid)) {
        setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: mid, pid: product.pid },
        });
        toast.success('Removed from Wishlist');
      } else {
        setLikedProducts([...likedProducts, product.pid]);
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: mid,
          pid: product.pid,
        });
        toast.success('Added to Wishlist');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

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
          <div>
            <ProductGallery product={product} />
            {likedProducts.includes(product.pid) ? (
              <FaHeart
                className="heart me-1"
                size="24"
                style={{
                  position: 'relative',
                  bottom: '36.5rem',
                  left: '31.25rem',
                  cursor: 'pointer',
                  color: 'red',
                  zIndex: '2',
                }}
                onClick={toggleLike}
              />
            ) : (
              <FaRegHeart
                className="heart me-1"
                size="24"
                onClick={toggleLike}
                style={{
                  position: 'relative',
                  bottom: '36.5rem',
                  left: '31.25rem',
                  cursor: 'pointer',
                  zIndex: '2',
                  color: 'white',
                }}
              />
            )}
          </div>
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
        <h4 className="ms-2 mt-5 mb-4 fw-bold">Similar Products</h4>
        <ProductsSlider data={products} />
      </Row>
      <Reviews productID={product.pid} />
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
