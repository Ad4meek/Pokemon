import { ePokemons, myPokemonsObjects } from "./pokemons.js";
import { animation } from "./animation.js";
import {
  setBattleStart,
  setInventoryShow,
  bossBattles,
  setBossBattle,
  setVoltarDeath,
  voltarDeath,
  setThornDeath,
  thornDeath,
  setAuroraDeath,
  auroraDeath,
} from "./variables.js";
import {
  bossBlazeleo,
  bossBlossomleaf,
  bossDuskmaw,
  bossAquarift,
  bossLuminara,
  bossShadowfang,
  bossGalewing,
  bossVineflare,
  bossFrostbite,
} from "./pokemons.js";
import { thornBoss, voltarBoss, auroraBoss } from "./map.js";

// Canvas

const canvas = document.querySelector("canvas");
const vancas = document.getElementById("pokemonCanvas");

// Battle

const battleground = document.getElementById("battleground");
const back = document.getElementById("back");
const tackle = document.getElementById("tackle");
const specialAttack = document.getElementById("specialAttack");
const myPokemonName = document.getElementById("myPokemonName");
const myPokemonHp = document.getElementById("myPokemonHp");
const myPokemonDamage = document.getElementById("myPokemonDamage");
const myPokemonSpeed = document.getElementById("myPokemonSpeed");
const myPokemonType = document.getElementById("myPokemonType");
const myPokemonLevel = document.getElementById("myPokemonLevel");
const enemyPokemonName = document.getElementById("enemyPokemonName");
const enemyPokemonHp = document.getElementById("enemyPokemonHp");
const enemyPokemonDamage = document.getElementById("enemyPokemonDamage");
const enemyPokemonSpeed = document.getElementById("enemyPokemonSpeed");
const enemyPokemonType = document.getElementById("enemyPokemonType");
const enemyPokemonLevel = document.getElementById("enemyPokemonLevel");
const myPokemonImage = document.getElementById("myPokemonImage");
const enemyPokemonImage = document.getElementById("enemyPokemonImage");
const info = document.getElementById("info");
const options = document.getElementById("options");
const pokemonImages = document.getElementById("pokemonImages");

// Pokemon List

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

// Boss

let voltarFirstPokemon = true;
let voltarSecondPokemon = true;
let voltarThirdPokemon = true;
let thornFirstPokemon = true;
let thornSecondPokemon = true;
let thornThirdPokemon = true;
let auroraFirstPokemon = true;
let auroraSecondPokemon = true;
let auroraThirdPokemon = true;
let myFirstBossPokemon = true;
let mySecondBossPokemon = true;
let myThirdBossPokemon = true;

let myPokemonTurn;
let myPokemon;
let enemyPokemon;
let imageInterval;
let firstPokemonSelected = false;
let secondPokemonSelected = false;
let thirdPokemonSelected = false;
let pokemonCatched = false;
let firstPokemonSelection = false;
let randomSpeed;
let randomDamage;
let randomMaxHp;
let additionalPokemon;

let myPokemons = {
  firstPokemon,
  secondPokemon,
  thirdPokemon,
};

// First pokemon selection

function FirstPokemonSelect() {
  firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemonsObjects[8].image}')`;
  firstPokemonName.innerHTML = myPokemonsObjects[8].name;
  firstPokemonHp.innerHTML = `HP: ${myPokemonsObjects[8].hp}`;
  firstPokemonDamage.innerHTML = `DAMAGE: ${myPokemonsObjects[8].damage}`;
  firstPokemonType.innerHTML = `TYPE: ${myPokemonsObjects[8].type}`;
  firstPokemonSpeed.innerHTML = `SPEED: ${myPokemonsObjects[8].speed}`;
  firstPokemonLevel.innerHTML = `LEVEL: ${myPokemonsObjects[8].level}`;
  secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemonsObjects[7].image}')`;
  secondPokemonName.innerHTML = myPokemonsObjects[7].name;
  secondPokemonHp.innerHTML = `HP: ${myPokemonsObjects[7].hp}`;
  secondPokemonDamage.innerHTML = `DAMAGE: ${myPokemonsObjects[7].damage}`;
  secondPokemonType.innerHTML = `TYPE: ${myPokemonsObjects[7].type}`;
  secondPokemonSpeed.innerHTML = `SPEED: ${myPokemonsObjects[7].speed}`;
  secondPokemonLevel.innerHTML = `LEVEL: ${myPokemonsObjects[7].level}`;
  thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemonsObjects[5].image}')`;
  thirdPokemonName.innerHTML = myPokemonsObjects[5].name;
  thirdPokemonHp.innerHTML = `HP: ${myPokemonsObjects[5].hp}`;
  thirdPokemonDamage.innerHTML = `DAMAGE: ${myPokemonsObjects[5].damage}`;
  thirdPokemonType.innerHTML = `TYPE: ${myPokemonsObjects[5].type}`;
  thirdPokemonSpeed.innerHTML = `SPEED: ${myPokemonsObjects[5].speed}`;
  thirdPokemonLevel.innerHTML = `LEVEL: ${myPokemonsObjects[5].level}`;
  selectInfo.style.display = "block";
  selectInfo.innerHTML = "Welcome, select your first pokemon!";
  firstPokemonImage.onclick = () => {
    if (!firstPokemonSelection) {
      selectInfo.innerHTML = `Congratulations, you have chosen ${myPokemonsObjects[8].name}!`;
      setTimeout(() => {
        firstPokemonSelected = true;
        myPokemons.firstPokemon = myPokemonsObjects[8];
        pokemonList.style.display = "none";
        canvas.style.display = "block";
        inventoryButton.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        firstPokemonSelection = true;
        animation();
      }, 2000);
    }
  };
  secondPokemonImage.onclick = () => {
    if (!firstPokemonSelection) {
      selectInfo.innerHTML = `Congratulations, you have chosen ${myPokemonsObjects[7].name}!`;
      setTimeout(() => {
        firstPokemonSelected = true;
        myPokemons.firstPokemon = myPokemonsObjects[7];
        pokemonList.style.display = "none";
        canvas.style.display = "block";
        inventoryButton.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        firstPokemonSelection = true;
        animation();
      }, 2000);
    }
  };
  thirdPokemonImage.onclick = () => {
    if (!firstPokemonSelection) {
      selectInfo.innerHTML = `Congratulations, you have chosen ${myPokemonsObjects[5].name}!`;
      setTimeout(() => {
        firstPokemonSelected = true;
        myPokemons.firstPokemon = myPokemonsObjects[5];
        pokemonList.style.display = "none";
        canvas.style.display = "block";
        inventoryButton.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        firstPokemonSelection = true;
        animation();
      }, 2000);
    }
  };
}

