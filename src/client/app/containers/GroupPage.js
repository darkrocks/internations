import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchGroupDetails } from '../actions'


class GroupPage extends Component {
  constructor(props) {
    super(props)

  }


  componentWillMount() {
    this.props.fetchGroupDetails(this.props.groupId);
  }

  renderUsers() {
   if (!this.props.group) return null;

    return this.props.group.users.map((user) => {
      return (
        <span>{user.name},</span>
      )
    });
  }

  render() {
    let name = this.props.group ? this.props.group.name : '';
    console.log('group name: ' + name)

    return (
      <div>
        <div><span>Name: </span><span>{name}</span></div>
        <div><span>Users: </span>
          {this.renderUsers()}
        </div>


      </div>
    )
  }
}

GroupPage.propTypes = {
  fetchGroupDetails: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {

  return {
    group: state.groupDetails,
    groupId:  props.params.groupId
  }
}

export default connect(mapStateToProps, {
  fetchGroupDetails,
  push
})(GroupPage)


