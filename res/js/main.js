import { map } from "./map.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const vancas = document.getElementById("vancas");
const battleground = document.getElementById("battleground");
const back = document.getElementById("back");
const tackle = document.getElementById("tackle");
const specialAttack = document.getElementById("specialAttack");
const enemyPokemonHp = document.getElementById("enemyPokemonHp");
const myPokemonHp = document.getElementById("myPokemonHp");

let myHp;
let enemyHp;

const WidthHeight = {
  width: 1600,
  height: 800,
};

// Collisions

const collisionMap = [];
for (let i = 0; i < map.length; i += 40) {
  collisionMap.push(map.slice(i, 40 + i));
}

class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const boundaries = [];

const offset = {
  x: -1920,
  y: -600,
};

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

// Tall Grass

const tallGrassMap = [];
for (let i = 0; i < map.length; i += 40) {
  tallGrassMap.push(map.slice(i, 40 + i));
}

class TallGrass {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const tallGrasses = [];

tallGrassMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1) {
      tallGrasses.push(
        new TallGrass({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

// Images

window.onload = () => {
  characterImage.src = "./res/img/characters/characterDown.png";
};

const image = new Image();
image.src = "./res/img/maps/testmap.png";

const characterImage = new Image();

const foregroundImage = new Image();
foregroundImage.src = "./res/img/maps/foreground.png";

// Map Draw

class Sprite {
  constructor({
    position,
    image,
    frames = { numberOfFrames: 1, imagePosition: 0, waitingFrames: 0 },
  }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.moving = false;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frames.imagePosition * 50,
      0,
      this.image.width / this.frames.numberOfFrames,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.numberOfFrames,
      this.image.height
    );

    if (this.moving) {
      if (this.frames.numberOfFrames > 1) {
        this.frames.waitingFrames++;
      }
      if (this.frames.waitingFrames % 10 === 0) {
        if (this.frames.imagePosition < this.frames.numberOfFrames - 1) {
          this.frames.imagePosition++;
        } else {
          this.frames.imagePosition = 0;
        }
      }
    } else {
      this.frames.imagePosition = 0;
    }
  }
}

const character = new Sprite({
  image: characterImage,
  position: {
    x: WidthHeight.width / 2 - 124 / 4 / 2,
    y: WidthHeight.height / 2 - 38 / 2,
  },
  frames: {
    numberOfFrames: 4,
    imagePosition: 0,
    waitingFrames: 0,
  },
});

const background = new Sprite({
  position: { x: -1920, y: -600 },
  image: image,
});

const foreground = new Sprite({
  position: { x: -1920, y: -600 },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Drawing images

const movables = [background, ...boundaries, foreground, ...tallGrasses];

let then = Date.now();
let now;
let delta;
let interval = 1000 / 59;
let random;
let battleStart = false;

function animation() {
  window.requestAnimationFrame(animation);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    background.draw();
    character.draw();
    foreground.draw();

    let coliding = false;

    // Moving UP

    character.moving = false;

    if (keys.w.pressed) {
      if (!battleStart) {
        characterImage.src = "./res/img/characters/characterUp.png";
        character.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            character.position.x + characterImage.width / 4 >=
              boundary.position.x &&
            character.position.x <= boundary.position.x + boundary.width &&
            character.position.y + characterImage.height >=
              boundary.position.y + 5 &&
            character.position.y <= boundary.position.y + boundary.height + 5
          ) {
            coliding = true;
            break;
          }
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];

          if (
            character.position.x + characterImage.width / 4 >=
              grasstall.position.x &&
            character.position.x <= grasstall.position.x + grasstall.width &&
            character.position.y + characterImage.height >=
              grasstall.position.y &&
            character.position.y <= grasstall.position.y + grasstall.height
          ) {
            if (!coliding) {
              random = Math.floor(Math.random() * 100);
              console.log(random);
              if (random == 1) {
                battleStart = true;
                battle();
              }
            }
          }
        }
        if (!coliding) {
          movables.forEach((movable) => {
            movable.position.y += 5;
          });
        }
      }

      // Moving LEFT
    } else if (keys.a.pressed) {
      if (!battleStart) {
        character.moving = true;
        characterImage.src = "./res/img/characters/characterLeft.png";
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];

          if (
            character.position.x + characterImage.width / 4 >=
              boundary.position.x + 5 &&
            character.position.x <= boundary.position.x + boundary.width + 5 &&
            character.position.y + characterImage.height >=
              boundary.position.y &&
            character.position.y <= boundary.position.y + boundary.height
          ) {
            coliding = true;
            break;
          }
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];

          if (
            character.position.x + characterImage.width / 4 >=
              grasstall.position.x &&
            character.position.x <= grasstall.position.x + grasstall.width &&
            character.position.y + characterImage.height >=
              grasstall.position.y &&
            character.position.y <= grasstall.position.y + grasstall.height
          ) {
            if (!coliding) {
              random = Math.floor(Math.random() * 100);
              console.log(random);
              if (random == 1) {
                battleStart = true;
                battle();
              }
            }
          }
        }
        if (!coliding)
          movables.forEach((movable) => {
            movable.position.x += 5;
          });
      }

      // Moving DOWN
    } else if (keys.s.pressed) {
      if (!battleStart) {
        characterImage.src = "./res/img/characters/characterDown.png";
        character.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];

          if (
            character.position.x + characterImage.width / 4 >=
              boundary.position.x &&
            character.position.x <= boundary.position.x + boundary.width &&
            character.position.y + characterImage.height >=
              boundary.position.y - 5 &&
            character.position.y <= boundary.position.y + boundary.height - 5
          ) {
            coliding = true;
            break;
          }
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];

          if (
            character.position.x + characterImage.width / 4 >=
              grasstall.position.x &&
            character.position.x <= grasstall.position.x + grasstall.width &&
            character.position.y + characterImage.height >=
              grasstall.position.y &&
            character.position.y <= grasstall.position.y + grasstall.height
          ) {
            if (!coliding) {
              random = Math.floor(Math.random() * 100);
              console.log(random);
              if (random == 1) {
                battleStart = true;
                battle();
              }
            }
          }
        }
        if (!coliding)
          movables.forEach((movable) => {
            movable.position.y -= 5;
          });
      }
      // Moving RIGHT
    } else if (keys.d.pressed) {
      if (!battleStart) {
        characterImage.src = "./res/img/characters/characterRight.png";
        character.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];

          if (
            character.position.x + characterImage.width / 4 >=
              boundary.position.x - 5 &&
            character.position.x <= boundary.position.x + boundary.width - 5 &&
            character.position.y + characterImage.height >=
              boundary.position.y &&
            character.position.y <= boundary.position.y + boundary.height
          ) {
            coliding = true;
            break;
          }
        }
        for (let i = 0; i < tallGrasses.length; i++) {
          const grasstall = tallGrasses[i];

          if (
            character.position.x + characterImage.width / 4 >=
              grasstall.position.x &&
            character.position.x <= grasstall.position.x + grasstall.width &&
            character.position.y + characterImage.height >=
              grasstall.position.y &&
            character.position.y <= grasstall.position.y + grasstall.height
          ) {
            if (!coliding) {
              random = Math.floor(Math.random() * 100);
              console.log(random);
              if (random == 1) {
                battleStart = true;
                battle();
              }
            }
          }
        }
        if (!coliding)
          movables.forEach((movable) => {
            movable.position.x -= 5;
          });
      }
    }
  }
}
animation();

