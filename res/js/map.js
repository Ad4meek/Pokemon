import { collisions, tallgrass } from "./mapCoords.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Map Boundaries

const offset = {
  x: -6080,
  y: -920,
};

// const offset = {
//   x: -4700,
//   y: -700,
// };

const collisionMap = [];

for (let i = 0; i < collisions.length; i += 100) {
  collisionMap.push(collisions.slice(i, 100 + i));
}

class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const boundaries = [];

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
for (let i = 0; i < tallgrass.length; i += 100) {
  tallGrassMap.push(tallgrass.slice(i, 100 + i));
}

class TallGrass {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
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

const image = new Image();
image.src = "./res/img/maps/map.png";

const foregroundImage = new Image();
foregroundImage.src = "./res/img/maps/foreground.png";

class Sprite {
  constructor({ image, position }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: image,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: foregroundImage,
});

export { tallGrasses, boundaries, background, foreground };
