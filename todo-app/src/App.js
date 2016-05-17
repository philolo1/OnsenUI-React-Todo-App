import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import ons from 'onsenui';
import {
  Button,
  Fab,
  Page,
  List,
  Input,
  ListHeader,
  Tab,
  Switch,
  ListItem,
  BackButton,
  Icon,
  ToolbarButton,
  Tabbar,
  Toolbar,
  Navigator,
  Splitter,
  SplitterContent,
  SplitterSide
} from 'react-onsenui';

import FirstPage from './FirstPage.js'

const App = (props) => {
  return (
    <Navigator
      initialRoute={{
        component: FirstPage
      }}
      renderPage={(route, navigator) => {
        return React.createElement(route.component, {
          prevPage: route.prevPage,
          navigator: navigator,
          title: route.title,
          taskData: route.taskData,
          editMode: route.editMode
        });
      }} />
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
