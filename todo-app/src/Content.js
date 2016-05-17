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

import PageContent from './PageContent.js'

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.props.onMenuClick();
  }

  render() {
    let newButton;
    if (!ons.platform.isAndroid()) {
      newButton = <ToolbarButton
        onClick={this.props.onNewClick}
        component="button/new-task">
        New
      </ToolbarButton>;
    }

    return (
      <Page
        id='tabbarPage'
        renderToolbar={() =>
          <Toolbar>
            <div className='left'>
              <ToolbarButton component="button/menu" onClick={this.openMenu}>
                <Icon
                  icon={{default: 'ion-navicon', material: 'md-menu'}}
                  size={{default: 32, material: 24}} />
              </ToolbarButton>
            </div>
            <div className="center">React To-Do List App</div>
            <div className="right">
              {newButton}
            </div>
          </Toolbar> } >
          <PageContent ref='menu' {...this.props} />
        </Page>
    );
  }
};

