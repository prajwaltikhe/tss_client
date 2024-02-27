import { useState } from 'react';
import { Form, Card, Row, Col, Image } from 'react-bootstrap';
import { FaRegHeart } from 'react-icons/fa';
import offer2 from '../../assets/images/offer2.png'

const CartCard = ({ product,onDelete  }) => {
  const {pid}=product;
  const { product_name, unit_price ,size ,variants} = product?.product || {};
  const mid=localStorage.getItem('MID')
  return (
   
      <Card className="bg-light my-3">
        <Row>
          <Col md="3">
            <Image src={variants?.[0]?.ThumbImg?.[0]} alt="cart" fluid className="bg-white h-100" />
          </Col>
          <Col md="9">
            <Row className="my-2 mt-3">
              <Col md="10">
                <h4>{product_name}</h4>
              </Col>
              <Col md="2">
                <strong style={{ cursor: "pointer" }} onClick={() => onDelete(mid, pid)}>Delete</strong>
              </Col>
            </Row>
            <Row>
              <p>$ {unit_price}</p>
            </Row>
            <Row style={{ margin: "4rem 0 2rem 0" }}>
              <Col md="3" className="p-0 d-flex">
                <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                  Size :
                </span>
                <Form.Select
                  style={{
                    width: "3.25rem",
                    padding: "0",
                    paddingLeft: "0.2rem",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                   {size.map((size) => (
                <option key={size.id} >
                  {size.name}
                </option>
              ))}
                </Form.Select>
              </Col>
              <Col md="3" className="p-0 d-flex ">
                <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                  Qty :
                </span>
                <Form.Select
                  style={{
                    width: "3.25rem",
                    padding: "0",
                    paddingLeft: "0.2rem",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Col>
              <Col md="2"></Col>
              <Col md="4" className="text-end pe-4">
                <FaRegHeart size="20" className="me-1" /> {""}{" "}
                <span>Save to wishlist</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
  );
};

export default CartCard;

