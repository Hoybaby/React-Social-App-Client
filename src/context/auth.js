import React, {useReducer, createContext, useContext} from 'react';

const initialState = {
    user: null,
    login: () => {},
    logout: () => {}
}

// This is checking for the jwt token that is being stored in the local storage when a user is created
// if(localStorage.getItem('jwtToken')) {

//     const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

//     // basically saying if the token is less than the time, remove the jwt token else the user = token whjich then pulls the info
//     if(decodedToken.exp *1000 < Date.now()) {
//         localStorage.removeItem('jwtToken')
//     } else {
//         initialState.user = decodedToken;
//     }
// }

const AuthContext = createContext()

// reducer,
function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}


function AuthProvider({children}) {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem('jwtToken', userData.token);
        // when you call 911, they are getting to give some resources
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            // not a good iea to spread because im not passing the props to the auth, im just passing the children, not props
            >{children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext)