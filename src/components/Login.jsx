import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth-action';
import { useHistory } from 'react-router-dom';

const Login = props => {
    const history = useHistory();

    const [form, setForm] = useState({
        login: '',
        password: ''
    })

    const formSubmitHandler = async e => {
        e.preventDefault();
        await props.login(form);
        history.push('/');
    }

    const fieldChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <div className='container-inner'>
                <form onSubmit={formSubmitHandler}>
                    <div style={{marginTop: 20}} className='login-row'>
                        <label>Логин</label>
                        <input type='text' name={'login'} placeholder={'Логин'} onChange={fieldChangeHandler}/>
                    </div>
                    <div className='login-row'>
                        <label>Пароль</label>
                        <input type='password' name={'password'} placeholder={'Пароль'}  onChange={fieldChangeHandler}/>
                    </div>
                    <div className='login-row'>
                        <button type='submit' className='btn'>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
