import React from 'react';

export class WitchyGameBoard extends React.Component {

  render() {
    const card1 = this.props.G.deck[0]
    const card2 = this.props.G.deck[1]
    const card3 = this.props.G.deck[2]

    return (
      <div>
        <div id="handSpace1" className="card">{card1}</div>
        <div id="handSpace2" className="card">{card2}</div>
        <div id="handSpace3" className="card">{card3}</div>
      </div>
    );
  }
}
