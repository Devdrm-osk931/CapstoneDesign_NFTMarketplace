import '../App.css';
import React from "react";
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer(){
    return(
        <div style = {{marginTop: "60px"}}>
            <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <div>

                <footer className="bg-dark text-center text-lg-start text-white">

                    <div className="container p-4">

                        <div className="row mt-4">

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0" style = {{}}>
                                <img src = "./img/footerlogo.png"/>
                                <p><i>© 2022 Copyright: SOKSAK</i></p>

                                <a className="btn btn-outline-light btn-floating m-1 text-white"
                                                role="button" href='https://www.facebook.com/seokkyo.oh/'><i className="fab fa-facebook-f"></i></a>


                                <a className="btn btn-outline-light btn-floating m-1 text-white"
                                                role="button" href='https://www.twitter.com'><i className="fab fa-twitter"></i></a>


                                <a className="btn btn-outline-light btn-floating m-1 text-white"
                                                role="button" href='https://twitter.com/osk931'><i className="fab fa-google"></i></a>


                                <a className="btn btn-outline-light btn-floating m-1 text-white"
                                                role="button" href="https://www.instagram.com/o.o.o.team1/"><i className="fab fa-instagram"></i></a>
                            </div>


                            <div className="col-lg-6 col-md-6 mb-4 mb-md-0 text-left">
                                <h5 className="text-uppercase mb-4 font-weight-bold">
                                    TEAM SOKSAK Is ...
                                </h5>
                                <div style = {{maxWidth:"80%", marginLeft: '0%'}}>
                                    DGU Capstone Design Team 22'<br/>
                                    Provides top notch NFT Marketplace Service, where you can mint various college jumpers using blockchain technology.
                                    <br/>Test your luck with us!
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
                                <p><i className="fas fa-home mr-3"></i> 서울 중구 필동로1길 30<br/>(Dongguk University, Seoul)</p>
                                <p><i className="fas fa-envelope mr-3"></i> soksak_info@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> + 82 10 5066 9037</p>
                                <p><i className="fas fa-print mr-3"></i> + 82 10 9015 3339</p>
                            </div>
                        </div>
                    </div>
                </footer>

                </div>
            </MDBFooter>
        </div>
    )
}
export default Footer;
