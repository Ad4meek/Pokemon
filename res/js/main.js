import {
  collisions,
  tallgrass,
  housecollisions,
  housetable,
  housedoor,
  door,
} from "./map.js";

// Variables

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const vancas = document.getElementById("pokemonCanvas");
const battleground = document.getElementById("battleground");
const back = document.getElementById("back");
const tackle = document.getElementById("tackle");
const specialAttack = document.getElementById("specialAttack");
const enemyPokemonHp = document.getElementById("enemyPokemonHp");
const myPokemonHp = document.getElementById("myPokemonHp");
const enemyPokemonName = document.getElementById("enemyPokemonName");
const myPokemonName = document.getElementById("myPokemonName");
const myPokemonImage = document.getElementById("myPokemonImage");
const enemyPokemonImage = document.getElementById("enemyPokemonImage");
const info = document.getElementById("info");
const options = document.getElementById("options");
const pokemonImages = document.getElementById("pokemonImages");
const levelUp = document.getElementById("levelup");
const pokemonSelect = document.getElementById("pokemonSelect");
const firstPokemon = document.getElementById("firstPokemon");
const secondPokemon = document.getElementById("secondPokemon");
const thirdPokemon = document.getElementById("thirdPokemon");
const inventory = document.getElementById("inventory");
const myInventory = document.getElementById("myInventory");
const firstInventoryPokemon = document.getElementById("firstInventoryPokemon");
const secondInventoryPokemon = document.getElementById(
  "secondInventoryPokemon"
);
const thirdInventoryPokemon = document.getElementById("thirdInventoryPokemon");
const backInventory = document.getElementById("backInventory");

let myPokemonTurn = true;
let myPokemon;
let enemyPokemon;
let imageInterval;
let then = Date.now();
let now;
let delta;
let interval = 1000 / 59;
let random;
let battleStart = false;
let inventoryShow = false;
let xp = 10;
let houseEnter;

const WidthHeight = {
  width: 1600,
  height: 800,
};

const offset = {
  x: -1920,
  y: -600,
};

const houseoffset = {
  x: -40,
  y: -1000,
};

// Map Contact Places

// Map Boundaries

const collisionMap = [];

for (let i = 0; i < collisions.length; i += 40) {
  collisionMap.push(collisions.slice(i, 40 + i));
}

class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const boundaries = [];

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
for (let i = 0; i < tallgrass.length; i += 40) {
  tallGrassMap.push(tallgrass.slice(i, 40 + i));
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

// Door to House

const doorMap = [];

for (let i = 0; i < door.length; i += 40) {
  doorMap.push(door.slice(i, 40 + i));
}

class Door {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const doorboundary = [];

doorMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2665) {
      doorboundary.push(
        new Door({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

// House Contact Places

// House Table

const housetableMap = [];

for (let i = 0; i < housetable.length; i += 20) {
  housetableMap.push(housetable.slice(i, 20 + i));
}

class HouseTable {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
  draw() {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = "green"
  }
}

const housetables = [];

housetableMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 71) {
      housetables.push(
        new HouseTable({
          position: {
            x: j * 80 + houseoffset.x,
            y: i * 80 + houseoffset.y,
          },
        })
      );
    }
  });
});

// House Boundaries

const housecollisionMap = [];

for (let i = 0; i < housecollisions.length; i += 20) {
  housecollisionMap.push(housecollisions.slice(i, 20 + i));
}

class HouseBoundary {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const houseboundaries = [];

housecollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 609) {
      houseboundaries.push(
        new HouseBoundary({
          position: {
            x: j * 80 + houseoffset.x,
            y: i * 80 + houseoffset.y,
          },
        })
      );
    }
  });
});

// Doors from House

const housedoorMap = [];

for (let i = 0; i < housedoor.length; i += 20) {
  housedoorMap.push(housedoor.slice(i, 20 + i));
}

