import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import ShopTags from '../components/common/Tags';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const paymentOptions = [
    { id: 1, symbol: '💳', text: 'Credit Card', color: '#0066ff' },
    { id: 2, symbol: '💸', text: 'UPI', color: '#00cc00' },
    { id: 3, symbol: '💼', text: 'NEFT', color: '#ff6600' },
    { id: 4, symbol: '💼', text: 'IMPS', color: '#ff9900' },
    { id: 5, symbol: '💻', text: 'Net Banking', color: '#9900cc' },
  ];

  return (
    <Container fluid>
      <Row>
        <ShopTags />
      </Row>
      <p className="mx-5 my-3 fw-bold fs-4">My Account</p>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={8} className="narrow-form-container">
          <div>
            <h5 className="fs-3">Select Payment Option:</h5>
            {paymentOptions.map((option) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={`paymentOption${option.id}`}
                  name="paymentOption"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
                <label htmlFor={`paymentOption${option.id}`} className="ms-3 fs-4" style={{ color: option.color }}>
                  {option.symbol} {option.text}
                </label>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentOptions;
