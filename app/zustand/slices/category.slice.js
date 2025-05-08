import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;

const createMiscSlice = (set, get) => ({



    //the categories functions go here
    categories: [],
    fetchCategories: async () => {
        try {
            const response = await axios.get('/api/categories');
            set({ categories: response.data });
        } catch (error) {
            console.log(`Error fetching category`);
        }
    },

    //fetching a specific category list
    categoryItems: [],
    fetchCategoryItems: async (categoryId) => {
        try {
            const response = await axios.get(`/api/categories/${categoryId}`);
            set({ categoryItems: response.data });
        } catch (error) {
            console.log('Error pulling the specific category list');
        }
    }


});



export default createMiscSlice;