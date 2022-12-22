import React from 'react';
import { FieldValues, UseFormRegister, RegisterOptions } from "react-hook-form";
import classes from "./style.module.scss"
import { lowerNoSpace } from 'helpers';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface componentProps {
    register: UseFormRegister<FieldValues>
    label: string
    type: string
    iconComponent?: React.ReactNode
    required?: boolean,
    rules?: RegisterOptions, // will be used for all other rules than required
    value?: string,
    placeHolder?: string
}

function XInput({ register, iconComponent, label, type, required, rules, value, placeHolder }: componentProps) {
    const [showPassowrd, changeShowPassowrd] = React.useState(false);

    // Don't changes onMouseDown
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // Hide/Show the password
    const handleClickShowPassword = () => {
        changeShowPassowrd(!showPassowrd);
    };

    /** 
    ***************
    Adornment Functions: 
    The icons that will be shown in the end and the start of the inputs
    ***************
    */

    // Show the visibility toggle button only if the type is password, in the end of the input.
    const endAdornment = () => {
        if (type === 'password') {
            return (
                <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassowrd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            )
        }
    }
    // Show an startadornment if the iconComponent is passed: 
    const startAdornment = () => {
        if (iconComponent) {
            return (
                <InputAdornment position="start">
                    <IconButton>
                        {iconComponent}
                    </IconButton>
                </InputAdornment>
            )
        }
    }
    /** 
    ***************
    End Of Adornment Functions: 
    ***************
    */

    return (
        <TextField id={`${label}-input`}
            label={label}
            value={value}
            placeholder={placeHolder}
            // The and operator added here, since not all inputs are passowrd
            // if it's not passowrd, so it will always be `type`, if passowrd and showPassowrd is true
            type={showPassowrd && type === 'password' ? 'text' : type}
            variant="outlined"
            fullWidth
            // Will be propagated to the inner <input> element. 
            // Ref: https://material-ui.com/api/text-field/#textfield-api
            inputProps={{
                // see lowerNoSpace function for more info
                // for example: First Name input, will be registered as firstName
                ...register(lowerNoSpace(label), { required, ...rules })
            }}
            // Will be appliad on the Material UI component (the whole container)
            // Ref: https://material-ui.com/api/text-field/#textfield-api
            InputProps={{
                classes: {
                    input: classes.input,
                    notchedOutline: classes.notchedStyle
                },
                endAdornment: endAdornment(),
                startAdornment: startAdornment()
            }}
            // Will be appliad on the label of the whole container
            // Ref: https://material-ui.com/api/text-field/#textfield-api
            InputLabelProps={{
                className: classes.label
            }}
        />
    )
}


export default XInput