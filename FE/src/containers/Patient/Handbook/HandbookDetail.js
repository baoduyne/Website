import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, STICKY_ELEMENT, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './HandbookDetail.scss'
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
class HandbookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allHandbook: ''
        }
    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
    }



    componentDidUpdate = async (prevProps, prevState) => {


    }








    render() {
        console.log('check render state arr ', this.state.selectedClinic)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>



            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.provinces,
        allHandbook: state.admin.allHandbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart()),
        getDataHandbookStart: (type, id) => dispatch(actions.getDataHandbookStart(type, id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandbookDetail));
