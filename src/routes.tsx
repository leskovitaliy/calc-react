import * as React from 'react';

import {Router, Route, browserHistory, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';

import App from './components/App';
import * as stores from './stores/index';


const routes =
    <Provider {...stores}>
        <Router history={hashHistory}>
            <Route path="/" component={App}/>

            {/*<Route path="/about" component={RegistrationForm}/>*/}
            {/*<Route path="/users" component={NewFormRef} />*/}

        </Router>
    </Provider>;

export default routes;
