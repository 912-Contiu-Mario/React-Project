import axios from "axios";


class ModuleService {

    processModule = (module) => {
        // Create a new module object with flattened properties
        const flatModule = {
          id: module.id,
          name: module.name,
          type: module.type,
          ...module.properties, // Spread the properties
        };
        return flatModule;
    }

    processModules = (modules) => {
        // Process each module in the array
        const processedModules = modules.map((module) => this.processModule(module));
        return processedModules;
    }


    async addModules(modules) {
        try {
            const response = await axios.post('http://localhost:8080/api/modules/bulk', modules)
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }


    async getTankModules(tankId){
        try {
            const response = await axios.get(`http://localhost:8080/api/modules/${tankId}`);
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async getTankModulesByModuleType(tankId, moduleType){
        try {
            const response = await axios.get(`http://localhost:8080/api/modules/${tankId}?moduleType=${moduleType}`);
            return response.data;
        } catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async addModule(module){
        try {
            const response = await axios.post('http://localhost:8080/api/modules', module);
    
            return response.data;
            }
         catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }


    async deleteModule(moduleId){
        try {
            const response = await axios.delete(`http://localhost:8080/api/modules/${moduleId}`);
            return response.data;
            }
         catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }

    async updateModule(module){
        try {
            const response = await axios.put(`http://localhost:8080/api/modules/${module.id}`, module);
            return response.data;
            }
         catch (error) {
            if(error.response != undefined )
                throw error.response.data;
            else throw error;
        }
    }


        


}

export default new ModuleService();