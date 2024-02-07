import { map } from "./map.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

// Collisions

const collisionMap = [];
for (let i = 0; i < map.length; i += 40) {
  collisionMap.push(map.slice(i, 40 + i));
}

class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

}

const boundaries = [];

const offset = {
  x: -1920,
  y: -600,
};

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2) {
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



// Tall Grass

const tallGrassMap = [];
for (let i = 0; i < map.length; i += 40) {
  tallGrassMap.push(map.slice(i, 40 + i));
}

class TallGrass {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

}

const tallGrasses = [];

tallGrassMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1) {
      tallGrasses.push(
        new TallGrass({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});



// Images

window.onload = () => {
  characterImage.src = "./res/img/characters/characterDown.png";
};

const image = new Image();
image.src = "./res/img/maps/testmap.png";

const characterImage = new Image();

const foregroundImage = new Image();
foregroundImage.src = "./res/img/maps/foreground.png";

// Map Draw

class Sprite {
  constructor({
    position,
    image,
    frames = { numberOfFrames: 1, imagePosition: 0, waitingFrames: 0 },
  }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.moving = false;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frames.imagePosition * 31,
      0,
      this.image.width / this.frames.numberOfFrames,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.numberOfFrames,
      this.image.height
    );

    if (this.moving) {
      if (this.frames.numberOfFrames > 1) {
        this.frames.waitingFrames++;
      }
      if (this.frames.waitingFrames % 18 === 0) {
        if (this.frames.imagePosition < this.frames.numberOfFrames - 1) {
          this.frames.imagePosition++;
        } else {
          this.frames.imagePosition = 0;
        }
      }
    } else {
      this.frames.imagePosition = 0;
    }
  }
}

const character = new Sprite({
  image: characterImage,
  position: {
    x: canvas.width / 2 - 124 / 4 / 2,
    y: canvas.height / 2 - 38 / 2,
  },
  frames: {
    numberOfFrames: 4,
    imagePosition: 0,
    waitingFrames: 0,
  },
});

const background = new Sprite({
  position: { x: -1920, y: -600 },
  image: image,
});

const foreground = new Sprite({
  position: { x: -1920, y: -600 },
  image: foregroundImage,
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

// Drawing images

const movables = [background, ...boundaries, foreground, ...tallGrasses];

function animation() {
  window.requestAnimationFrame(animation);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw()
  })
  tallGrasses.forEach(tallGrass => {
    tallGrass.draw()
  })
  character.draw();
  foreground.draw();

  let coliding = false;

  // Moving UP

  character.moving = false;
  if (keys.w.pressed) {
    characterImage.src = "./res/img/characters/characterUp.png";
    character.moving = true;
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
    for (let i = 0; i < tallGrasses.length; i++) {
      const grasstall = tallGrasses[i];
      
      if (
        character.position.x + characterImage.width / 4 >= grasstall.position.x &&
        character.position.x <= grasstall.position.x + grasstall.width &&
        character.position.y + characterImage.height >= grasstall.position.y &&
        character.position.y <= grasstall.position.y + grasstall.height
      ) {
        console.log("funguje to")
      }
    }
    if (!coliding) {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }

    // Moving LEFT
  } else if (keys.a.pressed) {
    character.moving = true;
    characterImage.src = "./res/img/characters/characterLeft.png";
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
    for (let i = 0; i < tallGrasses.length; i++) {
      const grasstall = tallGrasses[i];
      
      if (
        character.position.x + characterImage.width / 4 >= grasstall.position.x &&
        character.position.x <= grasstall.position.x + grasstall.width &&
        character.position.y + characterImage.height >= grasstall.position.y &&
        character.position.y <= grasstall.position.y + grasstall.height
      ) {
        console.log("funguje to")
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });

    // Moving DOWN
  } else if (keys.s.pressed) {
    characterImage.src = "./res/img/characters/characterDown.png";
    character.moving = true;
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
    for (let i = 0; i < tallGrasses.length; i++) {
      const grasstall = tallGrasses[i];
      
      if (
        character.position.x + characterImage.width / 4 >= grasstall.position.x &&
        character.position.x <= grasstall.position.x + grasstall.width &&
        character.position.y + characterImage.height >= grasstall.position.y &&
        character.position.y <= grasstall.position.y + grasstall.height
      ) {
        console.log("funguje to")
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });

    // Moving RIGHT
  } else if (keys.d.pressed) {
    characterImage.src = "./res/img/characters/characterRight.png";
    character.moving = true;
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
    for (let i = 0; i < tallGrasses.length; i++) {
      const grasstall = tallGrasses[i];
      
      if (
        character.position.x + characterImage.width / 4 >= grasstall.position.x &&
        character.position.x <= grasstall.position.x + grasstall.width &&
        character.position.y + characterImage.height >= grasstall.position.y &&
        character.position.y <= grasstall.position.y + grasstall.height
      ) {
        console.log("funguje to")
      }
    }
    if (!coliding)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
  
  

}
animation();

// testing



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
