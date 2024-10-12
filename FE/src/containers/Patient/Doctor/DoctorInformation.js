import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DetailDoctor.scss';

class DoctorInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            doctorInfors: '',
            detailIsOpened: false,
        }
    }

    componentDidMount = async () => {
        await this.getDoctorInformation();
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.doctorInfors && (prevProps.doctorInfors !== this.props.doctorInfors)) {
            this.setState({
                doctorInfors: this.props.doctorInfors
            })

        }
        if (this.props.doctorId && (prevProps.doctorId !== this.props.doctorId)) {
            this.setState({ doctorId: this.props.doctorId });
            this.getDoctorInformation();
        }
    }

    getDoctorInformation = async () => {
        console.log('check id', this.state.doctorId)
        await this.props.getDoctorInformationsStart(this.state.doctorId);
    }

    render() {
        let { } = this.state;
        let language = this.props.language;
        console.log('this state', this.state)
        return (
            <>
                sadasd
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorInfors: state.admin.doctorInfors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorInformationsStart: (doctorId) => dispatch(actions.getDoctorInformationsStart(doctorId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorInformation));
