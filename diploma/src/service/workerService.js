import axios from "axios";

const API_URL = 'http://localhost:8000/api/worker'


const addWorker = (
    name,
    surname,
    phone,
    email,
    role,
    picture,
    adminId
) => {
    return axios.post(API_URL + "/post",{
        name,
        surname,
        phone,
        email,
        role,
        picture,
        adminId
    },
    {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            "Authorization": JSON.parse(localStorage.getItem('token')).token

        }
    })
}


const getWorkers = (id) => {
    return axios.get(API_URL + `/get/${id}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('token')).token
        }
    })
}


const getOneWorker = (id) => {
    return axios.get(API_URL + `/getone/${id}`,{
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
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            "Authorization": JSON.parse(localStorage.getItem('token')).token

        }
    })
}

const favWorkerUp = (id,isfavorite) => {
    return axios.put(API_URL + '/fav', {
        id,
        isfavorite
    })
}

const gatFavWorkers = (id) => {
    return axios.get(API_URL + `/favget/${id}`)
}

const workerService ={
    getWorkers,
    deleteWorker,
    workerUpdate,
    favWorkerUp,
    addWorker,
    getOneWorker,
    gatFavWorkers
}

export default workerService