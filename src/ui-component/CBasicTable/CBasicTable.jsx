import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const CBasicTable = ({ columns = [], rows = [], tableProps = {}, sx = {} }) => {
  return (
    <TableContainer component={Paper} sx={{ ...sx }}>
      <Table {...tableProps} size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field} align={col.align || 'left'}>
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length ? (
            rows.map((row, index) => (
              <TableRow key={row.id || index}>
                {columns.map((col) => (
                  <TableCell key={col.field} align={col.align || 'left'}>
                    {row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 2 }}>
                <strong>No data available</strong>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CBasicTable;
