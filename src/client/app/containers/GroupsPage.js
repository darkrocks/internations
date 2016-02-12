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
    this.props.getFilteredGroups();
  }

  groupsFilterChanged(event) {
    this.props.groupsFilterChanged(event.target.value);
  }

  render() {
    var that = this;
    return (
      <div>
        <h4>Groups</h4>
        <div className="row">
          <div className="eight columns">
            <label className="ik-inline-label">Search:</label>
            <input
              type="text"
              value={this.props.groupsFilter}
              onChange={this.groupsFilterChanged}
              />
          </div>
          <div className="four columns ik-text-right">
            <Link to={`/groups/add`}>
              <button>
                Create group
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <table className="u-full-width">
              <col width="40%" />
              <col width="40%" />
              <col width="20%" />
              <thead>
              <tr>
                <th>Name</th>
                <th>Users</th>
                <th>Actions</th>
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
        </div>
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


