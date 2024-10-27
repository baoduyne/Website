import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import './ManagePatient.scss';
import DatePicker from "../../../components/Input/DatePicker";
import moment, { lang } from 'moment';
import _ from 'lodash';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    builtDataInputSelect(inputData) {
        let result = [];
        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                let valueVi = item.id + " - " + item.firstName + " " + item.lastName;
                let valueEn = item.id + " - " + item.lastName + " " + item.firstName;

                object.value = item.id;
                object.label = this.props.language === LANGUAGES.VI ? valueVi : valueEn;

                result.push(object)
            })
        }

        return result;
    }

    handleChange = (selectedOption) => {

        if (selectedOption && selectedOption.value) {
            this.setState({
                selectedOption: selectedOption,
            })
        }
    }

    handleOnchangeDatePicker = (date) => {
        if (date && date.length > 0) {
            this.setState({
                currentDate: date[0]
            })
        }

    }





    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    render() {
        let { selectedOption, allSchedules } = this.state;
        let { language } = this.props;
        console.log('props', this.props)
        return (
            <React.Fragment>
                Hellow patient
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