class HouseDoor {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const housedoors = [];

housedoorMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 607) {
      housedoors.push(
        new HouseDoor({
          position: {
            x: j * 80 + houseoffset.x,
            y: i * 80 + houseoffset.y,
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

const housemap = new Image();
housemap.src = "./res/img/maps/house.png";

const characterImage = new Image();

const foregroundImage = new Image();
foregroundImage.src = "./res/img/maps/foreground.png";

// Character Draw

class Character {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.imagePosition = 0;
    this.waitingFrames = 0;
    this.moving = false;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.imagePosition * 50,
      0,
      this.image.width / 4,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / 4,
      this.image.height
    );

    if (this.moving) {
      this.waitingFrames++;
      if (this.waitingFrames % 10 === 0) {
        if (this.imagePosition < 3) {
          this.imagePosition++;
        } else {
          this.imagePosition = 0;
        }
      }
    } else {
      this.imagePosition = 0;
    }
  }
}

// Map Draw

class Sprite {
  constructor({ image, position }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const character = new Character({
  image: characterImage,
  position: {
    x: WidthHeight.width / 2 - 200 / 4 / 2,
    y: WidthHeight.height / 2 - 74 / 2,
  },
});

const house = new Sprite({
  position: { x: houseoffset.x, y: houseoffset.y },
  image: housemap,
});

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: image,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: foregroundImage,
});

// Movement

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

window.addEventListener("keydown", (e) => {
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

// Drawing images

let houseMovables = [...houseboundaries, ...housedoors, house, ...housetables];

let mapMovables = [
  background,
  ...boundaries,
  foreground,
  ...tallGrasses,
  ...doorboundary,
];

houseEnter = false;

function animation() {
  window.requestAnimationFrame(animation);
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    if (houseEnter === true) {
      house.draw();
      housetables.forEach((asf)=>{
        asf.draw()
      })
      character.draw();
    } else {
      background.draw();
      character.draw();
      foreground.draw();
    }

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
            battleStart = true;
            selectMyPokemon();
          }
        }
      }
    }

    function detectContact(item, action) {
      if (
        character.position.x + characterImage.width / 4 >= item.position.x &&
        character.position.x <= item.position.x + item.width &&
        character.position.y + characterImage.height >= item.position.y &&
        character.position.y <= item.position.y + item.height
      ) {
        if (!coliding) {
          houseEnter = action;
        }
      }
    }

    function detectTable(item, moveX, moveY) {
      if (
        character.position.x + characterImage.width / 4 >=
          item.position.x + moveX &&
        character.position.x <= item.position.x + item.width + moveX &&
        character.position.y + characterImage.height >=
          item.position.y + moveY &&
        character.position.y <= item.position.y + item.height + moveY
      ) {
        if (!coliding) {
          inventory.style.display = "block";
          vancas.style.display = "none";
          inventoryShow = true;
        }
      }
    }

    // Moving UP

    if (keys.w.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterUp.png";
        character.moving = true;
        if (!houseEnter) {
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            detectBoundary(boundary, 0, 5);
          }
          for (let i = 0; i < tallGrasses.length; i++) {
            const grasstall = tallGrasses[i];
            detectTallGrass(grasstall);
          }
          for (let i = 0; i < doorboundary.length; i++) {
            const doorneco = doorboundary[i];
            detectContact(doorneco, true);
          }
        } else {
          for (let i = 0; i < houseboundaries.length; i++) {
            const houseboundary = houseboundaries[i];
            detectBoundary(houseboundary, 0, 5);
          }
          for (let i = 0; i < housedoors.length; i++) {
            const doorinside = housedoors[i];
            detectContact(doorinside, false);
          }
          for (let i = 0; i < housetables.length; i++) {
            const table = housetables[i];
            detectTable(table, 0, 10);
          }
        }

        if (!coliding) {
          if (houseEnter === true) {
            houseMovables.forEach((movable) => {
              movable.position.y += 5;
            });
          } else {
            mapMovables.forEach((movable) => {
              movable.position.y += 5;
            });
          }
        }
      }

      // Moving LEFT
    } else if (keys.a.pressed) {
      if (!battleStart && !inventoryShow) {
        character.moving = true;
        characterImage.src = "./res/img/characters/characterLeft.png";
        if (!houseEnter) {
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            detectBoundary(boundary, 5, 0);
          }
          for (let i = 0; i < tallGrasses.length; i++) {
            const grasstall = tallGrasses[i];
            detectTallGrass(grasstall);
          }
          for (let i = 0; i < doorboundary.length; i++) {
            const doorneco = doorboundary[i];
            detectContact(doorneco, true);
          }
        } else {
          for (let i = 0; i < houseboundaries.length; i++) {
            const houseboundary = houseboundaries[i];
            detectBoundary(houseboundary, 5, 0);
          }
          for (let i = 0; i < housedoors.length; i++) {
            const doorinside = housedoors[i];
            detectContact(doorinside, false);
          }
          for (let i = 0; i < housetables.length; i++) {
            const table = housetables[i];
            detectTable(table, 10, 0);
          }
        }

        if (!coliding)
          if (houseEnter === true) {
            houseMovables.forEach((movable) => {
              movable.position.x += 5;
            });
          } else {
            mapMovables.forEach((movable) => {
              movable.position.x += 5;
            });
          }
      }

      // Moving DOWN
    } else if (keys.s.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterDown.png";
        character.moving = true;
        if (!houseEnter) {
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            detectBoundary(boundary, 0, -5);
          }
          for (let i = 0; i < tallGrasses.length; i++) {
            const grasstall = tallGrasses[i];
            detectTallGrass(grasstall);
          }
          for (let i = 0; i < doorboundary.length; i++) {
            const doorneco = doorboundary[i];
            detectContact(doorneco, true);
          }
        } else {
          for (let i = 0; i < houseboundaries.length; i++) {
            const houseboundary = houseboundaries[i];
            detectBoundary(houseboundary, 0, -5);
          }
          for (let i = 0; i < housedoors.length; i++) {
            const doorinside = housedoors[i];
            detectContact(doorinside, false);
          }
          for (let i = 0; i < housetables.length; i++) {
            const table = housetables[i];
            detectTable(table, 0, -10);
          }
        }

        if (!coliding)
          if (houseEnter === true) {
            houseMovables.forEach((movable) => {
              movable.position.y -= 5;
            });
          } else {
            mapMovables.forEach((movable) => {
              movable.position.y -= 5;
            });
          }
      }
      // Moving RIGHT
    } else if (keys.d.pressed) {
      if (!battleStart && !inventoryShow) {
        characterImage.src = "./res/img/characters/characterRight.png";
        character.moving = true;
        if (!houseEnter) {
          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            detectBoundary(boundary, -5, 0);
          }
          for (let i = 0; i < tallGrasses.length; i++) {
            const grasstall = tallGrasses[i];
            detectTallGrass(grasstall);
          }
          for (let i = 0; i < doorboundary.length; i++) {
            const doorneco = doorboundary[i];
            detectContact(doorneco, true);
          }
        } else {
          for (let i = 0; i < houseboundaries.length; i++) {
            const houseboundary = houseboundaries[i];
            detectBoundary(houseboundary, -5, 0);
          }
          for (let i = 0; i < housedoors.length; i++) {
            const doorinside = housedoors[i];
            detectContact(doorinside, false);
          }
          for (let i = 0; i < housetables.length; i++) {
            const table = housetables[i];
            detectTable(table, -10, 0);
          }
        }

        if (!coliding)
          if (houseEnter === true) {
            houseMovables.forEach((movable) => {
              movable.position.x -= 5;
            });
          } else {
            mapMovables.forEach((movable) => {
              movable.position.x -= 5;
            });
          }
      }
    }
  }
}
animation();

