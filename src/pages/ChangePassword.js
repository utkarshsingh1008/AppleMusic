import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Container, Grid, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

function ChangePassword() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('https://academics.newtonschool.co/api/v1/user/updateMyPassword', {
                name: formData.name,
                email: formData.email,
                passwordCurrent: formData.currentPassword,
                password: formData.newPassword,
                appType: 'music'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    projectId: 'cp0doe0u3fx9',
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            setSnackbarMessage('Password updated successfully.');
            setSnackbarSeverity('success');
            console.log(response.data.data);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating password:', error);
            setSnackbarMessage('Failed to update password. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" align="center">Change Password</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Current Password"
                                name="currentPassword"
                                type="password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Change Password</Button>
                </form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </Container>
    );
}

export default ChangePassword;
