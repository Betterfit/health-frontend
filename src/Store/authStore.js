export function createAuthStore (){
    return{
        user:localStorage.getItem('user') ? localStorage.getItem('user') :null,
        language: localStorage.getItem('language') ? localStorage.getItem('language'): 'en' ,
        token:localStorage.getItem('token') ? localStorage.getItem('token') : null ,
    }
}