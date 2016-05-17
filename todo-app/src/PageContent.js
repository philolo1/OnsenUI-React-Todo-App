import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TaskPending from './TaskPending.js'
import TaskCompleted from './TaskCompleted.js'

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

export default class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    return (
      <Tabbar
        position='bottom'
        renderTabs={(activeIndex, tabbar) => [
          {
            content: <TaskPending {...this.props} tasks={this.props.unCompletedTasks} />,
            tab: <Tab label="Pending" />
            },
            {
              content: <TaskCompleted {...this.props} tasks={this.props.completedTasks} />,
              tab: <Tab label="Completed" />
              }]
        } />
  );
  }
};

