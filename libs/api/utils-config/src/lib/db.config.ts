import {ConfigType, registerAs} from "@nestjs/config";
import {Inject} from "@nestjs/common";

export const dbConfig = registerAs('db', () => ({
  uri: process.env.DATABASE_URL || 'postgresql://postgres:helloworld@localhost:5432/youtube-clone?schema=public',
  dbName: process.env.POSTGRES_DB_NAME || 'youtube-clone'
}));

export type DB_CONFIG = ConfigType<typeof dbConfig>;

export const InjectDbConfig = () => Inject(dbConfig.KEY);