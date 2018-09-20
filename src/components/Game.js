import { Game } from 'boardgame.io/core';

function createDeck(num) {
  const deck = []
  for(let i = 0; i < num; i++){
    deck.push(i)
  }
  return deck
}


export const WitchyGame = Game({
  setup: () => ({
    deck: createDeck(81),
    taskCards: [],
    startPlayer: 0,
    players:  [{
      name: 'player 1',
      hand: [],
      deck: [],
      potions: [],
      taskCards: [],
    },
    {
      name: 'player 2',
      hand: [],
      deck: [],
      potions: [],
      taskCards: [],
    },
    {
      name: 'player 3',
      hand: [],
      deck: [],
      potions: [],
      taskCards: []
    }],
  }),

  moves: {
    shuffle(G, ctx) {
      const deck = ctx.random.Shuffle(G.deck);
      return { ...G, deck };
    }
  },

  flow: {},

});
