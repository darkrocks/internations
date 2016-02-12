import React from 'react'
import { Route, Redirect } from 'react-router'
import App from './containers/App'
import GroupsPage from './containers/GroupsPage'
import AddGroupPage from './containers/AddGroupPage'
import GroupPage from './containers/GroupPage'
import UsersPage from './containers/UsersPage'
import AddUserPage from './containers/AddUserPage'
import EditUserPage from './containers/EditUserPage'

export default (
  <Route component={App}>
    <Route path="/groups"
           component={GroupsPage} />
    <Route path="/groups/add"
           component={AddGroupPage} />
    <Route path="/groups/:groupId"
           component={GroupPage} />

    <Route path="/users"
           component={UsersPage} />
    <Route path="/users/add"
           component={AddUserPage} />
    <Route path="/users/:userId"
           component={EditUserPage} />
    <Redirect from="/" to="/groups" />
  </Route>
)


