import axios from 'axios';

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;

const createFoundSlice = (set, get) => ({

    foundItems: [],
    //this finds the full list of found items (only renders their name and a link to the next funtion)
    fetchFoundItems: async () => {
        //axios GET our found items from db
        try {
            const response = await axios.get('/api/found');
            set({ foundItems: response.data });
        } catch (error) {
            console.log('error fetching found items');       
        }
    },

    //something is wrong with this code.
    addItem: async (foundItem) => {
        //item: {item_id, date, location, description, photo, user_id}
        console.log('found item', foundItem);
        try {
            // console.log('Adding new found item', item);
            await axios.post(`/api/items/${foundItem.item_id}/found`, foundItem);
            //refreshing the found item list
            get().fetchFoundItems();
        } catch (err) {
            console.error('Had an issue posting with the frontend', err);
        }
    },

    //This is the function that gets a specific found item's id to render only it's
    //information to the page
    foundItem: [],
    fetchFoundItem: async (foundId) => {
        try {
            const response = await axios.get(`/api/found/${foundId}`);
            set({ foundItem : response.data });
        } catch (error) {
            console.log('Error fetching specific found plant data', error);
        }
    },


    //Delete a found item
    deleteFoundItem: async (foundId) => {
        try {
            const response = await axios.delete(`/api/found/del/${foundId}`);
            console.log('Item deleted successfully', response.data);
            get().fetchFoundItems();
        } catch (error) {
            console.log('Error deleting found item', error);
            alert('Failed to delete the item');
        }
    }


    //Archived items - put response





});


export default createFoundSlice;