FirstPokemonSelect();

// Inventory

inventoryButton.onclick = () => {
  setInventoryShow(true);
  inventoryButton.style.display = "none";
  vancas.style.filter = "blur(10px)";
  pokemonList.style.display = "flex";
  backInventory.style.display = "block";
  selectInfo.style.display = "block";
  selectInfo.innerHTML = "This is your pokemon inventory!";
  pokemonShow();
};

backInventory.onclick = () => {
  setInventoryShow(false);
  vancas.style.filter = "blur(0)";
  pokemonList.style.display = "none";
  selectInfo.innerHTML = "";
  selectInfo.style.display = "none";
  inventoryButton.style.display = "block";
  backInventory.style.display = "none";
};

// Show pokemon list

function pokemonShow() {
  if (firstPokemonSelected) {
    firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
    firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
    firstPokemonHp.innerHTML = `HP: ${myPokemons.firstPokemon.hp}`;
    firstPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.firstPokemon.damage}`;
    firstPokemonType.innerHTML = `TYPE: ${myPokemons.firstPokemon.type}`;
    firstPokemonSpeed.innerHTML = `SPEED: ${myPokemons.firstPokemon.speed}`;
    firstPokemonLevel.innerHTML = `LEVEL: ${myPokemons.firstPokemon.level}`;
  } else {
    firstPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
    firstPokemonName.innerHTML = "EMPTY SLOT FOR POKEMON";
    firstPokemonHp.innerHTML = "";
    firstPokemonDamage.innerHTML = "";
    firstPokemonType.innerHTML = "";
    firstPokemonSpeed.innerHTML = "";
    firstPokemonLevel.innerHTML = "";
  }

  if (secondPokemonSelected) {
    secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
    secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
    secondPokemonHp.innerHTML = `HP: ${myPokemons.secondPokemon.hp}`;
    secondPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.secondPokemon.damage}`;
    secondPokemonType.innerHTML = `TYPE: ${myPokemons.secondPokemon.type}`;
    secondPokemonSpeed.innerHTML = `SPEED: ${myPokemons.secondPokemon.speed}`;
    secondPokemonLevel.innerHTML = `LEVEL: ${myPokemons.secondPokemon.level}`;
  } else {
    secondPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
    secondPokemonName.innerHTML = "EMPTY SLOT FOR POKEMON";
    secondPokemonHp.innerHTML = "";
    secondPokemonDamage.innerHTML = "";
    secondPokemonType.innerHTML = "";
    secondPokemonSpeed.innerHTML = "";
    secondPokemonLevel.innerHTML = "";
  }

  if (thirdPokemonSelected) {
    thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
    thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
    thirdPokemonHp.innerHTML = `HP: ${myPokemons.thirdPokemon.hp}`;
    thirdPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.thirdPokemon.damage}`;
    thirdPokemonType.innerHTML = `TYPE: ${myPokemons.thirdPokemon.type}`;
    thirdPokemonSpeed.innerHTML = `SPEED: ${myPokemons.thirdPokemon.speed}`;
    thirdPokemonLevel.innerHTML = `LEVEL: ${myPokemons.thirdPokemon.level}`;
  } else {
    thirdPokemonImage.style.backgroundImage = `url('res/img/details/questionMark.png')`;
    thirdPokemonName.innerHTML = "EMPTY SLOT FOR POKEMON";
    thirdPokemonHp.innerHTML = "";
    thirdPokemonDamage.innerHTML = "";
    thirdPokemonType.innerHTML = "";
    thirdPokemonSpeed.innerHTML = "";
    thirdPokemonLevel.innerHTML = "";
  }
}

// Select enemy pokemon

function selectEnemyPokemon() {
  let RandomPokemon = Math.floor(Math.random() * ePokemons.length);
  enemyPokemon = ePokemons[RandomPokemon];
  additionalPokemon = myPokemonsObjects[RandomPokemon];
  enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
}

// Select my pokemon for battle

export function selectMyPokemon() {
  inventoryButton.style.display = "none";
  pokemonList.style.display = "flex";
  // vancas.style.display = "none";
  vancas.style.filter = "blur(10px)";
  selectInfo.style.display = "block";
  selectInfo.innerHTML = "Choose the pokemon you want to use for battle!";
  pokemonShow();
  firstPokemon.onclick = () => {
    if (firstPokemonSelected) {
      myPokemon = myPokemons.firstPokemon;
      myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
      battleground.style.display = "flex";
      pokemonList.style.display = "none";
      selectInfo.innerHTML = "";
      selectInfo.style.display = "none";
      vancas.style.display = "none";
      vancas.style.filter = "blur(0)";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
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
      selectInfo.style.display = "none";
      vancas.style.display = "none";
      vancas.style.filter = "blur(0)";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
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
      selectInfo.style.display = "none";
      vancas.style.display = "none";
      vancas.style.filter = "blur(0)";
      selectEnemyPokemon();
      startBattle();
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
      }, 2000);
    }
  };
}

// Level UP

function myLevelUp() {
  randomDamage = Math.floor(Math.random() * 3) + 1;
  randomMaxHp = Math.floor(Math.random() * 3) + 1;
  randomSpeed = Math.floor(Math.random() * 3) + 1;
  myPokemon.damage += randomDamage;
  myPokemon.maxHp += randomMaxHp;
  myPokemon.speed += randomSpeed;
  myPokemon.level += 1;
}

function enemyLevelUp() {
  if (myPokemon.level + 1 > enemyPokemon.level) {
    randomDamage = Math.floor(Math.random() * 3) + 1;
    randomMaxHp = Math.floor(Math.random() * 3) + 1;
    randomSpeed = Math.floor(Math.random() * 3) + 1;
    // ePokemons.forEach((enemy) => {
    //   enemy.damage += randomDamage * (myPokemon.level - 1);
    //   enemy.maxHp += randomMaxHp * (myPokemon.level - 1);
    //   enemy.hp += randomMaxHp * (myPokemon.level - 1);
    //   enemy.speed += randomSpeed * (myPokemon.level - 1);
    //   enemy.level += myPokemon.level - 1;
    // });
    enemyPokemon.damage += randomDamage * (myPokemon.level - 1);
    enemyPokemon.maxHp += randomMaxHp * (myPokemon.level - 1);
    enemyPokemon.hp += randomMaxHp * (myPokemon.level - 1);
    enemyPokemon.speed += randomSpeed * (myPokemon.level - 1);
    enemyPokemon.level += myPokemon.level - 1;
  }
}

// Pokemon catch

function PokemonCatch() {
  pokemonCatched = false;
  inventoryButton.style.display = "none";
  pokemonList.style.display = "flex";
  vancas.style.display = "none";
  backBattle.style.display = "block";
  selectInfo.style.display = "block";
  selectInfo.innerHTML = "Choose which pokemon you want to switch!";
  pokemonShow();
  firstPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.firstPokemon = additionalPokemon;
      firstPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.firstPokemon.image}')`;
      firstPokemonName.innerHTML = myPokemons.firstPokemon.name;
      firstPokemonHp.innerHTML = `HP: ${myPokemons.firstPokemon.hp}`;
      firstPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.firstPokemon.damage}`;
      firstPokemonType.innerHTML = `TYPE: ${myPokemons.firstPokemon.type}`;
      firstPokemonSpeed.innerHTML = `SPEED: ${myPokemons.firstPokemon.speed}`;
      firstPokemonLevel.innerHTML = `LEVEL: ${myPokemons.firstPokemon.level}`;
      firstPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        backBattle.style.display = "none";
        setBattleStart(false);
      }, 2000);
    }
  };
  secondPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.secondPokemon = additionalPokemon;
      secondPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.secondPokemon.image}')`;
      secondPokemonName.innerHTML = myPokemons.secondPokemon.name;
      secondPokemonHp.innerHTML = `HP: ${myPokemons.secondPokemon.hp}`;
      secondPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.secondPokemon.damage}`;
      secondPokemonType.innerHTML = `TYPE: ${myPokemons.secondPokemon.type}`;
      secondPokemonSpeed.innerHTML = `SPEED: ${myPokemons.secondPokemon.speed}`;
      secondPokemonLevel.innerHTML = `LEVEL: ${myPokemons.secondPokemon.level}`;
      secondPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        backBattle.style.display = "none";
        setBattleStart(false);
      }, 2000);
    }
  };

  thirdPokemon.onclick = () => {
    if (!pokemonCatched) {
      pokemonCatched = true;
      myPokemons.thirdPokemon = additionalPokemon;
      thirdPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemons.thirdPokemon.image}')`;
      thirdPokemonName.innerHTML = myPokemons.thirdPokemon.name;
      thirdPokemonHp.innerHTML = `HP: ${myPokemons.thirdPokemon.hp}`;
      thirdPokemonDamage.innerHTML = `DAMAGE: ${myPokemons.thirdPokemon.damage}`;
      thirdPokemonType.innerHTML = `TYPE: ${myPokemons.thirdPokemon.type}`;
      thirdPokemonSpeed.innerHTML = `SPEED: ${myPokemons.thirdPokemon.speed}`;
      thirdPokemonLevel.innerHTML = `LEVEL: ${myPokemons.thirdPokemon.level}`;
      thirdPokemonSelected = true;
      selectInfo.innerHTML = `You caught ${enemyPokemon.name}`;
      setTimeout(() => {
        inventoryButton.style.display = "block";
        pokemonList.style.display = "none";
        vancas.style.display = "block";
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
        backBattle.style.display = "none";
        setBattleStart(false);
      }, 2000);
    }
  };

  backBattle.onclick = () => {
    inventoryButton.style.display = "block";
    pokemonList.style.display = "none";
    vancas.style.display = "block";
    selectInfo.innerHTML = "";
    selectInfo.style.display = "none";
    backBattle.style.display = "none";
    setBattleStart(false);
    pokemonCatched = true;
  };
}

