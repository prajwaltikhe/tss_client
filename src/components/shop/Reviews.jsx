import { useState, useEffect } from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
import Ratings from "../common/Ratings";
import axios from "axios";
import tssurl from "../../port";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Reviews = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/review/reviews/product/${productID}`
        );
        console.log("API Response:", response.data);
        const reviewsArray = Object.values(response.data);
        console.log("hyy", response.data)
        // setReviews(reviewsArray);
        setReviews([response.data]);
        // console.log("reviews",reviewsArray)
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productID]);
  
   console.log("Hello", reviews);
  let cardslide = {
    dots: false,
    infinite: true,
    speed: 500,
    centerPadding: "2px",
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2, // Show two cards at a time
  slidesToScroll: 1, // Scroll one card at a time
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
        breakpoint: 1199.5,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992.5,
        settings: {
          slidesToShow: 1, // On smaller screens, show one card at a time
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 567.5,
        settings: {
          slidesToShow: 1,
          arrows: false, // Remove arrows on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: function(i) {
      return <div>{i + 1}</div>;
    },
  };
  return (
    <Container>
      <div className="d-flex justify-content-between my-3">
        <h5 className="fw-bold">Ratings and Reviews</h5>
        <span className="fw-bold text-end">Add Review</span>
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
      <div className="slider-container">
      <Slider {...cardslide} >
      {reviews.map((review) => (
        <Col key={review._id} md={6}>
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
      ))}
      </Slider>
      </div>
    </Container>
  );
};

export default Reviews;