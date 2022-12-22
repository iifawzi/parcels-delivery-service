import React from "react"
import classes from "./style.module.scss"
import { AlertColor } from "@mui/material";
import XAlert, { xAlertI } from "components/shared/xAlert";
import { LoginBikerForm } from "components/Auth";

function LoginBikerPage() {
    const [alert, setAlert] = React.useState({ message: '', severity: 'error' });
    React.useEffect(() => {
        document.title = "Bikers - Login"
    }, []);


    const showAlert = (alert: xAlertI) => {
        setAlert({ message: '', severity: '' });
        setTimeout(() => {
            setAlert(alert)
        }, 0);
    }

    return (
        <div className={classes.LoginBikerPage}>
            <h3>Welcome back biker!</h3>
            {alert.message !== '' ? <XAlert message={alert.message} severity={alert.severity as AlertColor} /> : ''}
            <div className={`${classes.animateLogin} ${classes.formContainer}`}>
                {<LoginBikerForm setAlert={showAlert} />}
            </div>
        </div>
    )
}

export default LoginBikerPage;