// Start Battle

function startBattle() {
  enemyLevelUp();
  if (myPokemon.speed >= enemyPokemon.speed) {
    myPokemonTurn = true;
    myPokemonName.innerHTML = myPokemon.name;
    myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
    myPokemonDamage.innerHTML = `DAMAGE: ${myPokemon.damage}`;
    myPokemonSpeed.innerHTML = `SPEED: ${myPokemon.speed}`;
    myPokemonType.innerHTML = `TYPE: ${myPokemon.type}`;
    myPokemonLevel.innerHTML = `LEVEL: ${myPokemon.level}`;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    enemyPokemonDamage.innerHTML = `DAMAGE: ${enemyPokemon.damage}`;
    enemyPokemonSpeed.innerHTML = `SPEED: ${enemyPokemon.speed}`;
    enemyPokemonType.innerHTML = `TYPE: ${enemyPokemon.type}`;
    enemyPokemonLevel.innerHTML = `LEVEL: ${enemyPokemon.level}`;
    info.style.display = "block";
    info.innerHTML = `${myPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      battle();
    }, 2000);
  } else {
    myPokemonTurn = false;
    myPokemonName.innerHTML = myPokemon.name;
    myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
    myPokemonDamage.innerHTML = `DAMAGE: ${myPokemon.damage}`;
    myPokemonSpeed.innerHTML = `SPEED: ${myPokemon.speed}`;
    myPokemonLevel.innerHTML = `LEVEL: ${myPokemon.level}`;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    enemyPokemonDamage.innerHTML = `DAMAGE: ${enemyPokemon.damage}`;
    enemyPokemonSpeed.innerHTML = `SPEED: ${enemyPokemon.speed}`;
    enemyPokemonType.innerHTML = `TYPE: ${enemyPokemon.type}`;
    enemyPokemonLevel.innerHTML = `LEVEL: ${enemyPokemon.level}`;
    info.style.display = "block";
    info.innerHTML = `${enemyPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      enemyAttack();
    }, 2000);
  }
}

