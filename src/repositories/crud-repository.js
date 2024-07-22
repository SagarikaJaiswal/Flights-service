const { where } = require("sequelize");

class CrudRepository{
    constructor(model){
        this.model = model;
    }
    // data -> {col: value, ...}
    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in : create");
            throw error;
        }
    }
    async get(id){
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in : get");
            throw error;
        }
    }
    async getAll(){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            console.log("Something went wrong in : getAll");
            throw error;
        }
    }
    async update(id, data){
        try {
            const response = await this.model.update(data, {where: {id: id}});
            return response;
        } catch (error) {
            console.log("Something went wrong in : update");
            throw error;
        }
    }
    async destroy(id){
        try {
            const response = await this.model.destroy({where: {id: id}});
            return response;
        } catch (error) {
            console.log("Something went wrong in : getAll");
            throw error;
        }
    }
}

module.exports = CrudRepository;