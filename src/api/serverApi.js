import axios from 'axios';

const key = 'f1503d18213f9ea982653d8db9473833';
const baseUrl = 'https://api.flickr.com/services/rest/?method=';
const cb = '&format=json&nojsoncallback=1';
let username = null;

function getImages(params) {
  const { user, items, page } = params;
  const request = `${baseUrl}flickr.people.getPhotos&api_key=${key}&page=${page}&per_page=${items}&user_id=${user}${cb}`;

  return axios.get(request);
}

function getUser(user) {
  const request = `${baseUrl}flickr.people.getInfo&api_key=${key}&user_id=${user}${cb}`;

  return axios.get(request);
}


function mapImages(images) {
  return images.map(image => {
    const url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}`;

    return {
      ...image,
      url: `${url}.jpg`,
      urlBig: `${url}_b.jpg`,
    }
  });
}

export const fetchImages = (req, res) => {
  const request = (!username)
    ? [getImages(req.params), getUser(req.params.user)]
    : [getImages(req.params)];

  axios.all(request)
    .then(([img, usr]) => {
      if (usr) { username = usr.data.person.username._content; }

      const response = {
        username: username,
        images: [...mapImages(img.data.photos.photo)],
      };

      res.send(JSON.stringify(response));
    });
};


export const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
