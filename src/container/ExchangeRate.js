import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect} from 'react-redux'
import { getAllRates } from '../store/actions';

const ExchangeRate = (props) => {
    useEffect(() => {
        const rates = props.getAllRates();
        console.log(rates, "rates")
        return rates;
      });

  return (
    <Grid>
        <h1></h1>
    </Grid>
  );
}

const mapStateToProps = (state) => {
    return {
        rates: state.rates,
        // error: state.rateReducer.error,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getAllRates: () => dispatch(getAllRates()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);