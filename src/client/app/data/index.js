import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'

let groups = [
  {
    id: 1,
    name: 'group 1'
  },
  {
    id: 2,
    name: 'group 2'
  }
];

let users = [
  {
    id: 1,
    name: 'john',
    groups: [
      1, 2
    ]
  },
  {
    id: 2,
    name: 'mary',
    groups: [
      1, 2
    ]
  }
]

export function getGroups() {
  return new Promise((resolve, reject) => {
    var groupModels = [];

    groups.forEach((g) => {
      groupModels.push(groupToGroupDetails(g));
    });

    resolve(groupModels);
  })
}

function groupToGroupDetails(group) {
  var groupModel = cloneDeep(group);
  groupModel.users = [];

  users.forEach((u) => {
    var isUserInGroup = !!find(u.groups, (userGroupId) => userGroupId === group.id );

    if (isUserInGroup) {
      var userModel = cloneDeep(u);
      delete userModel.groups;

      groupModel.users.push(userModel);
    }
  });

  return groupModel;
}

export function getGroupDetails(groupId) {
  groupId = parseInt(groupId)

  return new Promise((resolve, reject) => {
    var group = find(groups, (g) => g.id === groupId);
    resolve(groupToGroupDetails(group));
  })
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(cloneDeep(users));
  })
}

export function getUserDetails(userId) {
  userId = parseInt(userId)

  return new Promise((resolve, reject) => {
    var userModel;
    var user = find(users, (u) => u.id === userId);

    if (user) {
      userModel = cloneDeep(user);
      const userGroupsIds = userModel.groups;
      userModel.groups = [];
      userGroupsIds.forEach((userGroupId) => {
        var group = find(groups, (group) => group.id === userGroupId);

        if (group) {
          let groupModel = cloneDeep(group);
          delete groupModel.users;
          userModel.groups.push(groupModel);
        }
      });
    }

    resolve(userModel);
  })
}

export function insertUser (user) {
  return new Promise((resolve, reject) => {
    var userToAdd = {
      id: Math.floor(Math.random()* 1000),
      name: user.name
    };

    userToAdd.groups = user.groups.map((g) => g.id);

    users.push(userToAdd);
    resolve(userToAdd);
  })
}

export function saveUserToDb (user) {
  return new Promise((resolve, reject) => {
    var dbUser = find(users, (u) => u.id === user.id);
    dbUser.name = user.name;
    dbUser.groups = user.groups.map((g) => g.id);

    resolve();
  });
}

export function deleteUserFromDb(userId) {
  return new Promise((resolve, reject) => {
    users = users.filter((u) => u.id !== userId);

    resolve(users);
  });
}
