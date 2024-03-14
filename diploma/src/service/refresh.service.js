import axios from "axios"


const API_URl = 'http://localhost:8000/api/ref'


const refresh = (token) => {
    return axios.post(API_URl + '/post', {token}).then((response)=> {

        if(response.data.token){
            localStorage.setItem("token", JSON.stringify(response.data))
        }

        return response.data

    })
}

const refreshToken = {
    refresh
}


export default refreshToken
