import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

const DropDown = (props) => {
    const { list } = props;
    return (
        <TextField
                                id="standard-select-currency"
                                select
                                value={props.value}
                                onChange={props.change}
                                helperText={props.text}
                            >
                                {list.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
    )
}

export default DropDown;