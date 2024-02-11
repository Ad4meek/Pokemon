const canvas = document.getElementById("vancas");
const battleground = document.getElementById("battleground");

let random;

function battle() {
    random = Math.floor(Math.random() * 1000) 
    if (random == 1) {
        canvas.style.display = "none";
        battleground.style.display = "block"
    }
    console.log(random)
}