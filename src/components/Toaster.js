import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Toaster(props){
    return(
        <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={props.property.open}
        autoHideDuration={6000}
        onClose={props.close}
        message={props.property.error}
        action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClick}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
    />
    )
}