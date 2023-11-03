import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Cookies from 'universal-cookie';

const Index1 = () => {

    const [data, setData] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        fetch('http://' + window.location.hostname + ':5500/backend/api/data')
        .then((response) => response.json())
        .then((jsonData) => {
            setData(jsonData);
        })
        .catch((error) => {
            console.error('Error');
        });
    }, []);

    function LogOut() {
        cookies.set(btoa('user_session'), 0);
        window.location.reload();
    }

    return (
        <>
        <div className='mainContainer'>
            <div className='nav'>
                <h1>Page Title</h1>
                <h5 onClick={() => LogOut()}>Logout</h5>
            </div>
            <div className='tbodyCont'>
                <div className='tbContMain'>
                    <TableContainer className ='tbCont' id='dropdown'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Username
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="searchTB">
                            {data.map((item, index) => (
                                <TableRow hover  key={index}>
                                    {/* <TableCell></TableCell> */}
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
        </>
    )
}

export default Index1;