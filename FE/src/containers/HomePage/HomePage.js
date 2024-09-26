import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty.js';
import MedicalFacility from './Section/MedicalFacility.js';
import OutStandingDoctor from './Section/OutStandingDoctor.js';
import HandBook from './Section/HandBook.js';
import About from './Section/About.js';
import HomeFooter from './Section/HomeFooter.js';
import "./HomePage.scss"
class HomePage extends Component {

    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 4 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        const responsiveHandBook = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        return (
            <div>
                <HomeHeader isShowBanner = {true}></HomeHeader>
                <Specialty responsive = {responsive}></Specialty>
                <MedicalFacility responsive = {responsive}></MedicalFacility>
                <OutStandingDoctor responsive = {responsive}></OutStandingDoctor>
                <HandBook responsive = {responsiveHandBook}></HandBook>
                <About></About>
                <HomeFooter></HomeFooter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
