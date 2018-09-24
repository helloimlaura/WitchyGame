import React from 'react';

export class WitchyGameBoard extends React.Component {

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    const {cardsOnTable, players} = this.props.G
    const potions = ['blue', 'brown', 'green', 'purple']
    const potions1 = ['red', 'yellow', 'wild']
    return (
      <div className="App">
        <div>
          <div className="App-header center txtw">
            <h1 id='title'>WITCHY GAME</h1>
            <p id='currentPhase' className="bgbl txtw"> Current Phase: {this.props.ctx.phase}</p>
            <p id='currentPlayer' className="bgtu txtw"> Current Player: {this.props.ctx.currentPlayer}</p>
          </div>
        </div>
        <div id='others' className="flex-container">
            <div id='p3'>
              <p className='player-title'> Player 3</p>
              <div className="flex-container">
                { players[2].hand[0] ? <div className={players[2].hand[0].type} /> : <div className="card" /> }
                { players[2].hand[1] ? <div className={players[2].hand[1].type} /> : <div className="card" /> }
                { players[2].hand[2] ? <div className={players[2].hand[2].type} /> : <div className="card" /> }
              <div className='potions-box flex-container'>
                <div>
                  {potions.map(elem =>
                    <div className="flex-container">
                      <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                      <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {potions1.map(elem =>
                  <div className="flex-container">
                    <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                    <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id='cardsOnTable' className="flex-container">
            { cardsOnTable[0] ? <div className={cardsOnTable[0].type} /> : <div className="card" /> }
            { cardsOnTable[1] ? <div className={cardsOnTable[1].type} /> : <div className="card" /> }
            { cardsOnTable[2] ? <div className={cardsOnTable[2].type} /> : <div className="card" /> }
          </div>
          <div id='p2'>
              <p className='player-title'> Player 2 </p>
              <div className="flex-container">
                { players[1].hand[0] ? <div className={players[1].hand[0].type} /> : <div className="card" /> }
                { players[1].hand[1] ? <div className={players[1].hand[1].type} /> : <div className="card" /> }
                { players[1].hand[2] ? <div className={players[1].hand[2].type} /> : <div className="card" /> }
                <div className='potions-box flex-container'>
                <div>
                  {potions.map(elem =>
                    <div className="flex-container">
                      <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                      <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {potions1.map(elem =>
                  <div className="flex-container">
                    <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                    <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                  </div>
                )}
              </div>
              </div>
            </div>
        </div>
        <div id='self' className='flex-container'>
            <div id='p1'>
              <p className='player-title'> Player 1</p>
              <div className="flex-container">
                  { players[0].hand[0] ? <div className={players[0].hand[0].type} /> : <div className="card" /> }
                  { players[0].hand[1] ? <div className={players[0].hand[1].type} /> : <div className="card" /> }
                  { players[0].hand[2] ? <div className={players[0].hand[2].type} /> : <div className="card" /> }
                <div className='potions-box flex-container'>
                  <div>
                    {potions.map(elem =>
                      <div className="flex-container">
                        <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {potions1.map(elem =>
                      <div className="flex-container">
                        <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>0</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
    );
  }
}
