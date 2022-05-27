import React, { Component } from "react";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/swiper.scss';
import DisplayJackets from './DisplayJackets';
SwiperCore.use([Navigation, Pagination, Autoplay])

function MainSilde (){
  return(
  <div>
            <Swiper
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
      >
        <SwiperSlide><img src='img/1.png'/></SwiperSlide>
        <SwiperSlide><img src= 'img/65.png'/></SwiperSlide>
        <SwiperSlide><img src='img/99.png'/></SwiperSlide>
        <SwiperSlide><img src= 'img/main_banner2.png'/></SwiperSlide>
        </Swiper>
        </div>

  )
}

function Main (props){
    return(
        <div>
            <MainSilde/>
            <DisplayJackets array = {props.array} type ='Buy'/>
        </div>
    )
}

export default Main;
