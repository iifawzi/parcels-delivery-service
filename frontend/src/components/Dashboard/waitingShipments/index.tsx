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
import { XAlert, XColored, XDialog, XLoading } from "components/shared";
import { BikerShipmentInfo, WaitingShipmentInfo } from "services/shipments/types";
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
    WAITING = "WAITING",
}

export default function WaitingShipments() {
    const [loadingStatus, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({ message: '', severity: '' });
    const [shipmentsInfo, setShipmentsInfo] = React.useState<WaitingShipmentInfo[]>([]);
    let [updated, setUpdated] = React.useState(0);

    function ShowAction(currentStatus: ShipmentStatus, shipmentId: string) {
        switch (currentStatus) {
            case ShipmentStatus.WAITING:
                return <XDialog
                    handleAgree={(setOpen: () => any) => () => handleMatching(setOpen, shipmentId)}
                    description="Kindly, confirm the pickup and delivery times from below"
                    value="Matching the shipment"
                    title="Required Information"
                    color="info"
                >
                    hi
                </XDialog>
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
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickUpAddress}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.dropOfAddress}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center"><XColored color={`var(--${row.shipmentStatus})`}>{row.shipmentStatus}</XColored></TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">
                        {ShowAction(row.shipmentStatus as ShipmentStatus, row._id)}
                    </TableCell>
                </StyledTableRow>
            </React.Fragment>
        );
    }

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
            <div className={classes.bikerShipments}>
                <p className={classes.title}>
                    List of available shipments:
                </p>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Description</StyledTableCell>
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