import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { saveUser, fetchGroups, fetchUserDetails, changeUser } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditUserForm from '../components/EditUserForm';

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroups();
    this.props.fetchUserDetails(this.props.userId);
  }

  saveUser(user) {
    console.log('save user: ' + JSON.stringify(user));
    this.props.saveUser(user)
      .then(() => {
        this.props.push(`/users`);
      });
  }

  render() {
    if (!this.props.user || !this.props.allGroups) return null;

    return (
      <div>
        <h1>Edit user</h1>
        <EditUserForm user={this.props.user} save={this.saveUser} saveButtonText='Save'
                      userChanged ={this.props.changeUser}
                      allGroups={this.props.allGroups}/>
      </div>
    )
  }
}

EditUserPage.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.userForEdit,
    userId:  props.params.userId,
    allGroups: state.groups
  }
}

export default connect(mapStateToProps, {
  fetchGroups,
  fetchUserDetails,
  changeUser,
  saveUser,
  push
})(EditUserPage)


