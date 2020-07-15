import React, { useState, useEffect } from 'react';
import { Snackbar, Button, IconButton, TextField, MenuItem, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRates } from '../store/actions';
import Moment from 'react-moment';
import useStyles from './styles';

var currencies = [];
var Rates;

const ExchangeRate = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [currency, setCurrency] = React.useState('USD');
    const [convertTo, setConversion] = React.useState('TRY');
    const [amount, setAmount] = React.useState(0);
    const [convertedVal, setConverted] = React.useState(0);
    const [currUpdateDate, setDate] = useState(Date.now())

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(getAllRates())
        }, 1500)
    }, []);

    const rate = useSelector(({ rate }) => rate)

    useEffect(() => {
        if (rate && rate.rates) {
            const resp = rate.rates;
            if (rate.rates.rates) {
                const currRate = rate.rates.rates;
                var currSym = Object.keys(currRate);
                Rates = currRate

                for (var i = 0; i < currSym.length; i++) {
                    let resp = {
                        value: currSym[i],
                        label: currSym[i],
                    }
                    currencies.push(resp);
                }
            }
            setDate(resp.time_last_update_utc)
        }
        if (rate.error) {
            setOpen(true)
        }
    }, [rate]);

    useEffect(() => {
        convertAmount("sourceAmount");
    }, [amount])

    useEffect(() => {
        convertAmount("sourceAmount");
    }, [amount], [currency], [convertTo])

    const convertAmount = (current) => {
        // console.log('Rates ', Rates);
        if (Rates) {
            var curr = currency.toLowerCase();
            var convCurr = convertTo.toLowerCase();
            var currAmount = Number(amount);
            var convertedAmount = Number(convertedVal);
            var currRate, convRate, calcAmount, targetAmount;

            Object.keys(Rates).forEach((key) => {
                if (key.toLowerCase() === curr) {
                    currRate = Rates[key];
                    return Number(currRate);
                }
                if (key.toLowerCase() === convCurr) {
                    convRate = Rates[key];
                    return Number(convRate);
                }
            })
            if (current === "targetAmount") {
                console.log("target")
                calcAmount = convertedAmount / currRate;
                targetAmount = calcAmount * convRate;
                setAmount(targetAmount)
            } else {
                console.log("source")
                calcAmount = currAmount / currRate;
                targetAmount = calcAmount * convRate;
                setConverted(targetAmount)
            }
        }
    }

    return (
        <div className={classes.root}>
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
                                {currencies.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                // label="Convert To"
                                value={convertedVal}
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                onChange={(e) => { setConverted(e.target.value); convertAmount("targetAmount") }}
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
                                {currencies.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
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