import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditUserForm from '../components/EditUserForm';

const newUser = {
  name: '',
  groups: []
};

class AddUserPage extends Component {
  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this)
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  addUser(name, groups) {
    this.props.addUser({
      name: name,
      groups: groups
    })
      .then(() => {
        this.props.push(`/users`);
      });
  }

  render() {
    if (!this.props.allGroups) return null;

    return (
      <div>
        <h1>Add user</h1>
        <EditUserForm user={newUser} save={this.addUser} saveButtonText='Add' allGroups={this.props.allGroups}/>
      </div>
    )
  }
}

AddUserPage.propTypes = {
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


