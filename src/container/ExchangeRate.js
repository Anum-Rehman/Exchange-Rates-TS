import React, { useState, useEffect } from 'react';
import { Snackbar, Button, IconButton, TextField, MenuItem, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRates } from '../store/actions';
import Moment from 'react-moment';
import useStyles from './styles';

const ExchangeRate = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [currencies, setCurrencies] = useState([]);
    const [Rates, setRates] = useState(null);
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [convertTo, setConversion] = useState('PKR');
    const [amount, setAmount] = useState(0);
    const [convertedVal, setConverted] = useState(0);
    const [currUpdateDate, setDate] = useState(Date.now())
    const [error, setError] = useState('')

    // handling close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // calling api on componentDidMount
    useEffect(() => {
        dispatch(getAllRates());
    }, []);

    // getting rate from reducer
    const rate = useSelector(({ rate }) => rate);

    // once got rates/ api called, set initials
    useEffect(() => {
        if (rate && rate.rates) {
            const { rates } = rate;
            setRates(rates.rates);
            setCurrencies(Object.keys(rates.rates));
            setDate(rates.time_last_update_utc)
        }
        if (rate.error) {
            setError(rate.error.message)
            setOpen(true)
        }
    }, [rate]);

    // on chnage amount or source currency or target current do calculation
    useEffect(() => {
        convertAmount("sourceAmount");
    }, [amount, currency, convertTo]);

    // conversation calculation
    const convertAmount = (current) => {
        if (Rates) {
            var currRate, convRate, calcAmount, targetAmount;

            Object.keys(Rates).forEach((key) => {
                if (key.toLowerCase() === currency.toLowerCase()) {
                    currRate = Rates[key];
                    return Number(currRate);
                }
                if (key.toLowerCase() === convertTo.toLowerCase()) {
                    convRate = Rates[key];
                    return Number(convRate);
                }
            })
            if (current === "targetAmount") {
                calcAmount = Number(convertedVal) / currRate;
                targetAmount = calcAmount * convRate;
                setAmount(targetAmount)
            } else {
                calcAmount = Number(amount) / currRate;
                targetAmount = calcAmount * convRate;
                setConverted(targetAmount)
            }
        }
    }

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={error}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <div className="container">
                <Paper elevation={3} className={classes.paperStyle}>
                    <div className="row">
                        <div className="col-sm-12 col-12">
                            <h6 className={classes.timeHead}>Last Updated Time:</h6>
                            <Moment date={currUpdateDate} className={classes.time} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-6 col-6">
                            <TextField
                                label="Amount"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                value={amount}
                                onChange={({ target: { value } }) => setAmount(value)}
                            />
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                id="standard-select-currency"
                                select
                                value={currency}
                                // onChange={handleChange}
                                onChange={({ target: { value } }) => setCurrency(value)}
                                helperText="Please select your currency"
                            >
                                {currencies.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                value={convertedVal}
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                id="standard-select-currency"
                                select
                                value={convertTo}
                                onChange={(e) => { setConversion(e.target.value); convertAmount() }}
                                helperText="Please select your currency"
                            >
                                {currencies.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ExchangeRate;