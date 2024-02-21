import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductsSlider = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <FaChevronLeft className="slick-prev" />,
    nextArrow: <FaChevronRight className="slick-next" />,
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
