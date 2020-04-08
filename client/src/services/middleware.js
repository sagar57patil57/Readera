import user from './auth'
 
export default {
    guest (to, from, next) {
        if(user.check()){
            next('/me')
        }
        else{
            next()
        }
    },
 
    auth (to, from, next) {
        next(user.check() ? true : {
            path: '/login',
            query: {
                redirect: to.name
            }  
        })
    }
}