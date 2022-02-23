import $ from 'jquery'

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

  import ('../src/game_client/game.js');

  $('.startGameBtn').click();
  expect(document.querySelector('.fieldsBox')).toBeDefined();
});