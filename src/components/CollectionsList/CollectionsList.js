import React, { Component } from 'react';

import {
  Spin,
  Icon,
  Row
} from 'antd';

import CollectionListItem from '../CollectionListItem/CollectionListItem';

import { axiosUnsplash } from '../../utils/axiosConfig';

class CollectionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      collections: []
    };
  }

  componentDidMount() {
    const { currentPage } = this.state;
    const getCollectionsPromise = axiosUnsplash.get('/collections', {
      params: {
        page: currentPage,
        per_page: 12
      }
    });
    getCollectionsPromise
      .then((response) => {
        this.addDataToCollections(response.data);
      })
      .catch((error) => console.log(error));
  }

  addDataToCollections = (data) => {
    const { collections } = this.state;
    const updatedCollections = [
      ...collections,
      ...data
    ];
    this.setState({
      collections: updatedCollections
    });
  };

  render() {
    const { collections } = this.state;
    const loaderIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <div className="collections-list">
        <h1>Collections List</h1>
        {
          (collections.length === 0) ?
            <div className="loader">
              LOADING <Spin className="collections-list-loader__icon" indicator={loaderIcon} size="large" />
            </div> :
            <Row gutter={30}>
              {
                collections.map((collection) => (
                  <CollectionListItem collection={collection} key={collection.id} />
                ))
              }
            </Row>
        }
      </div>
    );
  }
}

export default CollectionsList;