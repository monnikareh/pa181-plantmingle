import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlantTable: React.FC<any> = ({ data }) => {
  const navigate = useNavigate();

  function onRowClick(id: number) {
    navigate(`/swipe/${id}`);
  }

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
          {data.length ? (
            data.map((plant: any) => (
              <TableRow
                key={plant.id}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => onRowClick(plant.id)}
              >
                <TableCell>{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" style={{fontSize:"18px", fontWeight: 500}}>
                No plant found 😢
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlantTable;
