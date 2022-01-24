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

export const fakecomposedchartdata = [
  {
    "name": "d1",
    "price": 2155,
    "volume": 2400
  },
  {
    "name": "d2",
    "price": 2800,
    "volume": 2512
  },
  {
    "name": "d3",
    "price": 2500,
    "volume": 2000,
  },
  {
    "name": "d4",
    "price": 2980,
    "volume": 3208
  },
  {
    "name": "d5",
    "price": 2600,
    "volume": 3000
  },
  {
    "name": "d6",
    "price": 4090,
    "volume": 3800
  },
  {
    "name": "d7",
    "price": 5090,
    "volume": 4600
  },
];

export const fakescatterchartdata = [
  {
    "x": 200,
    "y": 260
  },
  {
    "x": 240,
    "y": 290
  },
  {
    "x": 190,
    "y": 290
  },
  {
    "x": 198,
    "y": 250
  },
  {
    "x": 180,
    "y": 280
  },
  {
    "x": 210,
    "y": 220
  },
  {
    "x": 180,
    "y": 300
  },
  {
    "x": 290,
    "y": 350
  },
  {
    "x": 140,
    "y": 370
  },
  {
    "x": 198,
    "y": 220
  },
  {
    "x": 440,
    "y": 350
  },
  {
    "x": 400,
    "y": 450
  }
];

export const fakelinechartdata = [
  {
    "name": "2016",
    "uv": 1000
  },
  {
    "name": "2017",
    "uv": 1800
  },
  {
    "name": "2018",
    "uv": 1440
  },
  {
    "name": "2019",
    "uv": 2780
  },
  {
    "name": "2020",
    "uv": 1890
  },
  {
    "name": "2021",
    "uv": 2790
  },
  {
    "name": "2022",
    "uv": 2390
  },
  {
    "name": "Page G",
    "uv": 3090
  }
]