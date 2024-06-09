import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PlantTable: React.FC<any> = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((plant: any) => (
                        <TableRow key={plant.id}>
                            <TableCell>{plant.id}</TableCell>
                            <TableCell>{plant.name}</TableCell>
                            <TableCell>{plant.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PlantTable;
