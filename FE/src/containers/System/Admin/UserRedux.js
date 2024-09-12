import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import LoadingPage from './LoadingPage';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            objectUrl: '',
            arrAllCode: {},

        }
    }

    componentDidMount = async () => {
        await this.props.fetchAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allCodeData !== this.props.allCodeData) {
            this.setState({
                arrAllCode: this.props.allCodeData
            })
        }
    }
    handlePreviewImage = (event) => {

        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({ objectUrl: objectUrl })
            console.log('test file', objectUrl);
        }

    }

    render() {
        let isLoading = this.props.allCodeData.isLoading;
        let language = this.props.language;
        let imagePreview = this.state.objectUrl;
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
                                        {this.state.arrAllCode.positions && this.state.arrAllCode.positions.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {this.state.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>

                                                );
                                            }
                                            )}
                                        </select>
                                    </div>
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.role"></FormattedMessage></label>
                                        <select id="inputState" class="form-control">
                                        {this.state.arrAllCode.roles && this.state.arrAllCode.roles.map((item, index) => {
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

                                <div class="form-group d-flex justify-content-center">
                                    <div class="form-group image-preview-container">
                                        <label htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label>
                                        <input onChange={(event) => this.handlePreviewImage(event)} id='imagePreview' class="form-control " type='file' hidden></input>
                                        <div className="preview-box" style ={{ backgroundImage: `url(${imagePreview})` }} onClick={() => this.setState({isOpen:true})}></div>
                                    </div>
                                </div>

                                <div class="form-group d-flex gap-3 justify-content-center mt-3 ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck" ></input>
                                        <label class="form-check-label" for="gridCheck">
                                            <FormattedMessage id="menu.admin.check-me-out"></FormattedMessage>
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary ml-3"><FormattedMessage id="menu.admin.Create"></FormattedMessage></button>
                                </div>

                            </form>

                        </div>
                        {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={imagePreview}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />}
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