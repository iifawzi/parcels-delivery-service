import classes from "./style.module.scss";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from "@emotion/styled";
import { XAlert, XColored, XLoading } from "components/shared";
import { ShipmentInfo } from "services/shipments/types";
import { ShipmentsServices } from "services";
import { Grid } from "components/shared/xLoading/templates";
import { AlertColor } from "@mui/material";

function createData(
  _id: string,
  shipmentDescription: string,
  pickupAddress: string,
  pickOfAddress: string,
  shipmentStatus: string,
  biker: {
    fullname: string,
  },
  deliveryTime: number,
  pickupTime: number
) {
  return {
    _id,
    shipmentDescription,
    pickupAddress,
    pickOfAddress,
    shipmentStatus,
    biker,
    deliveryTime,
    pickupTime
  };
}

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

function Row(props: { row: ShipmentInfo }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ fontSize: '1.4rem' }} component="th" scope="row">
          {row.shipmentDescription}
        </TableCell>
        <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickUpAddress}</TableCell>
        <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickOfAddress}</TableCell>
        <TableCell style={{ fontSize: '1.4rem' }} align="center"><XColored color={`var(--${row.shipmentStatus})`}>{row.shipmentStatus}</XColored></TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className={classes.bikerInfo}>
                <XColored color={`var(--${row.shipmentStatus})`}>Biker information</XColored>
              </div>
              <Table size="medium" aria-label="deliveyr-info">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: '1.4rem' }}>Name</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">Pickup Time</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">Delivery Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '*': { borderBottom: 'unset' } }}>
                    {row.biker ? 
                    <>
                    <TableCell style={{ fontSize: '1.4rem' }} component="th" scope="row">
                      {row.biker.fullName}
                    </TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.pickupTime as string).toLocaleString()}</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.deliveryTime as string).toLocaleString()}</TableCell>
                    </>
                    :
                    <>
                    <TableCell style={{ textAlign: 'center', fontSize: '1.4rem' }} component="th" scope="row" colSpan={4}>
                        Waiting for matching with a biker!
                    </TableCell>
                    </>

                  }
                    

                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function CustomerShipments() {
  const [loadingStatus, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({ message: '', severity: '' });
  const [shipmentsInfo, setShipmentsInfo] = React.useState<ShipmentInfo[]>([]);
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
        const request = await ShipmentsServices.CustomerShipments();
        setShipmentsInfo(request.data.data);
        setLoading(false);
        setAlert({ message: 'Retreived successfully', severity: 'success' });
      } catch (err) {
        setLoading(false)
      }
    })();
  }, []);
  return (
    <XLoading loadingStatus={loadingStatus} lMessage="We're processing your request.." LoadingType={<Grid />}>
      {alert.message !== '' ? <XAlert message={alert.message} severity={alert.severity as AlertColor} /> : ''}
      <div className={classes.customerShipments}>
        <p className={classes.title}>
          Your shipments list
        </p>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="center">Pickup Address</StyledTableCell>
                <StyledTableCell align="center">Pickof Address</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
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
                    No shipments created yet
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