import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDate: [],
            dateSelected: ''
        }
    }

    componentDidMount() {
        this.setArrDate();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDate();
        }
    }

    setArrDate = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }

        this.setState({ arrDate: arrDate })
    }

    handleScheduleOption = (item) => {

        this.setState({ dateSelected: item.value });

    }

    render() {
        let { arrDate } = this.state;
        let language = this.props.language;
        console.log('momentVi:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        console.log('momentEn:', moment(new Date()).valueOf());
        console.log('check state', this.state);
        console.log('check language', language)
        return (
            <React.Fragment>
                <select>
                    {arrDate && arrDate.length > 0 && arrDate.map((item, index) => {
                        // let valueDate = moment(item.label).format('ddd-DD/MM');

                        return (

                            <option
                                key={index}
                                value={item.value}
                                onChange={() => this.handleScheduleOption(item)}
                            >{item.label}</option>
                        )
                    })}
                </select>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
