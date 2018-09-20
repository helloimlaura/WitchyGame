import { Client } from 'boardgame.io/react';
import { TicTacToeBoard } from './components/Board'
import { WitchyGame } from './components/Game'
import './App.css';


const App = Client({
  game: WitchyGame,
  board: TicTacToeBoard,
  multiplayer: true,
});

export default App;
