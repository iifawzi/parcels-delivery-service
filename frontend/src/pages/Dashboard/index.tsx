import React from "react"
import classes from "./style.module.scss"
import { DashboardLayout } from "layouts";

function Dashboard() {
    React.useEffect(() => {
        document.title = "Dashboard - Home"
    }, []);

    return (
        <DashboardLayout>
            <div className={classes.dashboardPage}>
                <h3>Welcome to your dashboard!</h3>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;
