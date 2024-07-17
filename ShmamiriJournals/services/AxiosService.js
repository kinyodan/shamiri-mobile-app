import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

const api_url = EXPO_PUBLIC_API_URL

export default {
  apiGet(path, headers = {},auth_token) {
    return axios.get(`${api_url}/${path}`,
      { 
        headers: {
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
        },
      }
    )
    .then(res => {
      if (res.data.status){
        return res.data;
      }
    })
    .catch(err => {
      return err.message;
    });
  },

  async postDataToApi(path, headers, data={}) {   
    return await axios({
      method: "POST",
      url: `${api_url}/${path}`,
      headers: headers,
      data: data
    })
    .then(res => {
      if (res.data.status){
        return res.data;
      }
    })
    .catch(err => {
      return err.message;
    });
  },
  
};

