import React from "react"
import classes from "./style.module.scss"
import { Link } from "react-router-dom";

function Home() {
    React.useEffect(() => {
        document.title = "Welcome Page"
    }, []);

    return (
        <div className={classes.homePage}>
            <h1>Parcels Management System</h1>
            <p className={classes.authLink}>
                <Link to="auth/biker">Let's authenticate</Link>
            </p>
        </div>
    )
}

export default Home;
