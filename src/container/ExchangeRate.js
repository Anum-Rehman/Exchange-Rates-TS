import React, { useState, useEffect } from 'react';
import { Grid, Paper, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { getRates } from '../store/actions';
import Moment from 'react-moment';
import useStyles from './styles';
import InputText from '../components/InputText'
import DropDown from '../components/Dropdown'
import Toaster from '../components/Toaster'

const ExchangeRate = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [property, setProperty] = useState({
        currencies: [],
        Rates: null,
        open: false,
        currency: 'EUR',
        convertTo: 'TRY',
        amount: 0,
        convertedVal: 0,
        currUpdateDate: Date.now(),
        error: null
    })

    // handling close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setProperty({ ...property, open: false });
    };

    // calling api on componentDidMount
    useEffect(() => {
        dispatch(getRates());
    }, []);

    // getting rate from reducer
    const rate = useSelector(({ rate }) => rate);

    // once got rates/ api called, set initials
    useEffect(() => {
        if (rate && rate.rates) {
            const { rates } = rate;
            setProperty({
                ...property,
                Rates: rates.rates,
                currencies: Object.keys(rates.rates),
                currUpdateDate: rates.time_last_update_utc
            });
        }

        if (rate.error) {
            setProperty({
                ...property,
                error: rate.error.message,
                open: true,
            });
        }
    }, [rate]);

    // on chnage amount or source currency or target current do calculation
    useEffect(() => {
        convertAmount();
    }, [property.amount, property.currency, property.convertTo]);

    // conversation calculation
    const convertAmount = () => {
        if (property.Rates) {
            var currRate, convRate, calcAmount, targetAmount;

            Object.keys(property.Rates).forEach((key) => {
                if (key.toLowerCase() === property.currency.toLowerCase()) {
                    currRate = property.Rates[key];
                    return Number(currRate);
                }
                if (key.toLowerCase() === property.convertTo.toLowerCase()) {
                    convRate = property.Rates[key];
                    return Number(convRate);
                }
                if(property.currency.toLowerCase() === property.convertTo.toLowerCase()){
                    return convRate=1;
                }
            })

            calcAmount = Number(property.amount) / currRate;
            targetAmount = parseFloat(calcAmount * convRate).toFixed(2);
            setProperty({ ...property, convertedVal: targetAmount })
        }
    }

    return (
        <Grid className={classes.root}>
            <Toaster
                property={property}
                close={handleClose}
                onClick={handleClose}
            />

            <Container>
                <Paper elevation={3} className={classes.paperStyle}>
                    <Grid container className={classes.timeContainer}>
                        <h6 className={classes.timeHead}>Last Updated Time:</h6>
                        <Moment date={property.currUpdateDate} className={classes.time} />
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputText
                                label="Amount"
                                value={property.amount}
                                Change={({ target: { value } }) => setProperty({ ...property, amount: value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DropDown
                                value={property.currency}
                                change={({ target: { value } }) => setProperty({ ...property, currency: value })}
                                text="Please select your currency"
                                list={property.currencies}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputText
                                label="Converted Amount"
                                value={property.convertedVal}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DropDown
                                value={property.convertTo}
                                change={({ target: { value } }) => setProperty({ ...property, convertTo: value })}
                                text="Select Currency to convert"
                                list={property.currencies}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Grid>
    );
}

export default ExchangeRate;