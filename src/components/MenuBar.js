import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link, useLocation } from 'react-router-dom';

import {useAuthContext} from '../context/auth';

function MenuBar() {

    const {user, logout} = useAuthContext()

    // shouldnt use window.location because react is a SPA and using it defeats purpose of React. will lose a full page reload
    // const pathName = window.location.pathname;

    // const path = pathName === '/' ? 'home' : pathName.substr(1);

    const {pathname} = useLocation()

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
                    <Menu.Item
                        name={user.user.username}
                        // if activeItem is true, the messages will be highlighted
                        active
                        as={Link}
                        to={'/'}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={logout}
                            
                        />
                        
                    </Menu.Menu>
                </Menu>
        ) : (
            <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name="home"
                active={pathname.split('/')[1] === ''}
                as={Link}
                to="/"
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name="login"
                    active={pathname.split('/')[1] === 'login'}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={pathname.split('/')[1] === 'register'}
                    as={Link}
                    to="/register"
                />
                </Menu.Menu>
            </Menu>
    )
    


    return menuBar;
                
    
}


export default MenuBar;
