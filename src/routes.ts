import express, {request, response} from 'express'
import Knex from './database/conection';
import PointsController from "./controllers/PointsController";

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {
    const items = await Knex('items').select('*');
    const serializeItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3334/uploads/${item.image}`,
        };
    });
    response.json(serializeItems);
});

routes.post('/points', pointsController.create)

export default routes;