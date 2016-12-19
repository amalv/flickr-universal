import React from 'react';
import Lightbox from '../lightbox';
import styles from './Gallery.css';

const { func, any, string } = React.PropTypes;

const GalleryComponent = (props) => {
  console.log(props.username);
  const triggerImage = (e) => {
    props.onSelected(e.getAttribute('data-id') || e.parentNode.getAttribute('data-id'));
  };

  const renderImages = () => (
    props.images.map((image, key) => (
      <li className={styles.item} key={key}>
        <img className={styles.thumbnail} role="presentation" key={key} src={image.url} />
        <a className={styles.info} data-id={image.id}>
          <span className={styles.title}>{image.title}</span>
        </a>
      </li>
    ))
  );

  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        {props.username}
      </div>
      <div className={styles.container} onClick={e => triggerImage(e.target)}>
        <ul className={styles.wrapper}>
          {renderImages()}
        </ul>
      </div>
      <Lightbox onClose={props.onClose} activeImage={props.activeImage} />
    </div>
  );
};

GalleryComponent.propTypes = {
  click: func,
  username: string,
  images: any,
  activeImage: any,
  onSelected: func,
  onClose: func,
};

export default GalleryComponent;
