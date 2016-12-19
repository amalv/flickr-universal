import axios from 'axios';

export default (user, items, page) => (axios.get(`http://localhost:3000/api/images/${user}/${items}/${page}`));
