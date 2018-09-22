const path = require('path');
const KoaStatic = require('koa-static');
const Server = require('boardgame.io/server').Server;
const WitchyGame = require('./components/Game').WitchyGame;

const server = Server({ games: [WitchyGame] });
const buildPath = path.join(__dirname, '../build');
server.app.use(KoaStatic(buildPath));
server.run(8000, (error) => console.log("Server is running, you'd better go and catch it.", error));
