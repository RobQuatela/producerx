import React, { useState, useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import ReceiptLineItem from './receipt-line-item';
import * as store from '../store';

const useStyles = makeStyles({
  root: {
    margin: 10,
    display: 'grid',
    gridTemplateRows: '10% auto 20%',
  },
  receiptHeader: {
    padding: 20,
    //backgroundColor: '#698F3F',
    //color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptItemList: {
    padding: 30,
    fontStyle: 'italic',
  },
  receiptTotal: {
    padding: 20,
    display: 'grid',
    gridTemplateColumns: '60% auto',
    '& h1, h5': {
      alignSelf: 'center',
      justifySelf: 'end'
    },
    '& h1': {
      color: '#698F3F',
    }
  }
});
const Receipt = () => {
  const classes = useStyles();

  // local state for receipt line items
  const [receiptItems, setReceiptItems] = useState([]);

  // local state for receipt total dollar amount
  const [receiptTotal, setReceiptTotal] = useState(0);

  useEffect(() => {
    // set up subscriptions to observables
    const subscriptions = [];

    // subscription for receipt line items
    // local state receiptItems is handling the subscription to the observable to react to emitted values from observable
    subscriptions.push(store.receiptItems$.subscribe(items => setReceiptItems(items)));

    // subscription for receipt total dollar amount
    // local state receiptTotal is handling the subscription to the observable to react to emitted values from observable
    subscriptions.push(store.receiptTotal$.subscribe(total => setReceiptTotal(total)));

    // returns this method to unsubscribe from all observables when component unmounts
    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.receiptHeader}>
        <h3>ProduceRx Receipt</h3>
      </div>
      <div className={classes.receiptItemList}>
        <h5>Items Purchased</h5>
        {
          receiptItems.map(item => (
            <ReceiptLineItem
              item={{ name: item.name, quantity: item.quantity, total: item.price * item.quantity }}
              key={item.name}
            />
          ))
        }
      </div>
      <div className={classes.receiptTotal}>
        <h5>Total:</h5>
        <h1>${receiptTotal.toFixed(2)}</h1>
      </div>
    </Paper>
  )
}

export default Receipt;