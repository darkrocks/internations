import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { saveUser, fetchGroups, fetchUserDetails } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditUserForm from '../components/EditUserForm';

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.saveUser = this.saveUser.bind(this)
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
    if (!this.props.user || !this.props.allGroups) return null;

    return (
      <div>
        <h1>Edit user</h1>
        <EditUserForm user={this.props.user} save={this.saveUser} saveButtonText='Save' allGroups={this.props.allGroups}/>
      </div>
    )
  }
}

EditUserPage.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.userDetails,
    userId:  props.params.userId,
    allGroups: state.groups
  }
}

export default connect(mapStateToProps, {
  fetchGroups,
  fetchUserDetails,
  saveUser,
  push
})(EditUserPage)


