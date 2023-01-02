import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService {
	private _salt: number;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		process.env.SALT ? (this._salt = Number(process.env.SALT)) : (this._salt = 10);
		this.init();
	}

	init(): void {
		try {
			this.logger.log('[ConfigService] connect, .env loaded');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[ConfigService] error: ' + e.message);
			}
		}
	}

	get salt(): number {
		return this._salt;
	}

	get(name: string): string {
		return process.env[name] ?? 'not found';
	}
}
