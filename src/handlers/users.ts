// Import every module to make a handler from user model
import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import tokenReader from '../utilities/tokenReader';
import jwt from 'jsonwebtoken';

// Building endpoints
const userRoutes = (app: express.Application): void => {
	app.get('/users', tokenReader, index);
	app.get('/users/authentificate', authentificate);
	app.get('/users/:id', tokenReader, show);
	app.post('/users', create); // REQUIREMENT.md ask for a token to creat a user wich is not applicable
	app.delete('/users/delete/:id', tokenReader, remove);
	app.put('/users/update/:id', tokenReader, update);
};

// Creating a reference to the UserStore class
const store = new UserStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};

const show = async (_req: Request, res: Response) => {
	const user = await store.show(_req.params.id);
	res.json(user);
};

const create = async (_req: Request, res: Response) => {
	const user: User = {
		firstname: _req.body.firstname,
		lastname: _req.body.lastname,
		password: _req.body.password,
	};
	try {
		const newUser = await store.create(user);

		const token = jwt.sign(
			{ user: newUser },
			process.env.TOKEN_SECRET as string
		);

		res.json(token);
	} catch (err) {
		res.status(400);
		console.log(err);
		res.json((err as string) + user);
		return;
	}
};

const update = async (_req: Request, res: Response) => {
	const id = _req.params.id;
	const newFirstName = _req.body.newFirstName;
	const newLastName = _req.body.newLastName;

	try {
		const user = await store.update(id, newFirstName, newLastName);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
		return;
	}
};

const remove = async (_req: Request, res: Response) => {
	const id = _req.params.id;
	try {
		const user = await store.delete(id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
		return;
	}
};

// Creating an authentificate fonction to get back a token a user
const authentificate = async (_req: Request, res: Response) => {
	const user: User = {
		firstname: _req.body.firstname,
		lastname: _req.body.lastname,
		password: _req.body.password,
	};

	try {
		const identity = await store.authentificate(user);
		const token = jwt.sign({ identity }, process.env.TOKEN_SECRET as string);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json((err as string) + user);
		return;
	}
};

// Allowing routes to be called
export default userRoutes;
