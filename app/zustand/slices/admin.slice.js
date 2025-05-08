import axios from 'axios';
// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;

const createAdminSlice = (set, get) => ({

    allUsers: [],
    fetchAllUsers: async () => {
        try {
            const response = await axios.get('/api/admin/users');
            set({ allUsers: response.data });
        } catch (error) {
            console.log(`Error fetching all users within the Zustand function`, error);
        }
    },

});

export default createAdminSlice;