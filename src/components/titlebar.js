import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#804E49',
    color: 'white',
  },
});

const Titlebar = () => {
  const classes = useStyles();
  return (
    <AppBar
      color='primary'
      position='static'
      classes={{ colorPrimary: classes.root }}
    >
      <Toolbar>
        <Typography variant='h5'>ProduceRx</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Titlebar;