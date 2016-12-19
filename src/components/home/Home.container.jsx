import React from 'react';
import { browserHistory } from 'react-router';
import { connector } from '../Store';
import HomeComponent from './Home.component';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserEvent = this.handleUserEvent.bind(this);
    this.goToSearch = this.goToSearch.bind(this);
  }

  componentDidMount() {
    this.props.reset();
  }

  handleUserEvent(e) {
    this.props.setUser(e.target.value);
  }

  goToSearch() {
    browserHistory.push(`/gallery/${this.props.user}`)
  }

  render() {
    return (
      <HomeComponent
        handleUserEvent={this.handleUserEvent}
        user={this.props.user}
        btnDisabled={this.props.btnDisabled}
        goToSearch={this.goToSearch}
      />
    );
  }
}

export default connector(IndexPage);
