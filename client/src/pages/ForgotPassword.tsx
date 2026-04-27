/* 
THIS FILE IS THE FORGOT PASSWORD PAGE,
IT ALLOWS USERS TO RECOVER THEIR PASSWORD
[ FOR THIS TEST VERSION, EMAILS ARE NOT BEING SENT ]
 */

import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Link, ToggleButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Api from '../services/api';

const ForgotPassword = () => {
    // HOOKS DECLARATION
    const navigate = useNavigate();
    // STATE DECLARATION
    const [formData, setFormData] = useState({
        login: '', password: '', confirmPassword: ''
    });
    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] = useState(false);
    const passwordsMatch =
        formData.password && formData.confirmPassword &&
        formData.password === formData.confirmPassword;

    // FUNCTION DECLARATION
    // SUBMIT DATA FUNCTION
    const handleSubmit = async (e: React.SubmitEvent) => {
        // PREVENT DEFAULT BEHAVIOR
        e.preventDefault();
        try {
            // POST DATA TO SERVER
            await Api.post('/auth/recover-password', {
                login: formData.login,
                newPassword: formData.confirmPassword
            });
            // SHOW SUCCESS MESSAGE
            alert('Contraseña actualizada con éxito. Ahora puedes iniciar sesión.');
            // NAVIGATE TO LOGIN
            navigate('/login');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error al actualizar');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" gutterBottom>Recuperar Contraseña</Typography>
                {/* CONTAINER FOR UPDATE PASSWORD FORM */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* USERNAME OR EMAIL FIELD */}
                    <TextField
                        label="Usuario o Email"
                        fullWidth
                        required
                        onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                    />
                    {/* PASSWORD FIELDS */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            label="Nueva Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData, password: e.target.value

                                })} />
                        <ToggleButton
                            value="check"
                            selected={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </ToggleButton>
                    </Box>
                    <TextField
                        label="Confirmar Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        error={
                            formData.confirmPassword.length > 0 && !passwordsMatch
                        }
                        helperText={
                            formData.confirmPassword.length > 0 &&
                            (
                                passwordsMatch
                                    ? 'Las contraseñas coinciden'
                                    : 'Las contraseñas no coinciden'
                            )

                        }
                    />

                    {/* BUTTONS */}
                    <Button type="submit" variant="contained">Actualizar Contraseña</Button>
                    <Link href="/login" variant="body2" align="center">Volver al Log in</Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;