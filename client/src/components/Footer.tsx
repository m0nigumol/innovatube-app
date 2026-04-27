/* 
RHIS FILE CONTAINS THE FOOTER OF THE APP
THIS COMPONENT IS RENDERED IN THE APP LAYOUT
AND CONTAINS SOME INFORMATION ABOUT THE APP
*/

import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
    return (
        // WRAPPER OF THE FOOTER
        <Box component="footer" sx={{ display: 'flex', p: 2, textAlign: 'center', justifyContent: 'center', }}>
            {/* COPYRIGHT */}
            <Typography component="p" variant="body2">© 2023 InnovaTube. Todos los derechos reservados.</Typography>
        </Box>
    );
};

export default Footer;