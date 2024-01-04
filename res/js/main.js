const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 640;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./res/img/maps/testmap.png";

const character = new Image();
character.src = "./res/img/characters/characterDown.png";

class Sprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: { x: -1920, y: -600 },
  image: image,
});

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

function animation() {
  window.requestAnimationFrame(animation);
  background.draw();
  ctx.drawImage(
    character,
    0,
    0,
    character.width / 4,
    character.height,
    canvas.width / 2 - character.width / 4 / 2,
    canvas.height / 2 - character.height / 2,
    character.width / 4,
    character.height
  );
  if (keys.w.pressed) {
    background.position.y += 3;
  } else if (keys.a.pressed) {
    background.position.x += 3;
  } else if (keys.s.pressed) {
    background.position.y -= 3;
  } else if (keys.d.pressed) {
    background.position.x -= 3;
  }
}
animation();

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
  }
  console.log(keys);
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
  }
  console.log(keys);
});
