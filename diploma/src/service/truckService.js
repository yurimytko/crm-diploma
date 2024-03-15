import axios from "axios"


const API_URl = 'http://localhost:8000/api/truck'


const postTrucks = (
    brand,
    model,
    license,
    picture,
    fuel_type,
    adminId 
    ) => {
        return axios.post(API_URl + '/post',{
            brand,
            model,
            license,
            picture,
            fuel_type,
            adminId 
        },
        {
            headers: {
            'Accept':'*/*',
            'Content-Type': 'multipart/form-data',
            "Authorization": JSON.parse(localStorage.getItem('token')).token

          }
        })
    }


    const getTrucks = (id,page) => {
        return axios.get(API_URl + `/gets/${id}?page=${page}&limit=8`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('token')).token
            }
        });
    }

const getTrucksById = (id) => {
    return axios.get(API_URl + "/get/" + id)
}

const deleteTruck = (id) => {
    return axios.delete(`${API_URl}/delete/${id}`);
};


const favTruckUp = (id, isfavorite) => {
    return axios.put(API_URl + '/fav',{
        id,
        isfavorite
    },
    {
        headers: {
        'Accept':'*/*',
        'Content-Type': 'multipart/form-data',
        "Authorization": JSON.parse(localStorage.getItem('token')).token

      }
    })
}

const truckUp = ( id, brand, model, license, picture ,fuel_type ) => {
    return axios.put(API_URl + '/up', {
        id,
        brand,
        model,
        license,
        picture,
        fuel_type,

    },
    {
        headers: {
            'Accept':'*/*',
            'Content-Type': 'multipart/form-data',
            "Authorization": JSON.parse(localStorage.getItem('token')).token

        }
    })
}

const truckServices ={
    getTrucks,
    getTrucksById,
    deleteTruck,
    postTrucks,
    favTruckUp,
    truckUp
}

export default truckServices