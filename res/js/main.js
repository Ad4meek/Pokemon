const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 640;

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

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];

const offset = {
  x: -1920,
  y: -600,
};

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 92) {
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

const image = new Image();
image.src = "./res/img/maps/testmap.png";

const characterImage = new Image();
characterImage.src = "./res/img/characters/characterDown.png";

class Sprite {
  constructor({ position, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const character = new Sprite({
  image: characterImage,
  position: {
    x: canvas.width / 2 - 124 / 4 / 2,
    y: canvas.height / 2 - 38 / 2,
  },
  frames: {
    max: 4,
  },
});

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
coliding = false;
// Drawing images

const movables = [background, ...boundaries];

function animation() {
  window.requestAnimationFrame(animation);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  character.draw();
  let coliding = false;

  // Moving UP

  if (keys.w.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        character.position.x + characterImage.width / 4 >=
          boundary.position.x &&
        character.position.x <= boundary.position.x + boundary.width &&
        character.position.y + characterImage.height >=
          boundary.position.y + 3 &&
        character.position.y <= boundary.position.y + boundary.height + 3
      ) {
        coliding = true;
        break;
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });

    // Moving LEFT
  } else if (keys.a.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        character.position.x + characterImage.width / 4 >=
          boundary.position.x + 3 &&
        character.position.x <= boundary.position.x + boundary.width + 3 &&
        character.position.y + characterImage.height >= boundary.position.y &&
        character.position.y <= boundary.position.y + boundary.height
      ) {
        coliding = true;
        break;
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });

    // Moving DOWN
  } else if (keys.s.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        character.position.x + characterImage.width / 4 >=
          boundary.position.x &&
        character.position.x <= boundary.position.x + boundary.width &&
        character.position.y + characterImage.height >=
          boundary.position.y - 3 &&
        character.position.y <= boundary.position.y + boundary.height - 3
      ) {
        coliding = true;
        break;
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });

    // Moving RIGHT
  } else if (keys.d.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        character.position.x + characterImage.width / 4 >=
          boundary.position.x - 3 &&
        character.position.x <= boundary.position.x + boundary.width - 3 &&
        character.position.y + characterImage.height >= boundary.position.y &&
        character.position.y <= boundary.position.y + boundary.height
      ) {
        coliding = true;
        break;
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
animation();

// Movement

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
});
