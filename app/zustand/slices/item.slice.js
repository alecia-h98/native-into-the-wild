import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;


const createItemSlice = (set, get) => ({
 
    //fetching all items in my db
    itemsList: [],

    fetchList: async () => {
        try {
            const response = await axios.get('/api/items');
            set({ itemsList: response.data });
        } catch (error) {
            console.log('Error fetching items');
        }
    },

    //fetching a specific item/plants info
    plant: [],
    fetchPlant: async (itemId) => {
        try {
            const response = await axios.get(`/api/items/${itemId}`);
            set({ plant : response.data });
        } catch (error) {
            console.log('Error fetching specific items info', error);
        }
    },





});


export default createItemSlice;