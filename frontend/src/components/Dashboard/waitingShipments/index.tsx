import classes from "./style.module.scss";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "@emotion/styled";
import { XAlert, XColored, XInput, XLoading, XSubmit } from "components/shared";
import { BikerShipmentInfo, MatchingShipmentBody, WaitingShipmentInfo } from "services/shipments/types";
import { ShipmentsServices } from "services";
import { Grid } from "components/shared/xLoading/templates";
import { AlertColor, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import PasswordIcon from '@mui/icons-material/Password';
import { useForm } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: '1.4rem'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export enum ShipmentStatus {
    WAITING = "WAITING",
}

export default function WaitingShipments() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const [loadingStatus, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({ message: '', severity: '' });
    const [shipmentsInfo, setShipmentsInfo] = React.useState<WaitingShipmentInfo[]>([]);
    let [updated, setUpdated] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    async function handleMatching(setOpen: (status: boolean) => any, shipmentId: string) {
        setOpen(false);
        try {
            setLoading(true)
            await ShipmentsServices.markAsPicked(shipmentId);
            setLoading(false);
            setAlert({ message: 'Marked as picked successfully', severity: 'success' });
            setUpdated(updated + 1)
        } catch (err: any) {
            setAlert({ message: err.response?.data?.message || 'Something went wrong', severity: "error" });
            setLoading(false)
        }
    }

    const onSubmit = (shipmentId: string) => async (data: any) => {
        setLoading(true)
        try {
            const body: MatchingShipmentBody = {
                pickupTime: new Date(data.pickupTime).getTime(),
                deliveryTime: new Date(data.deliveryTime).getTime(),
                shipmentId
            }

            await ShipmentsServices.matchingShipment(body);
            setLoading(false);
            setAlert({ message: 'Marked as matched successfully', severity: 'success' });
            setUpdated(updated + 1)
        } catch (err: any) {
            setLoading(false)
            setAlert({ message: err.response?.data?.message || 'Something went wrong', severity: "error" });
        }
    }


    function Row(props: { row: BikerShipmentInfo }) {
        const { row } = props;

        return (
            <React.Fragment>
                <StyledTableRow>
                    <TableCell style={{ fontSize: '1.4rem' }} component="th" scope="row">
                        {row.shipmentDescription}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.customer?.fullName}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickUpAddress}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.dropOfAddress}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center"><XColored color={`var(--${row.shipmentStatus})`}>{row.shipmentStatus}</XColored></TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">
                        <div onClick={() => setOpen(!open)} className={classes.matchingBtn}>
                            <XColored color={`var(--MATCHED)`}>Matching</XColored>
                        </div>
                    </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 5 }}>
                                <div className={classes.matchingForm}>
                                    <p className={classes.note}>Kindly, confirm the pickup time and delivery time from below</p>
                                    <div className={classes.matchingInputs}>
                                        <div className={classes.inputWrapper}>
                                            <XInput iconComponent={<PasswordIcon />} label="Pickup Time" type="datetime-local" register={register} required></XInput>
                                            <div className={classes.helpers}>
                                                <p className={classes.error}>{errors.pickupTime && <span>Pickup time is required</span>}</p>
                                            </div>
                                        </div>
                                        <div className={classes.inputWrapper}>
                                            <XInput iconComponent={<PasswordIcon />} label="Delivery Time" type="datetime-local" register={register} required></XInput>
                                            <div className={classes.helpers}>
                                                <p className={classes.error}>{errors.deliveryTime && <span>Delivery time is required</span>}</p>
                                            </div>
                                        </div>
                                        <div className={classes.buttonWrapper}>
                                            <XSubmit submitFunction={() => handleSubmit(onSubmit(row._id))} color="primary" label="Confirm" />
                                        </div>
                                    </div>

                                </div>
                            </Box>
                        </Collapse>
                    </TableCell>
                </StyledTableRow>
            </React.Fragment>
        );
    }

    /** 
    ***************
    Fetching data: 
    ***************
    */
    // will only run in the first redner
    // I've used self invoking function to be able to await on the request. 
    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const request = await ShipmentsServices.waitingShipments();
                setShipmentsInfo(request.data.data);
                setLoading(false);
                // to only show the retrieved message in first render.
                if (!alert.message.length) {
                    setAlert({ message: 'Retreived successfully', severity: 'success' });
                }
            } catch (err: any) {
                setAlert({ message: err.response?.data?.message || 'Something went wrong', severity: "error" });
                setLoading(false)
            }
        })();
    }, [updated]);
    return (
        <XLoading loadingStatus={loadingStatus} lMessage="We're processing your request.." LoadingType={<Grid />}>
            {alert.message !== '' ? <XAlert message={alert.message} severity={alert.severity as AlertColor} /> : ''}
            <div className={classes.waitingShipments}>
                <p className={classes.title}>
                    List of available shipments:
                </p>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell align="center">Customer Name</StyledTableCell>
                                <StyledTableCell align="center">Pickup Address</StyledTableCell>
                                <StyledTableCell align="center">Destination Address</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shipmentsInfo.length ?
                                <>
                                    {shipmentsInfo.map((row, index) => (
                                        <Row key={index} row={row} />
                                    ))}
                                </>
                                :
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, textAlign: 'center', fontSize: '1.4rem' }} colSpan={4}>
                                        There're no available shipments
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </XLoading>
    );
}