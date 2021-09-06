// This file tests dashboard models
//
//
// Importing module for order creation
import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import DashboardQueries from '../../services/dashboard';
// Importing client to connect to the database and clear tables after use
import client from '../../database';

// Getting classes
const store = new DashboardQueries();
const prod = new ProductStore();
const order = new OrderStore();
const user = new UserStore();

describe('Dashboard Queries', () => {
	// Creating Arrays to test with multiple datas
	const a: Product[] = []; // For products
	const b: { product_id: number; name: string; total: string }[] = []; // For generated in the database top products
	const c: Product[] = []; // For products generated in the database
	const e: {
		name: string;
		category: string;
		price: number;
		quantity: number;
		subtotal?: number;
	}[] = []; // For generated in the database current orders

	// Creating active an complete orders
	const o: Order = {
		id: 1,
		status: 'active',
		user_id: 1,
	};
	const no: Order = {
		id: 1,
		status: 'complete',
		user_id: 1,
	};
	// Creating a user
	const u: User = {
		firstname: 'test',
		lastname: 'TEST',
		password: 'test',
	};
	// Generating multiple products wih the same category
	for (let i = 1; i <= 10; i++) {
		const p: Product = {
			id: i as number,
			name: `test${i}`,
			price: 50,
			category: 'test',
		};
		a.push(p);
	}
	beforeAll(async () => {
		// Generating datas in database
		//
		// Creating user and an active order
		await user.create(u);
		const ord = await order.create(o);

		// Creating all the products in the database and adding the to the actice order
		for (const d of a) {
			const product = await prod.create(d);
			const ordadd = await order.addProducts(
				ord.id as number,
				product.id as number,
				a.indexOf(d)
			);

			// Creating Objects able to respond to every models of the dashboard file
			//
			// Object responding for topProducts function
			const topObj: { product_id: number; name: string; total: string } = {
				product_id: product.id as number,
				name: product.name,
				total: String(ordadd.quantity),
			};
			// Object responding for currentOrder function
			const currObj: {
				name: string;
				category: string;
				price: number;
				quantity: number;
				subtotal?: number;
			} = {
				name: product.name,
				category: product.category,
				price: product.price,
				quantity: ordadd.quantity,
				subtotal: product.price * ordadd.quantity,
			};
			// Adding different Objects to the expected Arrays
			b.push(topObj);
			c.push(product);
			e.push(currObj);
		}
	});
	it('should get top 5 products', async () => {
		const result = await store.topProducts();
		// Reverse the array to match the order of creation in the data base
		b.reverse();
		expect(result).toEqual(b.slice(0, 5));
	});
	it('should get products by category', async () => {
		const result = await store.productByCategory('test');
		expect(result).toEqual(c);
	});
	it('should get complete order', async () => {
		// Getting user and product
		const usr = await user.show('1');
		const produc = await prod.show('1');

		// Getting/Creating complete order
		const or = await order.create(no);
		// Adding products following th previous data
		await order.addProducts(or.id as number, produc.id as number, 16);

		// Generating Object to respond to completeOrder function
		const compObj: {
			order_id: number;
			status: string;
			firstname: string;
			lastname: string;
		} = {
			order_id: or.id as number,
			status: or.status,
			firstname: usr.firstname,
			lastname: usr.lastname,
		};
		const result = await store.completedOrder('1');
		expect(result).toEqual([compObj]);
	});
	it('should get current order', async () => {
		const result = await store.currentOrder('1');
		expect(result).toEqual(e);
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
