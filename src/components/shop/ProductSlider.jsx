import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductsSlider = ({ data }) => {
  const CustomPrevButton = (props) => (
    <button
      {...props}
      className="slick-arrow custom-prev-button"
    >
      <FaChevronLeft/>
    </button>
  );

  
  const CustomNextButton = (props) => (
    <button
      {...props}
      className="slick-arrow custom-next-button"
       >
      <FaChevronRight/>
    </button>
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    initialSlide: 0,
    prevArrow: <CustomPrevButton />, 
    nextArrow: <CustomNextButton />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container fluid>
      <Row className="slider-container">
        <Slider {...settings}>
          {data.map((item, index) => (
            <Col key={index} className="mb-4">
              <Card>
                <Image
                  src={item?.variants?.[0]?.ThumbImg}
                  alt={item?.sub_category}
                  className="card-image"
                />
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
