import $ from 'jquery';
import {jest} from '@jest/globals';

test('Displays gamefield after a click on the "Start game" btn', () => {

  document.body.innerHTML =`
  <div class="container">
    <div class="usersBox">
      <div class="gameBox">
        <button class="btn btnSocket btn-blue startGameBtn Barbossa">
          Start game
        </button>
      </div>
    </div>
  </div>
  `;

  jest.mock(  "../src/game_client/interactionWithWebsocket/functions/showCongratulations.js");

  import ('../src/game_client/game.js');

  $('.startGameBtn').click();
  expect($('.fieldsBox')).toBeDefined();
});