import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import GroupsPage from './containers/GroupsPage'
import GroupPage from './containers/GroupPage'
import UserPage from './containers/UserPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/AddUserPage'

export default (
  <Route path="/" component={App}>
    <Route path="/groups"
           component={GroupsPage} />
    <Route path="/groups/:groupId"
           component={GroupPage} />
    <Route path="/users"
           component={UsersPage} />
    <Route path="/users/add"
           component={AddUserPage} />
    <Route path="/users/:userId"
           component={UserPage} />
  </Route>
)

