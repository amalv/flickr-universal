const redux = require('redux');
const reactRedux = require('react-redux');

const SET_USER = 'SET_USER';
const SET_IMAGES = 'SET_IMAGES';
const SET_ACTIVE_IMAGE = 'SET_ACTIVE_IMAGE';
const CLOSE_ACTIVE_IMAGE = 'CLOSE_ACTIVE_IMAGE';
const RESET = 'RESET';

const initialState = {
  user: null,
  username: null,
  images: [],
  activeImage: null,
  btnDisabled: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.value,
        btnDisabled: (action.value === ''),
      };
    case SET_IMAGES:
      return {
        ...state,
        username: action.value.username,
        images: state.images.concat(action.value.images),
      };
    case SET_ACTIVE_IMAGE:
      const active = state.images.filter(image => (image.id === action.value))[0];

      return {
        ...state,
        activeImage: active,
      };
    case CLOSE_ACTIVE_IMAGE:
      return {
        ...state,
        activeImage: null,
      };
    case RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const store = redux.createStore(reducer, initialState);

const mapStateToProps = state => ({
  user: state.user,
  username: state.username,
  images: state.images,
  page: state.page,
  activeImage: state.activeImage,
  btnDisabled: state.btnDisabled,
  fetching: state.fetching,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch({ type: SET_USER, value: user });
  },
  setImages: (data) => {
    dispatch({ type: SET_IMAGES, value: data });
  },
  setActiveImage: (image) => {
    dispatch({ type: SET_ACTIVE_IMAGE, value: image });
  },
  closeActiveImage: () => {
    dispatch({ type: CLOSE_ACTIVE_IMAGE });
  },
  reset: () => {
    dispatch({ type: RESET });
  },
});

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps);

module.exports = { connector, store, reducer };
