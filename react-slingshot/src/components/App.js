import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import {
  Page,
  List,
  Input,
  ListHeader,
  Tab,
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




class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, idx) {
    if (idx == 0) {
      return (
        <ListItem tappable>
          <div class="left">
            <Input type="radio" name="categoryGroup" inputId="r-all" checked />
          </div>
          <label class="center" for="r-all">All</label>
        </ListItem>
      );
    } else {
      return (
        <ListItem tappable category-id="">
          <div class="left">
            <Input type="radio" name="categoryGroup" input-id="r-no" />
          </div>
          <label class="center" for="r-no">No category</label>
        </ListItem>
      );
    }
  }

  render() {
    return (
      <Page id="menuPage">
        <List id="default-category-list"
          dataSource={[0,1]}
          renderHeader={() =>
            <ListHeader>Default</ListHeader>
          }
          renderRow={this.renderRow}
        />
        <List
          dataSource={[]}
          id="custom-category-list"
          renderHeader={
            () => <ListHeader>Custom categories </ListHeader>
            }
            renderRow={() => <div />}
          />
      </Page>
    );
  }
};

class TaskCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = {};
    this.renderTask = this.renderTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  checkItem(name, index) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onUnCompleteItem(node, index);
  }

  deleteItem(name, index) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onDeleteItem(node, index);
  }

  renderTask(row, index) {

    if (!row.completed) {
      return <div />;
    }

    const refItem = `item${index}`;
    return (
      <ListItem ref={(el) => this.itemRef[refItem] = el} tappable category={row.category} >
          <label className='left'>
            <Input checked onClick={() => this.checkItem(refItem, index)} type='checkbox' />
          </label>
          <div className='center'>
            {row.title}
          </div>
          <div className='right'>
            <Icon onClick={() => this.deleteItem(refItem, index)} style={{color: 'grey', paddingLeft: '4px'}} icon={{default: 'ion-ios-trash-outline', material:'md-delete'}} />
          </div>
        </ListItem>
    );
  }
  render() {
    return (
      <Page>
        <List
          dataSource={this.props.tasks}
          renderRow={this.renderTask} />
      </Page>
    );
  }
};

var Animator = {
  remove: (listItem, callback) => {
    listItem.classList.add('animation-remove');
    listItem.classList.add('hide-children');

    setTimeout(function() {
      listItem.classList.remove('animation-remove');
      listItem.classList.remove('hide-children');
      callback();
    }, 750);
  },

  swipe: (swipeRight, listItem, callback) => {
     var animation = swipeRight  ? 'animation-swipe-right' : 'animation-swipe-left';
     listItem.classList.add('hide-children');
     listItem.classList.add(animation);

     setTimeout(function() {
       listItem.classList.remove(animation);
       listItem.classList.remove('hide-children');
       callback();
     }, 950);
  },

  swipeRight: (listItem, callback) => {
    Animator.swipe(true, listItem, callback);
  },

  swipeLeft: (listItem, callback) => {
    Animator.swipe(false, listItem, callback);
  }

};

class TaskPending extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = {};
    this.renderTask = this.renderTask.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  checkItem(name, index) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onCompleteItem(node, index);
  }

  deleteItem(name, index) {
    var node = ReactDOM.findDOMNode(this.itemRef[name]);
    this.props.onDeleteItem(node, index);

  }

  renderTask(row, index) {

    if (row.completed) {
      return <div />;
    }
    const refItem = `item${index}`;
    return (
      <ListItem ref={(el) => this.itemRef[refItem] = el} tappable category={row.category} >
          <label className='left'>
            <Input onClick={() => this.checkItem(refItem, index)} type='checkbox' />
          </label>
          <div className='center'>
            {row.title}
          </div>
          <div className='right'>
            <Icon onClick={() => this.deleteItem(refItem, index)} style={{color: 'grey', paddingLeft: '4px'}} icon={{default: 'ion-ios-trash-outline', material:'md-delete'}} />
          </div>
        </ListItem>
    );
  }
  render() {
    return (
      <Page>
        <List
          dataSource={this.props.tasks}
          renderRow={this.renderTask} />
      </Page>
    );
  }
};


class PageContent extends React.Component {
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
            content: <TaskPending {...this.props} />,
            tab: <Tab label="Pending" />
            },
            {
              content: <TaskCompleted {...this.props} />,
              tab: <Tab label="Completed" />
              }]
        } />
  );
  }
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Page
        id='tabbarPage'
        renderToolbar={() =>
   <Toolbar>
     <div className='left'>
       <ToolbarButton component="button/menu">
         <Icon icon={{default: 'ion-navicon', material:'md-menu'}} size={{default: 32, material:24}} />
       </ToolbarButton>
     </div>
     <div className="center">To-Do List App 2.0</div>
     <div className="right">
       <ons-if platform="ios other">
         <ToolbarButton component="button/new-task">New</ToolbarButton>
       </ons-if>
     </div>
   </Toolbar> } >
   <PageContent {...this.props} />
  </Page>
   );
  }
};

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.unCompleteItem = this.unCompleteItem.bind(this);
    this.state = {
    tasks: [
        {
          title: 'Download OnsenUI',
          category: 'Programming',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false,
        },
        {
          title: 'Install Monaca CLI',
          category: 'Programming',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: true,
        },
        {
          title: 'Star Onsen UI repo on Github',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false,
        },
        {
          title: 'Register in the community forum',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false,
        },
        {
          title: 'Send donations to Fran and Andreas',
          category: 'Super important',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false,
        },
        {
          title: 'Profit',
          category: '',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false,
        },
        {
          title: 'Visit Japan',
          category: 'Travels',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false
        },
        {
          title: 'Enjoy an Onsen with Onsen UI team',
          category: 'Personal',
          description: 'Some description.',
          highlight: false,
          urgent: false,
          completed: false
        }
      ]
    };
  }

  deleteItem(node, index) {

    node.classList.add('animation-remove');
    node.classList.add('hide-children');

    setTimeout(() => {
      node.classList.remove('animation-remove');
      node.classList.remove('hide-children');

      var arr = this.state.tasks;
      arr.splice(index, 1);
      this.setState({ tasks: arr });
    }, 750);
  }

  completeItem(node, index) {
   var animation = 'animation-swipe-right';
   node.classList.add('hide-children');
   node.classList.add(animation);

   setTimeout(() => {
     node.classList.remove(animation);
     node.classList.remove('hide-children');

     var arr = this.state.tasks;
     arr[index].completed = true;
     this.setState({ tasks: arr });
   }, 950);
  }

  unCompleteItem(node, index) {
   var animation = 'animation-swipe-left';
   node.classList.add('hide-children');
   node.classList.add(animation);

   setTimeout(() => {
     node.classList.remove(animation);
     node.classList.remove('hide-children');

     var arr = this.state.tasks;
     arr[index].completed = false;
     this.setState({ tasks: arr });
   }, 950);
  }

  render() {
    return (
      <Page>
        <Splitter id="mySplitter">
          <SplitterSide  isSwipeable={true} width="250px" isCollapsed={true} swipeTargetWidth={50}>
            <Menu />
          </SplitterSide>
          <SplitterContent>
            <Content tasks={this.state.tasks} onUnCompleteItem={this.unCompleteItem} onCompleteItem={this.completeItem} onDeleteItem={this.deleteItem} />
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
};


const App = (props) => {
  return (
    <Navigator
      initialRoute={{
        component: FirstPage
      }}
      renderPage={(route, navigator) => {
        // console.log(route);
        return React.createElement(route.component);
      }} />
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
