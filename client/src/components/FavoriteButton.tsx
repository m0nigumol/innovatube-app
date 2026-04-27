/* 
THIS FILE IS THE FAVORITE BUTTON
aTHIS COMPONENT IS RENDERED IN THE VIDEO CARD
AND ALLOWS TO ADD OR REMOVE A VIDEO FROM FAVORITES
*/

import { IconButton, styled, keyframes } from '@mui/material';

// ANIMATION KEYFRAMES
const popIn = keyframes`
  0% { transform: scale(0.8); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// STYLED COMPONENT
const FavoriteButton = styled(IconButton)(
    ({ }) =>
    (
        {
            // STYLES OF THE FAVORITE BUTTON
            transition: 'all 0.3s ease-in-out',
            height: 40,
            width: 40,
            color: "white",
            '&:hover': {
                color: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)',
            },
            '& .MuiSvgIcon-root': {
                transition: 'transform 0.2s ease-out',
            },
            '&:active .MuiSvgIcon-root': {
                animation: `${popIn} 0.3s ease-out`,
            }
        }
    )
);

export default FavoriteButton