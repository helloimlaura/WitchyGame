import React from 'react';
import PropTypes from 'prop-types'

export class WitchyGameBoard extends React.Component {
  static propTypes = {
    events: PropTypes.any.isRequired,
  };

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    const {tableCardsCenter, players} = this.props.G
    console.log(this.props.ctx.playerID)
    return (
      <div className="flex-container">
        <div>
          {Object.keys(players).map(p =>
            <div>
              <p> {players[p].name} hand </p>
              <div className="flex-container">
                  { players[p].hand[0] ? <div className="card" style={{backgroundColor: players[p].hand[0].type}}> { players[p].hand[0].id }</div> : <div className="card" /> }
                  { players[p].hand[1] ? <div className="card" style={{backgroundColor: players[p].hand[1].type}}> { players[p].hand[1].id }</div> : <div className="card" /> }
                  { players[p].hand[2] ? <div className="card" style={{backgroundColor: players[p].hand[2].type}}> { players[p].hand[2].id }</div> : <div className="card" /> }
              </div>
              <br />
              <p> play zone </p>
                <div className="card">{players[p].playZone[0] ? players[p].playZone[0].id : null }</div>
            </div>
          )}
        </div>
        <br />
        <br />
        <div>
          <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.phase}</p>
          <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.currentPlayer}</p>
          <div className="flex-container">
            <div id="tw0" className="card">{tableCardsCenter[0] ? tableCardsCenter[0].id : null }</div>
            <div id="tw1" className="card">{tableCardsCenter[1] ? tableCardsCenter[1].id : null }</div>
            <div id="tw2" className="card">{tableCardsCenter[2] ? tableCardsCenter[2].id : null }</div>
          </div>
        </div>
      </div>
    );
  }
}
