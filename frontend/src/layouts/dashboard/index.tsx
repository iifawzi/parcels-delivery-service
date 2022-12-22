import React, { useState } from "react"
import classes from "./style.module.scss"
import { Navbar, Sidebar } from "components/shared";
interface componentProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: componentProps) => {
    const [open, setOpen] = useState(false);
    const [animateClass, setClass] = useState('animateShow');
    const [shownBefore, setShownBefore] = useState(false);
    // Show Menu functionality: 
    const toggleMenu = () => {
        // if open is false, it means that we need to set the animation to `animateShow` to prepare for showing the drop down. 
        // if open is true, it means that we need to set the animation to `anamiteHide` to prepare for hiding the drop down. 
        if (!open) {
            setClass('animateShow')
        } else {
            setClass('animateHide')
        }
        setTimeout(() => {
            setOpen(!open)
        }, 100);
        // ShownBefore is used to avoid putting any animation class in the first render. 
        if (shownBefore === false) {
            setShownBefore(true)
        }
    }

    return (
        <>
            <div className={classes.layoutContainer}>
                {open ? (<Sidebar animationClass={animateClass} shownBefore={shownBefore} />) : ('')}
                <div className={classes.columns}>
                    <div className={classes.navbarContainer}>
                        <Navbar open={open} onMenuIconClick={toggleMenu} />
                    </div>
                    <div className={classes.content}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout