import React, {useContext, useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
// pretty ssure it can be wrrite just as apollo-client
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useAuthContext } from '../context/auth';
import {useForm} from '../util/hooks';

function Register(props) {

    const context = useAuthContext();

    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(registerUser, {
        // we changing to null because it easier to check.
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        // this will trigger when it is succesful
        update(_, {data: {register: userData}}) {
            context.login(userData)
            props.history.push('/');
        },
        onError(err) {
            // this will tasrget the errors I already establish in my server side code with GRAPHQL
            console.log(err)
            // setErrors(err.graphQLErrors[0].extensions.errors)
        }

    })

    function registerUser(formValues) {
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

        addUser({variables: {username: formValues.username, password: formValues.password, email: formValues.email}});
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    type="email"
                    error={errors.email ? true : false}
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    type="password"
                    error={errors.confirmPassword ? true : false}
                />
                <Button type="submit primary">
                    Register
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
            }
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

export default Register;