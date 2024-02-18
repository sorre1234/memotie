import React, { useState } from "react"
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./Input";
import { signin, signup, googlesignin } from '../../actions/auth';
import jwtDecode from 'jwt-decode';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = (props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevsignup) => !prevsignup);
    setShowPassword(false);
  }
  const googleFailure = async (err) => {
    console.log(err);
    console.log('Google Sign In was unsuccessful. Try again later.')
  }
  const googleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    const result = decoded;
    try {//new
      dispatch(googlesignin(result, navigate));
    } catch (error) {//new
      console.log(error);//new
    }//new
  }



  return (
    <GoogleOAuthProvider clientId="664197920260-s8atnqdktepprd3lr3tl2a9mae17b3pv.apps.googleusercontent.com">

      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <GoogleLogin
              // render={(renderProps) => (
              //   <Button
              //     className={classes.googleButton}
              //     color="primary"
              //     fullWidth
              //     onClick={renderProps.onClick}
              //     disabled={renderProps.disabled}
              //     startIcon={<Icon />}>
              //     Google Sign In
              //   </Button>
              // )}
              onSuccess={googleSuccess}

              onError={googleFailure}
            />

            <Grid container justifyContent="flex-end">
              <Grid>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up  "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
     </GoogleOAuthProvider>
  );
};

export default Auth;
