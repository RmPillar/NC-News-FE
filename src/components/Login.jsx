import React from 'react';
import styled from 'styled-components'

const Login = (props) => {

    const Div = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
        width:100vw;
        height:100vw,
        background:#FCFCFC;
    `

    const Main = styled.main`
        display:flex;
        justify-content:center;
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        
        background: #26547C;
        width: 35vw;
        min-width: 300px;
        height: 35vw;
        min-height: 300px;
        font-family: 'Roboto', sans-serif;
    `

    return (
        <Div>
            <Main>
                <form onSubmit={props.handleSubmit}>
                    <label>
                        Username: <input name='user'onChange={props.handleChange}></input>
                        Name: <input name='name' onChange={props.handleChange}></input>
                    </label>
                    <button>Log In</button>
                </form>
            </Main>

        </Div>
    );
};

export default Login;