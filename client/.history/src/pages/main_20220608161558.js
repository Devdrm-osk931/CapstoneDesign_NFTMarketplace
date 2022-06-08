import './App.css';
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/swiper.scss';
import DisplayJackets from './DisplayJackets';
import { Dropdown } from "react-bootstrap";
import { Container, Col } from "react-bootstrap";
SwiperCore.use([Navigation, Pagination, Autoplay])

function MainSlide(){
  return(
    <Container>
      <div>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500 }}
        >
          <SwiperSlide><img className='banner__img' src='img/main_banner.png'/></SwiperSlide>
          <SwiperSlide><img className='banner__img' src= 'img/banner1.png'/></SwiperSlide>
          <SwiperSlide><img className='banner__img' src='img/banner2.png'/></SwiperSlide>
          <SwiperSlide><img className='banner__img' src='img/banner3.png'/></SwiperSlide>
          <SwiperSlide><img className='banner__img' src= 'img/banner4.png'/></SwiperSlide>
        </Swiper>
      </div>
    </Container>
  )
}

function Main (props){

  const[currentArray, setCurrentArray] = useState(props.array);


  function getJackets(){
    const jackets = props.array;
    setCurrentArray(jackets);
  }

  function sortById(){
    const jackets = [...props.array].sort(function(a, b){
      return a[0]-b[0];
    })
    setCurrentArray(jackets);
  }

  function sortByPrice(){
    const jackets = [...props.array].sort(function(a, b){
      return a[2]-b[2];
    })
    setCurrentArray(jackets);
  }
  useEffect(getJackets, [props.array]);

  return(
    <div>
      <div style = {{marginTop:'20px'}}>
        <h1>
          <b>
            O.O.O Market
          </b>
        </h1>
      </div>

      <MainSlide/>

      <div className="component-spacing">
            <br/>
        <div className="setmid">
          <div className="set mid col-xs-12">
            <Container>
                <Col style = {{textAlign: 'right'}}>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                      정렬 옵션
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick = {getJackets}>판매 등록순</Dropdown.Item>
                      <Dropdown.Item onClick = {sortByPrice}>가격순</Dropdown.Item>
                      <Dropdown.Item onClick = {sortById}>ID순</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
            </Container>
          </div>
        </div>
      </div>

      <DisplayJackets array = {currentArray} account = {props.account} contract = {props.contract} contractAddress = {props.contractAddress} type ={props.type}/>
    </div>
  )
}
export default Main;
