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
        setTimeout(async() => {
            await this.props.fetchUsersStart();
        },2000);
       
       

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
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
                    <table id="customers">
                        <thead>
                            <tr>
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
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.props.handleEditUser(item)}><i className="far fa-edit"></i></button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
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