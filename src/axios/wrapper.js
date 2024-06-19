import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/',
   headers: {
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.dHVzaGFyLnNhaW5pQGxvYmIuaW4.1InOHLHAMipL7u-8BHmP92fVbWADx9iiC9H0N1Cc6pc'
   }
})

const makeRequest = ({ method, url, params = null }) => {
   return new Promise((resolve, reject) => {
      axiosInstance({
         method,
         url,
         params
      })
         .then((response) => {
            resolve(response.data)
         })
         .catch((error) => {
            reject(error)
         })
   })
}

export default makeRequest
