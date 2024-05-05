import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';

export const URL = 'https://api.bluespaceportal.com/api'

const AxiosInstance = axios.create({
  baseURL: URL,
  proxy: false,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = URL
    try {
      config.url = `${config.url}${config.url.split('?').length == 2 ? '&' : '?'}access_token=${await AsyncStorage.getItem('token')}`
    } catch (error) {
      console.log('error getting token', error)
    }

    console.log(config.url, 'urll....................')
    // config.url = `${config.url}?access_token${await AsyncStorage.getItem('token')}`
    return config
  },
  request => {
    console.log('Requsting ..... ')
    console.log(request)
    return request;
  },
  error => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  response => {
    console.log(response, '.........................')
    return response.data
  },
  (error) => {
    console.log("error ===================", error.request, 'error>>>>>>>>>>>>..')
    if (!error.response) {
      Alert.alert('Network Error!');
      // console.log('Network Error >>>>>>', error)
      // return dispatch({ type: 'NETWORK_FAILURE' });
    } else if (error.response.status === 500) {
      Alert.alert('Server Error!');
    } else if (error.response.status === 404) {
      // Alert.alert('Endpoint doesn\'t exist!');
      console.log('404')
    } else if (error.response.status === 401) {
      Alert.alert('Not Authorized!');
    } else if (error.response.status === 400) {
      Alert.alert('Error, Try Again!')
    } else if (error.response.status === 422) {
      Alert.alert('Some inputs are invalid!')
    } else {
      // if(error.response.data.hint.message !== undefined){
      //   Alert.alert(JSON.stringify(error.response.data.hint.message));
      // }else {
      //   Alert.alert(JSON.stringify(error.response.data.hint));
      // }
    }

    // handle the errors due to the status code here
    return Promise.reject(error.response);
  },
);

export default AxiosInstance;