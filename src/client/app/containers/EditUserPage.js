import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditUserForm from '../components/EditUserForm';

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.editUser = this.editUser.bind(this)
  }

  componentWillMount() {
    this.props.fetchGroups();
    this.props.fetchUserDetails(this.props.userId);
  }

  saveUser(name, groups) {
    var user = this.props.user;
    user.name = name;
    user.groups = groups.map((g) => g.id);

    this.props.saveUser(user)
      .then(() => {
        this.props.push(`/users`);
      });
  }

  render() {
    return (
      <div>
        <h1>Add user</h1>
        <EditUserForm user={this.props.user} save={this.saveUser} saveButtonText='Save' allGroups={this.props.allGroups}/>
      </div>
    )
  }
}

EditUserPage.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    allGroups: state.groups
  }
}

export default connect(mapStateToProps, {
  fetchGroups,
  addUser,
  push
})(AddUserPage)


