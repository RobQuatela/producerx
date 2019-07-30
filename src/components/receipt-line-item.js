import React from 'react';
import { makeStyles, Icon } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '20% 40% auto 20%',
    maxHeight: 300,
    overflowY: 'auto',
    '& h5, span': {
      alignSelf: 'center',
    },
  },
  money: {
    color: '#698F3F',
  },
});

const ReceiptLineItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon>check</Icon>
      <h5>{props.item.name}</h5>
      <h5>x {props.item.quantity}</h5>
      <h5 className={classes.money}>${props.item.total.toFixed(2)}</h5>
    </div>
  )
}

export default ReceiptLineItem;