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
import { character, characterImage } from "./character.js";

// Canvas Variables

const canvas = document.querySelector("canvas");
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
const firstPokemon = document.getElementById("firstPokemon");
const secondPokemon = document.getElementById("secondPokemon");
const thirdPokemon = document.getElementById("thirdPokemon");
const pokemonList = document.getElementById("pokemonList");
const inventoryButton = document.getElementById("inventoryButton");
const firstPokemonImage = document.getElementById("firstPokemonImage");
const firstPokemonName = document.getElementById("firstPokemonName");
const firstPokemonHp = document.getElementById("firstPokemonHp");
const firstPokemonDamage = document.getElementById("firstPokemonDamage");
const firstPokemonType = document.getElementById("firstPokemonType");
const firstPokemonSpeed = document.getElementById("firstPokemonSpeed");
const firstPokemonLevel = document.getElementById("firstPokemonLevel");
const secondPokemonImage = document.getElementById("secondPokemonImage");
const secondPokemonName = document.getElementById("secondPokemonName");
const secondPokemonHp = document.getElementById("secondPokemonHp");
const secondPokemonDamage = document.getElementById("secondPokemonDamage");
const secondPokemonType = document.getElementById("secondPokemonType");
const secondPokemonSpeed = document.getElementById("secondPokemonSpeed");
const secondPokemonLevel = document.getElementById("secondPokemonLevel");
const thirdPokemonImage = document.getElementById("thirdPokemonImage");
const thirdPokemonName = document.getElementById("thirdPokemonName");
const thirdPokemonHp = document.getElementById("thirdPokemonHp");
const thirdPokemonDamage = document.getElementById("thirdPokemonDamage");
const thirdPokemonType = document.getElementById("thirdPokemonType");
const thirdPokemonSpeed = document.getElementById("thirdPokemonSpeed");
const thirdPokemonLevel = document.getElementById("thirdPokemonLevel");
const backInventory = document.getElementById("backInventory");
const backBattle = document.getElementById("backBattle");
const selectInfo = document.getElementById("selectInfo");

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
let additionalEnemyPokemon;
let chosenPokemon;
let pokemonCatched = false;
let firstPokemonSelection = false;

// Animation

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

let myPokemons = {
  firstPokemon,
  secondPokemon,
  thirdPokemon,
};

function FirstPokemonSelect() {
  firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${galewing.image}')`;
  firstPokemonName.innerHTML = galewing.name;
  firstPokemonHp.innerHTML = `Hp: ${galewing.hp}`;
  firstPokemonDamage.innerHTML = `Damage: ${galewing.damage}`;
  firstPokemonType.innerHTML = `Type: ${galewing.type}`;
  firstPokemonSpeed.innerHTML = `Speed: ${galewing.speed}`;
  firstPokemonLevel.innerHTML = `Level: ${galewing.level}`;
  secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${aquarift.image}')`;
  secondPokemonName.innerHTML = aquarift.name;
  secondPokemonHp.innerHTML = `Hp: ${aquarift.hp}`;
  secondPokemonDamage.innerHTML = `Damage: ${aquarift.damage}`;
  secondPokemonType.innerHTML = `Type: ${aquarift.type}`;
  secondPokemonSpeed.innerHTML = `Speed: ${aquarift.speed}`;
  secondPokemonLevel.innerHTML = `Level: ${aquarift.level}`;
  thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${vineflare.image}')`;
  thirdPokemonName.innerHTML = vineflare.name;
  thirdPokemonHp.innerHTML = `Hp: ${vineflare.hp}`;
  thirdPokemonDamage.innerHTML = `Damage: ${vineflare.damage}`;
  thirdPokemonType.innerHTML = `Type: ${vineflare.type}`;
  thirdPokemonSpeed.innerHTML = `Speed: ${vineflare.speed}`;
  thirdPokemonLevel.innerHTML = `Level: ${vineflare.level}`;
  selectInfo.innerHTML = "Welcome, select your first pokemon!";
  firstPokemon.onclick = () => {
    if (!firstPokemonSelection) {
      firstPokemonSelected = true;
      myPokemons.firstPokemon = galewing;
      pokemonList.style.display = "none";
      canvas.style.display = "block";
      inventoryButton.style.display = "block";
      selectInfo.innerHTML = "";
      firstPokemonSelection = true;
      animation();
    }
  };
  secondPokemon.onclick = () => {
    if (!firstPokemonSelection) {
      firstPokemonSelected = true;
      myPokemons.firstPokemon = aquarift;
      pokemonList.style.display = "none";
      canvas.style.display = "block";
      inventoryButton.style.display = "block";
      selectInfo.innerHTML = "";
      firstPokemonSelection = true;
      animation();
    }
  };
  thirdPokemon.onclick = () => {
    if (!firstPokemonSelection) {
      firstPokemonSelected = true;
      myPokemons.firstPokemon = vineflare;
      pokemonList.style.display = "none";
      canvas.style.display = "block";
      inventoryButton.style.display = "block";
      selectInfo.innerHTML = "";
      firstPokemonSelection = true;
      animation();
    }
  };
}

FirstPokemonSelect();

inventoryButton.onclick = () => {
  inventoryShow = true;
  inventoryButton.style.display = "none";
  vancas.style.display = "none";
  pokemonList.style.display = "flex";
  backInventory.style.display = "block";
  selectInfo.innerHTML = "This is your pokemon inventory!";
  pokemonShow();
};

backInventory.onclick = () => {
  inventoryShow = false;
  vancas.style.display = "block";
  pokemonList.style.display = "none";
  selectInfo.innerHTML = "";
  inventoryButton.style.display = "block";
  backInventory.style.display = "none";
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
  chosenPokemon = pokemons[RandomPokemon];
  enemyPokemon = chosenPokemon;
  additionalEnemyPokemon = { ...chosenPokemon };
  enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
}