// Helping functions for battle

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
  myPokemon.hp = myPokemon.maxHp;
  enemyPokemon.hp = enemyPokemon.maxHp;
  setTimeout(() => {
    if (winner === myPokemon.name && myPokemon.hp >= 1) {
      battleground.style.display = "none";
      myLevelUp();
      if (!bossBattles) {
        PokemonCatch();
      } else {
        vancas.style.display = "block";
        battleground.style.display = "none";
        inventoryButton.style.display = "block";
        setBattleStart(false);
        setBossBattle(false);
      }
    } else {
      vancas.style.display = "block";
      battleground.style.display = "none";
      inventoryButton.style.display = "block";
      setBattleStart(false);
      setBossBattle(false);
    }
  }, 2000);
}

// Enemy attack

function enemyAttack() {
  if (!myPokemonTurn) {
    let randomAttack = Math.floor(Math.random() * 5);
    if (randomAttack == 1) {
      if (myPokemon.hp >= 1 && enemyPokemon.hp >= 1) {
        if (enemyPokemon.type == "GRASS" && myPokemon.type == "WATER") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "GRASS" && myPokemon.type == "FIRE") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "WATER" && myPokemon.type == "FIRE") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "WATER" && myPokemon.type == "GRASS") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "FIRE" && myPokemon.type == "GRASS") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "FIRE" && myPokemon.type == "WATER") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "DARK" && myPokemon.type == "LIGHT") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "LIGHT" && myPokemon.type == "DARK") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else {
          myPokemon.hp -= enemyPokemon.damage;
        }

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
      myPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    }

    if (myPokemon.hp <= 0) {
      BattleResult(enemyPokemon.name);
    } else if (enemyPokemon.hp <= 0) {
      BattleResult(myPokemon.name);
    }
  }
}

// Battle

function battle() {
  info.style.display = "none";
  options.style.display = "block";
  back.onclick = () => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    inventoryButton.style.display = "block";
    setBattleStart(false);
    setBossBattle(false);
  };

  tackle.onclick = () => {
    if (myPokemonTurn) {
      if (enemyPokemon.hp >= 1 && myPokemon.hp >= 1) {
        enemyPokemon.hp -= myPokemon.damage;
        enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
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

    if (enemyPokemon.hp <= 0) {
      enemyPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
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
          if (myPokemon.type == "GRASS" && enemyPokemon.type == "WATER") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "GRASS" && enemyPokemon.type == "FIRE") {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "WATER" && enemyPokemon.type == "FIRE") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (
            myPokemon.type == "WATER" &&
            enemyPokemon.type == "GRASS"
          ) {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "FIRE" && enemyPokemon.type == "GRASS") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "FIRE" && enemyPokemon.type == "WATER") {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "DARK" && enemyPokemon.type == "LIGHT") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "LIGHT" && enemyPokemon.type == "DARK") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else {
            enemyPokemon.hp -= myPokemon.damage;
          }
          enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
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
      enemyPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    }

    if (myPokemon.hp <= 0) {
      BattleResult(enemyPokemon.name);
    } else if (enemyPokemon.hp <= 0) {
      BattleResult(myPokemon.name);
    }
  };
}

//////////////////////
//////////////////////
//////////////////////

// BOSS BATTLE

/////////////////////
/////////////////////
/////////////////////

const voltar = {
  bossBlazeleo,
  bossBlossomleaf,
  bossDuskmaw,
};

const thorn = {
  bossAquarift,
  bossLuminara,
  bossShadowfang,
};

const aurora = {
  bossGalewing,
  bossVineflare,
  bossFrostbite,
};

let fightingBoss;

