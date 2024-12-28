import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./corousel.css"; 
import LazyLoad from 'react-lazyload';


import banner from '../../assets/pizzaBanner.jpg'
import banner1 from '../../assets/pizzaBanner1.jpg'
import banner2 from '../../assets/pizzaBanner2.jpg'
import banner3 from '../../assets/pizzaBanner3.jpg'
import banner4 from '../../assets/pizzaBanner4.jpg'
import pepBanner from '../../assets/pepporoniPizzaBanner.jpg'

import React from "react";
import Slider from "react-slick";

export default function Corousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,  
    autoplaySpeed: 2000,
    lazyLoad: 'ondemand'
  };

  const slideStyle = {
    height: '100%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <LazyLoad height={300} offset={100}>
    <Slider {...settings}>
      {[banner, banner1, banner2, banner3, pepBanner, banner4].map((img, index) => (
          <div className="slick-slide bg-orange-200 text-center" style={slideStyle} key={index}>
            <img src={img} alt={`banner${index + 1}`} loading="lazy" />
          </div>
        ))}
    </Slider>
    </LazyLoad>
  );
}
