import { injectable } from 'inversify';

@injectable()
export class ConfigService {
	private _salt: number;

	constructor() {
		process.env.SALT ? (this._salt = Number(process.env.SALT)) : (this._salt = 10);
	}

	get salt(): number {
		return this._salt;
	}

	get(name: string): string | undefined {
		return process.env[name];
	}
}
