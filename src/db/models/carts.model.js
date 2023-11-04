export default class BaseManager {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return this.model.find().lean();
    }

    async findById(id) {
        return this.model.findById(id);
    }

    async createOne(obj) {
        return this.model.create(obj);
    }

    async updateOne(id, obj) {
        return this.model.findByIdAndUpdate({ _id:id }, obj, { new: true });
    }

    async deleteOne(id) {
        return this.model.findByIdAndDelete(id);
    }
}
