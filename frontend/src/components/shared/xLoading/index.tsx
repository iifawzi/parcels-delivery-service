import classes from "./style.module.scss";
import React from "react";

interface componentProps {
    children: React.ReactNode,
    loadingStatus: boolean,
    LoadingType: React.ReactNode,
    lMessage: string
}

function xLoading({ children, loadingStatus, LoadingType, lMessage }: componentProps) {
    // Show either the loading component of the children
    const showLoadingOrChildrens = () => {
        if (loadingStatus) {
            return (
                <div className={classes.loadingContainer}>
                    <p className={classes.loadingMessage}>{lMessage}</p>
                    {LoadingType}
                </div>
            )
        } else {
            return children
        }
    };
    return (
        <>
            {showLoadingOrChildrens()}
        </>
    )
}

export default xLoading