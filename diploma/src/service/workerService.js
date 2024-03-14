import axios from "axios";

const API_URL = 'http://localhost:8000/api/worker'


const getWorkers = (id) => {
    return axios.get(API_URL + `/get/${id}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('token')).token
        }
    })
}

const deleteWorker = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

const workerUpdate = (
    id, 
    name, 
    surname, 
    phone, 
    email, 
    role, 
    status, 
    picture, 
    isfavorite
    ) => {
    return axios.put(API_URL + '/up',{
        id, 
        name, 
        surname, 
        phone, 
        email, 
        role, 
        status, 
        picture, 
        isfavorite
    },
    {
        header: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data'
        }
    })
}

const favWorkerUp = (id,isfavorite) => {
    return axios.put(API_URL + '/fav', {
        id,
        isfavorite
    })
}

const workerService ={
    getWorkers,
    deleteWorker,
    workerUpdate,
    favWorkerUp
}

export default workerService