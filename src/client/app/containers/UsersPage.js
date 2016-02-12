import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUsers, deleteUser } from '../actions'
import { Link } from 'react-router'

class UsersPage extends Component {
  constructor(props) {
    super(props)

    this.navigateToUserPage = this.navigateToUserPage.bind(this)

  }

  navigateToUserPage(userId) {
    this.props.push(`/users/${userId}`)
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const that = this;

    return (
      <div>
        <h4>Users</h4>

        <div className="row">
          <div className="twelve columns">
            <Link to={`/users/add`}>
              <button>
                Create user
              </button>
            </Link>

            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {this.props.users.map((user) => {
                function deleteUser() {
                  that.props.deleteUser(user.id);
                }

                return (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>
                        {user.name}
                      </Link>
                    </td>
                    <td>
                      <button onClick={deleteUser}>Delete</button>
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

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {
  fetchUsers,
  deleteUser,
  push
})(UsersPage)


