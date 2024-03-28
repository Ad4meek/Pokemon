import {
  enemySunspark,
  enemyLuminara,
  enemyDuskmaw,
  enemyShadowfang,
  enemyBlossomleaf,
  enemyVineflare,
  enemyFrostbite,
  enemyAquarift,
  enemyGalewing,
  enemyBlazeleo,
  sunspark,
  luminara,
  duskmaw,
  shadowfang,
  blossomleaf,
  vineflare,
  frostbite,
  aquarift,
  galewing,
  blazeleo,
} from "./pokemons.js";
import { keys } from "./movement.js";
import { tallGrasses, boundaries, background, foreground } from "./map.js";

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
const firstPokemon = document.getElementById("firstSelectedPokemon");
const secondPokemon = document.getElementById("secondSelectedPokemon");
const thirdPokemon = document.getElementById("thirdSelectedPokemon");

// Inventory variables

const inventory = document.getElementById("inventory");
const inventoryButton = document.getElementById("inventoryButton");
const firstInventoryPokemonImage = document.getElementById(
  "firstInventoryPokemonImage"
);
const firstPokemonName = document.getElementById("firstPokemonName");
const firstPokemonHp = document.getElementById("firstPokemonHp");
const firstPokemonDamage = document.getElementById("firstPokemonDamage");
const firstPokemonType = document.getElementById("firstPokemonType");
const firstPokemonSpeed = document.getElementById("firstPokemonSpeed");
const firstPokemonLevel = document.getElementById("firstPokemonLevel");
const secondInventoryPokemonImage = document.getElementById(
  "secondInventoryPokemonImage"
);
const secondPokemonName = document.getElementById("secondPokemonName");
const secondPokemonHp = document.getElementById("secondPokemonHp");
const secondPokemonDamage = document.getElementById("secondPokemonDamage");
const secondPokemonType = document.getElementById("secondPokemonType");
const secondPokemonSpeed = document.getElementById("secondPokemonSpeed");
const secondPokemonLevel = document.getElementById("secondPokemonLevel");
const thirdInventoryPokemonImage = document.getElementById(
  "thirdInventoryPokemonImage"
);
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

// Pokemon Select
const firstSelectedPokemonImage = document.getElementById(
  "firstSelectedPokemonImage"
);
const secondSelectedPokemonImage = document.getElementById(
  "secondSelectedPokemonImage"
);
const thirdSelectedPokemonImage = document.getElementById(
  "thirdSelectedPokemonImage"
);

let myPokemonTurn;
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
let firstPokemonSelected = false;
let secondPokemonSelected = false;
let thirdPokemonSelected = false;

const WidthHeight = {
  width: 1600,
  height: 800,
};

const offset = {
  x: -1920,
  y: -600,
};

// Images

window.onload = () => {
  characterImage.src = "./res/img/characters/characterDown.png";
};

const characterImage = new Image();

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

const character = new Character({
  image: characterImage,
  position: {
    x: WidthHeight.width / 2 - 200 / 4 / 2,
    y: WidthHeight.height / 2 - 74 / 2,
  },
});

// Drawing images

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

let myPokemons = {
  firstPokemon,
  secondPokemon,
  thirdPokemon,
};

function FirstPokemonSelect() {
  selectInfo.innerHTML = "Welcome, select your first pokemon!";
  firstPokemonSelect.onclick = () => {
    firstPokemonSelected = true;
    myPokemons.firstPokemon = galewing;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    selectInfo.innerHTML = "";
    animation();
  };
  secondPokemonSelect.onclick = () => {
    firstPokemonSelected = true;
    myPokemons.firstPokemon = aquarift;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    selectInfo.innerHTML = "";
    animation();
  };
  thirdPokemonSelect.onclick = () => {
    firstPokemonSelected = true;
    myPokemons.firstPokemon = vineflare;
    selectFirstPokemon.style.display = "none";
    canvas.style.display = "block";
    inventoryButton.style.display = "block";
    selectInfo.innerHTML = "";
    animation();
  };
}

FirstPokemonSelect();

