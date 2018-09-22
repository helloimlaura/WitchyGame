import React from 'react'
import { Client } from 'boardgame.io/react';
import { WitchyGameBoard } from './components/Board'
import { WitchyGame } from './components/Game'
import './App.css';


const WitchyGameClient = Client({
  game: WitchyGame,
  board: WitchyGameBoard,
  numPlayers: 3,
  multiplayer: { server: 'localhost:8010' },
});

const App = () => (
  <div>
    <WitchyGameClient gameID="apple" playerID="0" />
    <WitchyGameClient gameID="apple" playerID="1" />
  </div>
);

export default App;
