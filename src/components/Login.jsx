import React from 'react';

const Login = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>
                    Username: <input name='user'onChange={props.handleChange}></input>
                    Name: <input name='name' onChange={props.handleChange}></input>
                </label>
                <button>Log In</button>
            </form>
        </div>
    );
};

export default Login;