// Battle

const galewing = {
  name: "GALEWING",
  damage: 1,
  specialDamage: 2,
  hp: 40,
  image: "Galewing.png",
};

const shadowfang = {
  name: "SHADOWFANG",
  damage: 2,
  specialDamage: 3,
  hp: 30,
  image: "Shadowfang.png",
};

const frostbite = {
  name: "FROSTBITE",
  damage: 3,
  specialDamage: 4,
  hp: 20,
  image: "Frostbite.png",
};

const enemyFrostbite = {
  name: "FROSTBITE",
  damage: 3,
  specialDamage: 4,
  hp: 20,
  image: "Frostbite.png",
};

const enemyGalewing = {
  name: "GALEWING",
  damage: 1,
  specialDamage: 2,
  hp: 40,
  image: "Galewing.png",
};

const enemyShadowfang = {
  name: "SHADOWFANG",
  damage: 2,
  specialDamage: 3,
  hp: 30,
  image: "Shadowfang.png",
};

let myPokemons = {
  firstPokemon,
  secondPokemon,
  thirdPokemon,
};

myPokemons.firstPokemon = galewing;
myPokemons.secondPokemon = shadowfang;
myPokemons.thirdPokemon = frostbite;
firstPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
secondPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
thirdPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;

function selectEnemyPokemon() {
  const pokemons = [enemyGalewing, enemyShadowfang, enemyFrostbite];
  let RandomPokemon = Math.floor(Math.random() * pokemons.length);
  enemyPokemon = pokemons[RandomPokemon];
  enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
}

