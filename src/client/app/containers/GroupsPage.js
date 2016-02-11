import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredGroups, groupsFilterChanged, deleteGroup } from '../actions'
import { Link } from 'react-router'

class GroupsPage extends Component {
  constructor(props) {
    super(props)

    this.groupsFilterChanged = this.groupsFilterChanged.bind(this)
  }

  componentWillMount() {
    this.props.getFilteredGroups()
    .then((data) => {
        console.log('fetch groups: ' + JSON.stringify(data))
      });
  }

  groupsFilterChanged(event) {
    this.props.groupsFilterChanged(event.target.value);
  }

  render() {
    var that = this;
    return (
      <div>
        Groups
        <div>
          <input
            type="text"
            value={this.props.groupsFilter}
            onChange={this.groupsFilterChanged}
            />
        </div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Users</th>
          </tr>
          </thead>
          <tbody>
            {this.props.groups.map((group) => {
              function deleteGroup() {
                that.props.deleteGroup(group.id);
              }

              return (
                <tr>
                  <td>
                    <Link to={`/groups/${group.id}`}>
                      {group.name}
                    </Link>
                  </td>
                  <td>{group.users.length}</td>
                  <td>
                    { group.users.length ? null :
                      (<button onClick={deleteGroup}>Delete</button>)
                    }
                  </td>
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
  getFilteredGroups: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groupsFilterChanged: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    groups: state.filteredGroups,
    groupsFilter: state.groupsFilter
  }
}

export default connect(mapStateToProps, {
  getFilteredGroups,
  groupsFilterChanged,
  deleteGroup,
  push
})(GroupsPage)


