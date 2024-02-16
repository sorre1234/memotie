import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility/> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )//cant be a boolean
                } : null}
            />


        </Grid>
    )
};

export default Input;
