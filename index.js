const HttpServerManager = require("./httpServer");
const WsServerManager = require("./wsServer");

// HTTPサーバーを作成
const httpServerManager = new HttpServerManager();

// WebSocketサーバーをHTTPサーバーのインスタンスから作成
const wsServerManager = new WsServerManager(httpServerManager.server);

httpServerManager.Listen();
