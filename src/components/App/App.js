import React, { Component } from 'react';

import { Layout } from 'antd';

import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

import CollectionsList from '../CollectionsList/CollectionsList';
import Collection from '../Collection/Collection';
import Photo from '../Photo/Photo';

import './App.css';

class App extends Component {
  render() {
    const { Header, Content } = Layout;
    return (
      <Layout className="layout">
        <Header>
          <Link to="/">
            <div className="logo">Collections Viewer</div>
          </Link>
        </Header>
        <Content className="app-content">
          <Switch>
            <Route exact path="/" component={CollectionsList}/>
            <Route path="/collection/:collectionId" component={Collection} />
            <Route path="/photo/:photoId" component={Photo} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default App;
