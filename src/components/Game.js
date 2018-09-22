const { Game, PlayerView } = require('boardgame.io/core.js');

function createDeck() {
  const deck = []
  let idCounter = 0;
  const witches = [{type: 'brown', count: 10}, {type: 'green', count: 11}, {type: 'red', count: 12}, {type: 'purple', count: 14}, {type: 'yellow', count: 16}, {type: 'blue', count: 18}]
  for(let i = 0; i < witches.length; i++){
    for(let k = 1; k <= witches[i].count; k++){
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

// function matchWitch(G, ctx){
//    // if there is a card in any play zone and it is your turn
//    // if you have a card in hand that matches the type of the card played,
//       // your card gets played
//    // otherwise,
// }

const WitchyGame = Game({
  name: 'Witchy Game',
  setup: () => ({
    deck: createDeck(),
    taskCards: [1, 2, 3],
    tableCardsCenter: [],
    lockedIn: 0,
    players:  {
      '0': {
        name: 'player 1',
        hand: [],
        deck: [],
        playZone: [],
        potions: [],
        taskCards: [],
      },
      '1': {
        name: 'player 2',
        hand: [],
        deck: [],
        playZone: [],
        potions: [],
        taskCards: [],
      },
      '2': {
        name: 'player 3',
        hand: [],
        deck: [],
        playZone: [],
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
      return { ...G }
    },
    dealToPlayers(G) {
      // for each player
      for(let i = 0; i < 3; i++){
        for(let k = 0; k < 17; k++){
          let player = G.players[`${i}`]
          //remove card from deck, add to current player
          player.deck.push(G.deck.shift())
        }
      }
      return { ...G, deck: G.deck, players: G.players }
    },
    showStartCards(G, ctx){
      for(let i = 0; i < 3; i++){
        G.tableCardsCenter.push(G.deck.shift())
      }
      ctx.events.endPhase('draft phase')
      return { ...G }
    },
    draftCard(G, ctx, idx){
      //click on card
      //card removed from table, added to potions
      //endTurn
      const player = G.players[ctx.currentPlayer]
      const {tableCardsCenter} = G
      if(player.potions.length < 1){
        player.potions.push(G.tableCardsCenter[idx])
        tableCardsCenter.splice(idx, 1)
      }
      if(tableCardsCenter.length === 1){
        G.players[Number(ctx.currentPlayer) + 1].potions.push(tableCardsCenter[0])
        tableCardsCenter.splice(0, 1)
        ctx.events.setActionPlayers({all: true})
      }
      return { ...G, players: G.players, tableCardsCenter}
    },
    selectWitch(G, ctx, id){
      //click on card
      //card removed from deck, added to hand
      ctx.events.setActionPlayers({all: true})
      const player = G.players[ctx.playerID]
      if(player.deck[id] && player.hand.length <= 2){
        if(!player.hand.some(c => c.type === player.deck[id].type)){
          player.hand.push(player.deck[id])
          player.deck.splice(id, 1)
        }
      }
      return { ...G, players: G.players};
    },
    deselectWitch(G, ctx, id){
      //click on card
      //card removed from hand, added to deck
      ctx.events.setActionPlayers({all: true})
      const player = G.players[ctx.playerID]
      if(player.hand[id]){
        player.deck.push(player.hand[id])
        player.hand.splice(id, 1)
      }
      return { ...G, players: G.players};
    },
    lockIn(G, ctx){
      ctx.events.setActionPlayers({all: true})
      if(G.players[ctx.currentPlayer].hand.length === 3){
        G.lockedIn += 1;
      }
      return { ...G }
    },
    playCard(G, ctx, id){
      const player = G.players[ctx.currentPlayer]
      if(player.hand[id]){
        player.playZone.push(player.hand[id])
        player.hand.splice(id, 1)
      }
      return { ...G, players: G.players};
    },
    chooseBravery(G, ctx, bravery){
      if(bravery === 'brave'){
        G.players[ctx.currentPlayer].playZone[0].brave = true
      } else {
        G.players[ctx.currentPlayer].playZone[0].cowardly = true
      }
      // if you played it brave, if there is a card played that is brave, delete that card
      // otherwise, continue
      // if there are less than 3 cards that match the type of card you played
      // if there is someone else with that type of card in their hand,
      // next player is that player
      //otherwise...endPhase
      return {...G}
    }
    // 'matchWitch'
    // 'autoChooseCard'

  },

  flow: {
    endTurn: true,
    setActionPlayers: true,
    phases: [
      {
        name: 'setup phase',
        allowedMoves: ['shuffle', 'dealToPlayers', 'showStartCards'],
        endPhaseIf: G => G.tableCardsCenter.length
      },
      {
        name: 'draft phase',
        allowedMoves: ['draftCard'],
        endTurnIf: (G, ctx) => G.players[ctx.currentPlayer].potions.length >= 1,
        endPhaseIf: G => G.tableCardsCenter.length <= 0
      },
      {
        name: 'witches select phase',
        allowedMoves: ['selectWitch', 'deselectWitch', 'lockIn'],
        endTurnIf: (G, ctx) => G.lockedIn === Number(ctx.currentPlayer),
        endPhaseIf: G => G.lockedIn >= 3
      },
      {
        name: 'play phase',
        allowedMoves: ['playCard', 'chooseBravery', 'matchWitch', 'autoChooseCard'],
        endTurnIf: (G, ctx) => {
          const playedCard = G.players[ctx.currentPlayer].playZone[0];
          return playedCard && (playedCard.brave === true || playedCard.cowardly === true)
        },
        endPhaseIf: (G, ctx) => {
          let cardsInHands = 0
          Object.keys(G.players).forEach(p => cardsInHands += G.players[p].hand.length)
          return cardsInHands === 0;
        }
        //cleanup
      },
    ],
  },

});

module.exports = { WitchyGame }
