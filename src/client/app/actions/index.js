import { getGroups, getGroupDetails, getUsers, getUserDetails, insertUser, saveUserToDb, deleteUserFromDb, deleteGroupFromDb } from '../data'

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
export const RECEIVE_GROUP_DETAILS = 'RECEIVE_GROUP_DETAILS'
export const RECEIVE_USER_DETAILS = 'RECEIVE_USER_DETAILS'
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_ADDED = 'USER_ADDED';
export const USER_SAVED = 'USER_SAVED';
export const USER_CHANGED = 'USER_CHANGED';
export const EMPTY_USER_CREATED = 'EMPTY_USER_CREATED';
export const USER_DELETED = 'USER_DELETED';
export const GROUP_DELETED = 'GROUP_DELETED';

function receiveGroups(groups) {
  return {
    type: RECEIVE_GROUPS,
    groups: groups
  }
}

export function fetchGroups() {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getGroups()
      .then(groups => dispatch(receiveGroups(groups)))
  }
}

function receiveGroupDetails(group) {
  return {
    type: RECEIVE_GROUP_DETAILS,
    groupDetails: group
  }
}

export function fetchGroupDetails(groupId) {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getGroupDetails(groupId)
      .then(group => dispatch(receiveGroupDetails(group)))
  }
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users
  }
}

export function fetchUsers() {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getUsers()
      .then(users => dispatch(receiveUsers(users)))
  }
}

function receiveUserDetails(user) {
  return {
    type: RECEIVE_USER_DETAILS,
    user: user
  }
}

export function fetchUserDetails(userId) {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getUserDetails(userId)
      .then(user => dispatch(receiveUserDetails(user)))
  }
}

export function createEmptyUser() {
  return {
    type: EMPTY_USER_CREATED,
    user: {
      name: '',
      groups: []
    }
  }
}

export function changeUser(user) {
  return dispatch => {
    return new Promise(() => {
      return dispatch({
        type: USER_CHANGED,
        user: user
      });
    })
  }
}

function userAdded() {
  return {
    type: USER_ADDED
  }
}

export function addUser(user) {
  return dispatch => {
    return insertUser(user)
      .then(user => dispatch(userAdded(user)))
  }
}

function userSaved() {
  return {
    type: USER_SAVED
  }
}

export function saveUser(user) {
  return dispatch => {
    return saveUserToDb(user)
      .then(user => dispatch(userSaved()))
  }
}

export function deleteUser(userId) {
  return dispatch => {
    return deleteUserFromDb(userId)
      .then(users => dispatch({
        type: USER_DELETED,
        users: users
      }))
  }
}

export function deleteGroup(groupId) {
  return dispatch => {
    return deleteGroupFromDb(groupId)
      .then(groups => dispatch({
        type: GROUP_DELETED
      }))
    .then(dispatch(fetchGroups()));
  }
}

