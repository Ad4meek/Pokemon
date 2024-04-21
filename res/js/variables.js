let battleStart = false;
let inventoryShow = false;
let bossBattles = false;
let voltarDeath = false;
let thornDeath = false;
let auroraDeath = false;

function setBattleStart(value) {
  battleStart = value;
}

function setInventoryShow(value) {
  inventoryShow = value;
}

function setBossBattle(value) {
  bossBattles = value;
}

function setVoltarDeath(value) {
  voltarDeath = value;
}

export { battleStart, inventoryShow, bossBattles, voltarDeath,  setBattleStart, setInventoryShow, setBossBattle, setVoltarDeath };
