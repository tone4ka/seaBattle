import showCongratulations from '../src/game_client/interactionWithWebsocket/functions/showCongratulations.js';
import {jest} from '@jest/globals';
import $ from 'jquery'

test('Displays congratulation image" btn', async () => {
  document.body.innerHTML =`
  <div class="container">
    <h4>...</h4>
      <div class="gameBox">
        <button class="btn btnSocket btn-blue startGameBtn Barbossa">
          Start game
        </button>
      </div>
  </div>
  `;

  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };

  jest.mock('../src/game_client/interactionWithWebsocket/functions/reloadPage.js');
  
  try{
    await showCongratulations();
    expect($('img').src)
      .toBe('http://localhost/src/game_client/assets/flyingHighPirate.png')
  } catch (e) {
    console.log(e)
  } 

});