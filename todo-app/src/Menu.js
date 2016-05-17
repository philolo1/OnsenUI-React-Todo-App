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

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRow = this.renderRow.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }

  renderCategories(rowName, idx) {

    const inputId = `rr-${rowName}`;

    return (
        <ListItem
          onClick={() => this.props.onClickMenuItem({mode: 'custom', name: rowName})}
          tappable
          >
          <div className="left">
            <Input type="radio" name="categoryGroup" inputId={inputId}
              checked={ this.props.name === rowName }
            />
          </div>
          <label className="center" htmlFor={inputId}> {rowName} </label>
        </ListItem>
      );
  }

  renderRow(row, idx) {
    if (idx == 0) {
      return (
        <ListItem
          onClick={() => this.props.onClickMenuItem({mode: 'default', name: 'All'})}
          tappable
          >
          <div className="left">
            <Input type="radio" name="categoryGroup" inputId="r-all"
              checked={this.props.mode === 'default' &&
                this.props.name === 'All'
              }
            />
          </div>
          <label class="center" htmlFor="r-all">All</label>
        </ListItem>
      );
    } else {
      return (
        <ListItem tappable category-id=""
          onClick={() => this.props.onClickMenuItem({mode: 'default', name: 'No category'})}>
          <div className="left">
            <Input type="radio" name="categoryGroup" input-id="r-no"
              checked={this.props.mode === 'default' &&
                this.props.name === 'No category'
              }
            />
          </div>
          <label className="center" htmlFor="r-no">No category</label>
        </ListItem>
      );
    }
  }

  render() {
    return (
      <Page id="menuPage">
        <List id="default-category-list"
          dataSource={[0, 1]}
          renderHeader={() =>
            <ListHeader>Default</ListHeader>
          }
          renderRow={this.renderRow}
        />
        <List
          dataSource={this.props.categories}
          id="custom-category-list"
          renderHeader={
            () => <ListHeader>Custom categories </ListHeader>
            }
            renderRow={this.renderCategories}
          />
      </Page>
    );
  }
};

