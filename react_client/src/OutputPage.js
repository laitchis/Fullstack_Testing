

import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material';

function OutputPage() {

    const [data, setData] = useState([]);


    function makeRequest() {
        axios.get('http://127.0.0.1:5000/select')
            .then((response) => {
              console.log(response.data);
              setData(response.data['data']);
            })
            .catch((error) => {
              console.log(error);
            })
        }
    useEffect(() => {
        makeRequest();
    }, []);
    return (
        <Table>
            <TableHeader />
            
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>

    )
}
function TableHeader()  {
    return (
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
    );
  }

export default OutputPage;