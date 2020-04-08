const url = 'http://localhost:3000/api'
import axios from 'axios'

class PostService {
    
    static getMe() {
        return new Promise(async (resolve, reject) => {
            try{
                let res = await axios.get(url + '/users/me')
                resolve(res.data)
            } catch(err) {
                reject(err)
            }
        })
    }

}

export default PostService