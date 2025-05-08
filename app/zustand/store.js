import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import foundSlice from "./slices/found.slice.js";
import itemSlice from "./slices/item.slice.js";
import categorySlice from "./slices/category.slice.js";
import favoritesSlice from "./slices/favorites.slice.js";
import adminSlice from "./slices/admin.slice.js";


// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...foundSlice(...args),
  ...itemSlice(...args),
  ...categorySlice(...args),
  ...favoritesSlice(...args),
  ...adminSlice(...args)
}))


export default useStore;
