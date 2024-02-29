import { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import axios from 'axios';
import tssurl from '../../port';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductsSlider = ({ data }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const mid = localStorage.getItem('MID');

  let cardslide = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992.5,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 567.5,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          arrows: false,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: function (i) {
      return <div>{i + 1}</div>;
    },
  };

  const toggleLike = async (productId) => {
    try {
      const productIdString = String(productId);
      if (likedProducts.includes(productIdString)) {
        setLikedProducts(
          likedProducts.filter((pid) => pid !== productIdString)
        );
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: mid, pid: productId },
        });
        toast.success('Removed from Wishlist');
      } else {
        setLikedProducts([...likedProducts, productIdString]);
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: mid,
          pid: productId,
        });
        toast.success('Added to Wishlist');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Container fluid>
      <Row className="main-slide">
        <Slider {...cardslide}>
          {data.map((item, index) => (
            <Col key={index} className="mb-4">
              <Card>
                <Link to={`/productDetails/${data.pid}`}>
                  <Image
                    src={item?.variants?.[0]?.ThumbImg}
                    alt={item?.sub_category}
                    className="card-image"
                  />
                </Link>
                {likedProducts.includes(item.pid) ? (
                  <FaHeart
                    className="heart me-1"
                    size="24"
                    style={{
                      position: 'relative',
                      bottom: '19rem',
                      left: '13.75rem',
                      cursor: 'pointer',
                      color: 'red',
                      zIndex: '2',
                    }}
                    onClick={() => toggleLike(item.pid)}
                  />
                ) : (
                  <FaRegHeart
                    className="heart me-1"
                    size="24"
                    onClick={() => toggleLike(item.pid)}
                    style={{
                      position: 'relative',
                      bottom: '19rem',
                      left: '13.75rem',
                      cursor: 'pointer',
                      zIndex: '2',
                      color: 'white',
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title as="h4" className="card-heading">
                    {item?.sub_category}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default ProductsSlider;
