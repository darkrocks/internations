import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups, changeUser, createEmptyUser } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditUserForm from '../components/EditUserForm';

class AddUserPage extends Component {
  constructor(props) {
    super(props);

    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroups();
    this.props.createEmptyUser();
  }

  addUser(user) {
    this.props.addUser(user)
      .then(() => {
        this.props.push(`/users`);
      });
  }

  render() {
    if (!this.props.user || !this.props.allGroups) return null;

    return (

      <div>
        <h1>Add user</h1>
        <EditUserForm
          user={this.props.user}
          save={this.addUser}
          userChanged = {this.props.changeUser}
          saveButtonText='Add'
          allGroups={this.props.allGroups}/>
      </div>
    )
  }
}

AddUserPage.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.userForEdit,
    allGroups: state.groups
  }
}

export default connect(mapStateToProps, {
  changeUser,
  fetchGroups,
  addUser,
  createEmptyUser,
  push
})(AddUserPage)


