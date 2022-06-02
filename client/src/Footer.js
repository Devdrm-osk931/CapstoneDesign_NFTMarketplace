import './App.css';
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
                
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0" style = {{marginTop:'4%'}}>
                        <img src = {require("./image/footerlogo.png")}/>
                        <p><i>© 2022 Copyright: SOKSAK</i></p>
                    </div>
                
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase mb-4 font-weight-bold">
                        Company name
                    </h5>
                    <p>
                        Here you can use rows and columns to organize your footer
                        content. Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                    </p>
                </div>
                
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
                        <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                        <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                        <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                        <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                    </div>
                    

                    
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Write to us</h5>

                        <ul className="list-unstyled">
                        <li>
                            <a href="#!" className="text-white"><i className="fas fa-at fa-fw fa-sm me-2"></i>Help in purchasing</a>
                        </li>
                        <li>
                            <a href="#!" className="text-white"><i className="fas fa-shipping-fast fa-fw fa-sm me-2"></i>Check the order status</a>
                        </li>
                        <li>
                            <a href="#!" className="text-white"><i className="fas fa-envelope fa-fw fa-sm me-2"></i>Join the newsletter</a>
                        </li>
                        </ul>
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