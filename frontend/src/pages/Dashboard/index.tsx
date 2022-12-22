import React from "react"
import classes from "./style.module.scss"
import { useAuth } from "contexts/Auth.context";

function Dashboard() {
    React.useEffect(() => {
        document.title = "Dashboard"
    }, []);

    return (
        <div className={classes.dashboardPage}>
            <h1>Welcome to the dashboard</h1>
        </div>
    )
}

export default Dashboard;
