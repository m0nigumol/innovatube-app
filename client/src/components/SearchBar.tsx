/* 
THIS FILE CONTAINS THE SEARCH BAR
IT SHOWS A TEXT FIELD WITH A BUTTON TO SEARCH
AND A BUTTON TO CLEAR THE SEARCHH,
ALLOWS USERS TO SEARCH FOR VIDEOS IN 
THEIR LIBRARY (POPULAR AND FAVORITE VIDEOS)
*/
import { Box, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

export const SearchBar = ({ placeholder, value, onChange, onSearch, onClear }: SearchBarProps) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 4,
        width: '100%',
        maxWidth: 720,
        mx: 'auto'
    }}>
        <TextField
            fullWidth
            size="small"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch()}

            // INPUT PROPS 
            slotProps={{
                input: {
                    startAdornment: value && (
                        <InputAdornment position="start">
                            <Search sx={{ color: 'white', ml: 1 }} fontSize="small" />
                        </InputAdornment>
                    ),
                    endAdornment: value && (
                        <InputAdornment position="end">
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' },
                            }}>
                                <IconButton onClick={onClear} size="small" sx={{ height: 30, width: 30 }} >
                                    <Clear fontSize="small" />
                                </IconButton>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={onSearch}
                                    sx={{
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' },
                                        // borderRadius: '0 40px 40px 0',
                                    }}>
                                    <Search sx={{ height: 30, width: 30 }} />
                                </Button>
                            </Box>
                        </InputAdornment>
                    ),
                }
            }}
        />
    </Box>

);