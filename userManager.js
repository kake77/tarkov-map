class UserManager {
  constructor() {
    this.users = [];
  }

  CreateUser(socket) {
    let id = 0;
    if (this.users.length !== 0) {
      id = this.users.reduce((a, b) => Math.max(a.id, b.id)) + 1;
    }
    const user = { id, socket };
    this.users.push(user);
    return user;
  }

  RemoveUser(id) {
    this.users = this.users.filter((_) => _.id !== id);
  }
}

module.exports = UserManager;
