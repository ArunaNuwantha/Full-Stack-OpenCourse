import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = (data) => {
    return axios.post(baseUrl, data);
}

const deletePerson = (id) => {
    return axios.delete(baseUrl + '/' + id);
}

export default {
    getAll: getAll,
    create: create,
    delete: deletePerson
}

