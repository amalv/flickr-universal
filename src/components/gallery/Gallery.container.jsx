import React from 'react';
import ReactDOM from 'react-dom';
import { connector } from '../Store';
import fetchImages from '../../api/clientApi';
import GalleryComponent from './Gallery.component';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, fetching: false };
    this.loadMore = this.loadMore.bind(this);
    this.getImages = this.getImages.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.attachScrollListener = this.attachScrollListener.bind(this);
    this.detachScrollListener = this.detachScrollListener.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.attachScrollListener();
    this.getImages(this.state.page);
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  onSelected(image) {
    this.props.setActiveImage(image);
  }

  onClose() {
    this.props.closeActiveImage();
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this);

    if (window.scrollY + window.innerHeight > el.offsetHeight && !this.state.fetching) {
      this.setState({ fetching: true }, () => {
        this.loadMore();
      })
    }
  }

  getImages(page) {
    fetchImages(this.props.params.user, 60, page).then(response => {
      this.props.setImages(response.data);
      this.setState({ fetching: false });
    })
  }

  loadMore() {
    this.detachScrollListener();
    this.setState({ page: this.state.page + 1 }, () => {
      this.getImages(this.state.page);
    })
  }

  attachScrollListener() {
    window.addEventListener('scroll', this.onScroll);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <GalleryComponent
        ref={(e) => this.gallery = e}
        username={this.props.username}
        click={this.loadMore}
        images={this.props.images}
        activeImage={this.props.activeImage}
        onSelected={this.onSelected}
        onClose={this.onClose}
      />
    );
  }
}

export default connector(Gallery);
