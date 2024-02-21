import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";



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
    prevArrow: <FaChevronLeft className="slick-prev custom-nav-button" />,
    nextArrow: <FaChevronRight className="slick-next custom-nav-button" />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="card">
            <img
              src={item?.variants?.[0]?.ThumbImg}
              alt={item?.sub_category}
              className="card-image"
            />
            <h4 className="card-heading">{item?.sub_category}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
