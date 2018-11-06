import React from 'react';

export class PlayerHand extends React.Component {
  render() {
    return(
    <div>
      <p id="player-hand" className="App-header center txtw"> Player {Number(this.props.ctx.currentPlayer) + 1}</p>
      <div className="flex-container wrap">
        {this.props.G.players[this.props.ctx.currentPlayer].deck.map(
          (card, i) => <div key={i} className={`ml30mb30 ${card.type}`} />
        )}
      </div>
      <div className="flex-container purple-border">
        {this.props.G.players[this.props.ctx.currentPlayer].hand.map(
            (card, i) => card.type ? <div key={i} className={`ml30mb30 ${card.type}`} /> : <div key={i} className="card" />
          )}
      </div>
    </div>
    )
  }
}
