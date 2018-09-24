import React from 'react';
import { PlayerHand } from './PlayerHand'

export class WitchyGameBoard extends React.Component {

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    const { cardsOnTable, players, finalPoints } = this.props.G
    const { currentPlayer} = this.props.ctx
    const potions = ['blue', 'brown', 'green', 'purple']
    const potions1 = ['red', 'yellow', 'wild']


    function countPotions(playerID, color){
      let count = 0;
      const potionList = players[playerID].potions.filter(card => card.type === color)
      for (let i = 0; i < potionList.length; i++){
        if(potionList[i].brave){
          count += 2
        } else if (potionList[i].cowardly){
          count += 1
        }
      }
      return count
    }

    return (
      <div className="App">
        <div>
          <div className="App-header center txtw">
            <h1 id='title'>WITCHY GAME</h1>
            <p id='currentPhase' className="bgbl txtw"> Current Phase: {this.props.ctx.phase}</p>
            <p id='currentPlayer' className="bgtu txtw"> Current Player: {Number(this.props.ctx.currentPlayer) + 1}</p>
          </div>
        </div>
        {this.props.ctx.phase === 'Select Your Witches' ? <PlayerHand G={this.props.G} ctx={this.props.ctx} /> : (<div>
            <div id='others' className="flex-container">
              <div id='p3'>
                <p className='player-title'> Player 3</p>
                <div className="flex-container">
                  { players[2].hand[0] ? <div className={currentPlayer === '2' ? players[2].hand[0].type : "card-back"} /> : <div className="card" /> }
                  { players[2].hand[1] ? <div className={currentPlayer === '2' ? players[2].hand[1].type : "card-back"} /> : <div className="card" /> }
                  { players[2].hand[2] ? <div className={currentPlayer === '2' ? players[2].hand[2].type : "card-back"} /> : <div className="card" /> }
                <div className='potions-box flex-container pot3'>
                  <div>
                    {potions.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(2, elem)}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {potions1.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(2, elem)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id='cardsOnTable' className="flex-container column">
              { finalPoints && <div className="flex-container">
                  <div style={{marginLeft: 36, marginBottom: 80, fontSize: 20}}>Player 1: {finalPoints[0]}</div>
                  <div style={{marginLeft: 36, marginBottom: 80, fontSize: 20}}>Player 2: {finalPoints[1]}</div>
                  <div style={{marginLeft: 36, marginBottom: 80, fontSize: 20}}>Player 3: {finalPoints[2]}</div>
                </div>}
              <div className="flex-container">
                { cardsOnTable[0] ? <div className={[cardsOnTable[0].type, cardsOnTable[0].cowardly && 'cowardly'].join(' ')} /> : <div className="card" /> }
                { cardsOnTable[1] ? <div className={[cardsOnTable[1].type, cardsOnTable[0].cowardly && 'cowardly'].join(' ')} /> : <div className="card" /> }
                { cardsOnTable[2] ? <div className={[cardsOnTable[2].type, cardsOnTable[0].cowardly && 'cowardly'].join(' ')} /> : <div className="card" /> }
              </div>
            </div>
            <div id='p2'>
              <p className='player-title-2'> Player 2 </p>
              <div className="flex-container">
                <div className='potions-box flex-container pot2'>
                  <div>
                    {potions.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(1, elem)}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {potions1.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                        <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(1, elem)}</div>
                      </div>
                    )}
                  </div>
                </div>
                  { players[1].hand[0] ? <div className={currentPlayer === '1' ? players[1].hand[0].type : "card-back"} /> : <div className="card" /> }
                  { players[1].hand[1] ? <div className={currentPlayer === '1' ? players[1].hand[1].type : "card-back"} /> : <div className="card" /> }
                  { players[1].hand[2] ? <div className={currentPlayer === '1' ? players[1].hand[2].type : "card-back"} /> : <div className="card" /> }
              </div>
            </div>
          </div>
          <div id='self' className='flex-container'>
              <div id='p1'>
                <p className='player-title'> Player 1</p>
                <div className="flex-container">
                  { players[0].hand[0] ? <div className={currentPlayer === '0' ? players[0].hand[0].type : "card-back"} /> : <div className="card" /> }
                  { players[0].hand[1] ? <div className={currentPlayer === '0' ? players[0].hand[1].type : "card-back"} /> : <div className="card" /> }
                  { players[0].hand[2] ? <div className={currentPlayer === '0' ? players[0].hand[2].type : "card-back"} /> : <div className="card" /> }
                  <div className='potions-box flex-container'>
                    <div>
                      {potions.map(elem =>
                        <div className="flex-container" key={elem.id}>
                          <div className={elem + 1} style={{marginLeft: 15, marginBottom: 10, width: 30, height:42}} />
                          <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(0, elem)}</div>
                        </div>
                      )}
                    </div>
                    <div>
                      {potions1.map(elem =>
                        <div className="flex-container" key={elem.id}>
                          <div className={elem + 1} style={{marginLeft: 10, marginBottom: 10, width:30, height:42}} />
                          <div className="center" style={{marginBottom: 10, width: 30, height:42}}>{countPotions(0, elem)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>)}
      </div>
    );
  }
}
