/* 
THIS FILE IS THE LOG IN PAGE
IT SHOWS A FORM TO LOG IN A USER
THEN IT VALIDATES THE CREDENTIALS IN THE BACKEND
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Link, ToggleButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Api from '../services/api';

const LogIn = () => {
    // HOOKS DECLARATION
    const navigate = useNavigate();
    // STATE DECLARATION
    const [credentials, setCredentials] = useState({ login: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    // FUNCTION DECLARATION
    // LOGIN FUNCTION
    const handleLogin = async (e: React.SubmitEvent) => {
        // PREVENT DEFAULT BEHAVIOR
        e.preventDefault();
        try {
            // SEND DATA TO SERVER AND AWAITS FOR RESPONSE
            const { data } = await Api.post('/auth/login', credentials);
            // SAVE TOKEN AND USERNAME IN LOCAL STORAGE
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            // NAVIGATE TO HOME
            navigate('/home');

        } catch (error) {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                {/* PAPER TITLE */}
                <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
                {/* FORM CONTAINER WITH INPUTS AND BUTTON TO SUBMIT */}
                <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* INPUTS */}
                    <TextField
                        label="Usuario o Email"
                        fullWidth
                        required
                        onChange={(e) =>
                            setCredentials({
                                ...credentials, login: e.target.value
                            })} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials, password: e.target.value
                                })} />
                        <ToggleButton
                            value="check"
                            selected={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </ToggleButton>
                    </Box>
                    {/* SUBMIT BUTTON */}
                    <Button type="submit" variant="contained" color="primary">Entrar</Button>
                    {/* CHANGE PASSWORD LINK */}
                    <Link href="/forgot-password" variant="body2" align="center">¿Olvidaste tu contraseña?</Link>
                    {/* SIGN UP LINK */}
                    <Typography variant="body2" align="center">
                        ¿No tienes una cuenta?
                        {' '}
                        <Link href="/signup" variant="body2" align="center">Registrarme</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LogIn;