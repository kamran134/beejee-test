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
    const history = useHistory();

    const createFormSubmitHandler = async e => {
        e.preventDefault();
        await props.createTask(form);
        history.push('/')
    }
    const fieldChangeHandler = e => {
        changeForm({...form, [e.target.name]: e.target.value});
    }
    return (
        <form onSubmit={createFormSubmitHandler}>
            <div className='create-task-field'>
                <label>Автор</label>
                <input type='text' name='username' placeholder='Имя автора' onChange={fieldChangeHandler} />
            </div>
            <div className='create-task-field'>
                <label>Email</label>
                <input type='text' name='email' placeholder='Email автора' onChange={fieldChangeHandler} />
            </div>
            <div className='create-task-field'>
                <label>Задача</label>
                <textarea name='text' placeholder='Текст задачи' onChange={fieldChangeHandler} />
            </div>    
            <div className='create-task-field'>
                <button type='submit' className='btn'>Создать</button>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = {
    createTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);