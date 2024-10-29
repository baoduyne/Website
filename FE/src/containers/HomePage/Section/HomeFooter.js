import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class HomeFooter extends Component {

    render() {
        // return (
        //     <>
        //         <footer class="bg-white section-container section-home-footer-test ">
        //             <div class="container py-5">
        //                 <div class="row py-3">

        //                     <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
        //                         <h6 class="text-uppercase font-weight-bold mb-4">About</h6>
        //                         <ul class="list-unstyled mb-0">
        //                             <li class="mb-2"><a href="#" class="text-muted">Contact Us</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">About Us</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Stories</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Press</a></li>
        //                         </ul>
        //                     </div>

        //                     <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
        //                         <h6 class="text-uppercase font-weight-bold mb-4">Help</h6>
        //                         <ul class="list-unstyled mb-0">
        //                             <li class="mb-2"><a href="#" class="text-muted">Payments</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Shipping</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Cancellation</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Returns</a></li>
        //                         </ul>
        //                     </div>

        //                     <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
        //                         <h6 class="text-uppercase font-weight-bold mb-4">Policy</h6>
        //                         <ul class="list-unstyled mb-0">
        //                             <li class="mb-2"><a href="#" class="text-muted">Return Policy</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Terms Of Use</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Security</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Privacy</a></li>
        //                         </ul>
        //                     </div>
        //                     <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
        //                         <h6 class="text-uppercase font-weight-bold mb-4">Company</h6>
        //                         <ul class="list-unstyled mb-0">
        //                             <li class="mb-2"><a href="#" class="text-muted">Login</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Register</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Sitemap</a></li>
        //                             <li class="mb-2"><a href="#" class="text-muted">Our Products</a></li>
        //                         </ul>
        //                     </div>
        //                     <div class="col-lg-4 col-md-6 mb-lg-0">
        //                         <h6 class="text-uppercase font-weight-bold mb-4">Registered Office Address</h6>
        //                         <p class="text-muted mb-4">Here , write the complete address of the Registered office address along with telephone number.</p>
        //                         <ul class="list-inline mt-4">
        //                             <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab  fa-2x fa-twitter"></i></a></li>
        //                             <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-2x fa-facebook-f"></i></a></li>
        //                             <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-2x fa-instagram"></i></a></li>
        //                             <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-2x fa-youtube"></i></a></li>
        //                             <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fab fa-2x fa-google"></i></a></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //             <hr class="p-0 m-0 b-0"></hr>


        //             <div class="bg-light py-2">
        //                 <div class="container text-center">
        //                     <p class="text-muted mb-0 py-2">&copy; 2019 BBBootstrap All risghts reserved.</p>

        //                 </div>
        //             </div>

        //         </footer>
        //     </>
        // );

        return (

            <div className='section-container section-home-footer'>
                <div className='footer-description'>This website was developed by Bao Duy with purposes acquire knownledge and improve skills </div>
                <div className='footer-description'>© Indipendent Project. All Rights Reserved</div>
                <div className='footer-term'>
                    <div className='term-items'>Privacy & Terms of Use</div>
                    <div className='term-items'>About Me</div>
                    <div className='term-items'>Why Trust Me</div>
                    <div className='term-items'>Editorial Policy</div>
                    <div className='term-items'>Login</div>
                    <div className='term-items'>Email Me</div>
                </div>
                <div className='footer-social-link'>
                    <a href='https://www.facebook.com/baoduy.lo.1/' className='social-icon' target='blank_'><i class="fab fa-facebook"></i></a>
                    <a href='https://github.com/baoduyne' className='social-icon' target='blank_'><i class="fab fa-github social-icon"></i></a>
                    <a href='https://www.instagram.com/' className='social-icon' target='blank_'><i class="fab fa-instagram social-icon"></i></a>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
