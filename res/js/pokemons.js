// My pokemons

// let pokemons = {
//   my: {
//     blazeleo: {
//       name: "BLAZELEO",
//       damage: 1,
//       hp: 2,
//       maxHp: 2,
//       image: "Blazeleo.png",
//       type: "Fire",
//       speed: 1,
//       level: 1,
//     }
//   },
//   enemy: {
//     blazeleo: {
//       name: "eBLAZELEO",
//       damage: 1,
//       hp: 2,
//       maxHp: 2,
//       image: "Blazeleo.png",
//       type: "Fire",
//       speed: 1,
//       level: 1,
//       objName: "blazeleo"
//     }
//   }
// }

// Fire pokemons

const blazeleo = {
  name: "BLAZELEO",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Blazeleo.png",
  type: "FIRE",
  speed: 1,
  level: 1,
};

const galewing = {
  name: "GALEWING",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Galewing.png",
  type: "FIRE",
  speed: 1,
  level: 1,
};

// Water pokemons

const aquarift = {
  name: "AQUARIFT",
  damage: 1,
  hp: 2,
  maxHp: 3,
  image: "Aquarift.png",
  type: "WATER",
  speed: 1,
  level: 1,
};

const frostbite = {
  name: "FROSTBITE",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Frostbite.png",
  type: "WATER",
  speed: 1,
  level: 1,
};

// Grass Pokemons

const vineflare = {
  name: "VINEFLARE",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Vineflare.png",
  type: "GRASS",
  speed: 1,
  level: 1,
};

const blossomleaf = {
  name: "BLOSSOMLEAF",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Blossomleaf.png",
  type: "GRASS",
  speed: 1,
  level: 1,
};

// Dark pokemons

const shadowfang = {
  name: "SHADOWFANG",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Shadowfang.png",
  type: "DARK",
  speed: 1,
  level: 1,
};

const duskmaw = {
  name: "DUSKMAW",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Duskmaw.png",
  type: "DARK",
  speed: 1,
  level: 1,
};

// Light pokemons

const luminara = {
  name: "LUMINARA",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Luminara.png",
  type: "LIGHT",
  speed: 1,
  level: 1,
};

const sunspark = {
  name: "SUNSPARK",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Sunspark.png",
  type: "LIGHT",
  speed: 1,
  level: 1,
};

// Enemy pokemons

// Fire pokemons

const enemyBlazeleo = {
  name: "eBLAZELEO",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Blazeleo.png",
  type: "FIRE",
  speed: 1,
  level: 1,
};

const enemyGalewing = {
  name: "eGALEWING",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Galewing.png",
  type: "FIRE",
  speed: 1,
  level: 1,
};

// Water pokemons

const enemyAquarift = {
  name: "eAQUARIFT",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Aquarift.png",
  type: "WATER",
  speed: 1,
  level: 1,
};

const enemyFrostbite = {
  name: "eFROSTBITE",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Frostbite.png",
  type: "WATER",
  speed: 1,
  level: 1,
};

// Grass Pokemons

const enemyVineflare = {
  name: "eVINEFLARE",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Vineflare.png",
  type: "GRASS",
  speed: 1,
  level: 1,
};

const enemyBlossomleaf = {
  name: "eBLOSSOMLEAF",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Blossomleaf.png",
  type: "GRASS",
  speed: 1,
  level: 1,
};

// Dark pokemons

const enemyShadowfang = {
  name: "eSHADOWFANG",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Shadowfang.png",
  type: "DARK",
  speed: 1,
  level: 1,
};

const enemyDuskmaw = {
  name: "eDUSKMAW",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Duskmaw.png",
  type: "DARK",
  speed: 1,
  level: 1,
};

// Light pokemons

const enemyLuminara = {
  name: "eLUMINARA",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Luminara.png",
  type: "LIGHT",
  speed: 1,
  level: 1,
};

const enemySunspark = {
  name: "eSUNSPARK",
  damage: 1,
  hp: 2,
  maxHp: 2,
  image: "Sunspark.png",
  type: "LIGHT",
  speed: 1,
  level: 1,
};

const ePokemons = [
  enemySunspark,
  enemyLuminara,
  enemyDuskmaw,
  enemyShadowfang,
  enemyBlossomleaf,
  enemyVineflare,
  enemyFrostbite,
  enemyAquarift,
  enemyGalewing,
  enemyBlazeleo,
];

const myPokemonsObjects = [
  sunspark,
  luminara,
  duskmaw,
  shadowfang,
  blossomleaf,
  vineflare,
  frostbite,
  aquarift,
  galewing,
  blazeleo,
];

export {
  enemySunspark,
  enemyLuminara,
  enemyDuskmaw,
  enemyShadowfang,
  enemyBlossomleaf,
  enemyVineflare,
  enemyFrostbite,
  enemyAquarift,
  enemyGalewing,
  enemyBlazeleo,
  sunspark,
  luminara,
  duskmaw,
  shadowfang,
  blossomleaf,
  vineflare,
  frostbite,
  aquarift,
  galewing,
  blazeleo,
  ePokemons,
  myPokemonsObjects,
};
