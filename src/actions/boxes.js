import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_BOX_REQUEST = 'FETCH_BOX_REQUEST';
export const fetchBoxRequest = () => ({
    type: FETCH_BOX_REQUEST
});

export const FETCH_BOX_SUCCESS = 'FETCH_BOX_SUCCESS';
export const fetchBoxSuccess = data => ({
    type: FETCH_BOX_SUCCESS,
    data
});

export const FETCH_BOX_ERROR = 'FETCH_BOX_ERROR';
export const fetchBoxError = error => ({
    type: FETCH_BOX_ERROR,
    error
});

export const CREATE_BOX_REQUEST = 'CREATE_BOX_REQUEST';
export const createBoxRequest = () => ({
    type: CREATE_BOX_REQUEST  
});

export const CREATE_BOX_SUCCESS = 'CREATE_BOX_SUCCESS';
export const createBoxSuccess = data => ({
    type: CREATE_BOX_SUCCESS,
    data
});

export const CREATE_BOX_ERROR = 'CREATE_BOX_ERROR';
export const createBoxError = error => ({
    type: CREATE_BOX_ERROR,
    error
});

export const ADD_VEGETABLE = 'ADD_VEGETABLE';
export const addVegetable = vegetable => ({
    type: ADD_VEGETABLE,
    vegetable
});
export const DELETE_VEGETABLE = 'DELETE_VEGETABLE';
export const deleteVegetable = index => ({
    type: DELETE_VEGETABLE,
    index
});

export const SET_SELECT_DISPLAY_BOOLEAN = 'SET_SELECT_DISPLAY_BOOLEAN';
export const setSelectDisplayBoolean = () => ({
  type: SET_SELECT_DISPLAY_BOOLEAN    
})

export const UPDATE_BOX_REQUEST = 'UPDATE_BOX_REQUEST';
export const updateBoxRequest = () => ({
    type: UPDATE_BOX_REQUEST  
});

export const UPDATE_BOX_SUCCESS = 'UPDATE_BOX_SUCCESS';
export const updateBoxSuccess = data => ({
    type: UPDATE_BOX_SUCCESS,
    data
});

export const UPDATE_BOX_ERROR = 'UPDATE_BOX_ERROR';
export const updateBoxError = error => ({
    type: UPDATE_BOX_ERROR,
    error
});

export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const errorMessage = message => ({
    type: ERROR_MESSAGE,
    message
});

export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
export const successMessage = message => ({
    type: SUCCESS_MESSAGE,
    message
});

export const SHOW_ABOUT = 'SHOW_ABOUT';
export const showAbout = boolean => ({
    type: SHOW_ABOUT,
    boolean
});

export const GO_HOME = 'GO_HOME';
export const goHome = boolean => ({
    type: GO_HOME,
    boolean
});



export const createBox = (pickUpDate) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(createBoxRequest());
    return fetch(`${API_BASE_URL}box/${pickUpDate}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
        console.log(data, 'post request response data')
        dispatch(createBoxSuccess(data))
    })
    .catch(err => {
        dispatch(createBoxError(err))
    })
}

export const fetchBox = (pickUpDate) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchBoxRequest());
  console.log('fetching the requested box');
     return fetch(`${API_BASE_URL}box/${pickUpDate}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
      })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then((data) => {
          console.log('the requested box has these contents: ', data.boxContents);
          dispatch(fetchBoxSuccess(data))
      })
      .catch(err => {
          //console.log(err);
          dispatch(fetchBoxError(err));
      });
};

export const updateBox = (boxContents, pickUpDate) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(updateBoxRequest());
    console.log(boxContents);
    return fetch(`${API_BASE_URL}box/${pickUpDate}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boxContents)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
        dispatch(updateBoxSuccess(data))
    })
    .catch(err => {
        dispatch(updateBoxError(err))
    });
}
