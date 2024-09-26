import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectDoctor: {}
        }
    }

    componentDidMount() {
        this.props.getSelectDoctorStart(this.props.match.params.id);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectDoctor !== this.props.selectDoctor) {
            this.setState({ selectDoctor: this.props.selectDoctor })
        }
    }

    render() {
        let id = this.props.match.params.id;
        console.log("test selected doctor",this.state.selectDoctor)

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='doctor-detail-content'>

                        <div className='doctor-detail-description'>

                            <div className='content-left'>
                                <div className='avatar'></div>
                            </div>

                            <div className='content-right'>
                                <div className='title'></div>
                                <div className='description'></div>
                                <div className='address'></div>
                            </div>

                        </div>

                        <div className='doctor-detail-markdown'></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
