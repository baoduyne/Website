import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';
import { Modal } from 'reactstrap';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers :[],
            isOpenModalUser : false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {

            })
        }

    }

    handleAddNewUser = (event) => {
        this.setState({isOpenModalUser : true});
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser
        })
    }

    render() {
        console.log('this', this.state.arrUsers);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                toggleFromParent = {this.toggleUserModal}
                isOpen = {this.state.isOpenModalUser}></ModalUser>
                

                <div className='title text-center'>Manage</div>
                <div className="mx-1">
                    <button
                    onClick = {(event)=>this.handleAddNewUser(event)}
                    className="btn btn-primary px-3"><i className="fas fa-plus pe-3"></i>Add new users</button>
                </div>
                <div className="user-table mt-4 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>

                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>
                                        <button className="btn-edit"><i className="far fa-edit"></i></button>
                                        <button className="btn-delete"><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })

                        }

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
