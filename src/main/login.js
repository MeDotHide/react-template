import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Login = () => {

    //Set cookies variable
    const cookies = new Cookies();

    //setting a usestate data to pass to backend
    const [formData, setFormData] = useState({
        username: '',
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
        if(document.getElementById('username').value == "" || document.getElementById('username').value == null || document.getElementById('password').value == "" || document.getElementById('password').value == null) {
            alert("Empty field(s) detected. Please check.")
        } else {

            try {
                //change this to fit what url you want
                const response = await fetch('http://' + window.location.hostname + ':5500/backend/api/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // if the username exists and matches the password on JSON file
                if (response.ok) {

                    //YOU MAY CHANGE THIS TO WHATEVER AUTHENTICATION METHOD YOU WANT FOR SECURITY
                    cookies.set(btoa('user_session'), 1);


                    Swal.fire({
                        title: "Login",
                        icon: 'success',
                        html: 'Login Successful!'
                    }).then(() => {

                        window.location.reload();

                    })
                            
                } else {
                // Login failed
                    Swal.fire({
                        title: 'Error',
                        icon:'error',
                        html: response.status + "<br/> Invalid credential!",
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
        }
    };

//DOM
return (
    <>
        <div className='container'>
            <div className='reg_head'>
                <p>Hello!</p>
                <h2>Login</h2>
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
                <div>
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
                </div>
                <div className='button'>
                    <Button id='btnmain' type="submit" size='md' color='primary'>Login</Button>
                    <NavLink to="/register" className='reg'>Register?</NavLink>
                </div>
            </form>
        </div>
    </>
)

}

export default Login;