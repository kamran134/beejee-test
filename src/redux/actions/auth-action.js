import axios from 'axios';
import { LOGIN } from '../action-types';

const _login = user => ({
    type: LOGIN,
    payload: user
})

export const login = (form) => dispatch => {
    console.log('form', form);
    const formData = new FormData();
    formData.append('username', form.login);
    formData.append('password', form.password);
    return axios({
            method: 'post',
            url: `https://uxcandy.com/~shapoval/test-task-backend/v2/login/?developer=Kazimi`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(({ data }) => {
            if (data.status === 'ok') {
                dispatch(_login(data.message))
            }
        });
}