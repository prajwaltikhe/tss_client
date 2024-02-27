import { useState } from 'react';
import { Form, Card, Row, Col, Image } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import tssurl from '../../port';

const CartCard = ({ product, onDelete, onQtyChange }) => {
  const { pid } = product;
  const [qty, setQty] = useState(1);
  const { product_name, unit_price, size, variants } = product?.product || {};
  const mid = localStorage.getItem('MID');
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleQtyChange = (newQty) => {
    setQty(newQty);
    if (onQtyChange) {
      onQtyChange(mid, pid, newQty);
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
    <Card className="bg-light my-3">
      <Row>
        <Col md="3">
          <Image
            src={variants?.[0]?.ThumbImg?.[0]}
            alt="cart"
            fluid
            className="h-100"
          />
        </Col>
        <Col md="9">
          <Row className="my-2 mt-3">
            <Col md="10">
              <h4>{product_name}</h4>
            </Col>
            <Col md="2">
              <strong
                style={{ cursor: 'pointer' }}
                onClick={() => onDelete(mid, pid)}
              >
                Delete
              </strong>
            </Col>
          </Row>
          <Row>
            <p>$ {unit_price}</p>
          </Row>
          <Row style={{ margin: '4rem 0 2rem 0' }}>
            <Col md="3" className="p-0 d-flex">
              <span style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>
                Size :
              </span>
              <Form.Select
                style={{
                  width: '3.5rem',
                  padding: '0',
                  paddingLeft: '0.2rem',
                  boxShadow: 'none',
                  border: 'none',
                }}
              >
                {size.map((size) => (
                  <option key={size.id}>{size.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md="3" className="p-0 d-flex">
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
                onChange={(e) => toggleQtyChange(parseInt(e.target.value, 10))}
                value={qty}
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md="2"></Col>
            <Col md="4" className="text-end pe-4">
              {likedProducts.includes(product.pid) ? (
                <FaHeart
                  className="heart me-1"
                  size="20"
                  onClick={toggleLike}
                  style={{ color: 'red' }}
                />
              ) : (
                <FaRegHeart
                  className="heart me-1"
                  size="20"
                  onClick={toggleLike}
                />
              )}
              <span>Save to wishlist</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CartCard;
