import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link, useLocation } from 'react-router-dom';

import {useAuthContext} from '../context/auth';

function MenuBar() {

    const {user, logout} = useAuthContext()

    // shouldnt use window.location because react is a SPA and using it defeats purpose of React. will lose a full page reload
    // const pathName = window.location.pathname;

    // const path = pathName === '/' ? 'home' : pathName.substr(1);
    const path = useLocation()
    console.log({path})

    const [activeItem, setActiveItem] = useState(path);

    // useEffect(() => {
    //     setActiveItem()
    // }, [])
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
                    <Menu.Item
                        name={user.username}
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
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
                </Menu.Menu>
            </Menu>
    )
    


    return menuBar;
                
    
}


export default MenuBar;
