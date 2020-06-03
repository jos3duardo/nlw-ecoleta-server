import express, {request, response} from 'express'
import Knex from './database/conection';
const routes = express.Router();

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

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

   const ids = await Knex('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    })

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: ids[0],
        }
    })

    await Knex('points_items').insert(pointItems);

    return response.json({success: true})
})

export default routes;