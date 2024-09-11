import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils/constant';
import * as actions from '../../../store/actions'
class UserRedux extends Component {

    constructor (props) {
        super(props);
        this.state = {
            arrAllCode : {},
            arrGender : []
        }
    }

    componentDidMount = async () => {
        this.props.getAllCode();
       this.setState({
        arrAllCode : this.props.allCodeData
       })
       console.log('check state 1',this.props.allCodeData)
        // try{
        //     let res = await getAllCodeService('GENDER');
        //     console.log("res",res);
        //     if(res){
        //         this.setState({
        //             arrGender : res.data.errMessage
        //         })
        //     }
        // }
        // catch(e){
        //     console.log(e);
        // }
    }

    // componentDidUpdate (prevProps,presState) {
    //     if(prevProps !== this.state){
    //         this.setState({
    //             arrGender : this.props.genderData
    //         })
    //     }
    // }

    render() {
            let genders = this.state.arrGender;
            let language = this.props.language;
            
        return (
            
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="menu.admin.redux-handle"></FormattedMessage>
                </div>
                <div className="user-redux-body">
                    <form>
                        <div class="form-group d-flex gap-3 justify-content-center">
                            <div class="form-group col-3">
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="Email"></input>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="inputPassword4"><FormattedMessage id="menu.admin.password"></FormattedMessage></label>
                                <input type="password" class="form-control" id="inputPassword4" placeholder="Password"></input>
                            </div>
                        </div>
                        <div class="form-group d-flex gap-3 justify-content-center">
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.first-name"></FormattedMessage></label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="First Name"></input>
                            </div>
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.last-name"></FormattedMessage></label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Last Name"></input>
                            </div>
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <div class="form-group col-6">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.address"></FormattedMessage></label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></input>
                            </div>
                        </div>
                        <div class="form-group d-flex gap-3 justify-content-center">
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.phonenumber"></FormattedMessage></label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="0123456..."></input>
                            </div>
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.gender"></FormattedMessage></label>
                                <select id="inputState" class="form-control">
                                   
                                    {genders && genders.map((item,index) => {
                                        return (
                                          
                                            <option key = {index}>
                                                {language ===LANGUAGES.VI? item.valueVi : item.valueEn}
                                            </option>
                                           
                                        );
                                    }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div class="form-group d-flex gap-3 justify-content-center">
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.rank"></FormattedMessage></label>
                                <select id="inputState" class="form-control">
                                    <option selected><FormattedMessage id="menu.admin.choose"></FormattedMessage></option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="form-group col-3">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.role"></FormattedMessage></label>
                                <select id="inputState" class="form-control">
                                    <option selected><FormattedMessage id="menu.admin.choose"></FormattedMessage></option>
                                    <option>...</option>
                                </select>
                            </div>

                        </div>

                        <div class="form-group d-flex justify-content-center">
                            <div class="form-group col-6">
                                <label for="inputAddress"><FormattedMessage id="menu.admin.image"></FormattedMessage></label>
                                <input type="text" class="form-control" id="inputAddress" placeholder=""></input>
                            </div>
                        </div>

                        <div class="form-group d-flex gap-3 justify-content-center mt-3 ">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                                <label class="form-check-label" for="gridCheck">
                                    <FormattedMessage id="menu.admin.check-me-out"></FormattedMessage>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary"><FormattedMessage id="menu.admin.Create"></FormattedMessage></button>
                        </div>

                    </form>
                </div>
            </div>

        );
    }


}


let mapStateToProps = state => {
    return {
        language : state.app.language,
        allCodeData : state.admin
    };
    
}

let mapDispathToProps = dispatch => {
    return {
        getAllCode : () => dispatch(actions.fetchAllCodeStart())
    }
}

export default connect(mapStateToProps, mapDispathToProps)(UserRedux);