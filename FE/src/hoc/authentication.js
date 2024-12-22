import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsAdmin = connectedRouterRedirect({
    authenticatedSelector: state => state.user.userInfo && state.user.userInfo.roleId == 'R1',
    wrapperDisplayName: 'UserIsAdmin',
    redirectPath: '/login',
});

export const userIsDoctor = connectedRouterRedirect({
    authenticatedSelector: state => (state.user.userInfo && state.user.userInfo.roleId == 'R2') || (state.user.userInfo && state.user.userInfo.roleId == 'R1'),
    wrapperDisplayName: 'UserIsDoctor',
    redirectPath: '/login',
});

export const userIsNotStaff = connectedRouterRedirect({
    authenticatedSelector: state => state.user.userInfo && state.user.userInfo.roleId == 'R3',
    wrapperDisplayName: 'UserIsNotCustomer',
    redirectPath: '/login',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});