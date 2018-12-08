[{
  id: '/#12poiajdspfoif',
  name: 'Yogita',
  room: 'SkyChat'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  
}

module.exports = {Users};

 