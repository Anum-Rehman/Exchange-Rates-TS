import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect, ConnectedProps} from 'react-redux'
import { getAllRates, setAllRates } from '../store/actions/index';

const ExchangeRate = () => {
    useEffect(() => {
        // const rates = props.getRate({ FormName: '' });
      });

  return (
    <Grid>
        <h1></h1>
    </Grid>
  );
}

interface RootState {
    rates: boolean
  }

const mapState = (state: RootState) => {
    return {
        rates: state.rates,
    }
}

const mapDispatch = {
    setRate: () => ({ type: 'RATES_SET_ALL' }),
    getRate: () => ({ type: 'RATES_GET_ALL' }),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ExchangeRate)