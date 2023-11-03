import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Register = () => {

    //setting a usestate data to pass to backend
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    //setting value of usestate data from form's inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    
    //trigger function that will pass the data inputted on form's inputs/data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch('http://' + window.location.hostname + ':5500/backend/api/register', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },

                    //the contents of the input on the form will be sent to the backend to be stored in JSON file
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    Swal.fire({
                        title: "Registration",
                        icon: 'success',
                        html: 'Registration Successful!'
                    }).then(() => {
                        window.location.reload();
                    })
                            
                } else {
                // Registration failed
                    Swal.fire({
                        title: 'Error',
                        icon:'error',
                        html: response.status + "<br/> User already exist!",
                        confirmButtonColor: "rgb(255,92,100)"
                    });
                }
             } catch (error) {
                Swal.fire({
                    title: 'Error',
                    icon:'error',
                    html: error,
                    confirmButtonColor: "rgb(255,92,100)"
                });
            }
    };


return (
    <>
        <div className='container'>
            <div className='reg_head'>
                <p>Hello!</p>
                <h2>User Registration</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete='off'
                    variant='filled'
                    label='USERNAME'
                    required='true'
                    className='inp'
                    InputLabelProps={{shrink: true}}
                />
                <br/>
                <TextField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='off'
                    variant='filled'
                    label='EMAIL'
                    required='true'
                    className='inp'
                    InputLabelProps={{shrink: true}}
                />
                <br/>
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    variant='filled'
                    label='PASSWORD'
                    required='true'
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete='off'
                    className='inp'
                    InputLabelProps={{shrink: true}}
                /><br/>
                <div className='button'>
                    <Button id='btnmain' type="submit" size='md' color='primary'>Register</Button>
                    <NavLink to="/login" className='reg'>Back to Login</NavLink>
                </div>
            </form>
        </div>
    </>
)
}

export default Register;