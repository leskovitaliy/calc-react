import * as React from 'react';
import {Link} from 'react-router';

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <Link to="/">Main</Link>
                <Link to="/about">About</Link>
            </div>
        )
    }
}

export default Menu;
