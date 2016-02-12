import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchGroupDetails } from '../actions'
import { Link } from 'react-router'

class GroupPage extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
    this.props.fetchGroupDetails(this.props.groupId);
  }

  renderUsers() {
    if (!this.props.group) return null;

    return (
      <ul>
        {
          this.props.group.users.map((user) => {
            return (
              <li>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    let name = this.props.group ? this.props.group.name : '';
    console.log('group name: ' + name)

    return (
      <div>
        <h4>Group details</h4>

        <div className="row">
          <div className="twelve columns">
            <label className="ik-inline-label">Name:</label>
            <span>{name}</span>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <label>Users:</label>
            {this.renderUsers()}
          </div>
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


