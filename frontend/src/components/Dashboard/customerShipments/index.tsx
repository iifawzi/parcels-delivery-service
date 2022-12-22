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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from "@emotion/styled";
import { XColored } from "components/shared";

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

function Row(props: { row: ReturnType<typeof createData> }) {
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
        <TableCell style={{ fontSize: '1.4rem' }} align="center">{row.pickupAddress}</TableCell>
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
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">Delivery Time</TableCell>
                    <TableCell style={{ fontSize: '1.4rem' }} align="center">Pickup Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow sx={{ '*': { borderBottom: 'unset' } }}>
                      <TableCell style={{ fontSize: '1.4rem' }} component="th" scope="row">
                        {row.biker.fullname}
                      </TableCell>
                      <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.pickupTime).toDateString()}</TableCell>
                      <TableCell style={{ fontSize: '1.4rem' }} align="center">{new Date(row.pickupTime).toDateString()}</TableCell>

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

const rows = [
  createData("2982982389", 'A bag of Rolex watches', 'Egypt, Portsaid Street', 'Germany, Munich Sreet', 'WAITING', { fullname: 'fawzi'}, new Date().getTime(), new Date().getTime()),
  createData("2982982389", 'A bag of Rolex watches', 'Egypt, Portsaid Street', 'Germany, Munich Sreet', 'MATCHED', { fullname: 'fawzi'}, new Date().getTime(), new Date().getTime()),
  createData("2982982389", 'A bag of Rolex watches', 'Egypt, Portsaid Street', 'Germany, Munich Sreet', 'PICKED', { fullname: 'fawzi'}, new Date().getTime(), new Date().getTime()),
  createData("2982982389", 'A bag of Rolex watches', 'Egypt, Portsaid Street', 'Germany, Munich Sreet', 'DELIVERED', { fullname: 'fawzi'}, new Date().getTime(), new Date().getTime()),
];

export default function CustomerShipments() {
  return (
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
            {rows.map((row, index) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}