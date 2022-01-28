export enum WENTOKEN {
  Black = 0,
  Blue = 1,
  Green = 2,
  Red = 3,
}

export enum NOWTOKEN {
  Red = 0,
  Blue = 1,
  Green = 2,
  Pink = 3,
  Yellow = 4,
  Orange = 5,
}

export const WENTOKEN_LENGTH = Object.keys(WENTOKEN).length / 2;
export const WENTOKEN_IDS = Object.values(WENTOKEN).slice(
  WENTOKEN_LENGTH,
  WENTOKEN_LENGTH * 2,
);
export const NOWTOKEN_LENGTH = Object.keys(NOWTOKEN).length / 2;
export const NOWTOKEN_IDS = Object.values(NOWTOKEN).slice(
  NOWTOKEN_LENGTH,
  NOWTOKEN_LENGTH * 2,
);
export const wentokenImages = [
  "QmTTz2Yr2Z59stC69MNhB49Xdg3vBMiLuf8LRNz8QrHZXg", // black
  "QmNwxhPo8pzbuvxtsCEyRKYeUy8wndokntS6rX7NH3QjvU", // blue
  "QmSEkhUUcn4JWe3WUdvW7FQJh9zk9B17Y3zdo8iEJANxMy", // green
  "QmdhH4rENFsVpqHVQPKdqG5x8LRSeRwRQEegobvUrgciMi", // red
];

export const nowtokenImages = [
  "QmTb8H42bQ3x375FJrUhdzjMZGSyC2zBH66wXSbCPvGQiz",
  "QmRQhMv2JTueManottZaBpzedLzPwm5QJpcfc92tp2mNVQ",
  "QmTqSTid2ZZmw3uPqLnFbLBSFQTAuhbMhH5vBfsYyPk7SJ",
  "QmbfMNt9jXbgKPQ3C5KifshEnn6F8UFJcoiKcJ3zxRmU8e",
  "Qmcx4dGVNF4d51GVxwtuBcBct11EL9bUJYZuC5ni8VreYb",
  "QmaTYsnoqPXFC4HFiDatrHoNBFyYGdCM6mKcw9u1pNUcsJ",
];

export const MINT_PRICE = 0.01; // in ether
export const ETH_PRICE = 2500; // in USD

export const composedChartData = [
  {
    name: "-7d",
    price: 2155,
    volume: 2400,
  },
  {
    name: "-6d",
    price: 2800,
    volume: 2512,
  },
  {
    name: "-5d",
    price: 2500,
    volume: 2000,
  },
  {
    name: "-4d",
    price: 2980,
    volume: 3208,
  },
  {
    name: "-3d",
    price: 2600,
    volume: 3000,
  },
  {
    name: "-2d",
    price: 4090,
    volume: 3800,
  },
  {
    name: "-1d",
    price: 5090,
    volume: 4600,
  },
];

export const scatterChartData = [
  {
    buy: 168,
    sell: 250,
  },
  {
    buy: 190,
    sell: 290,
  },
  {
    buy: 200,
    sell: 260,
  },
  {
    buy: 240,
    sell: 290,
  },

  {
    buy: 250,
    sell: 280,
  },
  {
    buy: 310,
    sell: 220,
  },
  {
    buy: 400,
    sell: 300,
  },
  {
    buy: 340,
    sell: 350,
  },
  {
    buy: 250,
    sell: 370,
  },
  {
    buy: 438,
    sell: 220,
  },
  {
    buy: 440,
    sell: 350,
  },
  {
    buy: 500,
    sell: 450,
  },
];

export const lineChartData = [
  {
    name: "-7d",
    holders: 1200,
  },
  {
    name: "-6d",
    holders: 1400,
  },
  {
    name: "-5d",
    holders: 1440,
  },
  {
    name: "-4d",
    holders: 2580,
  },
  {
    name: "-3d",
    holders: 2200,
  },
  {
    name: "-2d",
    holders: 2790,
  },
  {
    name: "-1d",
    holders: 2390,
  },
];
