import React from 'react';
import emailjs from 'emailjs-com';
// import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Container, Col} from "react-bootstrap";



const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const contact= function() {

  function sendEmail(e) {

    const success = document.getElementById("success");
    const button = document.getElementById("input1");
    const failed = document.getElementById("failed");
    e.preventDefault();

    emailjs.sendForm('service_9bqf8yq', 'template_1bjr0jo', e.target, 'voUJrEA-xcOU15zhb')
      .then((result) => {
          console.log(result.text);
          success.classList.add('show');
          button.classList.add('show');
          failed.classList.remove('show');
alert("Your message has been sent...");
      }, (error) => {
          console.log(error.text);
          failed.classList.add('show');
alert("Message failed...");
      });
  }

  return (
  
<div className='ContactUs'>
<Container style={{padding: '0px'}}>
<div>
  <img src={ require('./image/contactus.png') } width='100%' height='100%' alt="mainlogo" margin-bottom= "20px"/>
</div>
</Container>
<Container fluid>
<Col>
  <h7>   </h7>
</Col>
</Container>
  
<Container style={{marginBottom : '20px' , border : '1px solid #d9d9d9', padding: '0px'}}>


      <div class = "container-fluid">
        <div className='row'>
          <div class='col-lg-8 mb-3'>
            <div className="form-side">
              <form className="formcontact" onSubmit={sendEmail}>
              <h2>1:1 Inquiry</h2>
                <p><input type="text" className="form-control" name="name" placeholder="Write your name" required /></p>
                <p><input type="email" className="form-control" name="from_name" placeholder="Write your Email" required /></p>
                <p><input type="text" className="form-control" name="phone_number" placeholder="Write your phone-number" required /></p>
                <p><textarea name="message" className="form-control" placeholder="Write your message" required /></p>
                <div id='success' className='hide'>Your message has been sent...</div>
                <div id='failed' className='hide'>Message failed...</div>
                <input type='submit' id='input1' value='Submit Now' className="btn btn-main color-2"/>
                
              </form>
            </div>
          </div>

          <div class='col-md-4'>
           <div class="padding40 box-rounded mb30">
              <address classname = "sector">
              <h3>Personal Office</h3>
                😊<a href="https://www.naver.com">NFT Provider</a><br></br>
                😊<a href="https://www.naver.com">Front-End Team1</a><br></br>
                😊<a href="https://www.naver.com">Front-End Team2</a><br></br>
                😊<a href ="https://www.naver.com">Back-End Team1</a><br></br>
                😊<a href="https://www.naver.com">Back-End Team2</a><br></br>
              </address>
            </div>

            <div class="padding40 box-rounded mb30">             
              <address className="sector">
              <h3>Team SOKSAK Office</h3>
                Dongguk University, Seoul<br></br>
                +82 000 0000<br></br>
                Capstone@dgu.ac.kr<br></br>
                <a href="subheader.jpg" download ="manual download">manual download</a><br></br>
            </address>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
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
export default contact;
