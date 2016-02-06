import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUserDetails } from '../actions'
import { Link } from 'react-router'

class UserPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchUserDetails(this.props.userId);
  }

  renderGroups() {
    if (!this.props.user) return null;

    return this.props.user.groups.map((group) => {
      return (
        <span>
          <Link to={`/groups/${group.id}`}>
            {group.name}
          </Link>,</span>
      )
    });
  }

  render() {
    let name = this.props.user ? this.props.user.name : '';
    console.log('user render: ' + JSON.stringify(this.props.user))

    return (
      <div>
        <div><span>Name: </span><span>{name}</span></div>
        <div><span>Groups: </span>
          {this.renderGroups()}
        </div>
      </div>
    )
  }
}

UserPage.propTypes = {
  fetchUserDetails: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.userDetails,
    userId:  props.params.userId
  }
}

export default connect(mapStateToProps, {
  fetchUserDetails,
  push
})(UserPage)


