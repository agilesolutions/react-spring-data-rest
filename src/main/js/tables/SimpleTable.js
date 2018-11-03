import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const SimpleTable = (props)  => {
	
	const { rows} = props;
	
    return(<Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>RegisterNumber</TableCell>
            <TableCell numeric>Year</TableCell>
            <TableCell numeric>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.brand}
                </TableCell>
                <TableCell numeric>{row.model}</TableCell>
                <TableCell numeric>{row.color}</TableCell>
                <TableCell numeric>{row.registerNumber}</TableCell>
                <TableCell numeric>{row.year}</TableCell>
                <TableCell numeric>{row.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>);
 }

export default SimpleTable;

