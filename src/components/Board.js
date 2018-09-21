import React from 'react';
import PropTypes from 'prop-types'

export class WitchyGameBoard extends React.Component {
  static propTypes = {
    events: PropTypes.any.isRequired,
  };

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    console.log(this.props)
    const {tableCardsCenter} = this.props.G
    return (
      <div>
        <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.phase}</p>
        <p style={{ background: '#aaa', width: 290, marginLeft: 31, textAlign: 'center' }}>{this.props.ctx.currentPlayer}</p>

        <div className="flex-container">
          <div id="tw0" className="card">{tableCardsCenter[0]}</div>
          <div id="tw1" className="card">{tableCardsCenter[1]}</div>
          <div id="tw2" className="card">{tableCardsCenter[2]}</div>
        </div>
      </div>
    );
  }
}
