import { collisions, tallgrass } from "./map.js";

// Variables

// Canvas Variables

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const vancas = document.getElementById("pokemonCanvas");

// Battle Variables

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
const pokemonSelect = document.getElementById("pokemonSelect");
const firstPokemon = document.getElementById("firstPokemon");
const secondPokemon = document.getElementById("secondPokemon");
const thirdPokemon = document.getElementById("thirdPokemon");

// Inventory variables

const inventory = document.getElementById("inventory");
const inventoryButton = document.getElementById("inventoryButton");
const firstPokemonName = document.getElementById("firstPokemonName");
const firstPokemonHp = document.getElementById("firstPokemonHp");
const firstPokemonDamage = document.getElementById("firstPokemonDamage");
const firstPokemonType = document.getElementById("firstPokemonType");
const firstPokemonSpeed = document.getElementById("firstPokemonSpeed");
const firstPokemonLevel = document.getElementById("firstPokemonLevel");
const secondPokemonName = document.getElementById("secondPokemonName");
const secondPokemonHp = document.getElementById("secondPokemonHp");
const secondPokemonDamage = document.getElementById("secondPokemonDamage");
const secondPokemonType = document.getElementById("secondPokemonType");
const secondPokemonSpeed = document.getElementById("secondPokemonSpeed");
const secondPokemonLevel = document.getElementById("secondPokemonLevel");
const thirdPokemonName = document.getElementById("thirdPokemonName");
const thirdPokemonHp = document.getElementById("thirdPokemonHp");
const thirdPokemonDamage = document.getElementById("thirdPokemonDamage");
const thirdPokemonType = document.getElementById("thirdPokemonType");
const thirdPokemonSpeed = document.getElementById("thirdPokemonSpeed");
const thirdPokemonLevel = document.getElementById("thirdPokemonLevel");
const backInventory = document.getElementById("backInventory");

// First pokemon select variables

const selectFirstPokemon = document.getElementById("selectFirstPokemon");
const firstPokemonSelect = document.getElementById("firstPokemonSelect");
const secondPokemonSelect = document.getElementById("secondPokemonSelect");
const thirdPokemonSelect = document.getElementById("thirdPokemonSelect");
const selectInfo = document.getElementById("selectInfo");

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

const WidthHeight = {
  width: 1600,
  height: 800,
};

const offset = {
  x: -1920,
  y: -600,
};

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

// Images

window.onload = () => {
  characterImage.src = "./res/img/characters/characterDown.png";
};

const image = new Image();
image.src = "./res/img/maps/testmap.png";

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

function FirstPokemonSelect() {
  selectInfo.innerHTML = "Welcome, select your first pokemon!";
  firstPokemonSelect.onclick = () => {
    myPokemons.firstPokemon = galewing;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    backInventory.style.display = "block";
    animation();
  };
  secondPokemonSelect.onclick = () => {
    myPokemons.firstPokemon = shadowfang;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    backInventory.style.display = "block";
    animation();
  };
  thirdPokemonSelect.onclick = () => {
    myPokemons.firstPokemon = frostbite;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    backInventory.style.display = "block";
    animation();
  };
}

FirstPokemonSelect();

let mapMovables = [background, ...boundaries, foreground, ...tallGrasses];

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

// Battle

const galewing = {
  name: "GALEWING",
  damage: 1,
  hp: 40,
  image: "Galewing.png",
  type: "Electric",
  speed: 1,
  level: 1,
};

const shadowfang = {
  name: "SHADOWFANG",
  damage: 2,
  hp: 30,
  image: "Shadowfang.png",
  type: "Shadow",
  speed: 1,
  level: 1,
};

const frostbite = {
  name: "FROSTBITE",
  damage: 3,
  hp: 20,
  image: "Frostbite.png",
  type: "Ice",
  speed: 1,
  level: 1,
};

const enemyFrostbite = {
  name: "FROSTBITE",
  damage: 3,
  hp: 20,
  image: "Frostbite.png",
  type: "Ice",
  speed: 1,
  level: 1,
};

const enemyGalewing = {
  name: "GALEWING",
  damage: 1,
  hp: 40,
  image: "Galewing.png",
  type: "Electric",
  speed: 1,
  level: 1,
};

const enemyShadowfang = {
  name: "SHADOWFANG",
  damage: 2,
  hp: 30,
  image: "Shadowfang.png",
  type: "Shadow",
  speed: 1,
  level: 1,
};

let myPokemons = {
  firstPokemon,
  secondPokemon,
  thirdPokemon,
};

// myPokemons.firstPokemon = shadowfang;
// myPokemons.secondPokemon = galewing;
// myPokemons.thirdPokemon = frostbite;
if (myPokemons.firstPokemon != null) {
  firstInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
  firstPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
  firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
  firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
  firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
  firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
  firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
  firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
}
if (myPokemons.secondPokemon != null) {
  secondInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
  secondPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
  secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
  secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
  secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
  secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
  secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
  secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
}
if (myPokemons.thirdPokemon != null) {
  thirdInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
  thirdPokemon.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
  thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
  thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
  thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
  thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
  thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
  thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
}

inventoryButton.onclick = () => {
  inventoryShow = true;
  vancas.style.display = "none";
  inventory.style.display = "block";
};

backInventory.onclick = () => {
  inventoryShow = false;
  vancas.style.display = "block";
  inventory.style.display = "none";
};

function selectEnemyPokemon() {
  const pokemons = [enemyGalewing, enemyShadowfang, enemyFrostbite];
  let RandomPokemon = Math.floor(Math.random() * pokemons.length);
  enemyPokemon = pokemons[RandomPokemon];
  enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
}

function selectMyPokemon() {
  pokemonSelect.style.display = "flex";
  vancas.style.display = "none";
  if (myPokemons.firstPokemon != null) {
    firstPokemon.onclick = () => {
      myPokemon = myPokemons.firstPokemon;
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonSelect.style.display = "none";
      battle();
    };
  }
  if (myPokemons.thirdPokemon != null) {
  secondPokemon.onclick = () => {
    myPokemon = myPokemons.secondPokemon;
    myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
    battleground.style.display = "flex";
    pokemonSelect.style.display = "none";
    battle();
  };
}
  if (myPokemons.secondPokemon != null) {
  thirdPokemon.onclick = () => {
    myPokemon = myPokemons.thirdPokemon;
    myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
    battleground.style.display = "flex";
    pokemonSelect.style.display = "none";
    battle();
  };
}
}

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
        myPokemon.hp -= enemyPokemon.damage * 2;
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
          enemyPokemon.hp -= myPokemon.damage * 2;
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
