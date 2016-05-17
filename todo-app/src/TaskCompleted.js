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

export default class TaskCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = {};
    this.renderTask = this.renderTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  checkItem(name, row) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onUnCompleteItem(node, row);
  }

  deleteItem(name, row) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onDeleteItem(node, row);
  }

  renderTask(row, index) {
    const refItem = `item${row.taskKey}`;
    return (
      <ListItem
        ref={(el) => this.itemRef[refItem] = el}
        key={refItem}
        tappable
        category={row.category} >
        <label className='left'
          >
          <Input checked onClick={() => this.checkItem(refItem, row)} type='checkbox' />
        </label>
        <div className='center'
          onClick={() => this.props.onItemClick(row)} >
          {row.title}
        </div>
        <div className='right'>
          <Icon onClick={() => this.deleteItem(refItem, row)} style={{color: 'grey', paddingLeft: '4px'}} icon={{default: 'ion-ios-trash-outline', material:'md-delete'}} />
        </div>
      </ListItem>
    );
  }
  render() {
    let newButton;
    if (ons.platform.isAndroid()) {
      newButton = <Fab
        onClick={this.props.onNewClick}
        position="right bottom" >
        <Icon icon="md-edit" />
      </Fab>
    }

    return (
      <Page>
        {newButton}
        <List
          dataSource={this.props.tasks}
          renderRow={this.renderTask} />
      </Page>
    );
  }
};

