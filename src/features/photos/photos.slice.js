import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
  searchTerm: '',
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos. 
    addPhoto(state, action) {
      const { imageUrl, caption } = action.payload;
      state.photos.push({ imageUrl, caption });
    },

    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
   
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    removePhoto(state, action) {
      const {id} = action.payload;
      //state.photos.splice(id);
      state.photos = state.photos.filter(photo => photo.id !== id);

    }
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;


export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  const photos = state.photos.photos;
  const searchTerm = state.photos.searchTerm.toLowerCase().trim();

  if (!searchTerm) {
    return photos; // Return all photos if no search term
  }

  // Filter photos based on the search term in captions
  return photos.filter(photo =>
    photo.caption.toLowerCase().includes(searchTerm)
  );

};
export default photosSlice.reducer;

