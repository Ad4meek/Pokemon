import { collisions, tallgrass, door } from "./mapCoords.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const offset = {
  x: -5080,
  y: -920,
};

// Collisions

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

// Bosses

const thaddeusMap = [];

for (let i = 0; i < door.length; i += 100) {
  thaddeusMap.push(door.slice(i, 100 + i));
}

class Thaddeus {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const thaddeusBoss = [];

doorMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 5) {
      thaddeusBoss.push(
        new Thaddeus({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

// Bosses

const azraelMap = [];

for (let i = 0; i < door.length; i += 100) {
  azraelMap.push(door.slice(i, 100 + i));
}

class Azrael {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const azraelBoss = [];

azraelBoss.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3) {
      doors.push(
        new Azrael({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

// Bosses

const isoldeMap = [];

for (let i = 0; i < door.length; i += 100) {
  isoldeMap.push(door.slice(i, 100 + i));
}

class Isolde {
  constructor({ position }) {
    this.position = position;
    this.width = 80;
    this.height = 80;
  }
}

const isoldeBoss = [];

isoldeBoss.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 4) {
      doors.push(
        new Isolde({
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

export { tallGrasses, boundaries, background, foreground, doors };
