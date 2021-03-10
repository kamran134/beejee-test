import axios from "axios";
import { GET_TASKS } from "../action-types";

export const createTask = (form) => async() => {
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('text', form.text);
    return axios({
            method: 'post',
            url: `https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Kazimi`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(({ data }) => {
            if (data.status === 'ok') {
                return alert('Задача добавлена успешно!');
            }
        });
}

const _getTasks = tasks => ({
    type: GET_TASKS,
    payload: tasks
});

export const getTasks = (params) => dispatch => {
    const sort_direction = !params.direction ? 'desc' : 'asc';
    return axios({
        method: 'GET',
        url: `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Kazimi&page=${params.page}&sort_field=${params.field}&sort_direction=${sort_direction}`
    }).then(({ data }) => dispatch(_getTasks(data.message)))
}

export const editTask = (id, token, form) => dispatch => {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('text', form.text);
    formData.append('status', form.status);
    if (localStorage.getItem('beejee.token')) return axios({
            method: 'post',
            url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=Kazimi`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(({ data }) => {
            if (data.status === 'ok') return getTasks();
        });
    else alert('Вы не авторизованы');
}