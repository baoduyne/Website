import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import LoadingPage from './LoadingPage';
import './UserRedux.scss'
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: '',
            arrAllCode: {},
           
        }
    }

    componentDidMount = async () => {
        await this.props.fetchAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allCodeData !== this.props.allCodeData) {
            this.setState({
               
                language: this.props.language,
                arrAllCode: this.props.allCodeData
            })
        }
    }

    render() {
        let isLoading = this.props.allCodeData.isLoading;
        return (
            <React.Fragment>
                {isLoading ? <LoadingPage></LoadingPage> :
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
                                <div class="form-group col-3">
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

                                        {this.state.arrAllCode.genders && this.state.arrAllCode.genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {this.state.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
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
                                <div class="form-group image-preview-container">
                                
                                    <label htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label>
                                    <input id = 'imagePreview' class="form-control "  type ='file'></input>
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
                </div>}
            </React.Fragment>
        );
    }


}


let mapStateToProps = state => {
    return {
        language: state.app.language,
        allCodeData: state.admin
    };
}

let mapDispathToProps = dispatch => {
    return {
       fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart())
    }
}

export default connect(mapStateToProps, mapDispathToProps)(UserRedux);