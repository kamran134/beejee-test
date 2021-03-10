import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/auth-action'

const Header = props => {
    const history = useHistory();
    return (
        <header>
            Beejee-ninja
            <div className='authorization'>
                {(props.auth && props.auth.token) ?
                <button className='btn btn-blue' onClick={() => props.logout()}>
                    Выход
                </button> : 
                 <button className='btn btn-blue' onClick={() => history.push('/login')}>
                    Войти
                </button>}
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
