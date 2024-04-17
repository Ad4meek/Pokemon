let battleStart = false;
let inventoryShow = false;
let bossBattles = false;

function setBattleStart(value) {
  battleStart = value;
}

function setInventoryShow(value) {
  inventoryShow = value;
}

function setBossBattle(value) {
  bossBattles = value;
}

export { battleStart, inventoryShow, bossBattles , setBattleStart, setInventoryShow, setBossBattle };
