import React from 'react';

export class WitchyGameBoard extends React.Component {

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    const {cardsOnTable, players} = this.props.G
    return (
      <div className="flex-container">
        <div>
          {Object.keys(players).map((p, i) =>
            (<div key={i}>
              <p> {players[p].name} hand </p>
              <div className="flex-container">
                  { players[p].hand[0] ? <div className="card" style={{backgroundColor: players[p].hand[0].type}}> { players[p].hand[0].id }</div> : <div className="card" /> }
                  { players[p].hand[1] ? <div className="card" style={{backgroundColor: players[p].hand[1].type}}> { players[p].hand[1].id }</div> : <div className="card" /> }
                  { players[p].hand[2] ? <div className="card" style={{backgroundColor: players[p].hand[2].type}}> { players[p].hand[2].id }</div> : <div className="card" /> }
              </div>
             </div>))}
        </div>
        <br />
        <br />
        <div>
          <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.phase}</p>
          <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.currentPlayer}</p>
          <div className="flex-container">
            <div id="tw0" className="card">{cardsOnTable[0] ? cardsOnTable[0].id : null }</div>
            <div id="tw1" className="card">{cardsOnTable[1] ? cardsOnTable[1].id : null }</div>
            <div id="tw2" className="card">{cardsOnTable[2] ? cardsOnTable[2].id : null }</div>
          </div>
        </div>
      </div>
    );
  }
}
