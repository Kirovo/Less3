// This file tests order models
//
//
// Importing module for dashboard models testing
import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
// Importing client to connect to the database and clear tables after use
import client from '../../database';

// Getting classes
const store = new OrderStore();
const user = new UserStore();
const prod = new ProductStore();

describe('Order Model', () => {
	// Creating test order
	const o: Order = {
		id: 1,
		status: 'active',
		user_id: 1,
	};
	// Creating test user
	const u: User = {
		id: 1,
		firstname: 'test',
		lastname: 'TEST',
		password: 'test',
	};
	// Creating test product
	const p: Product = {
		id: 1,
		name: 'test',
		price: 5,
		category: 'test',
	};

	beforeAll(async () => {
		// Adding test elements to tables in the database
		await user.create(u);
		await prod.create(p);
	});
	// Testing all CRUD functions
	it('should create an order test', async () => {
		const result = await store.create(o);
		expect(result).toEqual({
			id: 1,
			status: 'active',
			user_id: 1,
		});
	});
	it('should get created order', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				order_id: 1,
				status: o.status,
				user_id: 1,
				firstname: u.firstname,
				lastname: u.lastname,
			},
		]);
	});
	it('should get a specific order', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			order_id: 1,
			status: o.status,
			user_id: 1,
			firstname: u.firstname,
			lastname: u.lastname,
		});
	});
	// Testing addProducts function
	it('should add a product to the order', async () => {
		// Getting needed datas from the database (order, product)
		const ord = await store.show('1');
		const pro = await prod.show('1');

		// Building an object to respond to returning datas
		const Obj: {
			id?: number;
			order_id: number;
			product_id: number;
			quantity: number;
		} = {
			id: 1,
			order_id: ord.order_id as number,
			product_id: pro.id as number,
			quantity: 5,
		};
		// Playing addProducts function
		const result = await store.addProducts(1, 1, 5);

		// Comparing result with the build object (Obj)
		expect(result).toEqual(Obj);
	});
	// Clear table and sequence
	afterAll(async () => {
		const conn3 = await client.connect();
		await conn3.query('DELETE FROM order_products;');
		await conn3.query('DELETE FROM orders;');
		await conn3.query('DELETE FROM products;');
		await conn3.query('DELETE FROM users');
		await conn3.query('ALTER SEQUENCE order_products_id_seq RESTART;');
		await conn3.query('ALTER SEQUENCE orders_id_seq RESTART;');
		await conn3.query('ALTER SEQUENCE products_id_seq RESTART;');
		await conn3.query('ALTER SEQUENCE users_id_seq RESTART;');
		conn3.release();
	});
});
