import axios from 'axios'

let axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

//  axiosInstance.defaults.headers.common['xyz'] = 'xyz'
export default axiosInstance