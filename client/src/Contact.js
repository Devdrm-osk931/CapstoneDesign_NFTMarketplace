import React from 'react';
import emailjs from 'emailjs-com';
// import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';


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
    const button = document.getElementById("buttonsent");
    const failed = document.getElementById("failed");
    e.preventDefault();

    emailjs.sendForm('service_9bqf8yq', 'template_1bjr0jo', e.target, 'voUJrEA-xcOU15zhb')
      .then((result) => {
          console.log(result.text);
          success.classList.add('show');
          button.classList.add('show');
          failed.classList.remove('show');
      }, (error) => {
          console.log(error.text);
          failed.classList.add('show');
      });
  }

  return (
  <div className='contact'>
  <GlobalStyles />

  {/* <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}> */}
  <section className='jumbotron breadcumb no-bg'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12 text-center">
              <h1>Contact Us</h1>
              <p>Do you have any question?</p>
          </div>
        </div>
      </div>
    </div>
  </section>

      <section className='container'>
        <div className='row'>

          <div className='col-lg-8 mb-3'>
          <h3>1:1 Inquiry</h3>
            <div className="form-side">
              <form className="formcontact" onSubmit={sendEmail}>
                <input type="text" className="form-control" name="name" placeholder="Write your name" required />
                <input type="email" className="form-control" name="from_name" placeholder="Write your Email" required />
                <input type="text" className="form-control" name="phone_number" placeholder="Write your phone-number" required />
                <textarea name="message" className="form-control" placeholder="Write your message" required />
                <div id='success' className='hide'>Your message has been sent...</div>
                <div id='failed' className='hide'>Message failed...</div>
                <input type='submit' id='buttonsent' value='Submit Now' className="btn btn-main color-2" />
              </form>
            </div>
          </div>

          <div className='col-md-4'>

           <div className="padding40 box-rounded mb30">
              <h3>Personal Office</h3>
              <address className="s1">
                <span><i className="id-color fa fa-phone fa-lg"></i><a href="https://www.naver.com">NFT Provider</a></span>
                <span><i className="id-color fa fa-phone fa-lg"></i><a href="https://www.naver.com">Front-End Team1</a></span>
                <span><i className="id-color fa fa-phone fa-lg"></i><a href="https://www.naver.com">Front-End Team2</a></span>
                <span><i className="id-color fa fa-phone fa-lg"></i><a href ="https://www.naver.com">Back-End Team1</a></span>
                <span><i className="id-color fa fa-phone fa-lg"></i><a href="https://www.naver.com">Back-End Team2</a></span>
              </address>
            </div>

            <div className="padding40 box-rounded mb30 text-light">
              <h3>Capstone Office</h3>
              <address className="s1">
                <span><i className="fa fa-map-marker fa-lg"></i>Dongguk University, Seoul</span>
                <span><i className="fa fa-phone fa-lg"></i>+82 000 0000</span>
                <span><i className="fa fa-envelope-o fa-lg"></i><span className='btn'>Capstone@dgu.ac.kr</span></span>
                <span><i className="fa fa-file-pdf-o fa-lg"></i><span className='btn'><a href ="/public/KakaoTalk_20211026_000307649.jpg" download= "manual download">manual download</a>
    </span>
    </span>
            </address>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}
export default contact;
