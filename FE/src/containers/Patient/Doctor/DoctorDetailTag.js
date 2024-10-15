import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetailTag.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorInformation from './DoctorInformation';
import HomeFooter from '../../HomePage/Section/HomeFooter';
class DoctorDetailTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            address: '',
            avatar: '',
            phoneNumber: '',
            positionVi: '',
            positionEn: '',
            description: '',
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                id: this.props.id
            })
            this.props.getSelectDoctorStart(this.state.id);
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language != this.props.language) {
            this.componentDidMount();
        }

        if (prevProps.selectDoctor !== this.props.selectDoctor) {
            let copySelectDoctor = { ...this.props.selectDoctor };
            if (copySelectDoctor && copySelectDoctor.avatar) {
                copySelectDoctor.avatar = new Buffer(copySelectDoctor.avatar, 'base64').toString('binary');
            }
            let copyState = { ...this.state };
            copyState.selectDoctor = this.props.selectDoctor;
            if (copySelectDoctor.firstName && copySelectDoctor.lastName) {
                copyState.id = copySelectDoctor.id;
                copyState.firstName = copySelectDoctor.firstName;
                copyState.lastName = copySelectDoctor.lastName;
                copyState.address = copySelectDoctor.address;
                copyState.avatar = copySelectDoctor.avatar;
                copyState.phoneNumber = copySelectDoctor.phoneNumber;
                copyState.description = copySelectDoctor.Markdown.description;
            }
            if (copySelectDoctor.positionData) {
                copyState.positionVi = copySelectDoctor.positionData.valueVi;
                copyState.positionEn = copySelectDoctor.positionData.valueEn;
            }

            this.setState({
                ...copyState
            })

        }

    }

    render() {
        let {
            id,
            firstName,
            lastName,
            address,
            avatar,
            phoneNumber,
            positionVi,
            positionEn,
            description,
            contentMarkdown,
            contentHTML
        } = this.state;
        console.log('check detail state', this.state);
        let language = this.props.language;
        return (
            <>
                <div className='doctor-detail-container'>
                    <div className='doctor-detail-content'>

                        <div className='doctor-detail-description'>

                            <div className='content-left'>
                                <div
                                    style={{ backgroundImage: `url(${avatar})` }}
                                    className='avatar'>
                                </div>
                            </div>

                            <div className='content-right'>
                                <div className='doctor-title'>
                                    {language === LANGUAGES.VI ?
                                        positionVi + " " + firstName + " " + lastName
                                        :
                                        positionEn + " " + lastName + " " + firstName}
                                </div>
                                <div className='doctor-description'>
                                    {description}
                                </div>
                                <div className='doctor-address'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>{address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        selectDoctor: state.admin.selectDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectDoctorStart: (id) => dispatch(actions.getSelectDoctorStart(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetailTag));
