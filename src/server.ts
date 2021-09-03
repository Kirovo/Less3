// This file serve the application

// Importing modules to work with endpoints and json format
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Importing routes
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboards';

// Listenning to the app to endpoints
const app: express.Application = express();
const port = 2000;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

// Listening to the app from the different routes
userRoutes(app);
productsRoutes(app);
ordersRoutes(app);
dashboardRoutes(app);

// Launching the app on localhost:2000
app.listen(port, function () {
	console.log(`listening app on: ${port}`);
});
