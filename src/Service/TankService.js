import axios from 'axios';

class TankService {
    TankService(){

    }
    async getTanks(){
        try {
            const response = await axios.get('http://localhost:8080/api/tanks');
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async checkServerHealth(){
        try{
            const response = await axios.get('http://localhost:8080/api/health');
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
            const response = await axios.post('http://localhost:8080/api/tanks', tank);
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
            const response = await axios.delete(`http://localhost:8080/api/tanks/${tankId}`);
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
             const response = await axios.put(`http://localhost:8080/api/tanks/${tank.id}`, tank);
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
            const response = await axios.get(`http://localhost:8080/api/tanks/${tankId}`);
            return response.data;
        }
        catch(error){
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }
}
export default new TankService()

