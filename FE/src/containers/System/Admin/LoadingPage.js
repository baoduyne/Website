import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import './LoadingPage.scss'
class LoadingPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        return(
        <div className="loading-container">
            <div className="loading-content">Loading...</div>
        </div>
        )
    }

}

let mapStateToProps= state =>{
    return {

    }
}

let mapDispatchToProps = dispatch  =>{
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingPage);