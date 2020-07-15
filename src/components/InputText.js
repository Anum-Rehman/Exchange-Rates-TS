import React from 'react';
import { TextField } from '@material-ui/core';

const InputText = (props) => {
    return (
        <TextField
            label={props.label}
            id="outlined-size-small"
            variant="outlined"
            size="small"
            value={props.value}
            onChange={props.Change}
            disabled={props.disabled}
        />
    )
}

export default InputText;