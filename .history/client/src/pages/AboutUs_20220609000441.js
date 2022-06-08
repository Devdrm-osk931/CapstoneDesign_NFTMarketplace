import '../App.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function AboutUs(){
    return(
        <div>
        <Container style={{padding: '0px'}}>
        <div>
        <img src='/img/aboutus.png' width='100%' height='100%' alt="mainlogo" margin-bottom= "20px"/>
        </div>
        </Container>

        <Container fluid>
        <Col>
            <h7>   </h7>
        </Col>
        </Container>

        <Container style={{padding: '0px'}}>
        <div>
        <img src= '/img/aboutusins.png' width='100%' height='100%' alt="mainlogo" margin-bottom= "20px"/>
        </div>
        </Container>

        <Container fluid>
        <Col>
            <h1>   </h1>
            <h1>   </h1>
        </Col>
        </Container>


        <Container style={{padding: '0px', border : '1px solid #d9d9d9'}}>
        <Container>

        <Row>
        <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Oh.jpg" style={{width:'160px', height:'200px'}}></img>
                 <p className = "AboutUs-font">오석교</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>1996.07.28 <br></br>2017112204 <br></br>정보통신공학과<br/><b>Team Leader</b></div>
                 </div>
                 </div>
          </Col>
          <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Ko.jpeg" style={{width:'160px', height:'200px'}}></img>
                 <p className = "AboutUs-font">고승렬</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>1998.01.26 <br></br>2017112172 <br></br>정보통신공학과<br/><b>FrontEnd/BackEnd Dev</b></div>
                 </div>
                 </div>
          </Col>

          <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Jeong.jpeg" style={{width:'150px', height:'200px'}}></img>
                 <p className = "AboutUs-font" >정동환</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>1998.11.18<br></br>2017112189 <br></br>정보통신공학과<br/><b>FrontEnd/BackEnd Dev</b></div>
                 </div>
                 </div>
          </Col>

        </Row>

        <Container fluid>
        <Col>
            <h1>   </h1>
            <h1>   </h1>
        </Col>
        </Container>

        <Row>
          <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Lee.jpg"></img>
                 <p className = "AboutUs-font">이지환</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>2000.09.13 <br></br>2019112120 <br></br>정보통신공학과<br/><b>총무<br/>Web Designer</b></div>
                 </div>
                 </div>
          </Col>

          <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Kim.png"></img>
                 <p className = "AboutUs-font">김민재</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>1997.03.12 <br></br>2019113592 <br></br>정보통신공학과<br/><b>Web Designer</b></div>
                 </div>
                 </div>
          </Col>

          <Col>
             <div className = "profile-align-center">
                 <img src = "/img/Jeon.jpeg" style={{width:'150px', height:'200px'}}></img>
                 <p className = "AboutUs-font">전나연</p>
                 <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                 <div style={{width:'60%', marginLeft:'20%'}}>1999.10.11<br></br> 2018111688 <br></br>정보통신공학과<br/><b>NFT Designer</b></div>
                 </div>
                 </div>
          </Col>
        </Row>


        </Container>
        </Container>


    <Container fluid>
    <Col>
        <h1>   </h1>
        <h1>   </h1>
    </Col>
    </Container>
    </div>
    );
}
export default AboutUs;
