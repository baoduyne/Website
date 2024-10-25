import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageUserTable.scss';
import * as actions from '../../../store/actions'
import { deleteUserService } from "../../../services/userService";


class ManageUserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: '',
        }
    }

    componentDidMount = async () => {
        await this.props.fetchUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userRedux && (prevProps.userRedux !== this.props.userRedux)) {
            this.setState({
                arrUsers: this.props.userRedux
            })
        }
    }

    handleDeleteUser = (item) => {
        this.props.deleteUserStart(item.id);
    }



    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div>
                <div className="user-table mt-4 mx-1">
                    <table className="table" id="customers">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>User Id</th>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {arrUsers && arrUsers.map((item, index) => {

                                return (
                                    <tr>
                                        <td className="font-weight-bold">{index}</td>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.props.handleEditUser(item)}><i className="far fa-edit"></i></button>
                                            <button className="btn btn-light ml-3" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersStart: () => dispatch(actions.fetchUsersStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserTable);