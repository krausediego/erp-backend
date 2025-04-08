import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

/**
 * Setup default connection in the application
 * @param config {ConfigService}
 */
const defaultConnection = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('TYPEORM_HOST'),
  port: config.get<number>('TYPEORM_PORT'),
  username: config.get<string>('TYPEORM_USERNAME'),
  password: config.get<string>('TYPEORM_PASSWORD'),
  database: config.get<string>('TYPEORM_DATABASE'),
  autoLoadEntities: config.get<boolean>('TYPEORM_AUTOLOAD') ?? true,
  synchronize: config.get<boolean>('TYPEORM_SYNCHRONIZE') ?? false,
  logging: config.get<boolean>('TYPEORM_LOGGING') ?? false,
  entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '**', '*.{ts,js}')],
  migrationsRun: true,
  migrationsTableName: 'migrations',
});

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: defaultConnection,
    inject: [ConfigService],
  }),
];
