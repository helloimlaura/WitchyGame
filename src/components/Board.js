import React from 'react';
import { PlayerHand } from './PlayerHand'

export class WitchyGameBoard extends React.Component {

  //TODO: when actually rendering the cards, they will need an onclick for drafting them.

  render() {
    const { cardsOnTable, players, finalPoints } = this.props.G
    const { currentPlayer} = this.props.ctx
    const potions = ['blue', 'brown', 'green', 'purple']
    const potions1 = ['red', 'yellow', 'wild']
    const cards = [0, 1, 2]


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
      {/* Header */}
        <div>
          <div className="App-header center txtw">
            <h1 id='title'>WITCHY GAME</h1>
            <p id='currentPhase' className="bgbl txtw"> Current Phase: {this.props.ctx.phase}</p>
            <p id='currentPlayer' className="bgtu txtw"> Current Player: {Number(this.props.ctx.currentPlayer) + 1}</p>
          </div>
        </div>
        {this.props.ctx.phase === 'Select Your Witches'
        // Single player hand
        ? <PlayerHand G={this.props.G} ctx={this.props.ctx} />
        : (<div>
          {/* All player view */}
            <div id='others' className="flex-container">
              <div id='p3'>
                <p className='player-title'> Player 3</p>
                <div className="flex-container">
                  {cards.map(c => { return players[2].hand[c] ? (<div className={currentPlayer === '2' ? players[2].hand[c].type : "card-back"} />) : <div className="card" /> })}
                <div className='potions-box flex-container pot3'>
                  <div>
                    {potions.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={`${elem + 1} potion-ml15mb10`} />
                        <div className={`center potion-mb10`}>{countPotions(2, elem)}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {potions1.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={`${elem + 1} potion-ml10mb10`} />
                        <div className={`center potion-mb10`}>{countPotions(2, elem)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id='cardsOnTable' className="flex-container column">
              { finalPoints && <div className="flex-container">
                { function () { for (let i = 0; i < 3; i++){
                  return <div className="final-points">{ `Player ${i+1}: ${finalPoints[i]}`}</div>
                }}()}

                </div>}
              <div className="flex-container">
                {cards.map(c => {return cardsOnTable[c] ? <div className={[cardsOnTable[c].type, cardsOnTable[c] && cardsOnTable[c].cowardly && 'cowardly'].join(' ')} /> : <div className="card" /> })}
              </div>
            </div>
            <div id='p2'>
              <p className='player-title-2'> Player 2 </p>
              <div className="flex-container">
                <div className='potions-box flex-container pot2'>
                  <div>
                    {potions.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={`${elem + 1} potion-ml15mb10`}/>
                        <div className={`center potion-mb10`}>{countPotions(1, elem)}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {potions1.map(elem =>
                      <div className="flex-container" key={elem.id}>
                        <div className={`${elem + 1} potion-ml10mb10`}/>
                        <div className={`center potion-mb10`}>{countPotions(1, elem)}</div>
                      </div>
                    )}
                  </div>
                </div>
                  {cards.map(c => { return players[1].hand[c] ? <div className={currentPlayer === '1' ? players[1].hand[c].type : "card-back"} /> : <div className="card" /> })}
              </div>
            </div>
          </div>
          <div id='self' className='flex-container'>
              <div id='p1'>
                <p className='player-title'> Player 1</p>
                <div className="flex-container">
                  {cards.map(c => {return players[0].hand[c] ? <div className={currentPlayer === '0' ? players[0].hand[c].type : "card-back"} /> : <div className="card" /> })}
                  <div className='potions-box flex-container'>
                    <div>
                      {potions.map(elem =>
                        <div className="flex-container" key={elem.id}>
                          <div className={`${elem + 1} potion-ml15mb10`} />
                          <div className={`center potion-mb10`}>{countPotions(0, elem)}</div>
                        </div>
                      )}
                    </div>
                    <div>
                      {potions1.map(elem =>
                        <div className="flex-container" key={elem.id}>
                          <div className={`${elem + 1} potion-ml10mb10`}/>
                          <div className={`center potion-mb10`}>{countPotions(0, elem)}</div>
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
