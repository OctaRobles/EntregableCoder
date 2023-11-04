import { productsModel } from '../db/models/products.model.js';
import BaseManager from './baseManager.js';

class ProductsManager extends BaseManager {
    constructor() {
        super(productsModel);
    }

    async findAllFiltered(obj) {
        const { limit = 10, page = 1, sort: sorter, ...queryFilter } = obj;
        const response = await productsModel.paginate(queryFilter, { limit, page, sort: { price: sorter === 'asc' ? 1 : -1 }, lean: true, });
        return response;
    }
}

export const productsManager = new ProductsManager();