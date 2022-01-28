export enum TOKENS {
  Black = 0,
  Blue = 1,
  Green = 2,
  Red = 3,
}
export const TOKEN_LENGTH = Object.keys(TOKENS).length / 2;
export const TOKEN_IDS = Object.values(TOKENS).slice(
  TOKEN_LENGTH,
  TOKEN_LENGTH * 2,
);
export const imageUris = [
  "QmTTz2Yr2Z59stC69MNhB49Xdg3vBMiLuf8LRNz8QrHZXg", // black
  "QmNwxhPo8pzbuvxtsCEyRKYeUy8wndokntS6rX7NH3QjvU", // blue
  "QmSEkhUUcn4JWe3WUdvW7FQJh9zk9B17Y3zdo8iEJANxMy", // green
  "QmdhH4rENFsVpqHVQPKdqG5x8LRSeRwRQEegobvUrgciMi", // red
];

export const MINT_PRICE = 0.01; // in ether
export const ETH_PRICE = 2500; // in USD

export const fakecards = [
  {
    collectionId: 0,
    isTradeable: true,
    imageUrl:
      "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
    name: "Marcolian Parallel Collectible Card Back",
    value: "1 ETH",
    pnl: "1 ETH",
  },
  {
    collectionId: 1,
    isTradeable: true,
    imageUrl:
      "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
    name: "abcd",
    value: "2 ETH",
    pnl: "2 ETH",
  },
  {
    collectionId: 1,
    isTradeable: false,
    imageUrl:
      "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
    name: "efgh",
    value: "3 ETH",
    pnl: "3 ETH",
  },
  {
    collectionId: 2,
    isTradeable: true,
    imageUrl:
      "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
    name: "ijkl",
    value: "4 ETH",
    pnl: "4 ETH",
  },
  {
    collectionId: 2,
    isTradeable: false,
    imageUrl:
      "https://storage.googleapis.com/prod.static-assets.parallelnft.com/card-art/Marcolian_Orb_Se-1.gif",
    name: "mnop",
    value: "5 ETH",
    pnl: "5 ETH",
  },
];

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
