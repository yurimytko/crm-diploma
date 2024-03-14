import axios from "axios";

const API_URL = "http://localhost:8000/api/auth"

const login = (email, password) => {
    return axios.post(API_URL + "/login",{
        email,
        password
    }).then((response) => {
        if(response.data.token){
            localStorage.setItem("token", JSON.stringify(response.data))
        }
        return response.data
    })
}


const loginService = {
    login
}


export default loginService