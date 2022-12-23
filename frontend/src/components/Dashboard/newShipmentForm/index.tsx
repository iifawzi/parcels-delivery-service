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
import { ShipmentsServices } from "services";
import { CreateShipmentBody } from "services/shipments/types";

interface ComponentProps {
    setAlert: (alertInfo: xAlertI) => void
}

function NewShipmentForm({ setAlert }: ComponentProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [loadingStatus, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const renderComponents = () => {
        return (
            <div className={classes.loginBikerContainer}>
                <form className={classes.LoginBikerForm}>
                    {/* Inputs */}
                    <div className={classes.inputWrapper}>
                        <XInput iconComponent={<PersonIcon />} label="Shipment Description" type="text" register={register} required></XInput>
                        <div className={classes.helpers}>
                            <p className={classes.error}>{errors.shipmentDescription && <span>Description is required</span>}</p>
                        </div>
                    </div>
                    <div className={classes.inputWrapper}>
                        <XInput iconComponent={<PasswordIcon />} label="Pickup Address" type="text" register={register} required></XInput>
                        <div className={classes.helpers}>
                            <p className={classes.error}>{errors.pickupAddress && <span>Pickup address is required</span>}</p>
                        </div>
                    </div>
                    <div className={classes.inputWrapper}>
                        <XInput iconComponent={<PasswordIcon />} label="Destination Address" type="text" register={register} required></XInput>
                        <div className={classes.helpers}>
                            <p className={classes.error}>{errors.destinationAddress && <span>Destination address is required</span>}</p>
                        </div>
                    </div>
                    {/* End Inputs */}
                    <div className={classes.buttonWrapper}>
                        <XSubmit submitFunction={() => handleSubmit(onSubmit)} color="primary" label="Add" />
                    </div>
                </form>
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
        try {
            const body: CreateShipmentBody = {
                pickUpAddress: data.pickupAddress,
                dropOfAddress: data.destinationAddress,
                shipmentDescription: data.shipmentDescription
            }
            await ShipmentsServices.CreateShipment(body);
            setLoading(false);
            setAlert({ message: 'Shipment successfully added!', severity: "success" });
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err: any) {
            setLoading(false)
            setAlert({ message: err.response?.data?.message || 'Something went wrong', severity: "error" });
        }
    }

    return (
        <XLoading loadingStatus={loadingStatus} lMessage="Please wait, we're processing your request " LoadingType={<Ripple />}>
            {renderComponents()}
        </XLoading>
    )
}

export default NewShipmentForm;