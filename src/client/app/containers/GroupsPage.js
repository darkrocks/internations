import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchGroups } from '../actions'

class GroupsPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchGroups();
  }

  render() {
    return (
      <div>
        Groups
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Users</th>
          </tr>
          </thead>
          <tbody>
            {this.props.groups.map((group) => {
              return (
                <tr>
                  <td>{group.name}</td>
                  <td>{group.users.length + 1}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

GroupsPage.propTypes = {
  groups: PropTypes.array.isRequired,
  fetchGroups: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps, {
  fetchGroups
})(GroupsPage)


