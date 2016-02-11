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


export function fetchGroups() {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getGroups()
      .then(groups => dispatch({
        type: RECEIVE_GROUPS,
        groups: groups
      }))
  }
}


export function fetchGroupDetails(groupId) {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getGroupDetails(groupId)
      .then(group => dispatch({
        type: RECEIVE_GROUP_DETAILS,
        groupDetails: group
      }))
  }
}

export function fetchUsers() {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getUsers()
      .then(users => dispatch({
        type: RECEIVE_USERS,
        users: users
      }))
  }
}

export function fetchUserDetails(userId) {
  return dispatch => {
    //dispatch(requestPosts(reddit))
    return getUserDetails(userId)
      .then(user => dispatch({
        type: RECEIVE_USER_DETAILS,
        user: user
      }))
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

export function addUser(user) {
  return dispatch => {
    return insertUser(user)
      .then(user => dispatch({
        type: USER_ADDED
      }));
  }
}

export function saveUser(user) {
  return dispatch => {
    return saveUserToDb(user)
      .then(user => dispatch({
        type: USER_SAVED
      }))
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

