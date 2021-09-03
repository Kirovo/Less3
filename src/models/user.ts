// Importing module to encrypt users sensible informaitons
import bcrypt from 'bcrypt';
// Importing client of database to connect to
import client from '../database';

// Getting crypting data from .env file
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

// Creating user's type
export type User = {
	id?: string | number;
	firstname: string;
	lastname: string;
	password: string;
};

// Creating user's class with all CRUD functions
export class UserStore {
	async index(): Promise<User[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM users';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get users: ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`unable show user ${id}: ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const conn = await client.connect();
			const sql =
				'INSERT INTO users (firstName,lastName,password_digest) VALUES($1,$2,$3) RETURNING *';

			// Encrypting received used password by the user
			const hash = bcrypt.hashSync(
				u.password + pepper,
				parseInt(saltRounds as string)
			);
			const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(
				`unable create user (${u.firstname}, ${u.lastname}): ${err}`
			);
		}
	}
	async update(
		id: string,
		newFirstName: string,
		newLastName: string
	): Promise<User> {
		try {
			const conn = await client.connect();
			const sql =
				'UPDATE users SET firstName = $2, lastName = $3 WHERE id = $1 RETURNING *';
			const result = await conn.query(sql, [id, newFirstName, newLastName]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`unable update user with id = ${id} : ${err}`);
		}
	}
	async delete(id: string): Promise<User> {
		try {
			const conn = await client.connect();
			const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
			const result = await conn.query(sql, [id]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`unable delete user with id = ${id} : ${err}`);
		}
	}
}
