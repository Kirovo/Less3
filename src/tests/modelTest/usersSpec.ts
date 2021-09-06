// This file tests users CRUD models
//
//
// Importing user models
import { User, UserStore } from '../../models/user';
// Importing client to connect to the database and clear tables after use
import client from '../../database';

// Getting users class
const store = new UserStore();

describe('User Model', () => {
	// Creating test user
	const u: User = {
		id: 1,
		firstname: 'test',
		lastname: 'TEST',
		password: 'test',
	};
	// Testing all CRUD functions
	it('should create a user test', async () => {
		const result = await store.create(u);
		expect([result.id, result.firstname, result.lastname]).toEqual([
			1,
			'test',
			'TEST',
		]);
	});
	it('should get created user', async () => {
		const result = await store.index();
		expect([result[0].id, result[0].firstname, result[0].lastname]).toEqual([
			1,
			'test',
			'TEST',
		]);
	});
	it('should get a specific user', async () => {
		const result = await store.show('1');
		expect([result.id, result.firstname, result.lastname]).toEqual([
			1,
			'test',
			'TEST',
		]);
	});
	it('should update a specific user', async () => {
		const result = await store.update('1', 'newtest', 'NEWTEST');
		expect([result.id, result.firstname, result.lastname]).toEqual([
			1,
			'newtest',
			'NEWTEST',
		]);
	});
	it('should delete a specific user', async () => {
		const result = await store.delete('1');
		expect([result.id, result.firstname, result.lastname]).toEqual([
			1,
			'newtest',
			'NEWTEST',
		]);
	});
	// Clear table and sequence
	afterAll(async () => {
		const conn3 = await client.connect();
		await conn3.query('DELETE FROM users');
		await conn3.query('ALTER SEQUENCE users_id_seq RESTART;');
		conn3.release();
	});
});
