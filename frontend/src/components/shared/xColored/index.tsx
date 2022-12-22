import React from "react"
import classes from "./style.module.scss"
export default function Coloed({ children, color = 'green' }: { children: React.ReactNode, color: string }) {
    return (
        <div className={classes.colored}>
            <p className={classes.value} style={{ backgroundColor: color }}>
                {children}
            </p>
        </div>
    )
}