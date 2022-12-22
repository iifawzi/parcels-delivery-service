import React from "react"
import classes from "./style.module.scss"
import { AlertColor } from "@mui/material";
import XAlert, { xAlertI } from "components/shared/xAlert";
import { LoginBikerForm } from "components/Auth";
import { DashboardLayout } from "layouts";

function NewShipmentPage() {
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
        <DashboardLayout>
            <div className={classes.NewShipmentPage}>
                <h3>Adding a new Shipment!</h3>
                {alert.message !== '' ? <XAlert message={alert.message} severity={alert.severity as AlertColor} /> : ''}
                <div className={`${classes.animateLogin} ${classes.formContainer}`}>
                    {<LoginBikerForm setAlert={showAlert} />}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default NewShipmentPage;
