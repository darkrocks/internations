import { getGroups, getGroupDetails, getUsers, getUserDetails, insertUser,
  saveUserToDb, deleteUserFromDb, deleteGroupFromDb, insertGroup } from '../data'

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS'
export const RECEIVE_FILTERED_GROUPS = 'RECEIVE_FILTERED_GROUPS'
export const RECEIVE_GROUP_DETAILS = 'RECEIVE_GROUP_DETAILS'
export const GROUPS_FILTER_CHANGED = 'GROUPS_FILTER_CHANGED'
export const EMPTY_GROUP_CREATED = 'EMPTY_GROUP_CREATED'
export const GROUP_ADDED = 'GROUP_ADDED';
export const GROUP_CHANGED = 'GROUP_CHANGED';
export const GROUP_SAVED = 'GROUP_SAVED';
export const RECEIVE_USER_DETAILS = 'RECEIVE_USER_DETAILS'
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_ADDED = 'USER_ADDED';
export const USER_SAVED = 'USER_SAVED';
export const USER_CHANGED = 'USER_CHANGED';
export const EMPTY_USER_CREATED = 'EMPTY_USER_CREATED';
export const USER_DELETED = 'USER_DELETED';
export const GROUP_DELETED = 'GROUP_DELETED';


export function addGroup(group) {
  return dispatch => {
    return insertGroup(group)
      .then(() => dispatch({
        type: GROUP_ADDED
      }));
  }
}

export function changeGroup(group) {
  return dispatch => {
    return new Promise(() => {
      return dispatch({
        type: GROUP_CHANGED,
        group: group
      });
    })
  }
}

export function createEmptyGroup() {
  return {
    type: EMPTY_GROUP_CREATED,
    group: {
      name: ''
    }
  }
}

export function fetchGroups() {
  return dispatch => {
    return getGroups()
      .then(groups => dispatch({
        type: RECEIVE_GROUPS,
        groups: groups
      }))
  }
}

export function getFilteredGroups() {
  return (dispatch, getState) => {
    return dispatch(fetchGroups())
      .then((action) => {
        const { groupsFilter } = getState();

        const pattern = new RegExp(groupsFilter,"i");
        const filteredGroups = action.groups.filter((group) =>  pattern.test(group.name));
        return dispatch({
          type: RECEIVE_FILTERED_GROUPS,
          groups: filteredGroups
        });
      });
  }
}

export function groupsFilterChanged(filter) {
  return dispatch => {

    dispatch({
      type: GROUPS_FILTER_CHANGED,
      filter: filter
    });

    return dispatch(getFilteredGroups());
  }
}

export function fetchGroupDetails(groupId) {
  return dispatch => {
    return getGroupDetails(groupId)
      .then(group => dispatch({
        type: RECEIVE_GROUP_DETAILS,
        groupDetails: group
      }))
  }
}

export function fetchUsers() {
  return dispatch => {
    return getUsers()
      .then(users => dispatch({
        type: RECEIVE_USERS,
        users: users
      }))
  }
}

export function fetchUserDetails(userId) {
  return dispatch => {
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
      .then(() => dispatch({
        type: USER_ADDED
      }));
  }
}

export function saveUser(user) {
  return dispatch => {
    return saveUserToDb(user)
      .then(() => dispatch({
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
      .then(() => dispatch({
        type: GROUP_DELETED
      }))
    .then(dispatch(getFilteredGroups()));
  }
}