function selectMyPokemon() {
  pokemonSelect.style.display = "flex";
  vancas.style.display = "none";
  firstPokemon.onclick = () => {
    myPokemon = myPokemons.firstPokemon;
    myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
    battleground.style.display = "flex";
    pokemonSelect.style.display = "none";
    battle();
  };
  secondPokemon.onclick = () => {
    myPokemon = myPokemons.secondPokemon;
    myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
    battleground.style.display = "flex";
    pokemonSelect.style.display = "none";
    battle();
  };
  thirdPokemon.onclick = () => {
    myPokemon = myPokemons.thirdPokemon;
    myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
    battleground.style.display = "flex";
    pokemonSelect.style.display = "none";
    battle();
  };
}

backInventory.onclick = () => {
  inventoryShow = false;
  vancas.style.display = "block";
  inventory.style.display = "none";
};

levelUp.onclick = () => {
  if (xp >= 1) {
    myPokemon.hp += 1;
    myPokemon.damage += 1;
    myPokemon.specialDamage += 1;
    myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
    xp -= 1;
  }
};

function battleAnimation(pokemonImage) {
  imageInterval = setInterval(() => {
    pokemonImage.style.display = "none";
    if (pokemonImage == myPokemonImage) {
      pokemonImages.style.justifyContent = "flex-end";
    }
    setTimeout(() => {
      pokemonImage.style.display = "block";
      if (pokemonImage == myPokemonImage) {
        pokemonImages.style.justifyContent = "space-between";
      }
    }, 100);
  }, 150);
}

function BattleResult(winner) {
  info.style.display = "block";
  info.innerHTML = `${winner} WON`;
  options.style.display = "none";
  myPokemonTurn = true;
  if (winner == myPokemon.name) {
    xp++;
  }
  setTimeout(() => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    battleStart = false;
  }, 2000);
}

