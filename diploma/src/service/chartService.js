import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/chart/get"


const getChart = () => {
    return axios.get(API_URL)
}


const chartService = {
    getChart
}

export default chartService