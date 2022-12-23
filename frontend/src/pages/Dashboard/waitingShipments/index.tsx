import React from "react"
import classes from "./style.module.scss"
import { DashboardLayout } from "layouts";
import { WaitingShipments } from "components/Dashboard";

function WaitingShipmentsPage() {
    React.useEffect(() => {
        document.title = "Biker - Waiting Shipments"
    }, []);

    return (
        <DashboardLayout>
            <div className={classes.waitingShipmentsPage}>
                <WaitingShipments />
            </div>
        </DashboardLayout>
    )
}

export default WaitingShipmentsPage;
