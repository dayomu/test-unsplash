import React from 'react';

import moment from 'moment';

import {
  Col,
  Button
} from 'antd';

import { Link } from 'react-router-dom';

const CollectionListItem = (props) => {
  const { collection } = props;

  const published = (collection.published_at) ?
    moment(collection.published_at).format('DD MMMM YYYY') :
    moment().format('DD MMMM YYYY');

  return (
    <Col span={6} className="gutter-row">
      <div className="collection-list-item gutter-box">
        {/*<div
          className="collection-list-item__image"
          style={{
            backgroundImage: (collection.cover_photo !== null) ?
              `url(${collection.cover_photo.links.download}?w=400)` :
              `url(http://via.placeholder.com/350x150?text=No+Image)`
          }}
        />*/}
        <div className="collection-list-item__header">
          <div className="collection-list-item__title">
            {collection.title}
          </div>
          <div className="collection-list-item__total-photos">
            {`Total photos: ${collection.total_photos}`}
          </div>
          <div className="collection-list-item__tags">
            {
              collection.tags.map((tag) => (
                <div key={tag.title} className="collection-list-item__tag">{tag.title}</div>
              ))
            }
          </div>
          <div className="collection-list-item__button">
            <Link to={`collection/${collection.id}`}>
              <Button type="primary">View collection</Button>
            </Link>
          </div>
          <div className="collection-list-item__published">
            {`Published: ${published}`}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CollectionListItem;