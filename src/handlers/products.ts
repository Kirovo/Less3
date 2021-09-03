// Import every module to make a handler from order model
import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import tokenReader from '../utilities/tokenReader';

// Building endpoints
const productRoutes = (app: express.Application):void => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', tokenReader, create);
};

// Creating a reference to the OrderStore class
const store = new ProductStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (_req: Request, res: Response) => {
	const product = await store.show(_req.params.id);
	res.json(product);
};

const create = async (_req: Request, res: Response) => {
	const product: Product = {
		name: _req.body.name,
		price: _req.body.price,
		category: _req.body.category,
	};

	try {
		const newProduct = await store.create(product);

		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err + product);
		return;
	}
};
// Allowing routes to be called
export default productRoutes;
