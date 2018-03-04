import React, { Component } from 'react';

import {
  withRouter,
  Link
} from 'react-router-dom';

import {
  Spin,
  Icon,
  Row,
  Col
} from 'antd';

import { axiosUnsplash } from '../../utils/axiosConfig';

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: null,
      photos: null
    };
  }

  componentDidMount() {
    const { collectionId } = this.props.match.params;

    const getCollectionPromise = axiosUnsplash.get(`/collections/${collectionId}`);
    getCollectionPromise
      .then((response) => {
        this.setState({
          collection: response.data
        });
        return axiosUnsplash.get(`/collections/${collectionId}/photos`);
      })
      .then((response) => {
        this.setState({
          photos: response.data
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      collection,
      photos
    } = this.state;
    const { goBack } = this.props.history;
    const loaderIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if (collection === null) {
      return (
        <div className="loader">
          LOADING <Spin className="collections-list-loader__icon" indicator={loaderIcon} size="large" />
        </div>
      );
    }

    return (
      <div className="collection">
        <div className="back-button-container">
          <div className="back-button" onClick={() => goBack()}>
            <Icon type="arrow-left" /> Back
          </div>
        </div>
        <div className="collection-photo" style={{
          backgroundImage: `url(${collection.cover_photo.urls.regular})`
        }}>
          <div className="collection-title"><span>Collection:</span> {collection.title}</div>
        </div>
        <h2 className="collection-photos-list-title">Photos</h2>
        {
          (photos === null) ?
            <div className="photos-loader">
              LOADING <Spin className="collections-list-loader__icon" indicator={loaderIcon} size="large" />
            </div> :
            <Row gutter={30}>
              {
                photos.map((photo) => {
                  return (
                    <Col span={8} key={photo.id}>
                      <Link to={`/photo/${photo.id}`} className="collection-photos-list-item">
                        <div
                          className="collection-photos-list-item-photo"
                          style={{
                            backgroundImage: `url(${photo.urls.small})`
                          }}
                        />
                      </Link>
                    </Col>
                  );
                })
              }
            </Row>
        }
      </div>
    );
  }
}

export default withRouter(Collection);