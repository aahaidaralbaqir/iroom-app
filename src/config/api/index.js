import axios from 'axios'

// export const basePATH = 'http://192.168.1.47:5000'
// export const baseURL = 'http://192.168.1.47:5000/api/v1'
export const api = axios.create({
    baseURL : 'http://192.168.1.110:5000/api/v2'
})


export const headerOptions = token => {
  return { headers: { Authorization: `Bearer ${token}` } }
}
