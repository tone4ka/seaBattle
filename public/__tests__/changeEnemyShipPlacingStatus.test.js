import {gameConstants} from '../src/game_client/constants.js';
import changeEnemyShipPlacingStatus from '../src/game_client/interactionWithWebsocket/functions/changeEnemyShipPlacingStatus';

test(`Sets the enemy ship placing status from false to true 
    and displays a text element "Somewhere here the enemy ships ..."`, () => {
  document.body.innerHTML =`
  <div class="enemyShipPlacingStatus">
  </div>
  `;

  changeEnemyShipPlacingStatus();

  expect(gameConstants.enemyShipPlacementStatus).toBeTruthy();
  expect(document.querySelector('.enemyShipPlacingStatus').textContent).toEqual('Somewhere here the enemy ships ...');
});