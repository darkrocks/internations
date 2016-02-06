import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'

let groups = [
  {
    id: 1,
    name: 'group 1',
    users: [
      1,
      2
    ]
  },
  {
    id: 2,
    name: 'group 2',
    users: [
      1,
      2
    ]
  }
];

let users = [
  {
    id: 1,
    name: 'john'
  },
  {
    id: 2,
    name: 'mary'
  }
]

export function getGroups() {
  return new Promise((resolve, reject) => {
    resolve(groups);
  })
}

export function getGroupDetails(groupId) {
  groupId = parseInt(groupId)

  return new Promise((resolve, reject) => {

    var group = cloneDeep(find(groups, (g) => g.id === groupId));
    if (group) {
      group.users = group.users.map((userId) => {
        var user = find(users, (u) => u.id === userId);
        if (user) {
          return user;
        }
        return null;
      });
    }

    resolve(group);
  })
}

export function getUserDetails(userId) {
  userId = parseInt(userId)

  return new Promise((resolve, reject) => {
    var user = cloneDeep(find(users, (u) => u.id === userId));

    if (user) {
      user.groups = [];
      groups.forEach((g) => {
        if (find(g.users, (groupUserId) => groupUserId === userId)) {
          var groupToAdd = cloneDeep(g);
          delete groupToAdd.users;
          user.groups.push(groupToAdd);
        }
      });
    }

    resolve(user);
  })
}
