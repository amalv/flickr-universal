## Usage

Install dependencies:

```sh
$ yarn install
```
This task compiles and bundlize the whole app. The content is served at http://localhost:3333/. It follows the server side rendering approach, and aswell as an internal API to reach Flickr API.
```sh
$ npm run build
```
Launches the devserver to develop the app with Hot Module Replacement
```sh
$ npm run dev
```
The app follow several approaches. For CSS it uses CSS Modules and PostCSS to make the classes work directly inline with React. However, when you run the build task it generates a separated css file in order to avoid problems with server side rendering.

Also it make uses of High Order Components to keep separated the business logic from the presentational component. The business components take advantage of a Redux store, however for very particular and small things, such with page of the image gallery we are in, uses internal state, avoiding unnecesary rerenders for such small "flag condition". This could be implemented with MobX (manage state for isolated component behaviour), but I prefer to keep sync with the proposed stack.

//TODO
- Add responsiviness to the grid and lightbox
- Increase UT converage
- Improve image selection by creating a hashmap instead of an array
