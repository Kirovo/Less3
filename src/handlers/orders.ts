// Import every module to make a handler from order model
import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

// Building endpoints
const orderRoutes = (app: express.Application):void => {
	app.get('/orders', index);
	app.get('/orders/:id', show);
	app.post('/orders', create);
	app.post('/orders/:id/product', addProduct);
};

// Creating a reference to the OrderStore class
const store = new OrderStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	const orders = await store.index();
	res.json(orders);
};

const show = async (_req: Request, res: Response) => {
	const order = await store.show(_req.params.id);
	res.json(order);
};

const create = async (_req: Request, res: Response) => {
	const order: Order = {
		status: _req.body.status,
		user_id: _req.body.user_id,
	};
	try {
		const newOrder = await store.create(order);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err as string+ order);
		return;
	}
};
const addProduct = async (_req: Request, res: Response) => {
	const order_id = _req.params.id;
	const product_id = _req.body.product_id;
	const quantity = _req.body.quantity;
	try {
		const add = await store.addProducts(order_id, product_id, quantity);
		res.json(add);
	} catch (err) {
		res.status(400);
		res.json(err);
		return;
	}
};

// Allowing routes to be called
export default orderRoutes;
