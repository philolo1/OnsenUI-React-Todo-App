import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

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

import Menu from './Menu.js'
import Animator from './Animator.js'
import TaskPending from './TaskPending.js'
import TaskCompleted from './TaskCompleted.js'
import PageContent from './PageContent.js'
import Content from './Content.js'
import NewTask from './NewTask.js'

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 7;
    this.deleteItem = this.deleteItem.bind(this);
    this.newClick = this.newClick.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.unCompleteItem = this.unCompleteItem.bind(this);
    this.changeMenuItem = this.changeMenuItem.bind(this);
    this.filter = this.filter.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.state = {
      filter:
        {
          mode: 'default',
          name: 'All',
          func: () => true
        },
    unCompletedTasks: [
        {
          title: 'Download OnsenUI',
          category: 'Programming',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 0,
        },
        {
          title: 'Install Monaca CLI',
          category: 'Programming',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 1,
        },
        {
          title: 'Star Onsen UI repo on Github',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 2,
        },
        {
          title: 'Register in the community forum',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 3,
        },
        {
          title: 'Send donations to Fran and Andreas',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 4,
        },
        {
          title: 'Profit',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 5,
        },
        {
          title: 'Visit Japan',
          category: 'Travels',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 6,
        },
        {
          title: 'Enjoy an Onsen with Onsen UI team',
          category: 'Personal',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          taskKey: 7,
        }
    ],
    completedTasks: [

    ]
    };
  }

  itemClick(rowData) {
    this.props.navigator.pushPage({
      prevPage: this,
      component: NewTask,
      title: 'Task Details',
      editMode: true,
      taskData: rowData,
    }, {animation: 'lift' });
  }


  updateArr(tasks, taskKey, title, category, description) {
    return tasks.map( (el) => {
      if (el.taskKey != taskKey) return el;
      return {
        title: title,
        category: category,
        description: description,
        taskKey: taskKey
      }
    });
  }

  editTask(taskKey, title, category, description) {
    var tasks = this.state.unCompletedTasks.slice();
    var tasks2 = this.state.completedTasks.slice();

    tasks = this.updateArr(tasks, taskKey, title, category, description);
    tasks2 = this.updateArr(tasks2, taskKey, title, category, description);

    this.setState({
      unCompletedTasks: tasks,
      completedTasks: tasks2
    });
  }

  addTask(title, category, description) {
    var tasks = this.state.unCompletedTasks.slice();
    this.counter++;
    tasks.push({
      title: title,
      category: category,
      description: description,
      taskKey: this.counter
    });

    this.setState({
      unCompletedTasks: tasks
    });
  }

  filter(arr) {
    return arr.filter(this.state.filter.func);
  }

  getCategories() {
    var tasks = this.state.unCompletedTasks.concat(this.state.completedTasks);
    tasks = tasks.map((el) => el.category).filter( (el) => el != null);
    if (this.state.filter.mode == 'custom') {
      tasks.push(this.state.filter.name);
    }
    tasks = _.uniq(tasks);
    return tasks;
  }

  changeMenuItem(data) {
    let fun;

    if (data.mode == 'default') {
      if (data.name == 'All') {
        fun = () => true;
      } else {
        fun = (el) => (el.category == null);
      }

    } else {
      fun = (el) => (el.category == data.name);
    }

    var filterData = {
      name: data.name,
      mode: data.mode,
      func: fun
    };

    this.setState({
      filter: filterData
    });

  }

  deleteItem(node, rowData) {

    node.classList.add('animation-remove');
    node.classList.add('hide-children');

    setTimeout(() => {
      node.classList.remove('animation-remove');
      node.classList.remove('hide-children');

     var arr1 = this.state.completedTasks
     .filter((el) => el.taskKey !== rowData.taskKey);

     var arr2 = this.state.unCompletedTasks
      .filter((el) => el.taskKey !== rowData.taskKey);

      this.setState({
        completedTasks: arr1,
        unCompletedTasks: arr2
      });

    }, 750);
  }

  completeItem(node, rowData) {
   var animation = 'animation-swipe-right';
   node.classList.add('hide-children');
   node.classList.add(animation);

   setTimeout(() => {
     node.classList.remove(animation);
     node.classList.remove('hide-children');

     var arr1 = this.state.unCompletedTasks
      .filter((el) => el.taskKey !== rowData.taskKey);
     var arr2 = this.state.completedTasks.slice();
     arr2.push(rowData);

     this.setState({
       unCompletedTasks: arr1,
       completedTasks: arr2

     });

   }, 950);
  }


  unCompleteItem(node, rowData) {
   var animation = 'animation-swipe-left';
   node.classList.add('hide-children');
   node.classList.add(animation);

   setTimeout(() => {
     node.classList.remove(animation);
     node.classList.remove('hide-children');

     var arr1 = this.state.completedTasks
      .filter((el) => el.taskKey !== rowData.taskKey);
     var arr2 = this.state.unCompletedTasks.slice();
     arr2.push(rowData);

     this.setState({
       completedTasks: arr1,
       unCompletedTasks: arr2,
     });

   }, 950);
  }

  newClick() {
    let navigator = this.props.navigator;
    this.props.navigator.pushPage(
      {
        prevPage: this,
        component: NewTask,
        title: 'New Task'
      });
  }

  render() {
    return (
      <Page>
        <Splitter ref='splitter' id="mySplitter">
          <SplitterSide
            onOpen={
              () => this.setState({menuOpen: true})
            }
            onClose={
              () => this.setState({menuOpen: false})
            }
            isOpen={this.state.menuOpen} isSwipeable={true} width="250px" isCollapsed={true} swipeTargetWidth={50}>
            <Menu  categories={this.getCategories()} {...this.state.filter}
              onClickMenuItem={this.changeMenuItem}
            />
          </SplitterSide>
          <SplitterContent>
            <Content
              onItemClick={this.itemClick}
              onNewClick={this.newClick}
              onMenuClick={() => this.setState({menuOpen: true})}
              unCompletedTasks={this.filter(this.state.unCompletedTasks)}
              completedTasks={this.filter(this.state.completedTasks)}
              onUnCompleteItem={this.unCompleteItem}
              onCompleteItem={this.completeItem}
              onDeleteItem={this.deleteItem} />
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
};