function startBattle() {
  if (myPokemon.speed >= enemyPokemon.speed) {
    myPokemonTurn = true;
    myPokemonName.innerHTML = myPokemon.name;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
    enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
    info.style.display = "block";
    info.innerHTML = `${myPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      battle();
    }, 2000);
  } else {
    myPokemonTurn = false;
    myPokemonName.innerHTML = myPokemon.name;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    myPokemonHp.innerHTML = `${myPokemon.hp} HP`;
    enemyPokemonHp.innerHTML = `${enemyPokemon.hp} HP`;
    info.style.display = "block";
    info.innerHTML = `${enemyPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      enemyAttack();
    }, 2000);
  }
}

function selectMyPokemon() {
  inventoryButton.style.display = "none";
  pokemonList.style.display = "flex";
  vancas.style.display = "none";
  selectInfo.innerHTML = "Choose the pokemon you want to use for battle!";
  pokemonShow();
  firstPokemon.onclick = () => {
    if (firstPokemonSelected) {
      myPokemon = myPokemons.firstPokemon;
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonList.style.display = "none";
      selectInfo.innerHTML = "";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.innerHTML = "This is an empty slot!";
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
      pokemonList.style.display = "none";
      selectInfo.innerHTML = "";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.innerHTML = "This is an empty slot!";
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
      pokemonList.style.display = "none";
      selectInfo.innerHTML = "";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.innerHTML = "This is an empty slot!";
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
    
    if (winner === myPokemon.name && myPokemon.hp >= 1) {
      PokemonCatch();
    }
  }, 2000);
}
function pokemonShow() {
  if (firstPokemonSelected) {
    firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
    firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
    firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
    firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
    firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
    firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
  } else {
    firstPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
  }

  if (secondPokemonSelected) {
    secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
    secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
    secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
    secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
    secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
    secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
  } else {
    secondPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
    secondPokemonName.innerHTML = "";
    secondPokemonHp.innerHTML = "";
    secondPokemonDamage.innerHTML = "";
    secondPokemonType.innerHTML = "";
    secondPokemonSpeed.innerHTML = "";
    secondPokemonLevel.innerHTML = "";
  }

  if (thirdPokemonSelected) {
    thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
    thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
    thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
    thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
    thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
    thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
  } else {
    thirdPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
    thirdPokemonName.innerHTML = "";
    thirdPokemonHp.innerHTML = "";
    thirdPokemonDamage.innerHTML = "";
    thirdPokemonType.innerHTML = "";
    thirdPokemonSpeed.innerHTML = "";
    thirdPokemonLevel.innerHTML = "";
  }
}

function PokemonCatch() {
  pokemonCatched = false;
  inventoryButton.style.display = "none";
  pokemonList.style.display = "flex";
  vancas.style.display = "none";
  backBattle.style.display = "block";
  selectInfo.innerHTML = "Choose which pokemon you want to switch!";
  pokemonShow();

  firstPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.firstPokemon = additionalEnemyPokemon;
      firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
      firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
      firstPokemonHp.innerHTML = `Hp: ${myPokemons.firstPokemon.hp}`;
      firstPokemonDamage.innerHTML = `Damage: ${myPokemons.firstPokemon.damage}`;
      firstPokemonType.innerHTML = `Type: ${myPokemons.firstPokemon.type}`;
      firstPokemonSpeed.innerHTML = `Speed: ${myPokemons.firstPokemon.speed}`;
      firstPokemonLevel.innerHTML = `Level: ${myPokemons.firstPokemon.level}`;
      firstPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        backBattle.style.display = "none";
        battleStart = false;
      }, 2000);
    }
  };
  secondPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.secondPokemon = additionalEnemyPokemon;
      secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
      secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
      secondPokemonHp.innerHTML = `Hp: ${myPokemons.secondPokemon.hp}`;
      secondPokemonDamage.innerHTML = `Damage: ${myPokemons.secondPokemon.damage}`;
      secondPokemonType.innerHTML = `Type: ${myPokemons.secondPokemon.type}`;
      secondPokemonSpeed.innerHTML = `Speed: ${myPokemons.secondPokemon.speed}`;
      secondPokemonLevel.innerHTML = `Level: ${myPokemons.secondPokemon.level}`;
      secondPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        backBattle.style.display = "none";
        battleStart = false;
      }, 2000);
    }
  };

  thirdPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.thirdPokemon = additionalEnemyPokemon;
      thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
      thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
      thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
      thirdPokemonHp.innerHTML = `Hp: ${myPokemons.thirdPokemon.hp}`;
      thirdPokemonDamage.innerHTML = `Damage: ${myPokemons.thirdPokemon.damage}`;
      thirdPokemonType.innerHTML = `Type: ${myPokemons.thirdPokemon.type}`;
      thirdPokemonSpeed.innerHTML = `Speed: ${myPokemons.thirdPokemon.speed}`;
      thirdPokemonLevel.innerHTML = `Level: ${myPokemons.thirdPokemon.level}`;
      thirdPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        backBattle.style.display = "none";
        battleStart = false;
      }, 2000);
    }
  };


  backBattle.onclick = () => {
    inventoryButton.style.display = "block";
    pokemonList.style.display = "none";
    vancas.style.display = "block";
    selectInfo.innerHTML = "";
    backBattle.style.display = "none";
    battleStart = false;
    pokemonCatched = true;
    console.log(battleStart);
    console.log(inventoryShow);
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
