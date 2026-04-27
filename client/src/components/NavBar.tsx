/* 
THIS FILE IS THE NAVBAR
IT SHOWS THE NAME OF THE APP,
THE LOGGED USER NAME AND
A LOGOUT BUTTON
ALSO IT SHOWS THE TABS FOR THE APP HOME
 */

import { AppBar, Toolbar, Typography, Box, IconButton, Tabs, Tab } from '@mui/material';
import { Logout } from '@mui/icons-material';

// INTERFACE TO RECEIVE PROPS
interface NavbarProps {
    username: string | null;
    tabValue: number;
    setTabValue: (value: number) => void;
    onLogout: () => void;
}

export const Navbar = ({ username, tabValue, setTabValue, onLogout }: NavbarProps) => (
    // NAVBAR COMPONENT
    <AppBar component="nav" position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* LOGO (INNOVATUBE) */}
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                InnovaTube
            </Typography>
            {/* USER INFORMATION */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1">Hola, <b>{username}</b></Typography>
                {/* LOGOUT BUTTON */}
                <IconButton color="error" onClick={onLogout}><Logout /></IconButton>
            </Box>
        </Toolbar>
        {/* VIDEO TABS */}
        <Tabs value={tabValue} onChange={(_, n) => setTabValue(n)} centered>
            <Tab label="Explorar" />
            <Tab label="Favoritos" />
        </Tabs>
    </AppBar>
);