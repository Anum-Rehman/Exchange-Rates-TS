import React, { useState, useEffect, useRef } from 'react';
import { Grid, Snackbar, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { connect} from 'react-redux'
import { getAllRates } from '../store/actions';

const ExchangeRate = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    useEffect(() => {
        console.log(props,"props")
        if(props.error){
            setOpen(true);
            return 
        }

        if(props.rates){
            const rates = props.rates
            console.log(rates, "rates")
            return rates;
        }
        props.getAllRates();
      });

  return (
    <Grid>
         <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        <h1></h1>
    </Grid>
  );
}

const mapStateToProps = (state) => {
    return {
        rates: state.rates,
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAllRates: () => dispatch(getAllRates()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);