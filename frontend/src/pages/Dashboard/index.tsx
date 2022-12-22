import React from "react"
import classes from "./style.module.scss"
import { DashboardLayout } from "layouts";
import { useAuth } from "contexts/Auth.context";
import { UserInfoI } from "types/auth/context.types";
import { BikerShipments, CustomerShipments } from "components/Dashboard";

function Dashboard() {
    const { state } = useAuth();
    const userInfo = state.user as UserInfoI;
    React.useEffect(() => {
        document.title = "Dashboard - Home"
    }, []);

    return (
        <DashboardLayout>
            <div className={classes.dashboardPage}>
                {userInfo.role === 'biker' ? <BikerShipments /> : <CustomerShipments />}
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;
