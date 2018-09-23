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
            <div className="card" style={cardsOnTable[0] ? {backgroundColor: cardsOnTable[0].type} : null}>{cardsOnTable[0] ? cardsOnTable[0].id : null }</div>
            <div className="card" style={cardsOnTable[1] ? {backgroundColor: cardsOnTable[1].type} : null}>{cardsOnTable[1] ? cardsOnTable[1].id : null }</div>
            <div className="card" style={cardsOnTable[2] ? {backgroundColor: cardsOnTable[2].type} : null}>{cardsOnTable[2] ? cardsOnTable[2].id : null }</div>
          </div>
        </div>
      </div>
    );
  }
}
