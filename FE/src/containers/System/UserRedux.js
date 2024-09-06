import React, { Component } from "react";
import {connect} from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
class UserRedux extends Component{

    componentDidMount = () =>{

    }

    render(){
        return (
            
            <div>test</div>
            
        );
    }


}


let mapStateToProps = state =>{
    return (
        <></>
    );
}

let mapDispathToProps = dispatch =>{
    return(
        <></>
    )
}

export default connect(mapStateToProps,mapDispathToProps)(UserRedux);