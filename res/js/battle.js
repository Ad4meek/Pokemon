const canvas = document.getElementById("vancas");
const battleground = document.getElementById("battleground");
const back = document.getElementById("back");
const tackle = document.getElementById("tackle");
const specialAttack = document.getElementById("specialAttack");
const enemyPokemonHp = document.getElementById("enemyPokemonHp");
const myPokemonHp = document.getElementById("myPokemonHp");

let myHp = 20;
let enemyHp = 20;
let random;

console.log(pepa);
console.log(battleStart);



function battle() {
  random = Math.floor(Math.random() * 10);
  console.log(random)
  if (random == 1) {
    canvas.style.display = "none";
    battleground.style.display = "block";
    let myHp = 20;
    let enemyHp = 20;
    myPokemonHp.innerHTML = `${myHp} HP`;
    enemyPokemonHp.innerHTML = `${enemyHp} HP`;
    interval = setInterval(() => {
      myHp -= 1;
      myPokemonHp.innerHTML = `${myHp} HP`;
      if (myHp <= 0) {
        clearInterval(interval);
        
      }
    }, 200);
  }
}

back.onclick = () => {
  canvas.style.display = "block";
  battleground.style.display = "none";
};

tackle.onclick = () => {
  if (enemyHp >= 1) {
    enemyHp -= 1;
    enemyPokemonHp.innerHTML = `${enemyHp} HP`;
  } else {
    console.log("mrtvej")
  }
}
