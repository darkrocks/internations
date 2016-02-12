import * as ActionTypes from '../actions'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'


export function groupForEdit(state = null, action) {
  switch (action.type) {
    case ActionTypes.EMPTY_GROUP_CREATED:
    case ActionTypes.GROUP_CHANGED:
      return action.group;
  }

  return state
}

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

function groupsFilter(state = '', action) {
  switch (action.type) {
    case ActionTypes.GROUPS_FILTER_CHANGED:
      return action.filter;
  }

  return state;
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
  groupsFilter,
  groupDetails,
  groupForEdit,
  users,
  userForEdit,
  routing: routeReducer
})


export default rootReducer
