import * as React from 'react';
import Menu from './Menu';
import CalcCredit from "./Calc/CalcCredit";

const menu = [
    {
        link: '/articles',
        label: 'Articles'
    },
    {
        link: '/contacts',
        label: 'Contacts'
    },
    {
        link: '/posts',
        label: 'Posts'
    }
];

class App extends React.Component {

    render() {
        return (
            <div className='container-fluid'>
                <Menu />
                <CalcCredit />
            </div>
        );
    }
}

export default App;