function enemyAttack() {
  if (!myPokemonTurn) {
    let randomAttack = Math.floor(Math.random() * 5);
    if (randomAttack == 1) {
      if (myPokemon.hp >= 1 && enemyPokemon.hp >= 1) {
        myPokemon.hp -= enemyPokemon.specialDamage;
        myPokemonTurn = true;
        info.style.display = "block";
        info.innerHTML = `${enemyPokemon.name} USED SPECIAL ATTACK`;
        options.style.display = "none";
        battleAnimation(myPokemonImage);
        setTimeout(() => {
          info.style.display = "none";
          options.style.display = "block";
        }, 2000);
      }
    } else {
      if (myPokemon.hp >= 1 && enemyPokemon.hp >= 1) {
        myPokemon.hp -= enemyPokemon.damage;
        myPokemonTurn = true;
        info.style.display = "block";
        info.innerHTML = `${enemyPokemon.name} USED TACKLE`;
        options.style.display = "none";
        battleAnimation(myPokemonImage);
        setTimeout(() => {
          info.style.display = "none";
          options.style.display = "block";
        }, 2000);
      }
    }
    setTimeout(() => {
      clearInterval(imageInterval);
    }, 450);
    if (myPokemon.hp <= 0) {
      myPokemonHp.innerHTML = `0 HP`;
    } else {
      myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
      enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
    }

    if (myPokemon.hp <= 0) {
      BattleResult(enemyPokemon.name);
    } else if (enemyPokemon.hp <= 0) {
      BattleResult(myPokemon.name);
    }
  }
}

function battle() {
  selectEnemyPokemon();
  myPokemonName.innerHTML = myPokemon.name;
  enemyPokemonName.innerHTML = enemyPokemon.name;
  myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
  enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
  info.style.display = "none";

  back.onclick = () => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    battleStart = false;
  };

  tackle.onclick = () => {
    if (myPokemonTurn) {
      if (enemyPokemon.hp >= 1 && myPokemon.hp >= 1) {
        enemyPokemon.hp -= myPokemon.damage;
        enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
        info.style.display = "block";
        info.innerHTML = `${myPokemon.name} USED TACKLE`;
        options.style.display = "none";
        myPokemonTurn = false;
        battleAnimation(enemyPokemonImage);
        setTimeout(() => {
          info.style.display = "none";
          options.style.display = "block";
        }, 2000);
      }
      setTimeout(() => {
        clearInterval(imageInterval);
      }, 450);
      setTimeout(() => {
        enemyAttack();
      }, 2000);
    }
    if (myPokemon.hp <= 0) {
      BattleResult(enemyPokemon.name);
    } else if (enemyPokemon.hp <= 0) {
      BattleResult(myPokemon.name);
    }
  };

  specialAttack.onclick = () => {
    if (myPokemonTurn) {
      let randomSpecial = Math.floor(Math.random() * 3);
      if (randomSpecial == 1) {
        if (enemyPokemon.hp >= 1 && myPokemon.hp >= 1) {
          enemyPokemon.hp -= myPokemon.specialDamage;
          enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
          info.style.display = "block";
          info.innerHTML = `${myPokemon.name} USED SPECIAL ATTACK`;
          options.style.display = "none";
          setTimeout(() => {
            info.style.display = "none";
            options.style.display = "block";
          }, 2000);
          battleAnimation(enemyPokemonImage);
        }
      } else {
        if (enemyPokemon.hp >= 1 && myPokemon.hp >= 1) {
          info.style.display = "block";
          info.innerHTML = `${myPokemon.name} MISSED SPECIAL ATTACK`;
          options.style.display = "none";
          setTimeout(() => {
            info.style.display = "none";
            options.style.display = "block";
          }, 2000);
        }
      }
      myPokemonTurn = false;
      setTimeout(() => {
        clearInterval(imageInterval);
      }, 450);
      setTimeout(() => {
        enemyAttack();
      }, 2000);
    }

    if (enemyPokemon.hp <= 0) {
      enemyPokemonHp.innerHTML = `0 HP`;
    } else {
      myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
      enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
    }

    if (myPokemon.hp <= 0) {
      BattleResult(enemyPokemon.name);
    } else if (enemyPokemon.hp <= 0) {
      BattleResult(myPokemon.name);
    }
  };
}