// Battle

function battle() {
  vancas.style.display = "none";
  battleground.style.display = "block";
  myHp = 20;
  enemyHp = 20;
  myPokemonHp.innerHTML = `${myHp} HP`;
  enemyPokemonHp.innerHTML = `${enemyHp} HP`;
  interval = setInterval(() => {
    myHp -= 1;
    myPokemonHp.innerHTML = `${myHp} HP`;
    if (myHp <= 0) {
      clearInterval(interval);
    }
  }, 200);
  back.onclick = () => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    battleStart = false;
  };

  tackle.onclick = () => {
    if (enemyHp >= 1) {
      enemyHp -= 1;
      enemyPokemonHp.innerHTML = `${enemyHp} HP`;
    } else {
      console.log("mrtvej");
    }
  };
}

// Movement

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "W":
      keys.w.pressed = true;
      break;
    case "A":
      keys.a.pressed = true;
      break;
    case "S":
      keys.s.pressed = true;
      break;
    case "D":
      keys.d.pressed = true;
      break;
    case "ArrowUp":
      keys.w.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
    case "ArrowDown":
      keys.s.pressed = true;
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "W":
      keys.w.pressed = false;
      break;
    case "A":
      keys.a.pressed = false;
      break;
    case "S":
      keys.s.pressed = false;
      break;
    case "D":
      keys.d.pressed = false;
      break;
    case "ArrowUp":
      keys.w.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
    case "ArrowDown":
      keys.s.pressed = false;
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      break;
  }
});
