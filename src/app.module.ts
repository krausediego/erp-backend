import { DatabaseModule } from '@database/database.module';
import { AdminModule } from '@modules/admin/admin.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>('API_PORT') ?? 3000;
    AppModule.apiVersion = this.configService.get<string>('API_VERSION') ?? 'v1';
    AppModule.apiPrefix = this.configService.get<string>('API_PREFIX') ?? 'api';
  }
}
