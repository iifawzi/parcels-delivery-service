import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface componentProps {
    description: string,
    value: string,
    title: string,
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    handleAgree: (setOpen: any) => any
}

export default function AlertDialog({ handleAgree, description, value, title = 'Alert', color = 'success' }: componentProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button style={{ fontSize: '1rem' }} variant="contained" color={color} onClick={handleClickOpen}>
                {value}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ fontSize: '1.4rem' }} id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: '1.4rem' }} id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: '1.2rem' }} onClick={handleClose}>Disagree</Button>
                    <Button style={{ fontSize: '1.2rem' }} onClick={handleAgree(setOpen)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}