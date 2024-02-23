import { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaRegCheckCircle } from 'react-icons/fa';
import Ratings from '../common/Ratings';
import axios from 'axios';
import tssurl from '../../port';

const Reviews = ({ productID }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/review/reviews/product/${productID}`
        );
        console.log('API Response:', response.data);

        setReviews([response.data]);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productID]);

  return (
    <Container>
      <div className="review-head fw-bold">
        <h5>Ratings and Reviews</h5>
        <p>Add Review</p>
      </div>
      <div className="review-body">
        <Row>
          <Col md={4} sm={6} className="column column-stars">
            <div className="stars-info row1">4.6 stars | 1283 Reviews</div>
            <div className="stars-rating row2">
              <Ratings value={5} />
            </div>
          </Col>

          <Col md={4} sm={6} className="column column-recommendations">
            <div className=" row1"> 92 % Recommended</div>
            <div className=" row2">
              <FaRegCheckCircle size={30} />
            </div>
          </Col>
          <Col md={4} className="column column-size">
            Customer says true to size
          </Col>
        </Row>
      </div>

      <div className="text-center">Images</div>
      <div className="review-head">
        <div> # Reviews</div>
        <div className="d-flex ">
          <p>1 of 15</p>
          <p>Sort</p>
          <Button>Recent</Button>
        </div>
      </div>
      {/* reviews section */}
      {reviews.map((review) => (
        <Row className="reviews " key={review._id}>
          <Col md={4}>
            <h5 className="fw-bold">{review.username}</h5>
            {/* <p>Incentivized Review</p> */}
            <p>
              <b>Location:</b> {review.location}
            </p>
            <p>
              <b>Age:</b> {review.Age}
            </p>
            <p>
              <b>Height:</b> {review.Height}'
            </p>
            <p>
              <b>Body type:</b> {review.BodyType}
            </p>
          </Col>
          <Col md={8}>
            <div>
              <Ratings value={5} />
            </div>
            <h5>{review.product_name}</h5>
            <p>{review.review}</p>
            <p>
              <b>Fit Purchased:</b> {review.FitPurchased}
            </p>
            <p>
              <b>Size Purchased:</b> {review.SizePurchased}
            </p>
            <p>
              <b>Size Normally Worn:</b> {review.SizeWorn}
            </p>
            <p>
              {review.recommendProduct && (
                <span>
                  <b>Yes</b> I recommend this product
                </span>
              )}
            </p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Reviews;
