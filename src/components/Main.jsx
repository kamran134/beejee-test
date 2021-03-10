import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getTasks, editTask } from '../redux/actions/task-action';
import { sortTask } from '../redux/actions/sort-action';
import queryString from 'query-string';
import './main.css';

const Main = props => {
    const { search } = props.location;
    const history = useHistory();
    const dispatch = useDispatch();
    const [sortField, setSortField] = useState(props.sortParams.field || 'id');
    const [sortDirection, setSortDirection] = useState({
        id: true,
        username: true,
        email: true,
        status: true
    });
    
    if (search.asc) setSortDirection({...sortDirection, [sortField]: props.sortParams.direction});

    useEffect(() => {
        const parsed = queryString.parse(search);
        dispatch(getTasks({page: parsed.page, field: sortField, direction: sortDirection[sortField]}));
    }, [dispatch, search, sortField, sortDirection]);
    
    const sortHandler = async (field) => {
        const parsed = queryString.parse(props.location.search);
        setSortField(field);
        await props.sortTask(field, sortDirection[field]);
        await props.getTasks({page: parsed.page, field: props.sortParams.field, direction: props.sortParams.direction});
        setSortDirection({...sortDirection, [field]: !sortDirection[field]});
    }

    return (
        <div className='container'>
            <div className='container-inner'>
                <div className='task-create-block'>
                    <button className='btn btn-create' onClick={() => history.push('/create-task')}>
                        Создать задачу
                    </button>
                    <button className='btn' onClick={() => sortHandler('id')}>
                        по id {sortDirection.id ? '^' : 'v'}
                    </button>
                    <button className='btn' onClick={() => sortHandler('username')}>
                        по имени пользователя {sortDirection.username ? '^' : 'v'}
                    </button>
                    <button className='btn' onClick={() => sortHandler('email')}>
                        по email {sortDirection.email ? '^' : 'v'}
                    </button>
                    <button className='btn' onClick={() => sortHandler('status')}>
                        по статусу {sortDirection.status ? '^' : 'v'}
                    </button>
                </div>
                <div className='task-block'>
                    {props.tasksObject.tasks && props.tasksObject.tasks.map((task, i) => (
                        <Task {...task} token={props.auth.token} editTask={props.editTask} key={i} />
                    ))}
                </div>
                <div className='pagination-block'>
                    {props.tasksObject.total_task_count && 
                        <Pagination 
                            count={props.tasksObject.total_task_count}
                        />}
                </div>
            </div>
        </div>
    )
}

const Task = ({id, username, email, text, status, token, editTask}) => {
    const [edit, setEdit] = useState(false);
    const [taskData, setTaskData] = useState({
        text: text || '',
        status: status.toString() || null
    });

    const statusText = taskData.status.toString() === '0' ? 'задача не выполнена' :
        taskData.status.toString() === '1' ? 'задача не выполнена, отредактирована админом' :
        taskData.status.toString() === '10' ? 'задача выполнена' :
        taskData.status.toString() === '11' ? 'задача отредактирована админом и выполнена' : 'отсутствует'

    const submitFormHandler = async e => {
        e.preventDefault();
        await editTask(id, token, taskData);
        setEdit(false);
    }

    const textEditHandler = e => {
        setTaskData({...taskData, [e.target.name]: e.target.value});
    }

    if (!edit) return (
        <div className='task'>
            {token && <div className='task-edit'>
                <button className='btn btn-blue' onClick={() => setEdit(true)}>Редактировать</button>
            </div>}
            <div className='task-author'>
                <strong>Автор:</strong> {username}
            </div>
            <div className='task-email'>
                <strong>Email:</strong> {email}
            </div>
            <div className='taks-name'>
                <strong>Задача:</strong> {taskData.text}
            </div>
            <div className='task-status'>
                <strong>Статус:</strong> {statusText}
            </div>
        </div>
    );
    else return (
        <div className='task'>
            <form onSubmit={submitFormHandler}>
                <div className='task-edit'>
                    <button className='btn btn-create' type='submit'>Сохранить</button>
                </div>
                <div className='task-author'>
                    <strong>Автор:</strong> {username}
                </div>
                <div className='task-email'>
                    <strong>Email:</strong> {email}
                </div>
                <div className='taks-name'>
                    <strong>Задача:</strong> <textarea name='text' onChange={textEditHandler}>{taskData.text}</textarea>
                </div>
                <div className='task-status'>
                    <strong>Статус:</strong>
                    <select name='status' onChange={textEditHandler} defaultValue={taskData.status}>
                        <option value='0'>задача не выполнена</option>
                        <option value='1'>задача не выполнена, отредактирована админом</option>
                        <option value='10'>задача выполнена</option>
                        <option value='11'>задача отредактирована админом и выполнена</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

const Pagination = ({count}) => {
    const pageCount = count%3 > 0 ? (parseInt(count/3) + 1) : count/3;
    
    let paginationLinks = [];

    for (let n = 1; n <= pageCount; n++) {
        paginationLinks.push(<Link key={n} to={`/?page=${n}`}>{n}</Link>);
    }
    return <div className='pagination'>{paginationLinks}</div>;
}

const mapStateToProps = state => ({
    tasksObject: state.taskReducer,
    auth: state.authReducer,
    sortParams: state.sortReducer
});

const mapDispatchToProps = {
    getTasks,
    editTask,
    sortTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
