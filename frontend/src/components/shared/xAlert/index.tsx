import classes from "./style.module.scss"
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface xAlertI {
    message: string,
    severity: AlertColor
}

export default function XAlert({ message, severity }: xAlertI) {
    // Ref: https://material-ui.com/components/snackbars/#snackbar
    const [open, setOpen] = React.useState(false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        if (message !== '') {
            setOpen(true);
        }
    }, [message])

    return (
        <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
               
                >
                    {message}
                </Alert>
            </Snackbar>
        </div >
    );
}