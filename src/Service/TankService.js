import axios from 'axios';

class TankService {
    TankService(){

    }
    async getTanks(){
        try {
            const response = await axios.get('http://localhost:8080/api/tanks');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async addTank(tank){
        try {
            const response = await axios.post('http://localhost:8080/api/tanks', tank);
            return response.data;
            }
         catch (error) {
            throw error.response.data;
        }
    }

    async deleteTank(tankId){
       try{
            const response = await axios.delete(`http://localhost:8080/api/tanks/${tankId}`);
            return response.data;
       }
         catch(error){
              throw error.response.data;
    }
}

    async updateTank(tank){
        try{
             const response = await axios.put(`http://localhost:8080/api/tanks/${tank.id}`, tank);
             return response.data;
            }
        catch(error){
            throw error.response.data;
        }
}
}
export default new TankService()

