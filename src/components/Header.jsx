import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Header = props => {
    const history = useHistory();
    return (
        <header>
            Beejee-ninja
            {!props.auth.token && <div className='authorization'>
                <button className='btn btn-blue' onClick={() => history.push('/login')}>
                    Войти
                </button>
            </div>}
        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps)(Header);
