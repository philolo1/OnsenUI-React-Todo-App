import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

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

export default class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.action = this.action.bind(this);

    var {title, category, description} = this.props.taskData;

    this.state = {
      urgent: false,
      title: title,
      category: category,
      description: description
    };
  }

  action() {

    if (!this.state.title || this.state.title.length == 0) {
      ons.notification.alert('You must provide a task title.');
      return;
    }

    if (this.props.editMode) {
      this.props.prevPage.editTask(this.props.taskData.taskKey,
                                   this.state.title,
                                   this.state.category,
                                   this.state.description);
    } else {
      this.props.prevPage.addTask(
        this.state.title,
        this.state.category,
        this.state.description
      );
    }

    this.props.navigator.popPage();
  }

  render() {

    let actionButton, rightToolBarButton;

    if (!ons.platform.isAndroid()) {
      actionButton = <Button modifier="large" onClick={this.action}>
        { this.props.editMode?
          'Save Task' :
            'Add New Task'
        }
      </Button>;
    } else {
      rightToolBarButton = <div className="right">
          <ToolbarButton onClick={this.action}>
            <Icon icon="md-save" />
          </ToolbarButton>
      </div>;
    }

    return (
      <Page id="newTaskPage"
        renderToolbar={
          () => <Toolbar>
            <div className="left"><BackButton>Back</BackButton></div>
            <div className="center">{this.props.title}</div>
            {rightToolBarButton}
          </Toolbar>
          }>


          <List
            renderHeader={() => <ListHeader> Add a new task </ListHeader>}
            dataSource={[
              {
                placeholder: 'I want to',
                fieldName: 'title'
              },
              {
                placeholder: 'Category',
                fieldName: 'category'
              },
              {
                placeholder: 'Description',
                fieldName: 'description'
              }
            ]}
            renderRow={(data) => {
              return (
                <ListItem modifier="nodivider">
                  <div className='center'>
                    <Input
                      type="text"
                      value={this.state[data.fieldName]}
                      onChange={(event) => {
                        var newData = {};
                        newData[data.fieldName] = event.target.value;
                        this.setState(newData);
                      }}
                      placeholder={data.placeholder} float />
                  </div>
                </ListItem>
                );
            }} />
          {actionButton}
        </Page>
    );
  }
};

NewTask.defaultProps = {
  taskData: {}
};

