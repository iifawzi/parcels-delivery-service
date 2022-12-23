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
import { XAlert, XAlertDialog, XColored, XLoading } from "components/shared";
import { BikerShipmentInfo } from "services/shipments/types";
import { ShipmentsServices } from "services";
import { Grid } from "components/shared/xLoading/templates";
import { AlertColor } from "@mui/material";

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
    MATCHED = "MATCHED",
    PICKED = "PICKED",
    DELIVERED = "DELIVERED",
}

function handleMarkPicked(setOpen: (status: boolean) => any, shipmentId: string) {
    setOpen(false);
    console.log(shipmentId);
}

function handleMarkDelivered(setOpen: (status: boolean) => any, shipmentId: string) {
    setOpen(false);
    console.log(shipmentId);
}

function ShowAction(currentStatus: ShipmentStatus, shipmentId: string) {
    switch (currentStatus) {
        case ShipmentStatus.MATCHED:
            return <XAlertDialog
                handleAgree={(setOpen: () => any) => () => handleMarkPicked(setOpen, shipmentId)}
                description="Are you sure you want to mark this shipment as picked?"
                value="Mark as Picked"
                title="Confirmation"
                color="warning"
            />
        case ShipmentStatus.PICKED:
            return <XAlertDialog
                handleAgree={(setOpen: () => any) => () => handleMarkDelivered(setOpen, shipmentId)}
                description="Are you sure you want to mark this shipment as delivered?"
                value="Mark as Delivered"
                title="Confirmation"
                color="success"
            />
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
                <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.pickupTime as string).toLocaleString()}</TableCell>
                <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickUpAddress}</TableCell>
                <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.dropOfAddress}</TableCell>
                <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.deliveryTime as string).toLocaleString()}</TableCell>
                <TableCell style={{ fontSize: '1.4rem' }} align="center"><XColored color={`var(--${row.shipmentStatus})`}>{row.shipmentStatus}</XColored></TableCell>
                <TableCell style={{ fontSize: '1.4rem' }} align="center">
                    {ShowAction(row.shipmentStatus as ShipmentStatus, row._id)}
                </TableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}

export default function CustomerShipments() {
    const [loadingStatus, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({ message: '', severity: '' });
    const [shipmentsInfo, setShipmentsInfo] = React.useState<BikerShipmentInfo[]>([]);

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
                const request = await ShipmentsServices.BikerShipments();
                setShipmentsInfo(request.data.data);
                setLoading(false);
                setAlert({ message: 'Retreived successfully', severity: 'success' });
            } catch (err: any) {
                setAlert({ message: err.response?.data?.message || 'Something went wrong', severity: "error" });
                setLoading(false)
            }
        })();
    }, []);
    return (
        <XLoading loadingStatus={loadingStatus} lMessage="We're processing your request.." LoadingType={<Grid />}>
            {alert.message !== '' ? <XAlert message={alert.message} severity={alert.severity as AlertColor} /> : ''}
            <div className={classes.bikerShipments}>
                <p className={classes.title}>
                    Your shipments list
                </p>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell align="center">Pickup time</StyledTableCell>
                                <StyledTableCell align="center">Pickup Address</StyledTableCell>
                                <StyledTableCell align="center">Destination Address</StyledTableCell>
                                <StyledTableCell align="center">Delivery time</StyledTableCell>
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
                                        You don't have any shipments yet!
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