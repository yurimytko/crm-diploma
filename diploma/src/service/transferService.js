import axios from "axios";

const API_URL = "http://localhost:8000/api/trnsf"

const getTrnsf = (id) => {
    return axios.get(API_URL + `/get/${id}`)
}


const trnsfService ={
    getTrnsf,
}

export default trnsfService