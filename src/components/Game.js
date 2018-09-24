const { Game, PlayerView } = require('boardgame.io/core.js');

function createDeck() {
  const deck = []
  let idCounter = 0;
  const witches = [{
    type: 'brown',
    count: 10
  }, {
    type: 'green',
    count: 11
  }, {
    type: 'red',
    count: 12
  }, {
    type: 'purple',
    count: 14
  }, {
    type: 'yellow',
    count: 16
  }, {
    type: 'blue',
    count: 18
  }]
  for (let i = 0; i < witches.length; i++) {
    for (let k = 1; k <= witches[i].count; k++) {
      deck.push({
        id: idCounter,
        type: witches[i].type,
        brave: false,
        cowardly: false,
      })
      idCounter += 1;
    }
  }
  return deck
}

function countAllPotions(G, playerID, arr){
  let count = 0;
  let potionList
  for (let i = 0; i < arr.length; i++){
    potionList = G.players[playerID].potions.filter(card => card.type === arr[i])
    console.log(potionList, count)
    for (let k = 0; k < potionList.length; k++){
      if(potionList[k].brave){
        count += 2
      } else if (potionList[k].cowardly){
        count += 1
      }
    }
  }
  return count
}

const WitchyGame = Game({
  name: 'Witchy Game',
  setup: () => ({
    deck: createDeck(),
    taskCards: [1, 2, 3],
    cardsOnTable: [],
    firstPlayer: 0,
    lockedIn: 0,
    players: {
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
      const deck = ctx.random.Shuffle(G.deck);
      G.deck = deck
      return { ...G
      }
    },
    dealToPlayers(G) {
      for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 17; k++) {
          let player = G.players[`${i}`]
          player.deck.push(G.deck.shift())
        }
      }
      return { ...G,
        deck: G.deck,
        players: G.players
      }
    },
    showStartCards(G) {
      for (let i = 0; i < 3; i++) {
        G.cardsOnTable.push(G.deck.shift())
      }
      return { ...G, cardsOnTable: G.cardsOnTable }
    },
    draftCard(G, ctx, idx) {
      const player = G.players[ctx.currentPlayer]
      const { cardsOnTable } = G
      if (player.potions.length < 1) {
        cardsOnTable[idx].cowardly = true;
        player.potions.push(cardsOnTable[idx])
        cardsOnTable.splice(idx, 1)
      }
      if (cardsOnTable.length === 1) {
        cardsOnTable[0].cowardly = true;
        G.players[Number(ctx.currentPlayer) + 1].potions.push(cardsOnTable[0])
        cardsOnTable.splice(0, 1)
        ctx.events.setActionPlayers({
          all: true
        })
      }
      return { ...G }
    },
    selectWitch(G, ctx, id) {
      ctx.events.setActionPlayers({
        all: true
      })
      const player = G.players[ctx.playerID]
      if (player.deck[id] && player.hand.length <= 2) {
        if (!player.hand.some(c => c.type === player.deck[id].type)) {
          player.hand.push(player.deck[id])
          player.deck.splice(id, 1)
        }
      }
      return { ...G,
        players: G.players
      };
    },
    deselectWitch(G, ctx, id) {
      ctx.events.setActionPlayers({
        all: true
      })
      const player = G.players[ctx.playerID]
      if (player.hand[id]) {
        player.deck.push(player.hand[id])
        player.hand.splice(id, 1)
      }
      return { ...G,
        players: G.players
      };
    },
    lockIn(G, ctx) {
      ctx.events.setActionPlayers({
        all: true
      })
      if (G.players[ctx.currentPlayer].hand.length === 3) {
        G.lockedIn += 1;
      }
      return { ...G }
    },
    playCard(G, ctx, id) {
      //logic here for checking if color matches
      const player = G.players[ctx.currentPlayer]
      if (player.hand[id] && !G.cardsOnTable[player]) {
        G.cardsOnTable[ctx.currentPlayer] = player.hand[id]
        player.hand.splice(id, 1)
      }
      return { ...G, players: G.players, cardsOnTable: G.cardsOnTable };
    },
    chooseBravery(G, ctx, bravery) {
      if (bravery === 'brave') {
        if(G.players[ctx.currentPlayer].hand.length > 0){
          G.firstPlayer = ctx.currentPlayer
        } else {
          G.firstPlayer = (((Number(ctx.playOrderPos) + 1) % 3).toString())
          if(G.players[G.firstPlayer].hand.length <= 0){
            G.firstPlayer = (((Number(ctx.playOrderPos) + 1) % 3).toString())
          }
        }
        for (let i = 0; i < ctx.currentPlayer; i++){
          if(G.cardsOnTable[i]){
            if (G.cardsOnTable[i].brave){
              G.cardsOnTable[i].brave = false;
            }
          }
        }
        G.cardsOnTable[ctx.currentPlayer].brave = true
      } else {
        G.cardsOnTable[ctx.currentPlayer].cowardly = true
        if(G.players[G.firstPlayer].hand.length <= 0){
          G.firstPlayer = (((Number(ctx.playOrderPos) + 1) % 3).toString())
        }
        if(G.players[G.firstPlayer].hand.length <= 0){
          G.firstPlayer = (((Number(ctx.playOrderPos) + 1) % 3).toString())
        }
      }
      return { ...G, players: G.players, firstPlayer: G.firstPlayer}
    },
    finalPoints: {}
  },

  flow: {
    setActionPlayers: true,
    phases: [{
        name: 'Setup',
        allowedMoves: ['shuffle', 'dealToPlayers', 'showStartCards'],
        endPhaseIf: G => G.cardsOnTable.length
      },
      {
        name: 'Draft A Card',
        allowedMoves: ['draftCard'],
        endTurnIf: (G, ctx) => G.players[ctx.currentPlayer].potions.length >= 1,
        endPhaseIf: G => G.cardsOnTable.length <= 0
      },
      {
        name: 'Select Your Witches',
        allowedMoves: ['selectWitch', 'deselectWitch', 'lockIn'],
        endTurnIf: (G, ctx) => G.lockedIn === Number(ctx.currentPlayer),
        endPhaseIf: G => G.lockedIn >= 3
      },
      {
        name: 'Play A Witch',
        allowedMoves: ['playCard', 'chooseBravery'],
        turnOrder: {
          first: (G, ctx) => G.firstPlayer,
          next: (G, ctx) => {
            let playerList = ctx.playOrder
            let filteredList = []
            filteredList = filteredList.concat(playerList.slice(Number(ctx.currentPlayer) + 1),(playerList.slice(0, Number(ctx.currentPlayer))))
            for(let i = 0; i < filteredList.length; i++){
              if(G.players[filteredList[i]].hand.some(c => c.type === G.cardsOnTable[ctx.currentPlayer].type)){
                ctx.playOrderPos = filteredList[i]
                return {playOrderPos: ctx.playOrderPos}
              }
            }
            ctx.events.endPhase('CleanUp')
          }
        },
        endTurnIf: (G, ctx) => {
          const playedCard = G.cardsOnTable[ctx.currentPlayer];
          return playedCard && (playedCard.brave === true || playedCard.cowardly === true)
        },
      },
      {
        name: 'CleanUp',
        onPhaseBegin: G => {
          for(let i = 0; i < 3; i++){
            if(G.cardsOnTable[i]){
              G.players[i].potions.push(G.cardsOnTable[i])
              G.cardsOnTable[i] = null;
            }
          }
          return { ...G }
        },
        endPhaseIf: (G, ctx) => {
          let cardsInHands = 0
          Object.keys(G.players).forEach(function (p) {
            cardsInHands += G.players[p].hand.length
            });
          if(cardsInHands === 0 && !G.cardsOnTable[ctx.currentPlayer]){
            return ctx.events.endPhase('Game Over')
          } else if (!G.cardsOnTable[0]){
            return ctx.events.endPhase('Play A Witch')
          }
        },
      },
      {
        name: 'Game Over',
        onPhaseBegin: (G) => {
          const colors = ['red', 'green', 'purple', 'yellow', 'brown', 'blue']
          let finalPoints = {
            0: countAllPotions(G, '0', colors),
            1: countAllPotions(G, '1', colors),
            2: countAllPotions(G, '2', colors),
          }
          return { ...G, finalPoints}
        }
      },
    ],
  },

});

module.exports = {
  WitchyGame
}
