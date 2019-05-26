//create our actions for authenticating user
//Import dependencies and action type definitions from types.js

import axios from 'axios';//Use axios to make HTTPRequests within certain action

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Use dispatch to send actions to our reducers

import { 
  GET_ERRORS, 
  SET_CURRENT_USER, 
  USER_LOADING } from './types';
//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)//eslint-disable-next-line
    .then(res => history.push('/login'))//redirect to login on succesful register
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
    //.then(res=>console.log(history))
};

//login-get user token
export const loginUser = userData =>  dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to localStore

    //set token to localStorage
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    //set token to Auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded));
    })
    .catch(err=>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object {} which will set
  //isAuthenticated to false
  dispatch(setCurrentUser({}));
};
