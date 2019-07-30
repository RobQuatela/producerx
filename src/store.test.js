import * as data from './data';
import * as store from './store';

beforeEach(() => {
  store.setupProduceStore(data.getInitialAvailableProduceState());
  store.setupReceiptStore(data.getInitialReceiptState());
});

describe('addToShoppingCart', () => {
  it('should add item to shopping cart', (done) => {
    // arrange
    const produceItem = {
      name: 'Sweet Potatoes',
      price: 0.99,
      metric: 'lb',
      avatar: 'http://localhost:3000/images/sweetpotato.jpg',
      onHand: 40,
    };

    // act
    store.addToShoppingCart(produceItem);

    // assert
    store.receiptItems$.subscribe(items => {
      expect(items.length).toBe(1);
      done();
    });
  });

  it('should update item quantity in receipt', (done) => {
    // arrange
    const produceItem = {
      name: 'Sweet Potatoes',
      price: 0.99,
      metric: 'lb',
      avatar: 'http://localhost:3000/images/sweetpotato.jpg',
      onHand: 40,
    };

    // act
    store.addToShoppingCart(produceItem);
    store.addToShoppingCart(produceItem);

    // assert
    store.receiptItems$.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
      done();
    });
  });
});

describe('receiptItems$', () => {
  it('should return only receipt items', (done) => {
    store.receiptItems$.subscribe(value => {
      expect(Array.isArray(value)).toBe(true);
      done();
    })
  })

  it('should return 1 items', (done) => {
    // arrange
    const produceItem = {
      name: 'Sweet Potatoes',
      price: 0.99,
      metric: 'lb',
      avatar: 'http://localhost:3000/images/sweetpotato.jpg',
      onHand: 40,
    };

    store.addToShoppingCart(produceItem);

    store.receiptItems$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0].name).toBe('Sweet Potatoes');
      done();
    });
  })
});

describe('receiptTotal$', () => {
  it('should equal 0.99', (done) => {
    // arrange
    const produceItem = {
      name: 'Sweet Potatoes',
      price: 0.99,
      metric: 'lb',
      avatar: 'http://localhost:3000/images/sweetpotato.jpg',
      onHand: 40,
    };

    // act
    store.addToShoppingCart(produceItem);

    // assert
    store.receiptTotal$.subscribe(value => {
      expect(value).toBe(0.99);
      done();
    })
  })
});

describe('availableProduce$', () => {
  it('should equal initial data', (done) => {
    store.availableProduce$.subscribe(result => {
      expect(result.length).toBe(data.getInitialAvailableProduceState().length);
      expect(result[0].name).toBe(data.getInitialAvailableProduceState()[0].name);
      done();
    });
  });

  it('should receive new decremented quantity', (done) => {
    // arrange
    const produceItem = {
      name: 'Sweet Potatoes',
      price: 0.99,
      metric: 'lb',
      avatar: 'http://localhost:3000/images/sweetpotato.jpg',
      onHand: 40,
    };

    // act
    store.addToShoppingCart(produceItem);

    // assert
    store.availableProduce$.subscribe(result => {
      const sweetpotato = result.find(x => x.name === 'Sweet Potatoes');
      expect(sweetpotato.onHand).toBe(39);
      done();
    });
  });
});
