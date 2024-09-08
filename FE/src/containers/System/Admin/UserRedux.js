import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
class UserRedux extends Component {

    componentDidMount = () => {

    }

    render() {
        return (

            <div className="user-redux-container">
                <div className="title">
                    This is redux
                </div>
                <div className="user-redux-body">
                    <div className="container">
                    <div className="row">
                        <div className="col-6">
                        <label>Email</label>
                        <input className = "form-control" type = "email"></input>
                        </div>
                        <div className="col-6">
                            <label>Last Name</label>
                            <input className="form-control" type = "text"></input>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>


        );
    }


}


let mapStateToProps = state => {
    return (
        <></>
    );
}

let mapDispathToProps = dispatch => {
    return (
        <></>
    )
}

export default connect(mapStateToProps, mapDispathToProps)(UserRedux);