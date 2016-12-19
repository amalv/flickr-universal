import React from 'react';
import styles from './Layout.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}
