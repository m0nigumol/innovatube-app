/* 
THIS FILE CONTAINS THE SEARCH BAR
IT SHOWS A TEXT FIELD WITH A BUTTON TO SEARCH
AND A BUTTON TO CLEAR THE SEARCHH,
ALLOWS USERS TO SEARCH FOR VIDEOS IN 
THEIR LIBRARY (POPULAR AND FAVORITE VIDEOS)
*/
import { Box, TextField, Button } from '@mui/material';
import { Clear } from '@mui/icons-material';


// INTERFACE TO RECEIVE PROPS
interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    onSearch?: () => void;
    onClear: () => void;
}

export const SearchBar = ({ placeholder, value, onChange, onSearch, onClear }: SearchBarProps) => (
    <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        {/* TEXT FIELD FOR THE SEARCH */}
        <TextField
            fullWidth
            size="small"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch()}
        />
        {/* SEARCH AND CLEAR BUTTONS */}
        <Button variant="contained" onClick={onSearch}>Buscar</Button>
        <Button variant="outlined" onClick={onClear}><Clear /></Button>
    </Box>
);