import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";
import { FaRegCheckCircle } from "react-icons/fa";
import Ratings from "../common/Ratings";
import tssurl from "../../port";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Reviews = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [recommendProduct, setRecommendProduct] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/review/reviews/product/${productID}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productID]);

  const handleAddReview = async () => {
    try {
      const reviewData = {
        mid: localStorage.getItem("MID"),
        pid: productID,
        product_name: reviewTitle,
        rating: rating,
        review: reviewDesc,
        // recommendProduct: recommendProduct,
        // rid:review23,
        // username:john_doe,
        // location:Hong-kong ,
        // Age:21,
        // Height:6,
        // BodyType:SlimFit2,
        // FitPurchased:Petite,
        // SizePurchased:L,
        // SizeWorn:L Petite,
      };

      const response = await axios.post(`${tssurl}/review/reviews`, reviewData);
      console.log("Review added successfully:", response.data);

      setReviewTitle("");
      setReviewDesc("");
      setRating(0);
      setRecommendProduct(false);

      setShowModal(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    centerPadding: "60px",
    prevArrow: (
      <div className="custom-prev-arrow">
        <button className="rounded-pill btn btn-light home-slide-btn">
          <FaChevronLeft />
        </button>
      </div>
    ),
    nextArrow: (
      <div className="custom-next-arrow">
        <button className="rounded-pill btn btn-light home-slide-btn">
          <FaChevronRight />
        </button>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
    customPaging: function (i) {
      return <div>{i + 1}</div>;
    },
  };

  return (
    <Container>
      <div className="d-flex justify-content-between my-3">
        <h5 className="fw-bold">Ratings and Reviews</h5>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Review
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="reviewTitle">
                <Form.Label>Review Title</Form.Label>
                <Form.Control
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="reviewDesc">
                <Form.Label>Review Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reviewDesc}
                  onChange={(e) => setReviewDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={(newValue) => setRating(newValue)}
                  size={24}
                  color2={"#ffd700"}
                />
              </Form.Group>
              <Form.Group controlId="recommendProduct">
                <Form.Check
                  type="checkbox"
                  label="Yes, I recommend this product"
                  checked={recommendProduct}
                  onChange={(e) => setRecommendProduct(e.target.checked)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddReview}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>
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
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review._id}>
            <Col key={review._id} md={12}>
              <Card>
                <Card.Body>
                  <Row>
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
                        <Ratings value={review.rating} />
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
                      {review.recommendProduct && (
                        <p>
                          <span>
                            <b>Yes</b> I recommend this product
                          </span>
                        </p>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default Reviews;
