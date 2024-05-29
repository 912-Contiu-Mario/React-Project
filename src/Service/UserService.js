import axios from 'axios';

class UserService {
    async getUsers() {
        try {
            const response = await axios.get('/api/users');
            return response.data;
        } catch (error) {
            if (error.response != undefined)
                throw error.response.data;
            else throw error;
        }
    }

    async addUser(user) {
        try {
            const response = await axios.post('/api/users', user);
            return response.data;
        }
        catch (error) {
            if (error.response != undefined)
                throw error.response.data;
            else throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const response = await axios.delete(`/api/users/${userId}`);
            return response.data;
        }
        catch (error) {
            if (error.response != undefined)
                throw error.response.data;
            else throw error;
        }
    }

    async updateUser(user) {
        try {
            const response = await axios.put(`/api/users/${user.id}`, user);
            return response.data;
        }
        catch (error) {
            if (error.response != undefined)
                throw error.response.data;
            else throw error;
        }
    }
}


export default new UserService();