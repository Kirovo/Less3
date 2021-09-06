// This file tests products CRUD models
//
//
// Importing product models
import { Product, ProductStore } from '../../models/product';
// Importing client to connect to the database and clear tables after use
import client from '../../database';

// Getting products class
const store = new ProductStore();

describe('Product Model', () => {
	// Creating test product
	const p: Product = {
		id: 1,
		name: 'test',
		price: 5,
		category: 'test',
	};
	// Testing all CRUD functions
	it('should create a product test', async () => {
		const result = await store.create(p);
		expect(result).toEqual({
			id: 1,
			name: 'test',
			price: 5,
			category: 'test',
		});
	});
	it('should get created product', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				name: 'test',
				price: 5,
				category: 'test',
			},
		]);
	});
	it('should get a specific product', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			id: 1,
			name: 'test',
			price: 5,
			category: 'test',
		});
	});
	// Clear table and sequence
	afterAll(async () => {
		const conn = await client.connect();
		await conn.query('DELETE FROM products');
		await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
		conn.release();
	});
});
