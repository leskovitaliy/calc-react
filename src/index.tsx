import * as React from 'react';
import { render as ReactDomRender } from 'react-dom';
import routes from "./routes";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';



const _ = require('lodash');

const rootEl = document.getElementById('react-root');
ReactDomRender(routes, rootEl);


