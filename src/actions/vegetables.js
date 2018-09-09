import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_VEGETABLES_REQUEST = 'FETCH_VEGETABLES_REQUEST';
export const fetchVegetablesRequest = data => ({
    type: FETCH_VEGETABLES_REQUEST,
    data
});

export const FETCH_VEGETABLES_SUCCESS = 'FETCH_VEGETABLES_SUCCESS';
export const fetchVegetablesSuccess = data => ({
    type: FETCH_VEGETABLES_SUCCESS,
    data
});

export const FETCH_VEGETABLES_ERROR = 'FETCH_VEGETABLES_ERROR';
export const fetchVegetablesError = error => ({
    type: FETCH_VEGETABLES_ERROR,
    error
});


export const fetchVegetables = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchVegetablesRequest());
  return fetch(`${API_BASE_URL}vegetable`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${authToken}`
      }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
      dispatch(fetchVegetablesSuccess(data))
  })
  .catch(err => {
    dispatch(fetchVegetablesError(err));
  });
};