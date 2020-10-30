export function createAuthStore (){
    return{
        user:localStorage.getItem('user') ? localStorage.getItem('user') :null,
        token:localStorage.getItem('token') ? localStorage.getItem('token') : null ,
    }
}