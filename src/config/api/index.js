import axios from 'axios'

// export const basePATH = 'http://192.168.1.47:5000'
// export const baseURL = 'http://192.168.1.47:5000/api/v1'
export const api = axios.create({
    baseURL : 'https://iroom-api.herokuapp.com/api/v2'
})

  
export const headerOptions = token => {
  return { headers: { Authorization: `Bearer ${token}` } }
}
