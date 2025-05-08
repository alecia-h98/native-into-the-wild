import axios from "axios";

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;

const createFavoritesSlice = (set, get) => ({
  //the favorites functions go here

  //get function for all favorites specific to the user
  favorites: [],

  fetchFavorites: async () => {
    try {
      const response = await axios.get("/api/favorites");
      set({ favorites: response.data });
    } catch (error) {
      console.log("error fetching favorites", error);
    }
  },

  //post function for favorites
  addFavorite: async (itemId) => {
    try {
      await axios.post(`/api/favorites/${itemId}`);
      // console.log('Adding favorite, item id added:', itemId);
      get().fetchFavorites();
    } catch (error) {
      console.log("Unable to set new favorite.");
    }
  },

  //put function for favorites
  removeFavorite: async (favId) => {
    try {
      //below we are sending the id in the request body
      await axios.put(`/api/favorites/fav`, { id: favId });

      // Update the state to remove the item from favorites array
      get().fetchFavorites();

    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  },

  // switchFav: async (event) => {
  //     const thisButton = event.target;
  //     const favId = thisButton.closet('div').dataset.item.id;
  //     axios.put(`/api/favorites/fav/${favId}`)
  //         .then(() => {
  //         get().fetchFavorites()})
  //         .catch(err => console.error(err));
  // }

  //---The guts of the switch fav function---//
  // try {
  //     const response = await axios.put(`/api/favorites/fav`).then((response) => {
  //         console.log('Item unfavorited sucessfully', response.data);
  //         get().fetchFavorites();
  //         // return response.data;
  //     })

  // } catch (error) {
  //     console.log('Error unfavoriting item', error);
  //     alert('Failed to unfavorite the item');
  // }
});

export default createFavoritesSlice;
