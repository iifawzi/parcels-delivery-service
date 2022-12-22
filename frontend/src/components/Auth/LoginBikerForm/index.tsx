import React from "react";
import { useForm } from "react-hook-form";
import { XInput, XSubmit } from "components/shared"
import classes from "./style.module.scss"
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { xAlertI } from "components/shared/xAlert";
import { XLoading } from "components/shared"
import { Ripple } from "components/shared/xLoading/templates"
import { useNavigate } from "react-router-dom";

interface ComponentProps {
    setAlert: (alertInfo: xAlertI) => void
}

function LoginBikerForm({ setAlert }: ComponentProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [loadingStatus, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const renderComponents = () => {
        return (
            <div className={classes.loginBikerContainer}>
                <form className={classes.LoginBikerForm}>
                    {/* Inputs */}
                    <div className={classes.inputWrapper}>
                        <XInput iconComponent={<PersonIcon />} label="Username" type="text" register={register} required></XInput>
                        <div className={classes.helpers}>
                            <p className={classes.error}>{errors.username && <span>Username is required</span>}</p>
                        </div>
                    </div>
                    <div className={classes.inputWrapper}>
                        <XInput iconComponent={<PasswordIcon />} label="Password" type="password" register={register} required></XInput>
                    </div>
                    {/* End Inputs */}
                    <div className={classes.buttonWrapper}>
                        <XSubmit submitFunction={() => handleSubmit(onSubmit)} color="primary" label="Log in" />
                    </div>
                </form>

                <p className={classes.customer}>Are you a customer? <b onClick={() => { navigate('/auth/register') }} >Login now!</b></p>
            </div>
        )
    }

    /** 
    ***************
    Submmition: 
    ***************
    */

    const onSubmit = async (data: any) => {
        setLoading(true)
    }

    return (
        <XLoading loadingStatus={loadingStatus} lMessage="Please wait, we're processing your request " LoadingType={<Ripple />}>
            {renderComponents()}
        </XLoading>
    )
}

export default LoginBikerForm;