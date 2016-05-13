/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico

// import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

import './styles/styles.css';

import 'onsenui';

import {Page} from 'react-onsenui';
import App from './components/App.js';

const store = configureStore();

render(
  <App />,
  document.getElementById('app')
);
