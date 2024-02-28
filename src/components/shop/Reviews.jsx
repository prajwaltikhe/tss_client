import React, { useState, useEffect } from 'react';
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
import { FaRegCheckCircle } from "react-icons/fa";
import ReactStars from "react-stars";
import Ratings from "../common/Ratings";
import tssurl from "../../port";

const Reviews = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [recommendProduct, setRecommendProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(2);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/review/reviews/product/${productID}`
        );
        setReviews(response.data);
        const totalRatings = response.data.reduce(
          (total, review) => total + review.rating,
          0
        );
        const avgRating =
          totalRatings / (response.data.length > 0 ? response.data.length : 1);
        setAverageRating(avgRating);
        setTotalReviews(response.data.length);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productID]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        // username: john_doe,
        // location: Hong-kong ,
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

  const renderReviews = () => {
    return currentReviews.map((review) => (
      <div key={review._id}>
        <Col key={review._id} md={12}>
          <Row>
            <Col md={4}>
              <h5 className="fw-bold">{review.username}</h5>
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
        </Col>
      </div>
    ));
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
            <div className="stars-info row1">
              {averageRating.toFixed(1)} stars | {totalReviews} Reviews
            </div>
            <div className="stars-rating row2">
              <Ratings value={averageRating} />
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
        <div className="pagination absolute left-0 right-0 flex ">
          <button
            className={`px-2 border-1 rounded-md ${
              currentPage === 0
                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                : "bg-white text-gray-700 "
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"} Prev
          </button>
          <span className="p-2">{`Review ${2 * currentPage} of ${2 *
            Math.ceil(reviews.length / reviewsPerPage)}`}</span>
          <button
            className={`px-2 border-1 rounded-md ${
              currentPage === indexOfLastReview - 1
                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                : "bg-white text-gray-700"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastReview >= reviews.length}
          >
            Next {">"}
          </button>
        </div>
        {/* <div className="d-flex ">
          <p>1 of 15</p>
          <p>Sort</p>
          <Button>Recent</Button>
        </div> */}
      </div>

      {renderReviews()}
    </Container>
  );
};

export default Reviews;
