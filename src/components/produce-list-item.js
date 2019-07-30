import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as store from '../store';



const ProduceListItem = (props) => {
  const useStyles = makeStyles({
    root: {
      margin: 10,
      width: 250,
      backgroundColor: props.produce.onHand > 0 ? '#fff' : '#e0e0e0'
    },
    media: {
      height: 100,
    },
    actionArea: {
      background: '#698F3F'
    },
    primaryColorButton: {
      color: '#fff',
    }
  });
  
  const classes = useStyles();

  const handleAddToCartClick = (value) => store.addToShoppingCart(value);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.produce.avatar}
          title={props.produce.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h3'>
            {props.produce.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.produce.price} per {props.produce.metric}
          </Typography>
          <Typography variant='body2' color='textPrimary' component='p'>
            On hand: {props.produce.onHand}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        classes={{ root: classes.actionArea }}  
      >
        <Button 
          size='small' 
          color='primary'
          onClick={() => handleAddToCartClick(props.produce)}
          classes={{ textPrimary: classes.primaryColorButton }}
          disabled={props.produce.onHand <= 0}
        >
          Add to Cart
          </Button>
      </CardActions>
    </Card>
  )
}

export default ProduceListItem;