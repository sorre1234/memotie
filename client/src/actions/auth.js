import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        //log in the user 
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data});
        history.push('/');
    } catch(error) {
        console.log(error);
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        //sign up the user 
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH, data});
        history.push('/');
    } catch(error) {
        console.log(error);
    }
}

export const googlesignin = (result, history) => async (dispatch) => {//new
    try {//new
        const { data } = await api.googleSignIn(result);//new
        dispatch({type: AUTH, data});//new
        history.push('/');//new
    } catch (error) {//new
        console.log(error);//new
    }//new
}
