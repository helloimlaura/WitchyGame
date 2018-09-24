import React from 'react';

export class PlayerHand extends React.Component {
  render() {
    return(
    <div>
      <p id="player-hand" className="App-header center txtw"> Player {Number(this.props.ctx.currentPlayer) + 1}</p>
      <div className="flex-container wrap">
        {this.props.G.players[this.props.ctx.currentPlayer].deck.map(
          card => <div className={["ml30mb30", card.type].join(' ')} />
        )}
      </div>
      <div className="flex-container purple-border">
        {this.props.G.players[this.props.ctx.currentPlayer].hand.map(
            card => card.type ? <div className={["ml30mb30", card.type].join(' ')} /> : <div className="card" />
          )}
      </div>
    </div>
    )
  }
}
