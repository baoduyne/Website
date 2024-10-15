import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorDetailTag.scss';
class DoctorDetailTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            firstName: '',
            lastName: '',
            address: '',
            avatar: '',
            phoneNumber: '',
            positionVi: '',
            positionEn: '',
            description: '',

            doctorDescriptionIsShow: true
        }
    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                doctorId: this.props.doctorId,
                doctorDescriptionIsShow: this.props.doctorDescriptionIsShow
            })

            await this.props.getSelectDoctorStart(this.props.doctorId);
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

        if (this.props.doctorId && (prevProps.doctorId !== this.props.doctorId)) {
            this.setState({ doctorId: this.props.doctorId })
            this.props.getSelectDoctorStart(this.props.doctorId);
        }

        if (this.props.doctorDescriptionIsShow && prevProps.doctorDescriptionIsShow !== this.props.doctorDescriptionIsShow) {
            this.setState({
                doctorDescriptionIsShow: this.props.doctorDescriptionIsShow
            })
        }

    }

    render() {

        let {
            doctorId,
            firstName,
            lastName,
            address,
            avatar,
            phoneNumber,
            positionVi,
            positionEn,
            description,

            doctorDescriptionIsShow,
        } = this.state;

        let language = this.props.language;
        return (
            <>

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
                            <div className={doctorDescriptionIsShow === true ? 'doctor-description' : 'doctor-des-hide'}>
                                {description}
                            </div>
                            <div className={doctorDescriptionIsShow === false ? 'doctor-description' : 'doctor-des-hide'}>
                                {'jjj'}
                            </div>

                            <div className='doctor-address'>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>{address}</span>
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
