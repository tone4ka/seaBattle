const fieldsBoxTemplate =     `
<div class="fieldsBox">
  <div ondragover="event.preventDefault()" dragenter="event.preventDefault()" class="userFieldBox">
    <div class="shipPlacingStatus">
      <p align="center">Our ships</p>
    </div>
  </div>
  <div class="enemyFieldBox">
    <div class="shipPlacingStatus">
      <p align="center">The enemy has not yet finished placing the ships</p>
    </div>
  </div>
</div>
`;

export default fieldsBoxTemplate;

//<p align="center">Somewhere here the enemy ships ...</p>