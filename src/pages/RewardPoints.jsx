import React, { useState } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import ShopTags from '../components/common/Tags';

const RewardPoints = () => {
  const [pointsUsed, setPointsUsed] = useState(0);
  const totalPoints = 1000; 

  const handlePointsUsedChange = (e) => {
    setPointsUsed(parseInt(e.target.value));
  };

  const remainingPoints = totalPoints - pointsUsed;

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
        <Col md={9} className="narrow-form-container">
          <div className="mb-4">
            <h5 className="fs-2 mb-3">Reward Points</h5>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={4} className="fw-bold fs-5 text-end">
                  Points Used:
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    type="number"
                    value={pointsUsed}
                    onChange={handlePointsUsedChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={4} className="fw-bold fs-5 text-end">
                  Remaining Points:
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    value={remainingPoints}
                    readOnly
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RewardPoints;
