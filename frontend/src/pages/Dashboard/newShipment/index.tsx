import React from "react"
import classes from "./style.module.scss"
import { AlertColor } from "@mui/material";
import XAlert, { xAlertI } from "components/shared/xAlert";
import { DashboardLayout } from "layouts";
import { NewShipmentForm } from "components/Dashboard";

function NewShipmentPage() {
    const [alert, setAlert] = React.useState({ message: '', severity: 'error' });
    React.useEffect(() => {
        document.title = "Customer - New Shipment"
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
                    {<NewShipmentForm setAlert={showAlert} />}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default NewShipmentPage;
