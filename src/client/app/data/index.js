import find from 'lodash/find'

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

export function getGroupsDetails(groupId) {
  groupId = parseInt(groupId)
  console.log('getGroupsDetails ' + groupId);
  return new Promise((resolve, reject) => {
    console.log('find ' + find);
    var group = find(groups, (g) => g.id === groupId);
    if (group) {
      group.users = group.users.map((userId) => {
        var user = find(users, (u) => u.id === userId);
        if (user) {
          return user;
        }
        return null;
      });
    }
    console.log('getGroupsDetails res ' + JSON.stringify(group));
    resolve(group);
  })
}
