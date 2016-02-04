let groups = [
  {
    name: 'group 1',
    users: [
      'john',
      'mary'
    ]
  },
  {
    name: 'group 2',
    users: [
      'john',
      'mary'
    ]
  }
];

export function getGroups() {
  return new Promise((resolve, reject) => {
    resolve(groups);
  })
}
