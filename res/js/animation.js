import { keys } from "./movement.js";
import { tallGrasses, boundaries, background, foreground } from "./map.js";
import { character, characterImage } from "./character.js";
import { selectMyPokemon } from "./main.js";
import { setBattleStart, battleStart, inventoryShow } from "./variables.js";

let then = Date.now();
let now;
let delta;
let interval = 1000 / 59;
let random;

let mapMovables = [background, ...boundaries, foreground, ...tallGrasses];

export function animation() {
  window.requestAnimationFrame(animation);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    background.draw();
    character.draw();
    foreground.draw();

    let coliding = false;
    character.moving = false;

    function detectBoundary(item, moveX, moveY) {
      if (
        character.position.x + characterImage.width / 4 >=
          item.position.x + moveX &&
        character.position.x <= item.position.x + item.width + moveX &&
        character.position.y + characterImage.height >=
          item.position.y + moveY &&
        character.position.y <= item.position.y + item.height + moveY
      ) {
        coliding = true;
      }
    }

    function detectTallGrass(item) {
      if (
        character.position.x + characterImage.width / 4 >= item.position.x &&
        character.position.x <= item.position.x + item.width &&
        character.position.y + characterImage.height >= item.position.y &&
        character.position.y <= item.position.y + item.height
      ) {
        if (!coliding) {
          random = Math.floor(Math.random() * 100);
          if (random == 1) {
            setBattleStart(true);
            selectMyPokemon();
          }
        }
      }
    }

    // Moving UP

    if (keys.w.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterUp.png";
        character.moving = true;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          detectBoundary(boundary, 0, 5);
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];
          detectTallGrass(grasstall);
        }

        if (!coliding) {
          mapMovables.forEach((movable) => {
            movable.position.y += 5;
          });
        }
      }

      // Moving LEFT
    } else if (keys.a.pressed) {
      if (!battleStart && !inventoryShow) {
        character.moving = true;
        characterImage.src = "./res/img/characters/characterLeft.png";

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          detectBoundary(boundary, 5, 0);
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];
          detectTallGrass(grasstall);
        }

        if (!coliding)
          mapMovables.forEach((movable) => {
            movable.position.x += 5;
          });
      }

      // Moving DOWN
    } else if (keys.s.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterDown.png";
        character.moving = true;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          detectBoundary(boundary, 0, -5);
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];
          detectTallGrass(grasstall);
        }

        if (!coliding)
          mapMovables.forEach((movable) => {
            movable.position.y -= 5;
          });
      }
      // Moving RIGHT
    } else if (keys.d.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterRight.png";
        character.moving = true;

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          detectBoundary(boundary, -5, 0);
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];
          detectTallGrass(grasstall);
        }

        if (!coliding)
          mapMovables.forEach((movable) => {
            movable.position.x -= 5;
          });
      }
    }
  }
}
