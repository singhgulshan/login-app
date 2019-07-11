import http from 'axios';

export function login(credentials) {
  return http.post('https://reqres.in/api/login', credentials)
    .then(handleResponse)
    .catch(handleError)
}

function handleResponse(response) {
  let apiResponse = response.data

  if (response.status === 200) {
    return Promise.resolve(apiResponse);
  }
}

function handleError(err) {
  const error = err.response
  if (error.status === 400) {
    return Promise.reject(error.data.error);
  }
}