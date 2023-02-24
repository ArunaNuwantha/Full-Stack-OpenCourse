import axios from "axios";

const baseUrl = 'https://phonebook-backend-85do.onrender.com/api/persons';

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

