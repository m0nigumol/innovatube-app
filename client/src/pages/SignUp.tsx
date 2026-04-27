/* 
THIS FILE IS THE SIGN UP PAGE
IT SHOWS A FORM TO REGISTER A NEW USER
AND ALSO SHOWS A RECAPTCHA FOR THE USER TO BE ABLE TO REGISTER
 */

import { useRef, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, ToggleButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Api from '../services/api';


const SignUp = () => {
    // HOOKS DECLARATION
    const navigate = useNavigate();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    // STATE DECLARATION
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: ''
    });
    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] = useState(false);
    const passwordsMatch =
        formData.password && formData.confirmPassword &&
        formData.password === formData.confirmPassword;

    // SUBMIT DATA TO SERVER WITH RECAPTCHA
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        // GET RECAPTCHA TOKEN
        const tokenCaptcha = recaptchaRef.current?.getValue();
        // VALIDATE RECAPTCHA HAS BEEN SOLVED
        if (!tokenCaptcha) {
            alert("Por favor, completa el captcha");
            return;
        }
        try {
            // PREPARE PAYLOAD
            const payload = { ...formData, captchaToken: tokenCaptcha };
            // SEND DATA TO SERVER
            const response = await Api.post('/auth/register', payload);
            // SAVE TOKEN IN LOCAL STORAGE
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            // SHOW SUCCESS MESSAGE
            alert(`¡Registro exitoso! Bienvenido ${formData.username}`);
            // NAVIGATE TO HOME
            navigate('/home');
        } catch (error: any) {
            console.error(error);
            alert('Error en el registro');
            // RESET RECAPTCHA
            recaptchaRef.current?.reset();
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                {/* FORM TITLE */}
                <Typography variant="h5" gutterBottom>Registro InnovaTube</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* NAME FIELDS */}
                    <TextField label="Nombre" fullWidth required onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <TextField label="Apellido" fullWidth required onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    {/* USERNAME AND EMAIL FIELDS */}
                    <TextField label="Usuario" fullWidth required onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    <TextField label="Email" type="email" fullWidth required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {/* PASSWORD FIELDS */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            required
                            fullWidth
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

                    {/* RECAPTCHA COMPONENT */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            ref={recaptchaRef}
                        />
                    </Box>
                    {/* REGISTER BUTTON */}
                    <Button type="submit" variant="contained" color="primary">Registrarse</Button>
                    {/* LOGIN LINK */}
                    <Typography variant="body2" align="center">¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;