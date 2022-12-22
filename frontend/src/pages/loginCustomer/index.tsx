import React from "react"
import classes from "./style.module.scss"
import { LoginCustomerForm } from "components/Auth"
import { XAlert } from "components/shared"
import { xAlertI } from "components/shared/xAlert";
import { AlertColor } from "@mui/material";

function LoginCustomerPage() {
    const [alert, setAlert] = React.useState({ message: '', severity: 'error' });

    React.useEffect(() => {
        document.title = "Authenticate - Register"
    }, []);

    const showAlert = (alert: xAlertI) => {
        setAlert({ message: '', severity: '' })
        setTimeout(() => {
            setAlert(alert)
        }, 0);
    }

    return (
        <div className={classes.LoginCustomerPage}>
            <h3>Welcome Customer!</h3>
            {alert.message !== '' ? (<XAlert message={alert.message} severity={alert.severity as AlertColor} />) : ''}
            <div className={`${classes.animateLogin} ${classes.formContainer}`}>
                {<LoginCustomerForm setAlert={showAlert} />}
            </div>
        </div>
    )
}

export default LoginCustomerPage;
