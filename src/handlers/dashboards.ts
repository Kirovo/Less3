// Import every module to make a handler from dashboard model
import express, { Request, Response } from 'express';
import DashboardQueries from '../services/dashboard';
import tokenReader from '../utilities/tokenReader';

// Building endpoints
const dashboardRoutes = (app: express.Application): void => {
	app.get('/top', top);
	app.get('/category/:category', category);
	app.get('/current/:id', tokenReader, current);
	app.get('/completed/:id', tokenReader, completed);
};

// Creating a reference to the DashboardQueries class
const queries = new DashboardQueries();

// Creating relation between routes and database
const top = async (_req: Request, res: Response) => {
	const best = await queries.topProducts();
	res.json(best);
};
const category = async (_req: Request, res: Response) => {
	const segregate = await queries.productByCategory(_req.params.category);
	res.json(segregate);
};
const current = async (_req: Request, res: Response) => {
	const curr = await queries.currentOrder(_req.params.id);
	res.json(curr);
};
const completed = async (_req: Request, res: Response) => {
	const comp = await queries.completedOrder(_req.params.id);
	res.json(comp);
};

// Allowing routes to be called
export default dashboardRoutes;
