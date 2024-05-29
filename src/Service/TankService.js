import axios from 'axios';

class TankService {
    TankService(){

    }
    async getTanks(){
        try {
            const response = await axios.get('/api/tanks');
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }


    async getTankIdByName(tankName){
        try{
            const response = await axios.get('/api/tanks/findIdByName?tankName='+tankName);
            return response.data;
        }
        catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async checkServerHealth(){

        try{
            const response = await axios.get('/api/health');
            return response.data;
        }
        catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async addTank(tank){
        try {
            const response = await axios.post('/api/tanks', tank);
            return response.data;
            }
         catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async deleteTank(tankId){
       try{
            const response = await axios.delete(`/api/tanks/${tankId}`);
            return response.data;
       }
         catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
    }
}

    async updateTank(tank){
        try{
             const response = await axios.put(`/api/tanks/${tank.id}`, tank);
             return response.data;

            }
        catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
}
    async getTankById(tankId){
        try{
            const response = await axios.get(`/api/tanks/${tankId}`);
            return response.data;
        }
        catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }


    async addTanks(tanks){
        try {
            const response = await axios.post('/api/tanks/bulk', tanks);
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    
}
export default new TankService()

