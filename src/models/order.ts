// Importing client of database to connect to
import client from '../database';

// Create Order type
export type Order = {
	id?: string | number;
	status: string;
	user_id: string | number;
};

// Creating products's class with CRUD and addProducts functions
export class OrderStore {
	async index(): Promise<
		{
			order_id: number | string;
			status: string;
			user_id: number | string;
			firstname: string;
			lastname: string;
		}[]
	> {
		try {
			const conn = await client.connect();
			const sql =
				'SELECT orders.id order_id, orders.status, orders.user_id, users.firstName, users.lastName FROM orders INNER JOIN users ON orders.user_id = users.id ORDER BY orders.user_id ASC;';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get orders: ${err}`);
		}
	}

	async show(id: string): Promise<{
		order_id: number | string;
		status: string;
		user_id: number | string;
		firstname: string;
		lastname: string;
	}> {
		try {
			const sql =
				'SELECT orders.id order_id, orders.status, orders.user_id, users.firstName, users.lastName FROM orders INNER JOIN users ON orders.user_id = users.id WHERE orders.id=$1';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`unable show order ${id}: ${err}`);
		}
	}

	async create(o: Order): Promise<{
		id: string | number;
		status: string;
		user_id: string | number;
	}> {
		try {
			const conn = await client.connect();
			const sql =
				'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
			const result = await conn.query(sql, [o.status, o.user_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`unable create order of user (${o.user_id}): ${err}`);
		}
	}

	// addProducts add informations in order_products table as the only function which interact with this table
	async addProducts(
		order_id: number | string,
		product_id: number | string,
		quantity: number
	): Promise<{
		id?: number;
		order_id: number;
		product_id: number;
		quantity: number;
	}> {
		try {
			const conn = await client.connect();
			const sql =
				'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
			const result = await conn.query(sql, [order_id, product_id, quantity]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`unable create order ID (${order_id}): ${err}`);
		}
	}
}
