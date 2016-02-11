import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

function groups(state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_GROUPS:
      return action.groups;
  }

  return state
}

function filteredGroups(state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_FILTERED_GROUPS:
      return action.groups;
  }

  return state
}

function groupDetails(state = null, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_GROUP_DETAILS:
      return action.groupDetails;
  }

  return state
}

function userForEdit(state = null, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USER_DETAILS:
    case ActionTypes.EMPTY_USER_CREATED:
    case ActionTypes.USER_CHANGED:
      return action.user;
  }

  return state
}

function users(state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USERS:
    case ActionTypes.USER_DELETED:
      return action.users;
  }

  return state
}

const rootReducer = combineReducers({
  groups,
  filteredGroups,
  groupDetails,
  users,
  userForEdit,
  routing: routeReducer
})


export default rootReducer
