import './App.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function AboutUs(){
    return(
        <div className="App" style={{width:'100%', height:'300px'}}>
            <p style={{fontWeight: '500', fontSize: '3em'}}>Only One's Own</p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque <br></br>laudantium,totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi <br></br>architecto beatae vitae dicta sunt explicabo.

        
        
            <Container fluid style={{marginTop: '6%', width:'80%', marginLeft:'10%'}}>
                <Row xs={1} md={3}>
                    
                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">고승렬</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                        <br></br><br></br><br></br>
                    </Col>
                    
                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">김민재</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">전나연</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">정동환</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">오석교</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <div className = "profile-align-center">
                            <img src = "/profile2.png"></img>
                            <p className = "AboutUs-font">이지환</p>
                            <div style ={{backgroundColor:"#F7F5F2", height:'120px'}}>
                                <div style={{width:'60%', marginLeft:'20%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                            </div>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        
    </div>
    ); 
}
export default AboutUs;