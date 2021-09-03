// Importing client of database to connect to
import client from '../database';

// Create Product type
export type Product = {
	id?: string | number;
	name: string;
	price: number;
	category: string;
};

// Creating products's class with CRUD functions
export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products: ${err}`);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`unable show product ${id}: ${err}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const conn = await client.connect();
			const sql =
				'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
			const result = await conn.query(sql, [p.name, p.price, p.category]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`unable create product (${p.name}): ${err}`);
		}
	}
}
