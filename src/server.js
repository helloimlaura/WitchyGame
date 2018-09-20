const Server = require('boardgame.io/server').Server;
const WitchyGame = require('./components/Game').WitchyGame;
const server = Server({ games: [WitchyGame] });
server.run(3000);