inventoryButton.onclick = () => {
  inventoryShow = true;
  inventoryButton.style.display = "none"
  vancas.style.display = "none";
  inventory.style.display = "flex";
  backInventory.style.display = "block"
  selectInfo.innerHTML = "This is your pokemon inventory!";

  if (firstPokemonSelected) {
    firstInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
    firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
    firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
    firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
    firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
    firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
  } else {
    firstInventoryPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (secondPokemonSelected) {
    secondInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
    secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
    secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
    secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
    secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
    secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
  } else {
    secondInventoryPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (thirdPokemonSelected) {
    thirdInventoryPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
    thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
    thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
    thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
    thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
    thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
  } else {
    thirdInventoryPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }
};

backInventory.onclick = () => {
  inventoryShow = false;
  vancas.style.display = "block";
  inventory.style.display = "none";
  selectInfo.innerHTML = "";
  inventoryButton.style.display = "block"
  backInventory.style.display = "none"
};

// Battle

function selectEnemyPokemon() {
  const pokemons = [
    { ...enemySunspark },
    { ...enemyLuminara },
    { ...enemyDuskmaw },
    { ...enemyShadowfang },
    { ...enemyBlossomleaf },
    { ...enemyVineflare },
    { ...enemyFrostbite },
    { ...enemyAquarift },
    { ...enemyGalewing },
    { ...enemyBlazeleo },
  ];
  let RandomPokemon = Math.floor(Math.random() * pokemons.length);
  enemyPokemon = pokemons[RandomPokemon];
  enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
}

function selectMyPokemon() {
  inventoryButton.style.display = "none";
  pokemonSelect.style.display = "flex";
  vancas.style.display = "none";
  selectInfo.innerHTML = "Choose the pokemon you want to use for battle!";
  if (firstPokemonSelected) {
    firstSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
    firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
    firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
    firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
    firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
    firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
  } else {
    firstSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (secondPokemonSelected) {
    secondSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
    secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
    secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
    secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
    secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
    secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
  } else {
    secondSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (thirdPokemonSelected) {
    thirdSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
    thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
    thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
    thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
    thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
    thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
  } else {
    thirdSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  firstPokemon.onclick = () => {
    if (firstPokemonSelected) {
      myPokemon = { ...myPokemons.firstPokemon };
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonSelect.style.display = "none";
      selectInfo.innerHTML = "";
      selectEnemyPokemon();
      console.log(myPokemon.speed);
      console.log(enemyPokemon.speed);
      if (myPokemon.speed >= enemyPokemon.speed) {
        myPokemonTurn = true
        myPokemonName.innerHTML = myPokemon.name;
        enemyPokemonName.innerHTML = enemyPokemon.name;
        myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
        enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
        info.style.display = "block";
        info.innerHTML = `${myPokemon.name} ROUND`;
        options.style.display = "none";
        setTimeout(() => {
          battle();
        }, 2000);
        
      } else {
        myPokemonTurn = false
        myPokemonName.innerHTML = myPokemon.name;
        enemyPokemonName.innerHTML = enemyPokemon.name;
        myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
        enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
        info.style.display = "block";
        info.innerHTML = `${enemyPokemon.name} ROUND`;
        options.style.display = "none";
        setTimeout(() => {
          enemyAttack()
        }, 2000);
        
      }
    } else {
      selectInfo.innerHTML = "This is empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
      }, 2000);
    }
  };

  secondPokemon.onclick = () => {
    if (secondPokemonSelected) {
      myPokemon = myPokemons.secondPokemon;
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonSelect.style.display = "none";
      selectInfo.innerHTML = "";
      
      
    } else {
      selectInfo.innerHTML = "This is empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
      }, 2000);
    }
  };

  thirdPokemon.onclick = () => {
    if (thirdPokemonSelected) {
      myPokemon = myPokemons.thirdPokemon;
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonSelect.style.display = "none";
      selectInfo.innerHTML = "";
      battle();
    } else {
      selectInfo.innerHTML = "This is empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
      }, 2000);
    }
  };
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
    inventoryButton.style.display = "block";
    battleStart = false;
    if (winner === myPokemon.name) {
      PokemonCatch();
    }
  }, 2000);
}

function PokemonCatch() {
  inventoryButton.style.display = "none";
  pokemonSelect.style.display = "flex";
  vancas.style.display = "none";
  selectInfo.innerHTML = "Choose which pokemon you want to switch!";
  if (firstPokemonSelected) {
    firstSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
    firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
    firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
    firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
    firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
    firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
  } else {
    firstSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (secondPokemonSelected) {
    secondSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
    secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
    secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
    secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
    secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
    secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
  } else {
    secondSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (thirdPokemonSelected) {
    thirdSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
    thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
    thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
    thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
    thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
    thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
  } else {
    thirdSelectedPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  firstPokemon.onclick = () => {
    myPokemons.firstPokemon = enemyPokemon;
    firstSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonSelected = true;
    selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
    setTimeout(() => {
      inventoryButton.style.display = "block";
      pokemonSelect.style.display = "none";
      vancas.style.display = "block";
      selectInfo.innerHTML = "";
    }, 2000);
  };

  secondPokemon.onclick = () => {
    myPokemons.secondPokemon = enemyPokemon;
    secondSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonSelected = true;
    selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
    setTimeout(() => {
      inventoryButton.style.display = "block";
      pokemonSelect.style.display = "none";
      vancas.style.display = "block";
      selectInfo.innerHTML = "";
    }, 2000);
  };

  thirdPokemon.onclick = () => {
    myPokemons.thirdPokemon = enemyPokemon;
    thirdSelectedPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonSelected = true;
    selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
    setTimeout(() => {
      inventoryButton.style.display = "block";
      pokemonSelect.style.display = "none";
      vancas.style.display = "block";
      selectInfo.innerHTML = "";
    }, 2000);
  };
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
  myPokemonName.innerHTML = myPokemon.name;
  enemyPokemonName.innerHTML = enemyPokemon.name;
  myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
  enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
  info.style.display = "none";
  options.style.display = "block";
  back.onclick = () => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    inventoryButton.style.display = "block";
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
