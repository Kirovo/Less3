import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

const request = supertest;
describe('Test endpoint responses', () => {
	const token = process.env.TEST_TOKEN as string;
	describe('Test endpoint responses of userRoutes', () => {
		it('gets the api endpoint GET /users', async () => {
			await request(app)
				.get('/users')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
		it('gets the api endpoint GET /users/authentificate', async () => {
			await request(app).get('/users/authentificate').expect(200);
		});

		it('gets the api endpoint GET /users/1', async () => {
			await request(app)
				.get('/users/1')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
		it('gets the api endpoint POST /users', async () => {
			await request(app).post('/users').expect(200);
		});
		it('gets the api endpoint DELETE /users/delete/1', async () => {
			await request(app)
				.delete('/users/delete/1')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
		it('gets the api endpoint UPDATE /users/update/1', async () => {
			await request(app)
				.put('/users/update/1')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
	describe('Test endpoint responses of productRoutes', () => {
		it('gets the api endpoint GET /products', async () => {
			await request(app).get('/products').expect(200);
		});
		it('gets the api endpoint GET /products/1', async () => {
			await request(app).get('/products/1').expect(200);
		});
		it('gets the api endpoint POST /products', async () => {
			await request(app)
				.post('/products')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
	describe('Test endpoint responses of orderRoutes', () => {
		it('gets the api endpoint GET /orders', async () => {
			await request(app).get('/orders').expect(200);
		});
		it('gets the api endpoint GET /orders/1', async () => {
			await request(app).get('/orders/1').expect(200);
		});
		it('gets the api endpoint POST /orders', async () => {
			await request(app).post('/orders').expect(200);
		});
		it('gets the api endpoint POST /orders/1/product', async () => {
			await request(app).post('/orders/1/product').expect(200);
		});
	});
	describe('Test endpoint responses of productRoutes', () => {
		it('gets the api endpoint GET /products', async () => {
			await request(app).get('/products').expect(200);
		});
		it('gets the api endpoint GET /products/1', async () => {
			await request(app).get('/products/1').expect(200);
		});
		it('gets the api endpoint POST /products', async () => {
			await request(app)
				.post('/products')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
	describe('Test endpoint responses of dashboardRoutes', () => {
		it('gets the api endpoint GET /top', async () => {
			await request(app).get('/top').expect(200);
		});
		it('gets the api endpoint GET /category/two-hand', async () => {
			await request(app).get('/category/two-hand').expect(200);
		});
		it('gets the api endpoint GET /current/1', async () => {
			await request(app)
				.get('/current/1')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
		it('gets the api endpoint GET /completed/1', async () => {
			await request(app)
				.get('/completed/1')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
	// Clear tables and sequences
	afterAll(async () => {
		const conn2 = await client.connect();
		await conn2.query('DELETE FROM order_products');
		await conn2.query('DELETE FROM orders');
		await conn2.query('DELETE FROM products');
		await conn2.query('DELETE FROM users');
		await conn2.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1;');
		await conn2.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
		await conn2.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
		await conn2.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
		conn2.release();
	});
});
