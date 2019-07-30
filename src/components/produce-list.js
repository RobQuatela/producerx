import React, { useState, useEffect } from 'react';
import * as store from '../store';
import { makeStyles } from '@material-ui/core';
import ProduceListItem from './produce-list-item';

const useStyles = makeStyles({
  root: {
    //margin: 60,
    display: 'flex',
    flexWrap: 'wrap'
  },
});
const ProduceList = () => {
  const classes = useStyles();
  const [availableProduce, setAvailableProduce] = useState([]);

  useEffect(() => {
    const subscription = store.availableProduce$.subscribe(produce => {
      setAvailableProduce(produce);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={classes.root}>
      {
        availableProduce.map(produce => 
          <ProduceListItem 
            key={produce.name} 
            produce={produce}
          />
        )
      }
    </div>
  );
};

export default ProduceList;