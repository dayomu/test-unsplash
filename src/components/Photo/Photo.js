import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import {
  Spin,
  Icon,
  Row,
  Col
} from 'antd';

import { axiosUnsplash } from '../../utils/axiosConfig';

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null
    };
  }

  componentDidMount() {
    const { photoId } = this.props.match.params;

    const getPhotoPromise = axiosUnsplash.get(`/photos/${photoId}`);
    getPhotoPromise
      .then((response) => {
        this.setState({
          photo: response.data
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { photo } = this.state;
    const { goBack } = this.props.history;
    const loaderIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if (photo === null) {
      return (
        <div className="loader">
          LOADING <Spin className="collections-list-loader__icon" indicator={loaderIcon} size="large" />
        </div>
      );
    }

    return (
      <div className="photo">
        <Row gutter={30}>
          <Col span={12}>
            <div className="back-button-container">
              <button className="back-button" onClick={() => goBack()}>
                <Icon type="arrow-left" /> Back
              </button>
            </div>
          </Col>
          <Col span={12}>
            <div className="photo-author">
              <div
                className="photo-author__avatar"
                style={{
                  backgroundImage: `url(${photo.user.profile_image.small})`
                }}
              />
              <div className="photo-author__name">{photo.user.name.toLowerCase()}</div>
            </div>
          </Col>
        </Row>
        <div className="photo-container">
          <img src={photo.urls.regular} alt={photo.description} />
          <div className="photo-description">{photo.description}</div>
        </div>
        <div className="photo-info">
          <Row gutter={30}>
            <Col span={8}>
              <div className="photo-info__item photo-info__likes">
                <Icon type="heart" /> {photo.likes}
              </div>
            </Col>
            <Col span={8}>
              <div className="photo-info__item photo-info__downloads">
                <Icon type="download" /> {photo.downloads}
              </div>
            </Col>
            <Col span={8}>
              <div className="photo-info__item photo-info__location">
                <Icon type="compass" /> {(photo.location) ? `${photo.location.country}, ${photo.location.city}` : 'no location is specified'}
              </div>
            </Col>
          </Row>
        </div>
        <div className="exif-info">
          <h2 className="exif-info__title">Exif Info</h2>
          <Row gutter={30}>
            {
              Object.keys(photo.exif).map((key) => {
                const value = photo.exif[key];
                return (
                  <Col span={4} key={key}>
                    <div className="exif-info__item">
                      <div className="exif-info__item-title">{`${key.toLowerCase()}:`}</div>
                      <div className="exif-info__item-value">{value}</div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(Photo);