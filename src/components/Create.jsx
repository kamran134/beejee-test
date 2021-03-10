import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../redux/actions/task-action';
import { useHistory } from 'react-router-dom';

const Create = props => {
    const history = useHistory();
    
    return (
        <div className='container'>
            <div className='container-inner'>
                <div className='task-create-block'>
                    <button className='btn btn-create' onClick={() => history.push('/')}>
                        Назад
                    </button>
                </div>
                <div className='create-task-block'>
                    <CreateForm {...props} />
                </div>
            </div>
        </div>
    )
}

const CreateForm = props => {
    const [form, changeForm] = useState({
        username: '',
        email: '',
        text: '',
        status: 'new'
    });
    const [validString, setValidString] = useState({
        username: null,
        email: null,
        text: null
    });
    const history = useHistory();

    const createFormSubmitHandler = async e => {
        e.preventDefault();
        if (validation()) {
            await props.createTask(form);
            history.push('/');
        }
    }
    const fieldChangeHandler = e => {
        setValidString({...validString, [e.target.name]: null});
        changeForm({...form, [e.target.name]: e.target.value});
    }

    const validation = () => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let validationState = true;
        let validationStrings = {
            username: null,
            email: null,
            text: null
        }
        if (!form.username || form.username === '') {
            validationStrings.username = 'Поле не может быть пустым!';
            validationState = false;
        }
        if (!form.email || form.email === '') {
            validationStrings.email = 'Поле не может быть пустым!';
            validationState = false;
        } else if (!emailRegex.test(form.email)) {
            validationStrings.email = 'Введёт некорректный email!';
            validationState = false;
        }
        if (!form.text || form.text === '') {
            validationStrings.text = 'Поле не может быть пустым!';
            validationState = false;
        }
        setValidString(validationStrings);
        return validationState;
    }

    return (
        <form onSubmit={createFormSubmitHandler}>
            <div className='create-task-field'>
                <label>Автор</label>
                <input type='text' name='username' placeholder='Имя автора' onChange={fieldChangeHandler} />
                <span className='error-message'>{validString.username}</span>
            </div>
            <div className='create-task-field'>
                <label>Email</label>
                <input type='text' name='email' placeholder='Email автора' onChange={fieldChangeHandler} />
                <span className='error-message'>{validString.email}</span>
            </div>
            <div className='create-task-field'>
                <label>Задача</label>
                <textarea name='text' placeholder='Текст задачи' onChange={fieldChangeHandler} />
                <span className='error-message'>{validString.text}</span>
            </div>    
            <div className='create-task-field'>
                <button type='submit' className='btn'>Создать</button>
            </div>
        </form>
    )
}

const mapDispatchToProps = {
    createTask
}

export default connect(null, mapDispatchToProps)(Create);