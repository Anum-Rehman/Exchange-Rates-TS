import React, { useState, useEffect } from 'react';
import { Snackbar, Button, IconButton, TextField, MenuItem, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRates } from '../store/actions';
import useStyles from './styles';

var currencies = [];
var Rates;

const ExchangeRate = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [currency, setCurrency] = React.useState('USD');
    const [convertTo, setConversion] = React.useState('AED');
    const [value, setValue] = React.useState(0.00);
    const [convertedVal, setConverted] = React.useState(0.00);

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
    
    useSelector(({ rate }) => {
        if(rate.rates){
            const currRate = rate.rates;
            var currSym = Object.keys(currRate);
            Rates = currRate

            for(var i=0; i< currSym.length; i++){
                let resp = {
                    value: currSym[i],
                    label: currSym[i],
                }
                currencies.push(resp);
            }
            return currencies
        }
        if(rate.error){
            setOpen(true)
        }
    }
    )

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const convertAmount = () =>{
        var curr = currency.toLowerCase();
        var convCurr = convertTo.toLowerCase();
        var amount = Number(value);
        var currRate, convRate;

        Object.keys(Rates).forEach((key)=>{
            if(key.toLowerCase() == curr){
                currRate = Rates[key];
                return Number(currRate);
            }
            if(key.toLowerCase() == convCurr){
                convRate = Rates[key];
                return Number(convRate);
            }
        })
        var calcAmount = amount/currRate;
        var targetAmount = calcAmount * convRate;
        setConverted(targetAmount)
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
                        <div className="col-sm-6 col-6">
                            <TextField
                                label="Size"
                                id="outlined-size-small"
                                defaultValue="0.00"
                                variant="outlined"
                                size="small"
                                value= {value}
                                onChange={(e)=>{setValue(e.target.value); convertAmount()}}
                            />
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={currency}
                                onChange={handleChange}
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
                                label="Size"
                                value={convertedVal}
                                disabled={true}
                                id="outlined-size-small"
                                defaultValue="Small"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div className="col-sm-6 col-6">
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={convertTo}
                                onChange={(e)=>{setConversion(e.target.value); convertAmount()}}
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