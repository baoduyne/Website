import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';
import { getAllUsers } from '../../../services/userService'
import EditUserModal from './EditUserModal';
class Practice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenEditUserModal: false,
            currentUser: {}
        }
    }


    componentDidMount = () => {
        this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        try {
            let data = await getAllUsers('ALL');
            console.log(data);
            if (data && data.errCode === 0) {
              
                this.setState({
                    arrUsers: data.users
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditUserModal: !this.state.isOpenEditUserModal,
            currentUser : user
        })

    }

    toggleFromParent = () =>{
        this.setState ({isOpenEditUserModal : !this.state.isOpenEditUserModal})
    }

    handleDeleteUser = (user) => {

    }

    render() {
        return (
            <div className='container'>
                <EditUserModal
                    isOpenEditUserModal={this.state.isOpenEditUserModal}
                    toggle ={this.toggleFromParent}
                    user = {this.state.currentUser}
                >
                </EditUserModal>
                <table>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Service</th>

                    {
                        //console.log(this.state.arrUsers)

                        this.state.arrUsers && this.state.arrUsers.map(user => {
                            return (<tr>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button onClick={() => this.handleEditUser(user)}>Edit</button>
                                    <button onClick={() => this.handleDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>
                            )
                        }
                        )
                    }

                </table>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
