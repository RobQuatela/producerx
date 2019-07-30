import { BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import * as data from './data';

// we keep our behavior subjects private. this allows us to only allow certain
// actions to push a new value into the behavior subjects
const availableProduceSubject = new BehaviorSubject(data.getInitialAvailableProduceState());
const receiptSubject = new BehaviorSubject(data.getInitialReceiptState());

// we publically expose the observable portion of the behavior subjects
// these are not mutating state, just fetching current last value of the behavior subject
// to subscribers
export const availableProduce$ = availableProduceSubject.asObservable();
export const receipt$ = receiptSubject.asObservable();
export const receiptItems$ = receipt$
  .pipe(
    map(receipt => receipt.items),
  );
export const receiptTotal$ = receipt$
  .pipe(
    map(receipt => receipt.total),
  );

// initialize behavior subject for testing
export const setupReceiptStore = (data) => receiptSubject.next(data);
export const setupProduceStore = (data) => availableProduceSubject.next(data);

// we publically display this method as a way to track our actions against app state
// this is important to create predictability within our application state
export const addToShoppingCart = (produceItem) => {
  let currentItemsOnReceipt = [...receiptSubject.value.items];
  let currentReceiptTotal = receiptSubject.value.total;
  const currentAvailableProduce = [...availableProduceSubject.value];

  // if produce is available, add item to receipt and get new total
  if (isProduceAvailable(currentAvailableProduce, produceItem)) {
    // add item to list of items on receipt
    currentItemsOnReceipt = addItemToReceipt(produceItem, currentItemsOnReceipt);

    // get new receipt total
    currentReceiptTotal = currentItemsOnReceipt.map(item => item.price * item.quantity).reduce((item1, item2) => item1 + item2);

    // push new item to behavior subject
    receiptSubject.next({
      total: currentReceiptTotal,
      items: currentItemsOnReceipt,
    });

    // push new item to available produce behavior subject
    availableProduceSubject.next(lowerQuantityOnAvailableProduceItem(produceItem, currentAvailableProduce));
  }
}

const addItemToReceipt = (item, receiptList) => {
  const index = receiptList.findIndex(x => x.name === item.name);

  // check to see if item is on receipt, if so, increment quantity
  // if not, add as new item
  if (index > -1) {
    receiptList[index].quantity++;
  } else {
    receiptList.push({
      name: item.name,
      price: item.price,
      quantity: 1,
    })
  }

  return receiptList;
}

const isProduceAvailable = (availableProduce, item) => {
  const index = availableProduce.findIndex(produce => produce.name === item.name);

  return availableProduce[index].onHand > 0
}

const lowerQuantityOnAvailableProduceItem = (item, availableProduce) => {
  const index = availableProduce.findIndex(produce => produce.name === item.name);

  availableProduce[index].onHand--;

  return availableProduce;
}