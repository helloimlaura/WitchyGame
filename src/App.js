import React from 'react'
import { Client } from 'boardgame.io/react';
import { WitchyGameBoard } from './components/Board'
import { WitchyGame } from './components/Game'
import './App.css';


const WitchyGameClient = Client({
  game: WitchyGame,
  board: WitchyGameBoard,
  numPlayers: 3,

});

const App = () => (
  <div>
    <WitchyGameClient playerID="0" />
  </div>
);

export default App;
