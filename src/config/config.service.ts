import { injectable } from 'inversify';

@injectable()
export class ConfigService {
	private _salt: string;

	constructor() {
		process.env.SALT ? (this._salt = process.env.SALT) : (this._salt = '10');
	}

	get salt(): string {
		return this._salt;
	}
}
