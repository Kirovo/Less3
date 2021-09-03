// Importing Product type
import { Product } from '../models/product';
// Importing client of database to connect to
import client from '../database';

export class DashboardQueries {
	// Getting top 5 of products in every order of every users and make a total of time the product have been ordered
	async topProducts(): Promise<
		{ product_id: number; name: string; total: string }[]
	> {
		try {
			const conn = await client.connect();
			const sql =
				'SELECT order_products.product_id, products.name, SUM(order_products.quantity) as total FROM order_products INNER JOIN products ON order_products.product_id=products.id  GROUP BY (products.name,order_products.product_id) ORDER BY SUM(quantity) DESC LIMIT 5;';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products: ${err}`);
		}
	}

	// Getting every products by category with every informations.
	async productByCategory(category: string): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products WHERE category = $1';
			const result = await conn.query(sql, [category]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products: ${err}`);
		}
	}
	// Getting current order with important informations for the user.
	async currentOrder(
		user_id: string
	): Promise<
		{
			name: string;
			category: string;
			price: number;
			quantity: number;
			subtotal?: number;
		}[]
	> {
		try {
			const conn = await client.connect();
			const sql =
				"SELECT products.name, products.category, products.price, order_products.quantity, (products.price * order_products.quantity) subtotal FROM ((orders INNER JOIN order_products ON orders.id = order_products.order_id) INNER JOIN products ON order_products.product_id = products.id) WHERE orders.status='active' AND orders.user_id=$1 ;";
			const result = await conn.query(sql, [user_id]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get orders: ${err}`);
		}
	}
	// Getting completed order with the information of the order and the user who completed it.
	async completedOrder(
		user_id: string
	): Promise<
		{
			order_id: number | string;
			status: string;
			firstname: string;
			lastname: string;
		}[]
	> {
		try {
			const conn = await client.connect();
			const sql =
				"SELECT orders.id order_id, orders.status, users.firstName, users.lastName FROM orders INNER JOIN users ON orders.user_id = users.id WHERE orders.user_id=$1 AND orders.status = 'complete' ORDER BY orders.id ASC";
			const result = await conn.query(sql, [user_id]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get orders: ${err}`);
		}
	}
}
// Exporting models
export default DashboardQueries;
