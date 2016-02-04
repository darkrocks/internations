import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import GroupsPage from './containers/GroupsPage'

export default (
  <Route path="/" component={App}>
    <Route path="/groups"
           component={GroupsPage} />
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Route>
)