function pokemonSwitch() {
  if (firstPokemonSelected && myFirstBossPokemon) {
    pokemonList.style.display = "flex";
    battleground.style.display = "none";
    selectInfo.style.display = "block";
    selectInfo.innerHTML = `CHOOSE POKEMON FOR NEXT BATTLE!`;
    pokemonShow();
    firstPokemon.onclick = () => {
      myPokemon = myPokemons.firstPokemon;
      if (fightingBoss == "voltar") {
        if (voltarFirstPokemon) {
          enemyPokemon = bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarSecondPokemon) {
          enemyPokemon = bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarThirdPokemon) {
          enemyPokemon = bossDuskmaw;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "thorn") {
        if (thornFirstPokemon) {
          enemyPokemon = bossAquarift;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornSecondPokemon) {
          enemyPokemon = bossLuminara;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornThirdPokemon) {
          enemyPokemon = bossShadowfang;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "aurora") {
        if (auroraFirstPokemon) {
          enemyPokemon = bossGalewing;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraSecondPokemon) {
          enemyPokemon = bossVineflare;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraThirdPokemon) {
          enemyPokemon = bossFrostbite;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      }
    };
  } else {
    myFirstBossPokemon = false;
  }
  if (secondPokemonSelected && mySecondBossPokemon) {
    pokemonList.style.display = "flex";
    battleground.style.display = "none";
    secondPokemon.onclick = () => {
      myPokemon = myPokemons.secondPokemon;
      if (fightingBoss == "voltar") {
        if (voltarFirstPokemon) {
          enemyPokemon = bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarSecondPokemon) {
          enemyPokemon = bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarThirdPokemon) {
          enemyPokemon = bossDuskmaw;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "thorn") {
        if (thornFirstPokemon) {
          enemyPokemon = bossAquarift;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornSecondPokemon) {
          enemyPokemon = bossLuminara;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornThirdPokemon) {
          enemyPokemon = bossShadowfang;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "aurora") {
        if (auroraFirstPokemon) {
          enemyPokemon = bossGalewing;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraSecondPokemon) {
          enemyPokemon = bossVineflare;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraThirdPokemon) {
          enemyPokemon = bossFrostbite;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      }
    };
  } else {
    mySecondBossPokemon = false;
  }
  if (thirdPokemonSelected && myThirdBossPokemon) {
    pokemonList.style.display = "flex";
    battleground.style.display = "none";
    thirdPokemon.onclick = () => {
      myPokemon = myPokemons.thirdPokemon;
      if (fightingBoss == "voltar") {
        if (voltarFirstPokemon) {
          enemyPokemon = bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarSecondPokemon) {
          enemyPokemon = bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (voltarThirdPokemon) {
          enemyPokemon = bossDuskmaw;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "thorn") {
        if (thornFirstPokemon) {
          enemyPokemon = bossAquarift;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornSecondPokemon) {
          enemyPokemon = bossLuminara;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (thornThirdPokemon) {
          enemyPokemon = bossShadowfang;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      } else if (fightingBoss == "aurora") {
        if (auroraFirstPokemon) {
          enemyPokemon = bossGalewing;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraSecondPokemon) {
          enemyPokemon = bossVineflare;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        } else if (auroraThirdPokemon) {
          enemyPokemon = bossFrostbite;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
        }
        pokemonList.style.display = "none";
        selectInfo.style.display = "none";
        battleground.style.display = "flex";
        startBossBattle();
      }
    };
  } else {
    myThirdBossPokemon = false;
  }
  if (!myFirstBossPokemon && !mySecondBossPokemon && !myThirdBossPokemon) {
    selectInfo.style.display = "none";
    bossBattleResult(enemyPokemon.name);
  }
}

function bossBattle() {
  info.style.display = "none";
  options.style.display = "block";
  back.onclick = () => {
    vancas.style.display = "block";
    battleground.style.display = "none";
    inventoryButton.style.display = "block";
    myPokemons.firstPokemon.hp = myPokemons.firstPokemon.maxHp;
    myPokemons.secondPokemon.hp = myPokemons.secondPokemon.maxHp;
    myPokemons.thirdPokemon.hp = myPokemons.thirdPokemon.maxHp;
    voltar.bossBlazeleo.hp = voltar.bossBlazeleo.maxHp;
    voltar.bossBlossomleaf.hp = voltar.bossBlossomleaf.maxHp;
    voltar.bossDuskmaw.hp = voltar.bossDuskmaw.maxHp;
    thorn.bossAquarift.hp = thorn.bossAquarift.maxHp;
    thorn.bossLuminara.hp = thorn.bossLuminara.maxHp;
    thorn.bossShadowfang.hp = thorn.bossShadowfang.maxHp;
    aurora.bossGalewing.hp = aurora.bossGalewing.maxHp;
    aurora.bossVineflare.hp = aurora.bossVineflare.maxHp;
    aurora.bossFrostbite.hp = aurora.bossFrostbite.maxHp;
    setBossBattle(false);
  };
  tackle.onclick = () => {
    if (myPokemonTurn) {
      if (enemyPokemon.hp >= 0.5 && myPokemon.hp >= 0.5) {
        enemyPokemon.hp -= myPokemon.damage;
        enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
        info.style.display = "block";
        info.innerHTML = `${myPokemon.name} USED TACKLE`;
        options.style.display = "none";
        myPokemonTurn = false;
        battleAnimation(enemyPokemonImage);
      }
      setTimeout(() => {
        clearInterval(imageInterval);
      }, 450);
      setTimeout(() => {
        bossAttack();
      }, 2000);
    }

    if (enemyPokemon.hp <= 0) {
      enemyPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    }

    if (myPokemon.hp <= 0) {
      if (myFirstBossPokemon) {
        myFirstBossPokemon = false;
        pokemonSwitch();
      } else if (mySecondBossPokemon) {
        mySecondBossPokemon = false;
        pokemonSwitch();
      } else if (myThirdBossPokemon) {
        myThirdBossPokemon = false;
        pokemonSwitch();
      } else {
        bossBattleResult(enemyPokemon.name);
      }
    } else if (enemyPokemon.hp <= 0) {
      if (fightingBoss == "voltar") {
        if (enemyPokemon == bossBlazeleo) {
          voltarFirstPokemon = false;
        } else if (enemyPokemon == bossBlossomleaf) {
          voltarSecondPokemon = false;
        } else if (enemyPokemon == bossDuskmaw) {
          voltarThirdPokemon = false;
        }
        if (voltarFirstPokemon || voltarSecondPokemon || voltarThirdPokemon) {
          pokemonSwitch();
        } else {
          setVoltarDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "thorn") {
        if (enemyPokemon == bossAquarift) {
          thornFirstPokemon = false;
        } else if (enemyPokemon == bossLuminara) {
          thornSecondPokemon = false;
        } else if (enemyPokemon == bossShadowfang) {
          thornThirdPokemon = false;
        }
        if (thornFirstPokemon || thornSecondPokemon || thornThirdPokemon) {
          pokemonSwitch();
        } else {
          setThornDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "aurora") {
        if (enemyPokemon == bossGalewing) {
          auroraFirstPokemon = false;
        } else if (enemyPokemon == bossVineflare) {
          auroraSecondPokemon = false;
        } else if (enemyPokemon == bossFrostbite) {
          auroraThirdPokemon = false;
        }
        if (auroraFirstPokemon || auroraSecondPokemon || auroraThirdPokemon) {
          pokemonSwitch();
        } else {
          setAuroraDeath(true);
          bossBattleResult(myPokemon.name);
        }
      }
    }
  };

  specialAttack.onclick = () => {
    if (myPokemonTurn) {
      let randomSpecial = Math.floor(Math.random() * 3);
      if (randomSpecial == 1) {
        if (enemyPokemon.hp >= 0.5 && myPokemon.hp >= 0.5) {
          if (myPokemon.type == "GRASS" && enemyPokemon.type == "WATER") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "GRASS" && enemyPokemon.type == "FIRE") {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "WATER" && enemyPokemon.type == "FIRE") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (
            myPokemon.type == "WATER" &&
            enemyPokemon.type == "GRASS"
          ) {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "FIRE" && enemyPokemon.type == "GRASS") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "FIRE" && enemyPokemon.type == "WATER") {
            enemyPokemon.hp -= myPokemon.damage * 0.5;
          } else if (myPokemon.type == "DARK" && enemyPokemon.type == "LIGHT") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else if (myPokemon.type == "LIGHT" && enemyPokemon.type == "DARK") {
            enemyPokemon.hp -= myPokemon.damage * 2;
          } else {
            enemyPokemon.hp -= myPokemon.damage;
          }
          enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
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
      enemyPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    }

    if (myPokemon.hp <= 0) {
      if (myFirstBossPokemon) {
        myFirstBossPokemon = false;
        pokemonSwitch();
      } else if (mySecondBossPokemon) {
        mySecondBossPokemon = false;
        pokemonSwitch();
      } else if (myThirdBossPokemon) {
        myThirdBossPokemon = false;
        pokemonSwitch();
      } else {
        bossBattleResult(enemyPokemon.name);
      }
    } else if (enemyPokemon.hp <= 0) {
      if (myFirstBossPokemon) {
        myFirstBossPokemon = false;
        pokemonSwitch();
      } else if (mySecondBossPokemon) {
        mySecondBossPokemon = false;
        pokemonSwitch();
      } else if (myThirdBossPokemon) {
        myThirdBossPokemon = false;
        pokemonSwitch();
      } else {
        bossBattleResult(enemyPokemon.name);
      }
    } else if (enemyPokemon.hp <= 0) {
      if (fightingBoss == "voltar") {
        if (enemyPokemon == bossBlazeleo) {
          voltarFirstPokemon = false;
        } else if (enemyPokemon == bossBlossomleaf) {
          voltarSecondPokemon = false;
        } else if (enemyPokemon == bossDuskmaw) {
          voltarThirdPokemon = false;
        }
        if (voltarFirstPokemon || voltarSecondPokemon || voltarThirdPokemon) {
          pokemonSwitch();
        } else {
          setVoltarDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "thorn") {
        if (enemyPokemon == bossAquarift) {
          thornFirstPokemon = false;
        } else if (enemyPokemon == bossLuminara) {
          thornSecondPokemon = false;
        } else if (enemyPokemon == bossShadowfang) {
          thornThirdPokemon = false;
        }
        if (thornFirstPokemon || thornSecondPokemon || thornThirdPokemon) {
          pokemonSwitch();
        } else {
          setThornDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "aurora") {
        if (enemyPokemon == bossGalewing) {
          auroraFirstPokemon = false;
        } else if (enemyPokemon == bossVineflare) {
          auroraSecondPokemon = false;
        } else if (enemyPokemon == bossFrostbite) {
          auroraThirdPokemon = false;
        }
        if (auroraFirstPokemon || auroraSecondPokemon || auroraThirdPokemon) {
          pokemonSwitch();
        } else {
          setAuroraDeath(true);
          bossBattleResult(myPokemon.name);
        }
      }
    }
  };
}

function bossAttack() {
  if (!myPokemonTurn) {
    let randomAttack = Math.floor(Math.random() * 5);
    if (randomAttack == 1) {
      if (myPokemon.hp >= 0.5 && enemyPokemon.hp >= 0.5) {
        if (enemyPokemon.type == "GRASS" && myPokemon.type == "WATER") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "GRASS" && myPokemon.type == "FIRE") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "WATER" && myPokemon.type == "FIRE") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "WATER" && myPokemon.type == "GRASS") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "FIRE" && myPokemon.type == "GRASS") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "FIRE" && myPokemon.type == "WATER") {
          myPokemon.hp -= enemyPokemon.damage * 0.5;
        } else if (enemyPokemon.type == "DARK" && myPokemon.type == "LIGHT") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else if (enemyPokemon.type == "LIGHT" && myPokemon.type == "DARK") {
          myPokemon.hp -= enemyPokemon.damage * 2;
        } else {
          myPokemon.hp -= enemyPokemon.damage;
        }

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
      if (myPokemon.hp >= 0.5 && enemyPokemon.hp >= 0.5) {
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
      myPokemonHp.innerHTML = `HP: 0`;
    } else {
      myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
      enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    }

    if (myPokemon.hp <= 0) {
      if (myFirstBossPokemon) {
        myFirstBossPokemon = false;
        pokemonSwitch();
      } else if (mySecondBossPokemon) {
        mySecondBossPokemon = false;
        pokemonSwitch();
      } else if (myThirdBossPokemon) {
        myThirdBossPokemon = false;
        pokemonSwitch();
      } else {
        bossBattleResult(enemyPokemon.name);
      }
    } else if (enemyPokemon.hp <= 0) {
      if (myFirstBossPokemon) {
        myFirstBossPokemon = false;
        pokemonSwitch();
      } else if (mySecondBossPokemon) {
        mySecondBossPokemon = false;
        pokemonSwitch();
      } else if (myThirdBossPokemon) {
        myThirdBossPokemon = false;
        pokemonSwitch();
      } else {
        bossBattleResult(enemyPokemon.name);
      }
    } else if (enemyPokemon.hp <= 0) {
      if (fightingBoss == "voltar") {
        if (enemyPokemon == bossBlazeleo) {
          voltarFirstPokemon = false;
        } else if (enemyPokemon == bossBlossomleaf) {
          voltarSecondPokemon = false;
        } else if (enemyPokemon == bossDuskmaw) {
          voltarThirdPokemon = false;
        }
        if (voltarFirstPokemon || voltarSecondPokemon || voltarThirdPokemon) {
          pokemonSwitch();
        } else {
          setVoltarDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "thorn") {
        if (enemyPokemon == bossAquarift) {
          thornFirstPokemon = false;
        } else if (enemyPokemon == bossLuminara) {
          thornSecondPokemon = false;
        } else if (enemyPokemon == bossShadowfang) {
          thornThirdPokemon = false;
        }
        if (thornFirstPokemon || thornSecondPokemon || thornThirdPokemon) {
          pokemonSwitch();
        } else {
          setThornDeath(true);
          bossBattleResult(myPokemon.name);
        }
      } else if (fightingBoss == "aurora") {
        if (enemyPokemon == bossGalewing) {
          auroraFirstPokemon = false;
        } else if (enemyPokemon == bossVineflare) {
          auroraSecondPokemon = false;
        } else if (enemyPokemon == bossFrostbite) {
          auroraThirdPokemon = false;
        }
        if (auroraFirstPokemon || auroraSecondPokemon || auroraThirdPokemon) {
          pokemonSwitch();
        } else {
          setAuroraDeath(true);
          bossBattleResult(myPokemon.name);
        }
      }
    }
  }
}

export function startBossBattle() {
  if (myPokemon.speed >= enemyPokemon.speed) {
    myPokemonTurn = true;
    myPokemonName.innerHTML = myPokemon.name;
    myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
    myPokemonDamage.innerHTML = `DAMAGE: ${myPokemon.damage}`;
    myPokemonSpeed.innerHTML = `SPEED: ${myPokemon.speed}`;
    myPokemonType.innerHTML = `TYPE: ${myPokemon.type}`;
    myPokemonLevel.innerHTML = `LEVEL: ${myPokemon.level}`;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    enemyPokemonDamage.innerHTML = `DAMAGE: ${enemyPokemon.damage}`;
    enemyPokemonSpeed.innerHTML = `SPEED: ${enemyPokemon.speed}`;
    enemyPokemonType.innerHTML = `TYPE: ${enemyPokemon.type}`;
    enemyPokemonLevel.innerHTML = `LEVEL: ${enemyPokemon.level}`;
    info.style.display = "block";
    info.innerHTML = `${myPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      bossBattle();
    }, 2000);
  } else {
    myPokemonTurn = false;
    myPokemonName.innerHTML = myPokemon.name;
    myPokemonHp.innerHTML = `HP: ${myPokemon.hp}`;
    myPokemonDamage.innerHTML = `DAMAGE: ${myPokemon.damage}`;
    myPokemonSpeed.innerHTML = `SPEED: ${myPokemon.speed}`;
    myPokemonLevel.innerHTML = `LEVEL: ${myPokemon.level}`;
    enemyPokemonName.innerHTML = enemyPokemon.name;
    enemyPokemonHp.innerHTML = `HP: ${enemyPokemon.hp}`;
    enemyPokemonDamage.innerHTML = `DAMAGE: ${enemyPokemon.damage}`;
    enemyPokemonSpeed.innerHTML = `SPEED: ${enemyPokemon.speed}`;
    enemyPokemonType.innerHTML = `TYPE: ${enemyPokemon.type}`;
    enemyPokemonLevel.innerHTML = `LEVEL: ${enemyPokemon.level}`;
    info.style.display = "block";
    info.innerHTML = `${enemyPokemon.name}'S ROUND`;
    options.style.display = "none";
    setTimeout(() => {
      bossAttack();
    }, 2000);
  }
}

export function selectMyBossPokemon(boss) {
  inventoryButton.style.display = "none";
  pokemonList.style.display = "flex";
  // vancas.style.display = "none";
  vancas.style.filter = "blur(10px)";
  selectInfo.style.display = "block";
  selectInfo.innerHTML = "Choose the pokemon you want to use for battle!";
  pokemonShow();
  if (voltarFirstPokemon || voltarSecondPokemon || voltarThirdPokemon) {
    voltarFirstPokemon = true;
    voltarSecondPokemon = true;
    voltarThirdPokemon = true;
    voltar.bossBlazeleo.hp = voltar.bossBlazeleo.maxHp;
    voltar.bossBlossomleaf.hp = voltar.bossBlossomleaf.maxHp;
    voltar.bossDuskmaw.hp = voltar.bossDuskmaw.maxHp;
  }
  if (thornFirstPokemon || thornSecondPokemon || thornThirdPokemon) {
    thornFirstPokemon = true;
    thornSecondPokemon = true;
    thornThirdPokemon = true;
    thorn.bossAquarift.hp = thorn.bossAquarift.maxHp;
    thorn.bossLuminara.hp = thorn.bossLuminara.maxHp;
    thorn.bossShadowfang.hp = thorn.bossShadowfang.maxHp;
  }
  if (auroraFirstPokemon || auroraSecondPokemon || auroraThirdPokemon) {
    auroraFirstPokemon = true;
    auroraSecondPokemon = true;
    auroraThirdPokemon = true;
    aurora.bossGalewing.hp = aurora.bossGalewing.maxHp;
    aurora.bossVineflare.hp = aurora.bossVineflare.maxHp;
    aurora.bossFrostbite.hp = aurora.bossFrostbite.maxHp;
  }
  firstPokemon.onclick = () => {
    if (firstPokemonSelected) {
      if (boss === voltarBoss) {
        fightingBoss = "voltar";
        if (voltarFirstPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarSecondPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarThirdPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossDuskmaw;

          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          startBossBattle();
        }
      }
      if (boss === thornBoss) {
        fightingBoss = "thorn";
        if (thornFirstPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = thorn.bossAquarift;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (thornSecondPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = thorn.bossLuminara;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (thornThirdPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = thorn.bossShadowfang;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        }
      }
      if (boss === auroraBoss) {
        fightingBoss = "aurora";
        if (auroraFirstPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = aurora.bossGalewing;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (auroraSecondPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = aurora.bossVineflare;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (auroraThirdPokemon) {
          myPokemon = myPokemons.firstPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = aurora.bossFrostbite;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        }
      }
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
      }, 2000);
    }
  };
  secondPokemon.onclick = () => {
    if (secondPokemonSelected) {
      if (boss === voltarBoss) {
        if (voltarFirstPokemon) {
          myPokemon = myPokemons.secondPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarSecondPokemon) {
          myPokemon = myPokemons.secondPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarThirdPokemon) {
          myPokemon = myPokemons.secondPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossDuskmaw;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        }
      }
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
      }, 2000);
    }
  };
  thirdPokemon.onclick = () => {
    if (thirdPokemonSelected) {
      if (boss === voltarBoss) {
        if (voltarFirstPokemon) {
          myPokemon = myPokemons.thirdPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlazeleo;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarSecondPokemon) {
          myPokemon = myPokemons.thirdPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossBlossomleaf;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        } else if (voltarThirdPokemon) {
          myPokemon = myPokemons.thirdPokemon;
          myPokemonImage.style.backgroundImage = `url('res/img/pokemons/${myPokemon.image}')`;
          battleground.style.display = "flex";
          pokemonList.style.display = "none";
          selectInfo.innerHTML = "";
          selectInfo.style.display = "none";
          enemyPokemon = voltar.bossDuskmaw;
          enemyPokemonImage.style.backgroundImage = `url('res/img/pokemons/${enemyPokemon.image}')`;
          vancas.style.display = "none";
          vancas.style.filter = "blur(0)";
          startBossBattle();
        }
      }
    } else {
      selectInfo.style.display = "block";
      selectInfo.innerHTML = "This is an empty slot!";
      setTimeout(() => {
        selectInfo.innerHTML = "";
        selectInfo.style.display = "none";
      }, 2000);
    }
  };
}

function bossBattleResult(winner) {
  setBossBattle(false);
  myPokemons.firstPokemon.hp = myPokemons.firstPokemon.maxHp;
  myPokemons.secondPokemon.hp = myPokemons.secondPokemon.maxHp;
  myPokemons.thirdPokemon.hp = myPokemons.thirdPokemon.maxHp;
  myFirstBossPokemon = true;
  mySecondBossPokemon = true;
  myThirdBossPokemon = true;
  options.style.display = "none";
  if (winner === myPokemon.name) {
    if (voltarDeath) {
      info.style.display = "block";
      info.innerHTML = "You defeated the boss!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    } else if (thornDeath) {
      info.style.display = "block";
      info.innerHTML = "You defeated the boss!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    } else if (auroraDeath) {
      info.style.display = "block";
      info.innerHTML = "You defeated the boss!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    }
  } else {
    if (!voltarDeath) {
      info.style.display = "block";
      info.innerHTML = "You lost!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    } else if (!thornDeath) {
      info.style.display = "block";
      info.innerHTML = "You lost!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    } else if (!auroraDeath) {
      info.style.display = "block";
      info.innerHTML = "You lost!";
      setTimeout(() => {
        info.innerHTML = "";
        info.style.display = "none";
        battleground.style.display = "none";
        vancas.style.display = "block";
        pokemonList.style.display = "none";
        inventoryButton.style.display = "block";
      }, 2000);
    }
  }
}
