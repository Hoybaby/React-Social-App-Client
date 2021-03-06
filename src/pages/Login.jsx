import React, {useContext, useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
// pretty ssure it can be wrrite just as apollo-client
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useAuthContext } from '../context/auth';

import {useForm} from '../util/hooks';

function Login(props) {

    const context = useAuthContext();

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: null,
        password: null
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // this will trigger when it is succesful
        update(_, {data: {login: userData}}) {
            console.log(userData)
            context.login(userData)
            props.history.push('/');
        },
        onError(err) {
            // this will tasrget the errors I already establish in my server side code with GRAPHQL
            console.log(err)
            // setErrors(err.graphQLErrors[0].extensions.errors)
        },
    })

    function loginUserCallback(formValues) {
        const formErrors = {};

            // destructing to not declare later down the road
            // 
            Object.entries(formValues).forEach(([field, value]) => {
                if (!value) formErrors[field] = `${field} is required`
            })
            // if there are errors and we set the erros then just return to show them
        if (Object.values(formErrors).length) {
            setErrors(formErrors);
            return;
        }

        loginUser({variables: {username: formValues.username, password: formValues.password}});
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    type="text"
                    error={errors.username ? true : false}
                />
                
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                />
                
                <Button type="submit primary">
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        ) {
            user {
                id
                email
                username
                createdAt
            }
            token
        }
    }

`

export default Login;