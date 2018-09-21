const { Game, PlayerView } = require('boardgame.io/core.js');

function createDeck(num) {
  const deck = []
  for(let i = 0; i < num; i++){
    deck.push(i)
  }
  return deck
}

const WitchyGame = Game({
  setup: () => ({
    deck: createDeck(81),
    taskCards: [1, 2, 3],
    tableCardsCenter: [],
    lockedIn: 0,
    players:  {
      '0': {
        name: 'player 1',
        hand: [],
        deck: [],
        potions: [],
        taskCards: [],
      },
      '1': {
        name: 'player 2',
        hand: [],
        deck: [],
        potions: [],
        taskCards: [],
      },
      '2': {
        name: 'player 3',
        hand: [],
        deck: [],
        potions: [],
        taskCards: []
      }
    },
    playerView: PlayerView.STRIP_SECRETS,
  }),

  moves: {
    shuffle(G, ctx) {
      let copyG = {...G}
      const deck = ctx.random.Shuffle(copyG.deck);
      return { ...G, deck };
    },
    dealToPlayers(G) {
      let copyG = {...G}
      // for each player
      for(let i = 0; i < 3; i++){
        for(let k = 0; k < 17; k++){
          let player = copyG.players[`${i}`]
          //remove card from deck, add to current player
          player.deck.push(copyG.deck.shift())
        }
      }
      return { ...G, deck: copyG.deck, players: copyG.players }
    },
    showStartCards(G){
      let copyG = {...G}
      for(let i = 0; i < 3; i++){
          copyG.tableCardsCenter.push(copyG.deck.shift())
      }
      return { ...G, deck: copyG.deck, tableCardsCenter: copyG.tableCardsCenter }
    },
    draftCard(G, ctx, idx){
      //click on card
      //card removed from table, added to potions
      //endTurn
      let copyG = {...G}
      const player = copyG.players[ctx.currentPlayer]
      const {tableCardsCenter} = copyG
      if(player.potions.length < 1){
        player.potions.push(copyG.tableCardsCenter[idx])
        tableCardsCenter.splice(idx, 1)
      }
      if(tableCardsCenter.length === 1){
        copyG.players[Number(ctx.currentPlayer) + 1].potions.push(tableCardsCenter[0])
        tableCardsCenter.splice(0, 1)
      }
      return { ...G, players: copyG.players, tableCardsCenter}
    },
    selectWitch(G, ctx, id){
      //click on card
      //card removed from deck, added to hand
      let copyG = {...G}
      const player = copyG.players[ctx.playerID]
      ctx.events.setActionPlayers({all: true})
      if(player.deck[id] && player.hand.length <= 2){
        player.hand.push(player.deck[id])
        player.deck.splice(id, 1)
      }
      return { ...G, players: copyG.players};
    },
    deselectWitch(G, ctx, id){
      //click on card
      //card removed from hand, added to deck
      let copyG = {...G}
      const player = copyG.players[ctx.currentPlayer]
      if(player.hand[id]){
        player.deck.push(player.hand[id])
        player.hand.splice(id, 1)
      }
      return { ...G, players: copyG.players};
    },
    lockIn(G, ctx){
      let copyG = {...G}
      if(copyG.players[ctx.currentPlayer].hand.length === 3){
        copyG.lockedIn += 1;
      }
      return { ...G, lockedIn: copyG.lockedIn }
    },

  },

  flow: {
    endTurn: true,
    setActionPlayers: true,
    phases: [
      {
        name: 'setup phase',
        allowedMoves: ['shuffle', 'dealToPlayers', 'showStartCards'],
        endPhaseIf: G => G.tableCardsCenter.length >= 3,
      },
      {
        name: 'draft phase',
        allowedMoves: ['draftCard'],
        endTurnIf: (G, ctx) => G.players[ctx.currentPlayer].potions.length >= 1,
        endPhaseIf: G => G.tableCardsCenter.length <= 0,
      },
      {
        name: 'witches select phase',
        allowedMoves: ['selectWitch', 'deselectWitch', 'lockIn'],
        endTurnIf: (G, ctx) => G.lockedIn === Number(ctx.currentPlayer),
        endPhaseIf: G => G.lockedIn >= 3 ,
      },
    ],
  },

});

module.exports = { WitchyGame }
