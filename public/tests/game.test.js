import game from '../src/game_client/game.js';

test('displays gamefield after a click', () => {
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

  console.log('!!!!!!!!!!');
  const x =document.querySelector(".container")
  console.log(x)

  game();

  const startGameBtn = document.querySelector('.startGameBtn');
  startGameBtn.dispatchEvent('click');

  expect(document.querySelector('.fieldsBox')).toBeDefined();
});