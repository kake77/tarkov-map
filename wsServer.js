const WebSocket = require("ws");
const UserManager = require("./userManager");
class WsServerManager {
  constructor(httpServer) {
    this.userManager = new UserManager();
    this.server = new WebSocket.Server({ server: httpServer });
    // WebSocket接続時の処理
    this.server.on("connection", (socket) => {
      const user = this.userManager.CreateUser(socket);
      socket.send(JSON.stringify({ type: "userId", content: user.id }));
      console.log("WebSocket connected");

      // WebSocketメッセージ受信時の処理
      socket.on("message", (message) => {
        const data = JSON.parse(message);
        this.userManager.users.forEach((_) => {
          _.socket.send(JSON.stringify(data));
        });
      });

      // WebSocket切断時の処理
      socket.on("close", () => this.userManager.RemoveUser(user.id));
    });
  }
}

module.exports = WsServerManager;
