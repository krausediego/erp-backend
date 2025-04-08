import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { databaseProviders } from './database.providers';

@Module({
  imports: [...databaseProviders],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
