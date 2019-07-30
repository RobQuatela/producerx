export const getInitialAvailableProduceState = () => [
  {
    name: 'Apples',
    price: 1.99,
    metric: 'Apple',
    avatar: 'http://localhost:3000/images/apples.jpg',
    onHand: 30,
  },
  {
    name: 'Broccoli',
    price: 1.45,
    metric: 'lb',
    avatar: 'http://localhost:3000/images/broccoli.jpg',
    onHand: 25,
  },
  {
    name: 'Strawberries',
    price: 3.99,
    metric: 'box',
    avatar: 'http://localhost:3000/images/strawberry.jpg',
    onHand: 10,
  },
  {
    name: 'Sweet Potatoes',
    price: 0.99,
    metric: 'lb',
    avatar: 'http://localhost:3000/images/sweetpotato.jpg',
    onHand: 40,
  },
  {
    name: 'Farm Chicken',
    price: 3.99,
    metric: 'lb',
    avatar: 'http://localhost:3000/images/chicken.jpg',
    onHand: 8,
  },
  {
    name: 'Organic Eggs',
    price: 3.99,
    metric: 'carton',
    avatar: 'http://localhost:3000/images/eggs.jpg',
    onHand: 15,
  },
];

export const getInitialReceiptState = () => ({
  total: 0,
  items: [],
})