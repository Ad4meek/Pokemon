const canvas = document.getElementById("vancas");
const battleground = document.getElementById("battleground");
const back = document.getElementById("back");

let random;

function battle() {
  random = Math.floor(Math.random() * 1000);
  if (random == 1) {
    canvas.style.display = "none";
    battleground.style.display = "block";
  }
}

back.onclick = () => {
  canvas.style.display = "block";
  battleground.style.display = "none";
};
