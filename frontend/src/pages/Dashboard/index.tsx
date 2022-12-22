import React from "react"
import classes from "./style.module.scss"
import { DashboardLayout } from "layouts";

function Dashboard() {
    React.useEffect(() => {
        document.title = "Dashboard"
    }, []);

    return (
        <DashboardLayout>
            <div className={classes.dashboardPage}>
                <h1>Welcome to the dashboard</h1>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;
