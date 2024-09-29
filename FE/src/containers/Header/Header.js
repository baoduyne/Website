import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, ROLEID } from "../../utils";
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {

        let menu = []
        let { userInfo } = this.props;
        if (userInfo) {

            let role = userInfo.roleId;
            menu = [];
            if (role === ROLEID.ADMIN) {
                menu = adminMenu;
            }
            else {
                menu = doctorMenu
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="home-header.welcome"></FormattedMessage>{this.props.userInfo && this.props.userInfo.lastName ? ' ' + this.props.userInfo.lastName : "null"} !
                    </span>
                    <span className={this.props.language === 'vi' ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={this.props.language === 'en' ? 'language-en active' : 'language-en'} class='language-en'
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    <div className="btn btn-logout"
                        onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
