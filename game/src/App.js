import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import './App.css';

const WitchyGame = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = ctx.currentPlayer;
      return { ...G, cells }; // don't mutate original state.
    },
  },
});

const App = Client({ game: WitchyGame });

export default App;
