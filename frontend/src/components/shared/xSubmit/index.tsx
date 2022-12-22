import { Button, Color } from "@mui/material";
import classes from "./style.module.scss"

interface componentProps {
    label: string,
    submitFunction: any
    color?: any, // colors fetched from the Theme provider @ App Component,
    customColor?: string,
    disabled?: boolean
}

function XSubmit({ label, color, customColor, submitFunction, disabled }: componentProps) {
    // if any custom color is needed other than 'primary' or 'secondery', Use the customColor 
    // CustomColor will use the corresponding styles from the css files. 
    return (
        <div className={`${classes.submitButton} ${classes[customColor!]}`}>
            <Button
                variant="contained"
                value={label}
                color={color}
                disabled={disabled}
                classes={{ root: classes.button }}
                onClick={submitFunction()}
            >{label}</Button>
        </div>
    )
}

export default XSubmit;