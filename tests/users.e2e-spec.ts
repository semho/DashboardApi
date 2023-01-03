import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

let resLogin: request.Response;

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a5@a.ru', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		resLogin = await request(application.app)
			.post('/users/login')
			.send({ email: 'a5@a.ru', password: '123456' });
		expect(resLogin.statusCode).toBe(200);
	});

	it('Login - wrong password', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'a5@a.ru', password: '1234567' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${resLogin.body.jwt}`);
		expect(res.body.email).toBe('a5@a.ru');
	});

	it('Info - wrong token', async () => {
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
