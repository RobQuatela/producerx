import React from 'react';
import Titlebar from './components/titlebar';
import { makeStyles, Container } from '@material-ui/core';
import ProduceList from './components/produce-list';
import Receipt from './components/receipt';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '70% auto',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Titlebar />
      <Container className={classes.root}>
        <ProduceList />
        <Receipt />
      </Container>
    </div>
  );
}

export default App;
