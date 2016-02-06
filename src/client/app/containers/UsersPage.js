import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchUsers } from '../actions'
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
    return (
      <div>
        Users
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => {
              return (
                <tr>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {
  fetchUsers,
  push
})(UsersPage)


