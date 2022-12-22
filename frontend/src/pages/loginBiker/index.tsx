import React from "react"
import classes from "./style.module.scss"

function LoginBikerPage() {
    React.useEffect(() => {
        document.title = "Bikers - Login"
    }, []);

    return (
        <div className={classes.loginBikerPage}>
            <h3>Welcome back bikers!</h3>
        </div>
    )
}

export default LoginBikerPage;
