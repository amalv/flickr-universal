import React from 'react';
import styles from './Home.css';

const { func, any, bool } = React.PropTypes;

const HomeComponent = (props) => {
  return (
    <div className={styles.wrapper}>
      <input onChange={props.handleUserEvent} className={styles.input} type='text' value={props.user} placeholder='Ex: 26238363@N03' />
      <button className={styles.button} disabled={props.btnDisabled} onClick={props.goToSearch}>Go</button>
    </div>
  );
};

export default HomeComponent;
