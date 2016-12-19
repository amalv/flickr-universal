import React from 'react';
import styles from './Lightbox.css';

const LightboxComponent = (props) => {
  const { activeImage, onClose } = props;

  if (!activeImage) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={activeImage.urlBig} role="presentation" />
        <div className={styles.holder}>
          {activeImage.title}
          <button className={styles.close} onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
};

export default LightboxComponent;
