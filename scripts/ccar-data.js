const initialFormValues = {
  price: 0,
  level: 1,
  refuel: 2,
  fix: 40,
  rarity: "classic",
  depreciation: 15,
};

const rarityInfo = [
  {
    rarity: "classic",
    depreciation: 15,
    fuel: 60,
  },
  {
    rarity: "commom",
    depreciation: 15,
    fuel: 60,
  },
  {
    rarity: "super",
    depreciation: 23,
    fuel: 75,
  },
  {
    rarity: "rare",
    depreciation: 23,
    fuel: 90,
  },
  {
    rarity: "legendary",
    depreciation: 25,
    fuel: 105,
  },
];

const avgPrizes = [
  {
    maxAge: 20,
    avg: 27.5,
  },
  {
    maxAge: 30,
    avg: 22.0,
  },
  {
    maxAge: 40,
    avg: 17.6,
  },
  {
    maxAge: 50,
    avg: 14.1,
  },
  {
    maxAge: 60,
    avg: 11.3,
  },
  {
    maxAge: 70,
    avg: 9,
  },
  {
    maxAge: 80,
    avg: 7.2,
  },
  {
    maxAge: 81,
    avg: 5.8,
  },
];
